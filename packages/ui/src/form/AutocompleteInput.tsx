import { DSProps } from '@napred/browser';
import { Box } from '@napred/primitives';
import debounce from 'lodash.debounce';
import React, { ChangeEvent, KeyboardEvent, ReactNode, useCallback, useState } from 'react';
import { Transition } from 'react-transition-group';
import Menu, { MenuItem } from '../Menu';
import Input from './Input';

interface IProps<T> extends DSProps {
  disabled?: boolean;
  className?: string;
  debounceTime?: number;
  defaultValue?: string | void;
  onAutocomplete: (e: ChangeEvent<HTMLInputElement>) => Promise<T[]> | T[];
  onBlur: (e: any) => any;
  onFocus: (e: any) => any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => any;
  onSuggestionClick: (suggestion: T) => any;
  placeholder?: string | void;
  renderItem?: (suggestion: T) => ReactNode;
  renderResults: (
    state: { focused: boolean; results: T[] },
    onSuggestionClick: (suggestion: T) => any,
    renderItem?: (suggestion: T) => ReactNode,
  ) => ReactNode;
  value?: string | void;
}

function AutocompleteInput<T>(props: IProps<T>) {
  const {
    debounceTime,
    defaultValue,
    onKeyUp,
    onAutocomplete,
    onBlur,
    onChange,
    onFocus,
    onSuggestionClick,
    placeholder,
    value,
    disabled,
    renderItem,
    renderResults,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([] as T[]);

  const handleAutocomplete = useCallback(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);

        const res = await onAutocomplete(e);

        setResults(res);
      } finally {
        setLoading(false);
      }
    }, debounceTime),
    [debounceTime, onAutocomplete, setLoading, setResults],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!loading) {
        // persist for onAutocomplete
        e.persist();

        onChange(e);

        handleAutocomplete(e);
      }
    },
    [onChange],
  );

  const handleBlur = useCallback(
    (e: Event) => {
      setFocused(false);

      onBlur(e);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (e: Event) => {
      setFocused(true);

      onFocus(e);
    },
    [onFocus],
  );

  const showSuggestions = focused && results.length > 0;

  return (
    <Box suggestions={showSuggestions} {...rest}>
      <Input
        disabled={disabled}
        borderRadiusBottomLeft={showSuggestions ? 0 : undefined}
        borderRadiusBottomRight={showSuggestions ? 0 : undefined}
        defaultValue={defaultValue}
        my={0}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        value={value}
        width="100%"
      />
      {renderResults({ focused, results }, onSuggestionClick, renderItem)}
    </Box>
  );
}

AutocompleteInput.defaultProps = {
  debounceTime: 300,
  display: 'inline-block',
  onAutocomplete: () => [],
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onSuggestionClick: () => {},
  position: 'relative',
  px: 0,
  py: 0,
  renderResults: (
    state: { focused: boolean; results: string[] },
    onSuggestionClick: (suggestion: string) => any,
    renderItem?: (suggestion: string) => ReactNode,
  ) => {
    const { focused, results } = state;
    if (!focused || results.length === 0) {
      return null;
    }

    return (
      <Transition appear in timeout={100}>
        {status => (
          <Menu opacity={status === 'entered' ? 1 : 0}>
            {results.map((result, index) => (
              <MenuItem button key={index} onMouseDown={() => onSuggestionClick(result)}>
                {renderItem ? renderItem(result) : result}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Transition>
    );
  },
};

export default AutocompleteInput;

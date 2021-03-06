import { storiesOf } from '@storybook/react';
import React from 'react';
import { Row, Tab, Tabs, Text } from '../../../ui/src';

const textareaStories = storiesOf('Components/Tabs', module);

const Link = (to: 'string') => <a href={to} />;

textareaStories.add('default tabs', () => (
  <Tabs
    renderTabs={(i: number, onTabClick: any) => (
      <Row alignItems="center" justifyContent="center">
        <Tab title="One" active={i === 0} onClick={() => onTabClick(0)} />
        <Tab title="Two" active={i === 1} onClick={() => onTabClick(1)} />
        <Tab title="Three" active={i === 2} onClick={() => onTabClick(2)} />
        <Tab title="Four" as={Link} to="/linkto" active={i === 3}  />
      </Row>
    )}
    renderContent={[() => <Text>one!</Text>, () => <Text>two!</Text>, () => <Text>three!</Text>]}
  />
));

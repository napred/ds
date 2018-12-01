import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';

import { Input, Tooltip } from '@napred/ui';

const tooltipStories = storiesOf('Components/Tooltip', module);

tooltipStories.add('Input with tooltip', () => (
  <Fragment>
    <Input />
    <Tooltip>This field must be filled</Tooltip>
  </Fragment>
));

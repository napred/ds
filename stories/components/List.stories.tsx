import { List, ListItem, ListSubheader } from '@napred/ui';
import { storiesOf } from '@storybook/react';
import React from 'react';

const listStories = storiesOf('Components/List', module);

listStories.add('list', () => (
  <List>
    <ListItem>Nanuky Lunar</ListItem>
    <ListItem>Biosféra</ListItem>
    <ListItem>CountryLife</ListItem>
  </List>
));

listStories.add('clickable list', () => (
  <List>
    <ListItem button>Nanuky Lunar</ListItem>
    <ListItem button>Biosféra</ListItem>
    <ListItem button>CountryLife</ListItem>
  </List>
));

listStories.add('clickable list with subheaders', () => (
  <List>
    <ListSubheader>Doprava Atoto</ListSubheader>
    <ListItem button>Nanuky Lunar</ListItem>
    <ListSubheader>Externí doprava</ListSubheader>
    <ListItem button>Biosféra</ListItem>
    <ListItem button>CountryLife</ListItem>
  </List>
));

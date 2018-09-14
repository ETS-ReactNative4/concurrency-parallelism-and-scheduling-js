import React from 'react';

import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Layout,
  Notes,
  Quote,
  Slide,
  Text,
} from 'spectacle';

import createTheme from 'spectacle/lib/themes/default';

require('normalize.css');
require('prismjs/themes/prism-coy.css');
require('./overrides.css');

const theme = createTheme({
      primary: 'white',
      secondary: '#CECECE',
      tertiary: '#03A9FC',
      quartenary: '#1F2022',
    },
    {
      primary: 'Montserrat',
      secondary: 'Helvetica',
    });

const calcStyles = (subject, { highlighted, only } ) => {
  const style = { 'text-align': 'left' };
  if (highlighted === undefined || highlighted === subject) {
    style.color = 'black';
  } else if (only) {
    style.display = 'none';
  } else {
    style.color = 'gray';
  }

  return style;
}

const ConceptsSlide = React.forwardRef(({id, children,  ...otherProps}, ref) => (
  <Slide {...otherProps} ref={ref} id={id}>
    <Heading style={calcStyles('scheduling', otherProps)} size={6} caps>Scheduling</Heading>
    <div style={calcStyles('scheduling', otherProps)}><u>Priority</u>: which tasks should run next and for how long?</div>
    {otherProps.highlighted === 'scheduling' && otherProps.only && children}
    <br />
    <Heading style={calcStyles('parralelism', otherProps)} size={6} caps>Parallelism</Heading>
    <div style={calcStyles('parralelism', otherProps)}><u>Execution</u>: how many tasks can run at the same time?</div>
    {otherProps.highlighted === 'parralelism' && otherProps.only && children}
    <br />
    <Heading style={calcStyles('concurrency', otherProps)} size={6} caps>Concurrency</Heading>
    <div style={calcStyles('concurrency', otherProps)}><u>Coordination</u>: how do tasks communicate and share resources?</div>
    {otherProps.highlighted === 'concurrency' && otherProps.only && children}
  </Slide>));

export { theme, ConceptsSlide };

// Import React
import React from 'react';

import posed from 'react-pose';
// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#CECECE',
    tertiary: '#03A9FC',
    quartenary: '#1F2022',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const Box = posed.div({
  visible: { x: 0, y: 0,  display: 'inline-block', backgroundColor:'red', transition: {

      x: { type: 'keyframes', values: [100, 75, 50, 25, 0] },
      y: { type: 'keyframes', values: [100, 100, 100, 100, 0], delay: 100 },
    }
  },
  hidden: { x: 100, y: 100, transition: {
      x: { type: 'keyframes', values: [0, 0, 0, 0, 100], delay: 100 },
      y: { type: 'keyframes', values: [0, 25, 50, 75, 100] },
    }
  },
});

const MovingBox = ({ visible }) =>
  <Box pose={visible ? 'visible' : 'hidden'}>{visible ? 'visible' : 'hidden'}</Box>;

export default class Presentation extends React.Component {
  state = { visible: true };

  componentDidMount() {
    this.interval = setInterval(() =>
      this.setState(({ visible }) => ({ visible: !visible })), 3000);
  }

  render() {
    return (
      <Deck
        transition={['slide']}
        transitionDuration={220}
        progress="bar"
        theme={theme}
      >
        <Slide>
          <Heading size={3} style={{ 'text-align': 'left' }} caps>
            Concurrency, Parallelism and Scheduling in JavaScript
          </Heading>
          <Heading size={6} style={{ 'text-align': 'right' }}>
            by Mihail Mikov<br/>
            @debelbot
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3}>Hi, I'm Misho!</Heading>
          <Image src="images/rick-juggling.gif" />
          <List textColor="black">
            <ListItem>Senior Software Engineer @Skyscanner</ListItem>
            <ListItem>Juggler</ListItem>
            <ListItem>Rick and Morty fan</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>The story so far...</Heading>
        </Slide>
        <Slide>
          <Heading size={5}>JavaScript is <u>still</u> popular</Heading>
          <Image src="images/most-popular-language.png" />
        </Slide>
        <Slide>
          <Heading size={5}>Other languages <u>still</u> be like</Heading>
          <Image src="images/y-u-no-guy.png" />
          <Heading size={5}>JavaScript Y U NO threads?!</Heading>
        </Slide>
        <Slide>
          <Heading size={5}>If JavaScript has no threads,</Heading>
          <Image src="images/philosiraptor.png" />
          <Heading size={5}>how does it do concurrency?</Heading>
        </Slide>
        <Slide>
          <Heading size={5}>A misterious "answer"</Heading>
          <Image src="images/mdn-event-loop.png" />
        </Slide>
        <Slide>
          <Heading size={3}>to be continued...</Heading>
        </Slide>
      </Deck>
    );
  }
}

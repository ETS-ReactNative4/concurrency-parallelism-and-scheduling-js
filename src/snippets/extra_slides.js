import React from 'react';

import posed from 'react-pose';


const originalProgs = (<Slide>
  <Heading size={5}>The original programmers</Heading>
  <Layout>
    <Image width="40%" height="40%" src="images/grace-hopper.jpg" />
    <Image width="40%" height="40%" src="images/programmers.jpg" />
  </Layout>
  <div>Note: this slide is accurate</div>
</Slide>);

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

const creditCardSlide = (<Slide>
        <BlockQuote>
          <Quote style={{color:'black', 'font-size': '1.5em'}}>The JS concurrency model is like a credit card.
            It frees you from the hassle and risks of carrying cash, which is great,
            unless you spend more than you make.</Quote>
          <Cite>Matt Ranney (2013)</Cite>
        </BlockQuote>
      </Slide>)

const langs = (        <Slide id="languages chart">
          <Heading size={5}>Dispite this graph of language preference</Heading>
          <Image style={{ width: "70%" }} src="images/language_graph.png" />
        </Slide>
)

const java = (        <Slide id="threads_with_locking">
          <Heading size={5}>The Java Model - Threads and Locks</Heading>
          <Image src="images/java.jpg" />
        </Slide>)

const workers = (        <Slide id="connecting workers">
          <Heading size={5}>Connecting workers</Heading>
        </Slide>
)

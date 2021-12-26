import React, {
  useRef,
  Component,
  FunctionComponent as FC,
  useState,
  useEffect
} from 'react'; // we need this to make JSX compile
import axios, { AxiosResponse } from 'axios';
import './home.css';
import { createLogicalOr } from 'typescript';

//////////////////////////// functional component w no children
type CardProps = {
  title: string;
  paragraph: string;
};

export const Card: FC<CardProps> = ({
  title,
  paragraph = 'lorem ipsum delorean back to the future...'
}: CardProps) => (
  <div>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </div>
);

export const WelcomeMsg = <Card title="Welcome!" paragraph="To this example" />;

////////////////////// Class component with no constructor - Clock example

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
interface ClockState {
  time: Date;
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Clock extends Component<Record<string, unknown>, ClockState> {
  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    return <p>The current time is {this.state.time.toLocaleTimeString()}</p>;
  }
}

/////////////////// Class component with constructor method

interface SampleProp {
  someProp: string;
}
export class Sample extends Component<SampleProp, Record<string, unknown>> {
  constructor(props: SampleProp) {
    super(props);
    console.log(props.someProp); // simply here to avoid the useless constructor msg
  }
}

//////////////// Default props

interface Greeting {
  msg: string;
}

export class ByeinFive extends Component<Greeting> {
  static defaultProps: Greeting = {
    msg: 'Greetings!'
  };

  sayBye() {
    this.setState({
      msg: 'Goodbye!'
    });
  }

  componentDidMount() {
    setInterval(() => this.sayBye(), 2000);
  }

  render() {
    return <p>{this.props.msg}</p>;
  }
}

const el = <ByeinFive />;

///////////////////////// ModelSummaryCard

//State hooks and Effect hooks
export const CounterExample: FC = () => {
  const [count, setCount] = useState(0);

  // componentDidMount
  // useEffect(() => {
  //     console.log(`button was clicked @ ${new Date()}`)

  // }, [])

  // componentDidUpdate
  useEffect(() => {
    console.log(`button was clicked @ ${new Date()}`);
    console.log(`the count is now ${count}`);
  }, [count]);

  // // componentWillUnmount
  // useEffect(() => {
  //     console.log('component mounted')
  //     return () => {
  //         console.log('component unmounted')
  //     }
  // }, [])

  return (
    <div>
      <h6> Counter </h6>
      <p> current count: {count} </p>
      <button onClick={() => setCount(count + 1)}>increment the count</button>
    </div>
  );
};

///////////////////// passing props via object spread notation and destructuring

type PartialKeys<T> = { [K in keyof T]?: T[K] };
interface IParentToChild {
  color: string;
  numSides: number;
  lengthOfSides: number[];
}

const ParentToChild = (): JSX.Element => {
  const shapeOne: IParentToChild = {
    color: 'Red',
    numSides: 5,
    lengthOfSides: [2, 3, 9]
  };
  return (
    <>
      <ParentToChild1 {...shapeOne} />
      <ParentToChild1 color={'Blue'} numSides={5} lengthOfSides={[1, 2, 3]} />
      <ParentToChild2 color={'Blue'} numSides={5} />
      <ParentToChild3 numSides={5} lengthOfSides={[1, 2, 3]} />
      <ParentToChild4 color={'Blue'} numSides={5} lengthOfSides={[1, 2, 3]} />
    </>
  );
};

// destructuring when all interface keys are passed
const ParentToChild1 = ({
  color,
  numSides,
  lengthOfSides
}: IParentToChild): JSX.Element => {
  return (
    <>
      <p>{`Polygon color: ${color}`}</p>
      <p>{`Number of sides: ${numSides}`}</p>
      <p>{`Length of sides: ${lengthOfSides.join(', ')}`}</p>
    </>
  );
};

// destructuring when a subset of interface keys are passed (notice the parameter type change)
// more @ https://dev.to/busypeoples/notes-on-typescript-type-level-programming-in-typescript-part-1-i57
// even more @ https://dev.to/busypeoples/notes-on-typescript-mapped-types-and-lookup-types-i36
const ParentToChild2 = ({
  color,
  numSides
}: PartialKeys<IParentToChild>): JSX.Element => {
  return (
    <>
      <p>{`Polygon color: ${color}`}</p>
      <p>{`Number of sides: ${numSides}`}</p>
    </>
  );
};

// no destructuring -- still allowing a subset of interface keys to be passed
const ParentToChild3 = (props: PartialKeys<IParentToChild>): JSX.Element => {
  return (
    <>
      <p>{`Polygon color: ${props.color}`}</p>
      <p>{`Number of sides: ${props.numSides}`}</p>
    </>
  );
};

// destructuring plus spread operator (...rest is less preferred than using only the subset you need)
const ParentToChild4 = ({ color, numSides, ...rest }: IParentToChild): JSX.Element => {
  return (
    <>
      <p>{`Polygon color: ${color}`}</p>
      <p>{`Number of sides: ${numSides}`}</p>
    </>
  );
};

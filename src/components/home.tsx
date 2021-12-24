import React, { useRef, Component, FunctionComponent as FC, useState, useEffect } from 'react'; // we need this to make JSX compile
import axios, { AxiosResponse } from 'axios';

//////////////////////////// functional component w no children
type CardProps = {
  title: string;
  paragraph: string;
};

export const Card: FC<CardProps> = ({ title, paragraph = 'lorem ipsum delorean back to the future...' }: CardProps) => (
  <div>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </div>
);

export const WelcomeMsg = <Card title="Welcome!" paragraph="To this example" />;

////////////////////////// functional component with children -- lots of errors
// enum Size {
//     Small = 0,
//     Medium = 1,
//     Large = 2
// }
// interface SaladProps {
//     variation: string
//     ingredients: string[]
//     size: Size
// }
// export const Salad: FC<SaladProps> = ({ variation, ingredients, size, purchasedAt }) => <div>
//     <p>Type of salad: {variation}</p>
//     <p>Size of salad: {size}</p>
//     <p>Ingredients in salad: {ingredients}</p>
//     <p>Purchaesd at {purchasedAt}</p>
// </div>

// export const MexicanSalad = <Salad variation="Mexican" ingredients=["a"] purchasedAt="guadalajara" />

////////////////////// Class component with no constructor - Clock example

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
interface ClockState {
  time: Date;
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Clock extends Component<{}, ClockState> {
  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date(),
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
export class Sample extends Component<SampleProp, {}> {
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
    msg: 'Greetings!',
  };

  sayBye() {
    this.setState({
      msg: 'Goodbye!',
    });
  }

  componentDidMount() {
    setInterval(() => this.sayBye(), 2000);
  }

  render() {
    return <p>{this.props.msg}</p>;
  }
}

const el = <ByeinFive />; // Will compile in TS 3.0

///////////////////////// ModelSummaryCard

export interface GLMSummary {
  name: string;
  desc: string;
  target: string;
  prediction: string;
  var_weights: string;
  link_function: string;
  error_dist: string;
  explained_variance: number;
  feature_summary: FeatureSummary[];
}

export interface FeatureSummaryData {
  bin_edge_right: number[];
  sum_target: number[];
  sum_prediction: number[];
  sum_weight: number[];
  wtd_avg_prediction: number[];
  wtd_avg_target: number[];
}

export interface FeatureSummary {
  name: string;
  data: FeatureSummaryData;
}

export const getBasicInfo = async (): Promise<{ name: string; desc: string }[]> => {
  const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
    method: 'get',
    url: 'http://localhost:8000/modelsummary/glm/model_0/',
    params: {},
  });

  return data.map(el => ({
    name: el.name,
    desc: el.desc,
  }));
};

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

export const InfoCard: FC = () => {
  const [count, setCount] = useState(0);

  const isFirstUpdate = useRef(true); //prevent effect hook on component mount

  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
    } else {
      console.log(`${count} summary requests`);
      getBasicInfo().then(info => console.log(info));
    }
    return () => {
      console.log('component unmount');
    };
  }, [count]);

  return (
    <div>
      <h6> Counter </h6>
      <p> current count: {count} </p>
      <button onClick={() => setCount(count + 1)}>log model summary to console</button>
    </div>
  );
};

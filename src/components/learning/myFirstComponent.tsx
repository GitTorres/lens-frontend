import React, {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  ChangeEvent
} from 'react';
import { getSummary } from '../../api/request';
import { motion } from 'framer-motion';
import '../../App.css';

interface QueryParams {
  name: string;
  desc: string;
  min_explained_variance: number;
  max_explained_variance: number;
  features: string[];
}
type Optional<T> = { [K in keyof T]?: T[K] };
const initialQueryParams = {
  name: '',
  desc: '',
  min_explained_variance: 0,
  max_explained_variance: 1,
  features: []
};
// const mapObject = <K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

export const Form = () => {
  //////// STATE //////////
  //// boolean value to trigger an API call upon value change
  const [clickToggle, setClickToggle] = useState(false);

  useEffect(() => {
    getSummary(query).then((data) => {
      const updatedModelFormulas: string[] = data.map((summary) => summary.desc);
      setModelFormulas(updatedModelFormulas);
    });
  }, [clickToggle]);

  //// filter query for the collection.find() request
  const [query, setQuery] = useState<QueryParams>(initialQueryParams);

  //// the formulas for queried model summaries
  const [modelFormulas, setModelFormulas] = useState<string[]>([]);

  //////// CALLABLES AND HANDLERS //////////
  // update clickToggle on button click
  const onButtonClick = (): void => setClickToggle(!clickToggle);

  // update query on input change
  const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const updatedInputValue = evt.target.value;
    const updatedQuery = {
      ...query,
      [evt.target.name]: updatedInputValue
    };
    setQuery(updatedQuery);
  };

  // generate <input> fields
  const listLabels = (): JSX.Element[] => {
    const inputElements: JSX.Element[] = [];

    // bizarre bullshit
    for (const [k, v] of Object.entries(query)) {
      const newElement = (
        <p key={k}>
          <label key={k}>
            {k}
            <input type="text" key={k} name={k} value={v} onChange={onInputChange} />
          </label>
        </p>
      );
      inputElements.push(newElement);
    }
    return inputElements;
  };

  return (
    <div>
      <MyButton onClick={() => onButtonClick()}>{'query data'}</MyButton>
      <form>{listLabels()}</form>
      {modelFormulas.map((f) => (
        <p key={f}>{f}</p>
      ))}
    </div>
  );
};

interface MyButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}
const MyButton = ({ onClick, children }: MyButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.button>
);

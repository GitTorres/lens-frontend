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
// import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import Delete from '@material-ui/icons/Delete';

///////////////////////////////// Types and Interfaces
interface QueryParams {
  name: string;
  desc: string;
  min_explained_variance: number;
  max_explained_variance: number;
  features: string[];
}
type ValueOf<T> = T[keyof T];
type Optional<T> = { [K in keyof T]?: T[K] };
const initialQueryParams = {
  name: '',
  desc: '',
  min_explained_variance: 0,
  max_explained_variance: 1,
  features: []
};
type HTMLInputHandler = (x: ChangeEvent<HTMLInputElement>) => void;
// const mapObject = <K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

//////////////////////////////// Custom Styles

///////////////////////////////////// Components

export const Form = () => {
  //////// STATE //////////
  //// boolean value to trigger an API call upon value change
  const [clickToggle, setClickToggle] = useState(false);

  //// filter query for the collection.find() request
  const [query, setQuery] = useState<QueryParams>(initialQueryParams);

  // update query on input change
  const onInputChange: HTMLInputHandler = (evt) => {
    const updatedQuery = {
      ...query,
      [evt.target.name]: evt.target.value
    };
    setQuery(updatedQuery);
  };

  useEffect(() => {
    getSummary(query).then((data) => {
      const updatedModelFormulas: string[] = data.map((summary) => summary.desc);
      setModelFormulas(updatedModelFormulas);
    });
  }, [clickToggle]);

  //// the formulas for queried model summaries
  const [modelFormulas, setModelFormulas] = useState<string[]>([]);

  //////// CALLABLES AND HANDLERS //////////
  // update clickToggle on button click
  const onButtonClick = (): void => setClickToggle(!clickToggle);
  return (
    <div>
      <MyButton onClick={() => onButtonClick()}>{'query data'}</MyButton>
      <form>
        {Object.keys(query).map((k) => (
          <FormTextbox
            key={k}
            textBoxName={k as keyof QueryParams}
            textBoxValue={query[k as keyof QueryParams]}
            onTextBoxChange={onInputChange}
          />
        ))}
      </form>
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
  <Button
    variant="contained"
    color="secondary"
    size="medium"
    startIcon={<Delete />}
    onClick={onClick}
  >
    {children}
  </Button>
);

interface TextBoxProps {
  textBoxName: keyof QueryParams;
  textBoxValue: QueryParams[keyof QueryParams];
  onTextBoxChange: HTMLInputHandler;
}
const FormTextbox = ({ textBoxName, textBoxValue, onTextBoxChange }: TextBoxProps) => {
  return (
    <p>
      <label>
        {textBoxName}
        <input
          type="text"
          name={textBoxName}
          value={textBoxValue}
          onChange={onTextBoxChange}
        />
      </label>
    </p>
  );
};

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { getSummary } from '../../api/request';
import { GLMSummary, paramsGetSummary } from '../../types';

interface SidebarProp {
  setSelectedMode: Dispatch<SetStateAction<string>>;
}

export const Sidebar = ({ setSelectedMode }: SidebarProp): JSX.Element => {
  const [modelNames, loadModelNames] = useState<string[]>([]);

  const onButtonClick = (name: string): void => {
    setSelectedMode(name);
  };
  // for now we query for everything by passing undefined
  const query: paramsGetSummary = {
    name: undefined,
    desc: undefined,
    min_explained_variance: undefined,
    max_explained_variance: undefined,
    features: undefined
  };

  useEffect(() => {
    getSummary(query).then((data) => {
      loadModelNames(data.map((summary: GLMSummary) => summary.desc));
      // console.log(modelNames);
    });
  }, []);

  return (
    <div className="sidebar">
      {modelNames &&
        modelNames.map((name: string, index: number) => (
          <MyButton key={index} onClick={() => onButtonClick(name)}>
            {name}
          </MyButton>
        ))}
    </div>
  );
};

const MyButton = ({ children, onClick }: any) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.button>
);

import React, { useState } from 'react';

interface ButtonProp {
  label: string;
  value: boolean;
}

interface ButtonHandlerArgs {
  buttons: ButtonProp[];
  setButtons: React.Dispatch<React.SetStateAction<ButtonProp[]>>;
  label: string;
}

interface SpecialButtonProps extends ButtonHandlerArgs {
  handleButtonsChange: any; // not going to annotate curried functions
}

export const TripleButton = () => {
  const [buttons, setButtons] = useState<ButtonProp[]>([
    { label: 'low', value: false },
    { label: 'medium', value: false },
    { label: 'high', value: false }
  ]);

  const handleButtonsChange = (
    buttons: ButtonProp[],
    setButtons: any,
    label: string
  ): void => {
    const newButtonsState = buttons.map((button) => {
      if (button.label === label) {
        return (button = { label: button.label, value: true });
      }
      return (button = {
        label: button.label,
        value: false
      });
    });
    console.log(newButtonsState);
    setButtons(newButtonsState);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Specialbuton {...{ buttons, setButtons, handleButtonsChange }} />
      {buttons[0].value && <div>LOW</div>}
      {buttons[1].value && <div>MEDIUM</div>}
      {buttons[2].value && <div>HIGH</div>}
    </div>
  );
};

const Specialbuton = ({
  buttons,
  setButtons,
  handleButtonsChange
}: Omit<SpecialButtonProps, 'label'>) => {
  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={`${button.label}-${index}`}
          onClick={() => handleButtonsChange(buttons, setButtons, button.label)}
        >
          {button.label.toUpperCase()}
        </button>
      ))}
    </>
  );
};

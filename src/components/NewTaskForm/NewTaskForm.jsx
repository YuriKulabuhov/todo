import './NewTaskForm.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const NewTaskForm = ({ addTaskEnter }) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const labelChange = (event) => {
    setLabel(event.target.value);
  };

  const minChange = (event) => {
    if (Number.isNaN(Number(event.target.value))) {
      // eslint-disable-next-line no-alert
      alert("It's not a number!");
    }
    setMinutes(event.target.value);
  };

  const secChange = (event) => {
    if (Number.isNaN(Number(event.target.value))) {
      // eslint-disable-next-line no-alert
      alert("It's not a number!");
    }
    setSeconds(event.target.value);
  };

  const sendToTasks = (event) => {
    const timesLeft = Number(minutes) * 60 + Number(seconds);
    if (event.key === 'Enter' && label.trim()) {
      addTaskEnter(label, timesLeft);
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
          onChange={labelChange}
          onKeyUp={sendToTasks}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={minutes}
          onChange={minChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={seconds}
          onChange={secChange}
        />
      </form>
    </header>
  );
};
export default NewTaskForm;

NewTaskForm.propTypes = {
  addTaskEnter: PropTypes.func,
};

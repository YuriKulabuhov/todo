import './NewTaskForm.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  labelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  minChange = (event) => {
    if (Number.isNaN(Number(event.target.value))) {
      // eslint-disable-next-line no-alert
      alert("It's not a number!");
    }
    this.setState({
      minutes: event.target.value,
    });
  };

  secChange = (event) => {
    if (Number.isNaN(Number(event.target.value))) {
      // eslint-disable-next-line no-alert
      alert("It's not a number!");
    }
    this.setState({
      seconds: event.target.value,
    });
  };

  sendToTasks = (event) => {
    const { label, minutes, seconds } = this.state;
    const timesLeft = Number(minutes) * 60 + Number(seconds);
    if (event.key === 'Enter' && label.trim()) {
      this.props.addTaskEnter(label, timesLeft);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.label}
            onChange={this.labelChange}
            onKeyUp={this.sendToTasks}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.minutes}
            onChange={this.minChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.seconds}
            onChange={this.secChange}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTaskEnter: PropTypes.func,
};

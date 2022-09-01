import './NewTaskForm.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };
  labelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };
  sendToTasks = (event) => {
    const { label } = this.state;
    if (event.key === 'Enter') {
      this.props.addTaskEnter(label);
      this.setState({ label: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.labelChange}
          onKeyUp={this.sendToTasks}
        />
      </header>
    );
  }
}

// NewTaskForm.propTypes = {
//   addPostEnter: PropTypes.func,
// };

/* eslint-disable react/no-access-state-in-setstate */
import './Task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { Component } from 'react';
import timerPart from '../Timerfunc/Timerfunc';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editForm: false,
      checkClass: this.props.tasks.completed ? 'completed' : '',
      editFormText: this.props.tasks.description,
      timer: null,
      timesLeft: this.props.tasks.timesLeft,
    };
  }

  timerChange = () => {
    clearInterval(this.state.timer);
    const timer = setInterval(() => {
      const count = this.state.timesLeft - 1;
      this.setState({
        timesLeft: count,
        timer,
      });
      if (count < 0) {
        clearInterval(timer);
        this.setState({
          timesLeft: this.props.tasks.timesLeft,
          timer: null,
        });
      }
    }, 1000);
    return this.setState({
      timer,
    });
  };

  timerStop = () => {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
    });
  };

  changeEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
      checkClass: !state.editForm ? 'editing' : '',
    }));
  };

  changeCheck = (clazzName = '') => {
    if (!this.props.tasks.completed) {
      clazzName = 'completed';
    }
    this.setState((state) => ({
      checkClass: clazzName,
    }));
  };

  render() {
    const timeLeft = this.state.timesLeft;
    const { description, created, completed } = this.props.tasks;
    const { destroyTask, completedTask, editTask } = this.props;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    return (
      <li className={this.state.checkClass}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => {
              completedTask(this.props.tasks.id);
              this.changeCheck();
            }}
          />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              {this.state.timer !== null ? (
                <button className="icon icon-pause" onClick={this.timerStop} />
              ) : (
                <button className="icon icon-play" onClick={this.timerChange} />
              )}
              {timerPart(minutes)}:{timerPart(seconds)}
            </span>
            <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.changeEditForm()} />
          <button className="icon icon-destroy" onClick={() => destroyTask(this.props.tasks)} />
        </div>
        {this.state.editForm && (
          <input
            type="text"
            className="edit"
            value={this.state.editFormText}
            onChange={(event) => {
              this.setState((state) => ({
                editFormText: event.target.value,
              }));
            }}
            autoFocus
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                editTask(e, this.props.tasks);
                this.changeEditForm();
              }
            }}
          />
        )}
      </li>
    );
  }
}
Task.propTypes = {
  tasks: PropTypes.object,
  destroyTask: PropTypes.func,
  completedTask: PropTypes.func,
  editTask: PropTypes.func,
};

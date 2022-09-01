import './Task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editForm: false,
      checkClass: this.props.tasks.completed ? 'completed' : '',
      editFormText: this.props.tasks.description,
    };
  }

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
    const { description, created, completed } = this.props.tasks;
    const { destroyTask, completedTask, editTask } = this.props;
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
            <span className="description">{description}</span>
            <span className="created">{`created ${formatDistanceToNow(created)} ago`}</span>
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

/* eslint-disable no-unused-expressions */
import './Task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import timerPart from '../Timerfunc/Timerfunc';

const Task = (props) => {
  const { description, created, completed, timesLeft, id } = props.tasks;
  const { destroyTask, completedTask, editTask } = props;
  const [editForm, setEditForm] = useState(false);
  const [checkClass, setCheckClass] = useState(completed ? 'completed' : '');
  const [editFormText, setEditFormText] = useState(description);
  const [isCouting, setIsCouting] = useState(false);
  const [timLeft, setTimLeft] = useState(timesLeft);
  const minutes = Math.floor(timLeft / 60);
  const seconds = timLeft - minutes * 60;

  useEffect(() => {
    if (timLeft === 0) {
      setIsCouting(false);
      setTimLeft(timesLeft);
    }
    const timerGo = setInterval(() => {
      isCouting && setTimLeft(() => (timLeft >= 1 ? timLeft - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timerGo);
    };
  }, [isCouting, timLeft, timesLeft]);

  const timerStart = () => {
    setIsCouting(true);
  };
  const timerStop = () => {
    setIsCouting(false);
  };

  const changeEditForm = () => {
    setEditForm(!editForm);
    setCheckClass(!editForm ? 'editing' : '');
  };

  const changeCheck = (clazzName = '') => {
    if (!completed) {
      clazzName = 'completed';
    }
    setCheckClass(clazzName);
  };

  return (
    <li className={checkClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {
            completedTask(id);
            changeCheck();
          }}
        />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            {isCouting ? (
              <button className="icon icon-pause" onClick={timerStop} />
            ) : (
              <button className="icon icon-play" onClick={timerStart} />
            )}
            {timerPart(minutes)}:{timerPart(seconds)}
          </span>
          <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={() => changeEditForm()} />
        <button className="icon icon-destroy" onClick={() => destroyTask(props.tasks)} />
      </div>
      {editForm && (
        <input
          type="text"
          className="edit"
          value={editFormText}
          onChange={(event) => {
            setEditFormText(event.target.value);
          }}
          autoFocus
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              editTask(e, props.tasks);
              changeEditForm();
            }
          }}
        />
      )}
    </li>
  );
};
export default Task;
Task.propTypes = {
  tasks: PropTypes.object,
  destroyTask: PropTypes.func,
  completedTask: PropTypes.func,
  editTask: PropTypes.func,
};

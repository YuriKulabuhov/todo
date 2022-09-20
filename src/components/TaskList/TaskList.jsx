import Task from '../Task/Task';
import './TaskList.css';
import PropTypes from 'prop-types';

function TaskList(props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => (
        <Task
          tasks={task}
          key={task.id}
          destroyTask={props.destroyTask}
          completedTask={props.completedTask}
          editTask={props.editTask}
          // runTimer={props.runTimer}
        />
      ))}
    </ul>
  );
}
export default TaskList;
TaskList.propTypes = {
  tasks: PropTypes.array,
  destroyTask: PropTypes.func,
  completedTask: PropTypes.func,
  editTask: PropTypes.func,
};

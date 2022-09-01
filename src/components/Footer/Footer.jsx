import './Footer.css';
import TaskFilter from '../TaskFilter/TaskFilter';
import PropTypes from 'prop-types';
const Footer = ({ destroyAllCompletedTask, countAllActiveTask, filter, setFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${countAllActiveTask()} items left`}</span>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <button
        className="clear-completed"
        onClick={() => {
          destroyAllCompletedTask();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
Footer.propTypes = {
  destroyAllCompletedTask: PropTypes.func,
  countAllActiveTask: PropTypes.func,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

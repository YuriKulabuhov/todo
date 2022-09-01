import './Footer.css';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter/TaskFilter';

function Footer({ destroyAllCompletedTask, countAllActiveTask, filter, setFilter }) {
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
}
export default Footer;
Footer.propTypes = {
  destroyAllCompletedTask: PropTypes.func,
  countAllActiveTask: PropTypes.func,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

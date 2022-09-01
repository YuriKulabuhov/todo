import './TaskFilter.css';
import PropTypes from 'prop-types';

const TaskFilter = ({ filter, setFilter }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  return (
    <ul className="filters">
      <li>
        {buttons.map(({ name, label }) => {
          const isActive = filter === name;
          const clazz = isActive ? 'selected' : '';
          return (
            <button
              className={clazz}
              key={name}
              onClick={() => {
                setFilter(name);
              }}
            >
              {label}
            </button>
          );
        })}
      </li>
    </ul>
  );
};
export default TaskFilter;
TaskFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

import React, { useState } from 'react';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1660499558000,
      description: 'Make a to-do list',
      timesLeft: 180,
      created: 1660499558000,
      completed: false,
    },
    {
      id: 1660585958000,
      description: 'Send to-do list',
      timesLeft: 4,
      created: 1660585958000,
      completed: false,
    },
  ]);
  const [filter, setFilter] = useState('all');

  const createNewTaskItem = (lable, times) => ({
    id: Date.now(),
    description: lable,
    timesLeft: times,
    created: Date.now(),
    completed: false,
  });
  const addTaskEnter = (label, minutes, seconds) => {
    const newTask = createNewTaskItem(label, minutes, seconds);
    setTasks([...tasks, newTask]);
  };

  const destroyTask = (taskItem) => {
    setTasks(tasks.filter((tsk) => tsk.id !== taskItem.id));
  };

  const setOptionTask = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];
    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  const completedTask = (id) => {
    const tasksResult = setOptionTask(tasks, id, 'completed');
    setTasks(tasksResult);
  };

  const editTask = (event, taskItem) => {
    setTasks((task) => {
      const idx = tasks.findIndex((el) => el.id === taskItem.id);
      const oldItem = tasks[idx];
      const newItem = { ...oldItem, description: event.target.value };
      const tasksResult = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)];
      return tasksResult;
    });
  };

  const destroyAllCompletedTask = () => {
    setTasks(tasks.filter((tsk) => !tsk.completed));
  };

  const countAllActiveTask = () => tasks.filter((tsk) => !tsk.completed).length;

  const filterTaskFunc = (tasksArray, filterCount) => {
    switch (filterCount) {
      case 'all':
        return tasksArray;
      case 'active':
        return tasksArray.filter((e) => !e.completed);
      case 'completed':
        return tasksArray.filter((e) => e.completed);
      default:
        return tasksArray;
    }
  };

  const filterChange = (filterCount) => {
    setFilter(filterCount);
  };

  const visibleItems = filterTaskFunc(tasks, filter);

  return (
    <section className="todoapp">
      <NewTaskForm addTaskEnter={addTaskEnter} />
      <section className="main">
        {tasks.length ? (
          <TaskList
            tasks={visibleItems}
            destroyTask={destroyTask}
            completedTask={completedTask}
            editTask={editTask}
          />
        ) : (
          <h2>There are no plans...</h2>
        )}
        <Footer
          destroyAllCompletedTask={destroyAllCompletedTask}
          countAllActiveTask={countAllActiveTask}
          filter={filter}
          setFilter={filterChange}
        />
      </section>
    </section>
  );
}
export default App;

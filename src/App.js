import React, { Component } from 'react';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.css';

export default class App extends Component {
  state = {
    tasks: [
      {
        id: 1660499558000,
        description: 'Make a to-do list',
        created: 1660499558000,
        completed: false,
      },
      {
        id: 1660585958000,
        description: 'Send to-do list',
        created: 1660585958000,
        completed: false,
      },
    ],
    filter: 'all',
  };

  addTaskEnter = (label) => {
    this.setState((state) => {
      const newTask = this.createNewTaskItem(label);
      return { tasks: [...state.tasks, newTask] };
    });
  };

  destroyTask = (taskItem) => {
    this.setState((state) => {
      const tasks = state.tasks.filter((tsk) => tsk.id !== taskItem.id);
      return { tasks };
    });
  };

  setOptionTask = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];
    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  completedTask = (id) => {
    this.setState((state) => {
      const tasks = this.setOptionTask(state.tasks, id, 'completed');
      return { tasks };
    });
  };

  editTask = (event, taskItem) => {
    this.setState((state) => {
      const idx = state.tasks.findIndex((el) => el.id === taskItem.id);
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, description: event.target.value };
      const tasks = [...state.tasks.slice(0, idx), newItem, ...state.tasks.slice(idx + 1)];
      return { tasks };
    });
  };

  destroyAllCompletedTask = () => {
    this.setState((state) => {
      const tasks = state.tasks.filter((tsk) => !tsk.completed);
      return { tasks };
    });
  };

  countAllActiveTask = () => this.state.tasks.filter((tsk) => !tsk.completed).length;

  filterTaskFunc = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((e) => !e.completed);
      case 'completed':
        return tasks.filter((e) => e.completed);
      default:
        return tasks;
    }
  };

  filterChange = (filter) => {
    this.setState({ filter });
  };

  createNewTaskItem = (lable) => ({
    id: Date.now(),
    description: lable,
    created: Date.now(),
    completed: false,
  });

  render() {
    const { tasks, filter } = this.state;
    const visibleItems = this.filterTaskFunc(tasks, filter);

    return (
      <section className="todoapp">
        <NewTaskForm addTaskEnter={this.addTaskEnter} />
        <section className="main">
          {this.state.tasks.length ? (
            <TaskList
              tasks={visibleItems}
              destroyTask={this.destroyTask}
              completedTask={this.completedTask}
              editTask={this.editTask}
            />
          ) : (
            <h2>There are no plans...</h2>
          )}
          <Footer
            destroyAllCompletedTask={this.destroyAllCompletedTask}
            countAllActiveTask={this.countAllActiveTask}
            filter={filter}
            setFilter={this.filterChange}
          />
        </section>
      </section>
    );
  }
}

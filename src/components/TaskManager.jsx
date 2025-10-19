import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from './Card';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized and get things done
        </p>
      </div>

      <Card className="mb-6">
        <form onSubmit={addTask} className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Button type="submit" disabled={!newTask.trim()}>
            Add Task
          </Button>
        </form>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex gap-2">
          {['all', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'secondary'}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {activeCount} active, {completedCount} completed
          </span>
          {completedCount > 0 && (
            <Button variant="danger" onClick={clearCompleted}>
              Clear Completed
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filter === 'completed' 
                ? 'No completed tasks yet' 
                : filter === 'active' 
                ? 'No active tasks - great job!' 
                : 'No tasks yet. Add one above!'}
            </p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteTask(task.id)}
                className="ml-4"
              >
                Delete
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
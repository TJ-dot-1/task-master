import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to TaskMaster
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Your all-in-one solution for task management and productivity
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/tasks">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/users">
            <Button variant="secondary" size="lg">
              Browse Users
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Task Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create, organize, and track your tasks with ease using our intuitive interface.
          </p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-4">
            🎨
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Dark Mode
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Switch between light and dark themes for comfortable viewing in any environment.
          </p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-4">
            ⚡
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Fast & Responsive
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Built with modern technologies for a smooth and efficient user experience.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
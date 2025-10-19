import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskManager from './components/TaskManager';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import Button from './components/Button';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/users" element={<UserList />} />
            <Route path="layout" element={<Layout />} />
            <Route path="/button" element={<Button />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="card" element={<Card />} />
            <Route path="foter" element={<Footer />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
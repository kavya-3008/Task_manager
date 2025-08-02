import React from 'react';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-8">
        <ProjectList />
      </div>
    </div>
  );
};

export default Dashboard;
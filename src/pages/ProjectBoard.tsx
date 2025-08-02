import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Navbar from '../components/Navbar';
import KanbanBoard from '../components/KanbanBoard';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const ProjectBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, getProjectTasks } = useData();

  const project = projects.find(p => p.id === id);
  const tasks = id ? getProjectTasks(id) : [];

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">{todoTasks}</div>
                  <div className="text-xs text-gray-400">To Do</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
                  <div className="text-xs text-gray-400">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{doneTasks}</div>
                  <div className="text-xs text-gray-400">Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <KanbanBoard projectId={project.id} />
      </div>
    </div>
  );
};

export default ProjectBoard;
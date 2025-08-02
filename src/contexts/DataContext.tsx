import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  createProject: (name: string) => Project;
  deleteProject: (id: string) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getProjectTasks: (projectId: string) => Task[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const storedProjects = JSON.parse(localStorage.getItem(`projects-${user.id}`) || '[]');
      const storedTasks = JSON.parse(localStorage.getItem(`tasks-${user.id}`) || '[]');
      setProjects(storedProjects);
      setTasks(storedTasks);
    } else {
      setProjects([]);
      setTasks([]);
    }
  }, [user]);

  const saveProjects = (newProjects: Project[]) => {
    if (user) {
      localStorage.setItem(`projects-${user.id}`, JSON.stringify(newProjects));
      setProjects(newProjects);
    }
  };

  const saveTasks = (newTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`tasks-${user.id}`, JSON.stringify(newTasks));
      setTasks(newTasks);
    }
  };

  const createProject = (name: string): Project => {
    if (!user) throw new Error('User not authenticated');
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      ownerId: user.id,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    return newProject;
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    const updatedTasks = tasks.filter(t => t.projectId !== id);
    saveProjects(updatedProjects);
    saveTasks(updatedTasks);
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveTasks(updatedTasks);
  };

  const getProjectTasks = (projectId: string): Task[] => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const value = {
    projects,
    tasks,
    createProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    getProjectTasks
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useData, Task } from '../contexts/DataContext';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { Plus } from 'lucide-react';

interface KanbanBoardProps {
  projectId: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const { getProjectTasks, updateTask } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<'todo' | 'in-progress' | 'done'>('todo');

  useEffect(() => {
    setTasks(getProjectTasks(projectId));
  }, [projectId, getProjectTasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as 'todo' | 'in-progress' | 'done';
    updateTask(draggableId, { status: newStatus });
    
    // Update local state immediately for smooth UX
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggableId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 border-gray-300' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 border-blue-300' },
    { id: 'done', title: 'Done', color: 'bg-green-50 border-green-300' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleAddTask = (column: 'todo' | 'in-progress' | 'done') => {
    setActiveColumn(column);
    setIsAddModalOpen(true);
  };

  const refreshTasks = () => {
    setTasks(getProjectTasks(projectId));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`flex-shrink-0 w-80 ${column.color} rounded-xl border-2 border-dashed p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {column.title}
                  <span className="ml-2 bg-white px-2 py-1 rounded-full text-sm text-gray-600">
                    {getTasksByStatus(column.id).length}
                  </span>
                </h3>
                <button
                  onClick={() => handleAddTask(column.id as 'todo' | 'in-progress' | 'done')}
                  className="p-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-white/50 rounded-lg' : ''
                    }`}
                  >
                    {getTasksByStatus(column.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`transform transition-transform duration-200 ${
                              snapshot.isDragging ? 'rotate-2 scale-105' : ''
                            }`}
                          >
                            <TaskCard task={task} onUpdate={refreshTasks} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isAddModalOpen && (
        <AddTaskModal
          projectId={projectId}
          initialStatus={activeColumn}
          onClose={() => setIsAddModalOpen(false)}
          onTaskCreated={refreshTasks}
        />
      )}
    </>
  );
};

export default KanbanBoard;
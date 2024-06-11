import React, { useState, useEffect } from 'react';
import Sidebar from "../Component/Sidebar";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ModalAddTask from '../Component/Modal/ModalAddTask';
import axios from '../axiosConfig';

const Task = () => {
  const [data, setData] = useState({ tasks: {}, columns: {}, columnOrder: [] });
  const [showModal, setShowModal] = useState(false);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODExNzYyNiwiZXhwIjoxNzE4MjA0MDI2fQ.FcyOdlj349Dt8fN0luVmGTG3i-NJ2BQRR_JPlJFp4c4";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const tasks = response.data.reduce((acc, task) => {
          acc[task._id] = task;
          return acc;
        }, {});

        const columns = {
          'column-1': { id: 'column-1', title: 'Backlog', taskIds: [] },
          'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
          'column-3': { id: 'column-3', title: 'In Review', taskIds: [] },
          'column-4': { id: 'column-4', title: 'Done', taskIds: [] },
        };

        response.data.forEach(task => {
          if (task.status === 'available') {
            columns['column-1'].taskIds.push(task._id);
          } else if (task.status === 'in_progress') {
            columns['column-2'].taskIds.push(task._id);
          } else if (task.status === 'in_review') {
            columns['column-3'].taskIds.push(task._id);
          } else if (task.status === 'done') {
            columns['column-4'].taskIds.push(task._id);
          }
        });

        setData({ tasks, columns, columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'] });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post('/tasks', task, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const createdTask = response.data;

      const newState = {
        ...data,
        tasks: {
          ...data.tasks,
          [createdTask._id]: createdTask,
        },
        columns: {
          ...data.columns,
          'column-1': {
            ...data.columns['column-1'],
            taskIds: [...data.columns['column-1'].taskIds, createdTask._id],
          },
        },
      };

      setData(newState);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-screen p-4 bg-gray-100 w-[85%]">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <div key={column.id} className="flex flex-col w-1/4 p-2">
                <h2 className="mb-2 text-lg font-semibold">{column.title}</h2>
                {columnId === 'column-1' && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mb-2 px-4 py-2 bg-purple text-white rounded"
                  >
                    Add Task
                  </button>
                )}
                <Droppable droppableId={column.id}>
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex-1 p-2 bg-white rounded shadow"
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {provided => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="p-4 mb-2 bg-gray-50 rounded shadow"
                            >
                              <h3 className="text-sm text-left font-bold">{task.title}</h3>
                              <hr className="h-0.5 border-t-1 border-gray/30" />
                              <p className="text-xs text-left">Assigned: {task.assign}</p>
                              <p className="text-xs text-left">Due Date: {new Date(task.tenggat_waktu).toLocaleString()}</p>
                              <p className="text-xs text-left">Description: {task.deskripsi}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      <ModalAddTask
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default Task;
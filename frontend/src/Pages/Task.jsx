import { useState } from "react";
import Sidebar from "../Component/Sidebar"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Task Title', assigned: 'John Doe', dueDate: '04/13/2020' },
    'task-2': { id: 'task-2', title: 'Task Title', assigned: 'Jane Doe', dueDate: '04/13/2020' },
    'task-3': { id: 'task-3', title: 'Task Title', assigned: 'John Doe', dueDate: '04/13/2020' },
    'task-4': { id: 'task-4', title: 'Task Title', assigned: 'John Doe', dueDate: '04/13/2020' },
    'task-5': { id: 'task-5', title: 'Task Title', assigned: 'John Doe', dueDate: '04/13/2020' },
    'task-6': { id: 'task-6', title: 'Task Title', assigned: 'John Doe', dueDate: '04/13/2020' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: ['task-1'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-2', 'task-3', 'task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'In Review',
      taskIds: ['task-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: ['task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const Task = () => {
  const [data, setData] = useState(initialData);

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
                <Droppable droppableId={column.id}>
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex-1 p-2 bg-white rounded shadow"
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {provided => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="p-4 mb-2 bg-gray-50 rounded shadow"
                            >
                              <h3 className="text-sm text-left font-bold">{task.title}</h3>
                              <hr class=" h-0.5 border-t-1 border-gray/30" />
                              <p className="text-xs text-left">Assigned: {task.assigned}</p>
                              <p className="text-xs text-left">Due Date: {task.dueDate}</p>
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
    </div>
  );
};

export default Task;

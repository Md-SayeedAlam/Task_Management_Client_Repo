import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";


const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", description: "This is task 1", category: "To-Do" },
    { id: "2", title: "Task 2", description: "This is task 2", category: "In Progress" },
    { id: "3", title: "Task 3", description: "This is task 3", category: "Done" },
    { id: "4", title: "Task 4", description: "This is task 4", category: "Done" }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    setTasks((prev) => {
      const updatedTasks = [...prev];
      const oldIndex = prev.findIndex((task) => task.id === active.id);
      const newIndex = prev.findIndex((task) => task.id === over.id);
      const [movedTask] = updatedTasks.splice(oldIndex, 1);
      movedTask.category = updatedTasks[newIndex]?.category || movedTask.category;
      updatedTasks.splice(newIndex, 0, movedTask);
      return updatedTasks;
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {['To-Do', 'In Progress', 'Done'].map(category => (
            <TaskColumn key={category} title={category} tasks={tasks.filter(t => t.category === category)} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TasksPage;

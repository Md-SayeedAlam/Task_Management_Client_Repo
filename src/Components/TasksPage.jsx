import { useState, useEffect, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./AuthProvider/AuthProvider";

const TasksPage = () => {
  const {user} = useContext(AuthContext)
  const [tasks, setTasks] = useState([]);

  // Fetching tasks using React Query
  const { data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      // const res = await axios.get(`http://localhost:5000/tasks/${user?.email}`);
      // console.log(res.data)
      return res.data;
    },
  });

  // Update tasks when data changes
  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prev) => {
      const updatedTasks = [...prev];
      const oldIndex = prev.findIndex((task) => task.id === active.id);
      const newIndex = prev.findIndex((task) => task.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const [movedTask] = updatedTasks.splice(oldIndex, 1);
      movedTask.category = updatedTasks[newIndex]?.category || movedTask.category;
      updatedTasks.splice(newIndex, 0, movedTask);

      return updatedTasks;
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskColumn key={category} title={category} refetch={refetch} tasks={tasks.filter((t) => t.category === category)} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TasksPage;

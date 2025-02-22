import { useState, useEffect, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./AuthProvider/AuthProvider";

const TasksPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks using React Query
  const { data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://task-management-application-server-theta.vercel.app/tasks");
      return res.data;
    },
  });

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

 

 
  
  

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return; // যদি ড্রপ না হয়, কিছু করা হবে না

    const draggedTaskId = active.id; // যেটা ড্র্যাগ করা হয়েছে
    const newCategory = over.id; // যেখান থেকে ড্রপ করা হয়েছে (নতুন ক্যাটাগরি)

    console.log("Dragged Task ID:", draggedTaskId);
    console.log("New Category:", newCategory);

    // **Step 1: লোকাল স্টেটে ক্যাটাগরি আপডেট করা**
    setTasks((prev) =>
        prev.map((task) =>
            task._id === draggedTaskId ? { ...task, category: newCategory } : task
        )
    );

    
    // **Step 2: ডাটাবেজে ক্যাটাগরি আপডেট করা**
    try {
        const res = await axios.put(`https://task-management-application-server-theta.vercel.app/tasks/category/${draggedTaskId}`, {
            category: newCategory, // ✅ সঠিকভাবে ক্যাটাগরি আপডেট হচ্ছে
        });

        if (res.data.modifiedCount > 0) {
            console.log("Task category updated successfully!");
            refetch(); // ✅ সার্ভার থেকে নতুন ডাটা ফেচ করুন
        }
    } catch (error) {
        console.error("Error updating task category:", error);
    }
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

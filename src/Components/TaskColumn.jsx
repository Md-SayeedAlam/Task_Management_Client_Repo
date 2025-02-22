import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";


const TaskColumn = ({ title, tasks, refetch }) => {

  // const { setNodeRef } = useDroppable({ id: title });

  const { setNodeRef } = useDroppable({ id: title });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg shadow-md w-full lg:w-1/3 ">
      <h2 className="text-lg font-bold text-black mb-2">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} refetch={refetch} />
      ))}
    </div>
  );
};

export default TaskColumn;

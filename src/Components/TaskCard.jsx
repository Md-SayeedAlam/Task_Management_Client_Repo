import { useDraggable } from "@dnd-kit/core";
import axios from "axios";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TaskCard = ({ task ,refetch }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };


 
  const handleDelete = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/tasks/${task._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const getDueDateColor = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - currentDate;

    if (diffTime < 0) {
      return "bg-red-600"; // Overdue tasks in red
    } else if (diffTime < 24 * 60 * 60 * 1000) {
      return "bg-yellow-500"; // Due within a day in yellow
    } else {
      return "bg-green-500"; // On time in green
    }
  };

 



  return (
    <div className="flex justify-center items-center gap-5  ">
      <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-3 rounded-lg shadow-md mb-2 cursor-grab "
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-600">{task.Timestamp}</p>
      <div className={`p-2 text-white rounded ${getDueDateColor(task.dueDate)}`}>
          {`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
        </div>
    </div>
    <div>
      <button onClick={()=>handleDelete(task)} className="text-red-600 btn text-xl"><GoTrash /></button>

      <Link to={`/updateTask/${task._id}`} ><button  className="text-red-600 btn text-xl"><CiEdit /></button></Link>
    </div>
    </div>
  );
};

export default TaskCard;

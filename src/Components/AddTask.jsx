import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider/AuthProvider";

const AddTask = () => {
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    // const dueDates = new Date(data.date).getTime() - new Date().getTime();
    const dueDates = new Date(data.date).getTime()

    const taskInfo = {
      title: data.name,
      description: data.description,
      // Timestamp: data.date,
      Timestamp: new Date().toLocaleDateString(),
      
      dueDate : dueDates,
      category: "To-Do",
      addedBy:user?.email,
    };

    axios.post('https://task-management-application-server-theta.vercel.app/tasks', taskInfo)
      .then(res => {
        // console.log(res.data);
        
        if (res.data.insertedId) {
            reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task Added Successfully",
            showConfirmButton: false,
            timer: 1500
          });

          navigate('/taskPage');
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center  px-4">
      <div className=" w-full max-w-lg shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center  mb-6">
          Add A Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block  font-medium">Title</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter Task Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.name && <span className="text-red-600 text-sm">Title is required</span>}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="block  font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter Task Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.description && <span className="text-red-600 text-sm">Description is required</span>}
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block  font-medium">Due Date</label>
            <input
              {...register("date", { required: true })}
              defaultValue={new Date().toISOString().split("T")[0]}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.date && <span className="text-red-600 text-sm">Date is required</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm();

    // Fetch Task Data
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["task", params.id],
        queryFn: async () => {
            const res = await axios.get(`https://task-management-application-server-theta.vercel.app/tasks/${params.id}`);
            
            return res.data;
            
        }
    });


    const task = Array.isArray(tasks) && tasks.length > 0 ? tasks[0] : {};


    // **Set default values when task data is available**
    useEffect(() => {
        if (task) {
            reset({
                name: task.title || "", 
                description: task.description || "",
                date: task.Timestamp || "",
                category: task.category || "To-Do"
            });
        }
    }, [task, reset]);



    // Handle Form Submission
    const onSubmit = (data) => {
        // console.log("Updated Task:", data);
        
        const updatedTask = {
            title: data.name,
            description: data.description,
            Timestamp: data.date,
            category: data.category,
        };

        axios.put(`https://task-management-application-server-theta.vercel.app/tasks/${params.id}`, updatedTask)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task Updated Successfully",
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
                    Update Task
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="block  font-medium">Title</label>
                        <input
                            {...register("name", { required: "Title is required" })}
                            type="text"
                            defaultValue={task.title}
                            placeholder="Enter Task Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="block  font-medium">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Enter Task Description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Category Input */}
                    <div className="space-y-2">
                        <label className="block  font-medium">Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        {errors.category && <span className="text-red-600 text-sm">{errors.category.message}</span>}
                    </div>

                    {/* Date Input */}
                    <div className="space-y-2">
                        <label className="block font-medium">Date</label>
                        <input
                            {...register("date", { required: "Date is required" })}
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.date && <span className="text-red-600 text-sm">{errors.date.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full btn bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;

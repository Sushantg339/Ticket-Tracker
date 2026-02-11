import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/ticket/${id}`);
        reset(res.data); 
      } catch (error) {
        setServerError("Failed to load ticket");
      }
    };
    fetchTicket();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const res = await api.patch(`/ticket/${id}`, data);
      console.log(res)
      navigate("/"); 
    } catch (error) {
      setServerError("Failed to update ticket");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Update Ticket</h2>

        {serverError && (
          <p className="text-red-600 text-sm text-center">
            {serverError}
          </p>
        )}

        <div>
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            {...register("description", {
              required: "Description is required"
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            className="w-full border p-2 rounded"
            {...register("status")}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Priority</label>
          <select
            className="w-full border p-2 rounded"
            {...register("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Ticket"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTicket;

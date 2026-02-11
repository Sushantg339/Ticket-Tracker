import { useForm } from "react-hook-form";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/ticket", data);
      console.log(res)
      reset();
      navigate('/')
    } catch (error) {
      console.error("Create Ticket Error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Create Ticket
        </h2>

        <div>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring"
            placeholder="Title"
            {...register("title", {
              required: "Title is required"
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            className="w-full border p-2 rounded focus:outline-none focus:ring"
            placeholder="Description"
            {...register("description", {
              required: "Description is required"
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <select
            className="w-full border p-2 rounded"
            {...register("priority", {
              required: true
            })}
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
          {isSubmitting ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
     

      const response = await fetch(`/api/user/deleteuser/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error message from the response
        throw new Error(errorMessage || "Network response was not ok");
      }

      // Redirect to a different page after successful deletion
      navigate("/"); // Change this to the desired redirection path

    } catch (error) {
      setError(error.message || "Error deleting user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold my-7">Delete User</h1>
      <p>Are you sure you want to delete this user?</p>
      <button
        disabled={loading}
        onClick={handleDelete}
        className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Deleting...." : "Delete User"}
      </button>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default DeleteUser;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/user/updateuser/${id}`, {
        method: "PUT", // Use PUT or PATCH based on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error message from the response
        throw new Error(errorMessage || "Network response was not ok");
      }

      // Redirect to the user details page after a successful update
      navigate(`/View-detail/${id}`);

    } catch (error) {
      setError(error.message || "Error updating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold my-7">Update User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3 m-2 w-full max-w-md">
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          required
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          required
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="+91 - 87373465632"
          required
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Update User"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/user/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setSuccessMessage("Details added successfully!");
        setErrorMessage(null);

        // Clear the form fields after successful submission
        setFormData({
          username: "",
          email: "",
          phone: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to add details. Please try again.");
        setSuccessMessage(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold my-7">Add Details</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-3 m-2 w-full max-w-md"
      >
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          required
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          required
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="9849748"
          required
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Add Details"}
        </button>
      </form>
    </div>
  );
}

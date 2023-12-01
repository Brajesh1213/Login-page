import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      
      if (data.success === false) {
        setError(true);
        return;
      }
      
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">Sign-in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pd-3 m-2">
        {/* <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          required
          id="username"
          onChange={handleChange}
        /> */}
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          required
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          required
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading....' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 ml-2">
        <p>
          Do not have an account? <Link to="/sign-up"><span className="text-blue-500">Sign up</span></Link>
        </p>
      </div>
      <div><p className="text-red-500 mt-5">{error && 'Something went wrong!'}</p></div>
    </div>
  );
}

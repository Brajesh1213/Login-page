import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      // console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pd-3 m-2 w-full max-w-md">
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
          {loading ? "Loading...." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5 ml-2">
        <p>
          Do not have an account?{" "}
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
      <div>
        <p className="text-red-500 mt-5">{error? error.message || "Something went wrong!":""}</p>
      </div>
    </div>
  );
}

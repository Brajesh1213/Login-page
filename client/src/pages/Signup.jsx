import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  Select,
  MenuItem,
} from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    hearAbout: "",
    state: "",
    city: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(true);
        return;
      }
      navigation("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const citiesByState = {
    Bihar: ["Patna", "Ara", "Bikramganj"],
    up: ["gorakhpur", "Agra"],
    Mp: ["Bhopal", "Morena"],
    Goa: ["Goa city"],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold my-7">Sign-up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-3 m-2 w-full max-w-md"
      >
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
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          required
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="phone"
          required
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          value={formData.state}
          onChange={
            (e) =>
            setFormData({ ...formData, state: e.target.value, city: "" })
          }
        >
          <option value="">Select State</option>
          <option value="Bihar">Bihar</option>
          <option value="up">up</option>
          <option value="Mp">MP</option>
          <option value="Goa">Goa</option>
        </select>
        {formData.state && (
          <select
            value={formData.city}
            onChange={
              (e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="">Select City</option>
            {citiesByState[formData.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
        <RadioGroup
          row
          value={formData.gender}
          onChange={
            (e) => setFormData({ ...formData, gender: e.target.value })
            }
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>

        <RadioGroup
          row
          value={formData.hearAbout}
          onChange={
            
            (e) =>
            setFormData({ ...formData, hearAbout: e.target.value })
          }
        >
          <FormControlLabel
            value="LinkedIn"
            control={<Radio />}
            label="LinkedIn"
          />
          <FormControlLabel
            value="Friends"
            control={<Radio />}
            label="Friends"
          />
          <FormControlLabel
            value="job-portal"
            control={<Radio />}
            label="Job Portal"
          />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sign up"}
        </button>
{/*         <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5 ml-2">
        <p>
          Have an account?{" "}
          <Link to="/sign-in" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
      <div>
        <p className="text-red-500 mt-5">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await registerUser(formData);

      alert(response.data.message);

      window.location.href = "/dashboard";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbf8] text-slate-800 flex flex-col">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-14 py-5 bg-white border-b border-green-100">

        <Link to="/" className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">
            ♡
          </div>

          <h1 className="text-2xl font-bold">
            Food<span className="text-green-600">Bridge</span>
          </h1>

        </Link>


        <div className="flex items-center gap-4">

          <span className="hidden sm:block text-sm text-gray-500">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="border border-green-600 text-green-700 px-5 py-2 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* REGISTER PAGE */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">

        <div className="w-full max-w-md">

          {/* HEADING */}
          <div className="text-center mb-10">

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">

              Create an Account

            </h1>

          </div>


          {/* REGISTER FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* FULL NAME */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your full name"
                onChange={handleChange}
                required
                className="w-full bg-white px-5 py-4 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition"
              />

            </div>


            {/* EMAIL */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email address"
                onChange={handleChange}
                required
                className="w-full bg-white px-5 py-4 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition"
              />

            </div>


            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Password

              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                  className="w-full bg-white px-5 py-4 pr-16 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-semibold hover:text-green-600"
                >

                  {showPassword ? "Hide" : "Show"}

                </button>

              </div>

              <p className="text-xs text-gray-400 mt-2">
                Use a password that is at least 6 characters long.
              </p>

            </div>


            {/* ROLE */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                I want to join as

              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-white px-5 py-4 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition"
              >

                <option value="donor">
                  Food Donor
                </option>

                <option value="volunteer">
                  Volunteer
                </option>

              </select>

            </div>


            


            {/* TERMS */}
            <label className="flex items-start gap-3 text-sm text-gray-500 cursor-pointer">

              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 accent-green-600"
              />

              <span>
                I agree to use FoodBridge responsibly and provide
                accurate information.
              </span>

            </label>


            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-xl font-bold text-lg shadow-md transition"
            >

              {loading
                ? "Creating Account..."
                : "Create FoodBridge Account →"}

            </button>

          </form>


          {/* LOGIN LINK */}
          <div className="text-center mt-10">

            <p className="text-gray-500">

              Already have an account?

              <Link
                to="/login"
                className="text-green-600 font-bold ml-2 hover:underline"
              >

                Login here

              </Link>

            </p>

          </div>


          {/* BOTTOM TEXT */}
          <p className="text-center text-xs text-gray-400 mt-7">

            Share Food • Share Happiness

          </p>

        </div>

      </main>


      {/* FOOTER */}
      <footer className="bg-white border-t border-green-100 px-6 py-6 text-center">

        <p className="text-gray-400 text-sm">

          © 2026 FoodBridge. Smart Food Donation Platform.

        </p>

      </footer>

    </div>
  );
}
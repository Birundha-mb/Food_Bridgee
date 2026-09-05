import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

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

          <h1 className="text-2xl font-bold">
            Food<span className="text-green-600">Bridge</span>
          </h1>

        </Link>


        <div className="flex items-center gap-4">

          <span className="hidden sm:block text-sm text-gray-500">
            New to FoodBridge?
          </span>

          <Link
            to="/register"
            className="border border-green-600 text-green-700 px-5 py-2 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* LOGIN PAGE */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">


          {/* HEADING */}
          <div className="text-center mb-10">

            <h1 className="text-4xl md:text-4xl font-bold text-slate-900">

              Login to FoodBridge

            </h1>

          </div>


          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >


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

              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-bold text-slate-700">

                  Password

                </label>


              </div>


              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
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

            </div>


            {/* REMEMBER */}
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">

              <input
                type="checkbox"
                className="w-4 h-4 accent-green-600"
              />

              Remember me

            </label>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-xl font-bold text-lg shadow-md transition"
            >

              {loading ? "Logging in..." : "Login"}

            </button>

          </form>


          {/* REGISTER */}
          <div className="text-center mt-10">

            <p className="text-gray-500">

              Don't have an account?

              <Link
                to="/register"
                className="text-green-600 font-bold ml-2 hover:underline"
              >

                Create an account

              </Link>

            </p>

          </div>

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
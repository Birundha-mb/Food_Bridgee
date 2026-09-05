import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../services/statsService";
import { loginUser } from "../services/authService";

export default function Home() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalVolunteers: 0,
    peopleFed: 0,
    foodSaved: 0,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();

        setStats({
          totalDonations: response.data.totalDonations || 0,
          totalVolunteers: response.data.totalVolunteers || 0,
          peopleFed: response.data.peopleFed || 0,
          foodSaved: response.data.foodSaved || 0,
        });
      } catch (error) {
        console.log("Unable to load statistics");
      }
    };

    fetchStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm px-6 md:px-12 py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          FoodBridge
        </h1>

        <div className="flex items-center gap-4">
          <a
            href="#login"
            className="text-green-700 font-semibold hover:text-green-900"
          >
            Login
          </a>

          <Link
            to="/register"
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-green-600 font-semibold mb-3">
              CONNECT • DONATE • DELIVER • IMPACT
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              From Surplus Food
              <span className="text-green-600">
                {" "}to Someone's Plate
              </span>
            </h2>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              FoodBridge connects food donors, volunteers and people in need
              to reduce food waste and make sure surplus food reaches someone
              who needs it.
            </p>

            <div className="mt-8">
              <a href="#login">
                <button
                  type="button"
                  className="bg-green-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Donate Food
                </button>
              </a>
            </div>
          </div>

          {/* WELCOME BACK LOGIN */}
          <div
            id="login"
            className="w-full max-w-[450px] mx-auto bg-white p-8 md:p-10 rounded-[30px] shadow-2xl border border-green-100"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h3>

              <p className="text-gray-500 mt-2">
                Login to continue to FoodBridge
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* EMAIL */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* REGISTER */}
              <div className="text-center pt-2">
                <p className="text-gray-500">
                  New user?{" "}
                  <Link
                    to="/register"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How FoodBridge Works
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            From surplus food to someone's plate in four steps —
            FoodBridge makes food donation simple, transparent and impactful.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">

            <div className="p-6 rounded-2xl bg-green-50">
              <div className="text-4xl mb-4">🍱</div>
              <h3 className="font-bold text-xl text-gray-800">
                1. Donate
              </h3>
              <p className="text-gray-600 mt-2">
                Donors list their surplus food with important details.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-green-50">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-xl text-gray-800">
                2. Connect
              </h3>
              <p className="text-gray-600 mt-2">
                Volunteers and organizations connect with available donations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-green-50">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-xl text-gray-800">
                3. Deliver
              </h3>
              <p className="text-gray-600 mt-2">
                Food is collected and delivered to people who need it.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-green-50">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-bold text-xl text-gray-800">
                4. Impact
              </h3>
              <p className="text-gray-600 mt-2">
                Every donation helps reduce food waste and fight hunger.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="px-6 md:px-12 py-16 bg-green-700 text-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Impact
            </h2>

            <p className="mt-3 text-green-100">
              Real-time statistics from the FoodBridge platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">🍱</div>
              <h3 className="text-3xl font-bold">
                {stats.totalDonations}
              </h3>
              <p className="text-green-100 mt-2">
                Total Donations
              </p>
            </div>

            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-3xl font-bold">
                {stats.totalVolunteers}
              </h3>
              <p className="text-green-100 mt-2">
                Volunteers
              </p>
            </div>

            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-3xl font-bold">
                {stats.peopleFed}
              </h3>
              <p className="text-green-100 mt-2">
                People Fed
              </p>
            </div>

            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">♻️</div>
              <h3 className="text-3xl font-bold">
                {stats.foodSaved}
              </h3>
              <p className="text-green-100 mt-2">
                Food Saved
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <h2 className="text-xl font-bold text-green-400">
          FoodBridge
        </h2>

        <p className="text-gray-400 mt-2">
          Connecting surplus food with people in need.
        </p>

        <p className="text-gray-500 text-sm mt-4">
          © 2026 FoodBridge. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

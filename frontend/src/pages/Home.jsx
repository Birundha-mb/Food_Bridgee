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
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await getStats();

        setStats(response.data);

      } catch (error) {

        console.log("Error loading statistics:", error);

      }

    };

    fetchStats();

  }, []);
  return (
    <div className="min-h-screen bg-[#f7fbf8] text-slate-800">

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


        {/* NAVIGATION */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">

          <a
            href="#home"
            className="hover:text-green-600 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-green-600 transition"
          >
            About
          </a>

          <a
            href="#how"
            className="hover:text-green-600 transition"
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="hover:text-green-600 transition"
          >
            Contact
          </a>

        </div>


        {/* LOGIN / REGISTER */}
        <div className="flex gap-3">

          <Link to="/register">

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition">

              Register

            </button>

          </Link>

        </div>

      </nav>


      {/* HERO SECTION */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-6 md:px-14 py-14 md:py-20"
      >

        <div className="grid md:grid-cols-2 items-center gap-12">


          {/* LEFT SIDE */}
          <div>

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">

              🌱 One Donation, Many Smiles

            </div>


            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">

              Share Food

              <br />

              <span className="text-green-600">
                Share Happiness
              </span>

            </h1>


            <p className="text-lg md:text-xl text-slate-600 mt-7 leading-relaxed max-w-xl">

              Donate surplus food, connect with volunteers,
              and help deliver meals to people who need them.

            </p>


            <div className="flex flex-wrap gap-4 mt-9">

              <Link to="/login">

                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition">

                  Donate Food

                </button>

              </Link>


              <Link to="/register">

                <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-bold transition">

                  Become a Volunteer

                </button>

              </Link>

            </div>


            {/* REAL STATISTICS */}

<div className="flex flex-wrap gap-8 mt-12">

  <div className="flex items-start gap-3">

    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOuUBJ9VEQdkBW2nYK8We1nP8n8WZw7WIoJzPqpxSHg&s=10"
        alt="Donations"
        className="w-6 h-6 object-contain"
      />
    </div>

    <div>
      <h3 className="text-2xl font-bold text-green-700">
        {stats.totalDonations}+
      </h3>

      <p className="text-sm text-gray-500">
        Total <br /> Donations
      </p>
    </div>

  </div>


  <div className="flex items-start gap-3">

    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6MGRXBxnK8QxC2gaHYXCNncxZ0_GKx-7K9yywSRbLTA&s=10"
        alt="Volunteers"
        className="w-6 h-6 object-contain"
      />
    </div>

    <div>
      <h3 className="text-2xl font-bold text-green-700">
        {stats.totalVolunteers}+
      </h3>

      <p className="text-sm text-gray-500">
        Active <br /> Volunteers
      </p>
    </div>

  </div>


  <div className="flex items-start gap-3">

    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEP56Sh9JuU7wQCgBtNim_vtQKN26AruBr6oeObxEomA&s"
        alt="People Fed"
        className="w-6 h-6 object-contain"
      />
    </div>

    <div>
      <h3 className="text-2xl font-bold text-green-700">
        {stats.peopleFed}+
      </h3>

      <p className="text-sm text-gray-500">
        Estimated <br /> People Fed
      </p>
    </div>

  </div>

</div>

          </div>


          {/* RIGHT SIDE - LOGIN CARD */}
          <div className="flex justify-center">

            <div className="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[30px] shadow-2xl border border-green-100">

              <div className="text-center mb-8">

                


                <h2 className="text-3xl font-bold text-slate-800">

                  Welcome Back

                </h2>


                <p className="text-gray-500 mt-2">

                  Be the Reason Someone Smiles Today!

                </p>

              </div>


              <div className="flex flex-col gap-5">

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Email Address

                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-green-500"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Password

                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-green-500"
                  />

                </div>


                {/* GOES TO REAL LOGIN PAGE */}
                <Link to="/login">

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-md transition">

                    Login

                  </button>

                </Link>


                <div className="text-center pt-2">

                  <p className="text-gray-500">

                    New user?

                    <Link
                      to="/register"
                      className="text-green-600 font-bold ml-2 hover:underline"
                    >

                      Create an account

                    </Link>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-white py-16 px-6 md:px-14"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            {/* <p className="text-green-600 font-bold mb-3">

              SIMPLE PROCESS

            </p> */}


            <h2 className="text-4xl md:text-5xl font-bold">

              How It Works

            </h2>


            <p className="text-gray-500 mt-4 text-lg">

              From surplus food to someone’s plate, FoodBridge makes every donation count. <br/>
  In four simple steps, donors, administrators and volunteers work together <br/>
  to collect and deliver food to people who need it the most

            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


            <div className="bg-[#f8fcf9] border border-green-100 rounded-3xl p-7 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300">

              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                1️⃣
              </div>

              <h3 className="text-xl font-bold">
                Donate Food
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Share details about your surplus food, including the food type, quantity, pickup time and location. Your donation request is then submitted to FoodBridge
              </p>

            </div>


            <div className="bg-[#f8fcf9] border border-green-100 rounded-3xl p-7 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300">

              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                2️⃣
              </div>

              <h3 className="text-xl font-bold">
                Verify & Match
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                The donation details are reviewed to ensure the food is suitable for sharing. Once verified, the request is matched with an available nearby volunteer
              </p>

            </div>


            <div className="bg-[#f8fcf9] border border-green-100 rounded-3xl p-7 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300">

              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                3️⃣
              </div>

              <h3 className="text-xl font-bold">
                Volunteer Pickup
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                A volunteer accepts the donation request and receives the pickup details. They collect the food from the donor and prepare it for delivery
              </p>

            </div>


            <div className="bg-[#f8fcf9] border border-green-100 rounded-3xl p-10 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300">

              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                4️⃣
              </div>

              <h3 className="text-xl font-bold">
                Food Delivered
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                The collected food is delivered to people or communities in need. The donation status is updated so the donor can track its journey and impact
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ADVANCED FEATURES */}
      <section
        id="about"
        className="py-20 px-6 md:px-14 bg-white py-16 px-6 md:px-14"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-[35px] p-10 md:p-14 text-white shadow-xl">

            

            <h2 className="text-4xl md:text-5xl font-bold mt-4">

              More than just food donation.

            </h2>

            <p className="text-green-50 text-lg mt-6 leading-relaxed">

              FoodBridge connects donors, volunteers and administrators
              through a smart real-time platform.

            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="bg-white rounded-2xl p-6 shadow-sm border">

              <div className="text-3xl">
                🤖
              </div>

              <h3 className="font-bold text-xl mt-4">
                AI Verification
              </h3>

              <p className="text-gray-500 mt-2">
                AI-based donation verification and suspicious request detection.
              </p>

            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm border">

              <div className="text-3xl">
                📍
              </div>

              <h3 className="font-bold text-xl mt-4">
                Live Tracking
              </h3>

              <p className="text-gray-500 mt-2">
                Track volunteer pickup and food delivery in real time.
              </p>

            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm border">

              <div className="text-3xl">
                👥
              </div>

              <h3 className="font-bold text-xl mt-4">
                Smart Matching
              </h3>

              <p className="text-gray-500 mt-2">
                Match donations with nearby volunteers efficiently.
              </p>

            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm border">

              <div className="text-3xl">
                📊
              </div>

              <h3 className="font-bold text-xl mt-4">
                Admin Control
              </h3>

              <p className="text-gray-500 mt-2">
                Approve donations and monitor platform activity.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-slate-900 text-white px-6 md:px-14 py-10"
      >

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>

            <h2 className="text-2xl font-bold">

              Food
              <span className="text-green-400">
                Bridge
              </span>

            </h2>

            <p className="text-gray-400 mt-2">

              Connecting surplus food with people who need it.

            </p>

          </div>


          <p className="text-gray-400 text-sm">

            © 2026 FoodBridge. Smart Food Donation Platform.

          </p>

        </div>

      </footer>

    </div>
  );
}

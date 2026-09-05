import { useState } from "react";
import { Link } from "react-router-dom";

export default function DonorDashboard() {
  const [donations] = useState([
    {
      id: 1,
      food: "Vegetable Rice",
      quantity: "20 Meals",
      status: "Delivered",
    },
    {
      id: 2,
      food: "Chapati",
      quantity: "15 Meals",
      status: "Volunteer Assigned",
    },
  ]);

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

        <div className="flex items-center gap-4">

          <span className="hidden sm:block text-gray-600">
            Welcome, Donor
          </span>

          <button className="border border-red-400 text-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-50 transition">
            Logout
          </button>

        </div>

      </nav>


      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-14 py-10">

        {/* WELCOME */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-green-600 font-semibold">
              DONOR DASHBOARD
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Make a Difference Today
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Your surplus food can become someone's next meal.
            </p>

          </div>


          <Link to="/donate">

            <button className="bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-xl font-bold shadow-lg transition">
              + Donate Food
            </button>

          </Link>

        </div>


        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">

            <p className="text-gray-500">
              Total Donations
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              2
            </h2>

          </div>


          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">

            <p className="text-gray-500">
              Active Donations
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-3">
              1
            </h2>

          </div>


          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">

            <p className="text-gray-500">
              Meals Delivered
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              20
            </h2>

          </div>

        </div>


        {/* RECENT DONATIONS */}
        <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">

          <div className="p-7 border-b border-gray-100">

            <h2 className="text-2xl font-bold">
              Your Recent Donations
            </h2>

            <p className="text-gray-500 mt-1">
              Track the status of your food donations.
            </p>

          </div>


          <div className="divide-y">

            {donations.map((donation) => (

              <div
                key={donation.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-green-50 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                    🍱
                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {donation.food}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {donation.quantity}
                    </p>

                  </div>

                </div>


                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-center">
                  {donation.status}
                </span>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}
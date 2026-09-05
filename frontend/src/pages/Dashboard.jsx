import {
  acceptDonation,
  getDonations,
} from "../services/donationService";

import socket from "../services/socket";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] =
    useState("All");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* =========================
     FETCH DONATIONS
  ========================= */

  const fetchDonations = async () => {

    try {

      setLoading(true);

      const response = await getDonations();

      setDonations(response.data || []);

    } catch (error) {

      console.log(
        "Error loading donations:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     SOCKET CONNECTION
  ========================= */

  useEffect(() => {

    fetchDonations();

    socket.on(
      "newDonation",
      (newDonation) => {

        alert(
          "New donation received!"
        );

        setDonations((prev) => [
          newDonation,
          ...prev,
        ]);

      }
    );

    socket.on(
      "donationAccepted",
      () => {

        fetchDonations();

      }
    );

    return () => {

      socket.off("newDonation");

      socket.off(
        "donationAccepted"
      );

    };

  }, []);

  /* =========================
     ACCEPT DONATION
  ========================= */

  const handleAccept = async (id) => {

    try {

      if (!user.name) {

        alert(
          "Please login again."
        );

        return;

      }

      await acceptDonation(
        id,
        user.name
      );

      socket.emit(
        "sendNotification",
        {
          message:
            `${user.name} accepted a donation`,

          time:
            new Date().toLocaleTimeString(),
        }
      );

      alert(
        "Donation accepted successfully!"
      );

      fetchDonations();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to accept donation."
      );

    }

  };

  /* =========================
     FILTER DONATIONS
  ========================= */

  const filteredDonations = useMemo(() => {

    return donations.filter((item) => {

      const matchesSearch =
        item.foodName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.address
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesVerification =
        verificationFilter === "All" ||
        item.verification ===
          verificationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification
      );

    });

  }, [
    donations,
    search,
    statusFilter,
    verificationFilter,
  ]);

  /* =========================
     DASHBOARD STATISTICS
  ========================= */

  const totalDonations =
    donations.length;

  const approvedDonations =
    donations.filter(
      (item) =>
        item.status === "Approved"
    ).length;

  const pendingDonations =
    donations.filter(
      (item) =>
        item.status !== "Approved" &&
        item.status !== "Rejected"
    ).length;

  const acceptedDonations =
    donations.filter(
      (item) =>
        item.acceptedBy
    ).length;

  /* =========================
     STATUS STYLE
  ========================= */

  const getStatusStyle = (status) => {

    if (status === "Approved") {

      return "bg-green-100 text-green-700";

    }

    if (status === "Rejected") {

      return "bg-red-100 text-red-700";

    }

    return "bg-yellow-100 text-yellow-700";

  };

  /* =========================
     VERIFICATION STYLE
  ========================= */

  const getVerificationStyle = (
    verification
  ) => {

    if (
      verification === "Verified"
    ) {

      return "bg-green-100 text-green-700";

    }

    if (
      verification === "Suspicious"
    ) {

      return "bg-yellow-100 text-yellow-700";

    }

    if (
      verification === "Fake"
    ) {

      return "bg-red-100 text-red-700";

    }

    return "bg-gray-100 text-gray-600";

  };

  /* =========================
     AI SCORE STYLE
  ========================= */

  const getAIScoreStyle = (
    score
  ) => {

    if (score >= 80) {

      return "bg-green-100 text-green-700";

    }

    if (score >= 50) {

      return "bg-yellow-100 text-yellow-700";

    }

    return "bg-red-100 text-red-700";

  };

  return (

    <div className="flex min-h-screen bg-[#f7fbf8] text-slate-800">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="ml-[260px] w-full min-h-screen">

        <Navbar />

        <main className="p-6 md:p-8">

          {/* =========================
              HEADER
          ========================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>

              <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                FoodBridge Dashboard
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
                Welcome back,{" "}
                {user.name || "Volunteer"}!
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Find available food donations
                and help deliver meals to
                people who need them.
              </p>

            </div>

            <button
              onClick={() =>
                window.location.href =
                  "/tracking"
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <span>📍</span>
              Open Live Map
            </button>

          </div>


          {/* =========================
              STATISTICS
          ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* TOTAL */}

            <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 font-medium">
                    Total Donations
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalDonations}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                  🍱
                </div>

              </div>

              <p className="text-sm text-gray-400 mt-4">
                Donations on platform
              </p>

            </div>


            {/* APPROVED */}

            <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 font-medium">
                    Approved
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-2">
                    {approvedDonations}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                  ✓
                </div>

              </div>

              <p className="text-sm text-gray-400 mt-4">
                Verified for distribution
              </p>

            </div>


            {/* PENDING */}

            <div className="bg-white border border-yellow-100 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 font-medium">
                    Pending
                  </p>

                  <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                    {pendingDonations}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                  ⏳
                </div>

              </div>

              <p className="text-sm text-gray-400 mt-4">
                Awaiting verification
              </p>

            </div>


            {/* ACCEPTED */}

            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 font-medium">
                    Accepted
                  </p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-2">
                    {acceptedDonations}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  🚚
                </div>

              </div>

              <p className="text-sm text-gray-400 mt-4">
                Pickup in progress
              </p>

            </div>

          </div>


          {/* =========================
              DONATIONS SECTION
          ========================= */}

          <section className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">

            {/* SECTION HEADER */}

            <div className="p-6 md:p-8 border-b border-gray-100">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Available Donations
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Discover nearby food donations
                    waiting for pickup.
                  </p>

                </div>

                <div className="text-sm text-gray-500">

                  Showing{" "}
                  <span className="font-bold text-slate-800">
                    {filteredDonations.length}
                  </span>{" "}
                  donations

                </div>

              </div>


              {/* SEARCH + FILTERS */}

              <div className="flex flex-col md:flex-row gap-3 mt-7">

                {/* SEARCH */}

                <div className="relative flex-1">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search food or location..."
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-11 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition"
                  />

                </div>


                {/* STATUS */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-green-500"
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>


                {/* VERIFICATION */}

                <select
                  value={
                    verificationFilter
                  }
                  onChange={(e) =>
                    setVerificationFilter(
                      e.target.value
                    )
                  }
                  className="bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-green-500"
                >

                  <option value="All">
                    All Verification
                  </option>

                  <option value="Verified">
                    Verified
                  </option>

                  <option value="Suspicious">
                    Suspicious
                  </option>

                  <option value="Fake">
                    Fake
                  </option>

                </select>

              </div>

            </div>


            {/* =========================
                DONATION LIST
            ========================= */}

            <div className="p-6 md:p-8">

              {loading ? (

                <div className="flex flex-col items-center justify-center py-20">

                  <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>

                  <p className="text-gray-500 mt-5">
                    Loading donations...
                  </p>

                </div>

              ) : filteredDonations.length === 0 ? (

                <div className="text-center py-20">

                  <div className="w-20 h-20 mx-auto rounded-3xl bg-green-50 flex items-center justify-center text-4xl">
                    🍃
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mt-6">
                    No donations found
                  </h3>

                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    There are currently no donations
                    matching your search or filter.
                  </p>

                  <button
                    onClick={() => {

                      setSearch("");

                      setStatusFilter("All");

                      setVerificationFilter(
                        "All"
                      );

                    }}
                    className="mt-6 text-green-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>

                </div>

              ) : (

                <div className="flex flex-col gap-5">

                  {filteredDonations.map(
                    (item) => (

                      <div
                        key={item._id}
                        className="group bg-slate-50 border border-gray-100 rounded-2xl p-5 md:p-6 hover:bg-white hover:border-green-200 hover:shadow-lg transition duration-300"
                      >

                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                          {/* LEFT */}

                          <div className="flex flex-col sm:flex-row gap-5">

                            {/* IMAGE */}

                            <div className="relative flex-shrink-0">

                              {item.image ? (

                                <img
                                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                                  alt={
                                    item.foodName
                                  }
                                  className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl object-cover"
                                />

                              ) : (

                                <div className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl bg-green-100 flex items-center justify-center text-4xl">
                                  🍱
                                </div>

                              )}

                              {item.verification ===
                                "Verified" && (

                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm border-4 border-white">
                                  ✓
                                </div>

                              )}

                            </div>


                            {/* DETAILS */}

                            <div className="min-w-0">

                              <div className="flex flex-wrap items-center gap-3">

                                <h3 className="text-2xl font-bold text-slate-900">
                                  {
                                    item.foodName
                                  }
                                </h3>

                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                                    item.status
                                  )}`}
                                >
                                  {
                                    item.status ||
                                    "Pending"
                                  }
                                </span>

                              </div>


                              {/* QUANTITY */}

                              <p className="text-gray-600 mt-3">
                                <span className="font-semibold">
                                  Quantity:
                                </span>{" "}
                                {item.quantity}
                              </p>


                              {/* LOCATION */}

                              <p className="text-gray-500 mt-2 flex items-start gap-2">
                                <span>
                                  📍
                                </span>

                                <span>
                                  {
                                    item.address
                                  }
                                </span>
                              </p>


                              {/* ACCEPTED BY */}

                              {item.acceptedBy && (

                                <p className="mt-3 text-sm font-semibold text-green-700 flex items-center gap-2">
                                  <span>
                                    ✓
                                  </span>

                                  Accepted by{" "}
                                  {
                                    item.acceptedBy
                                  }
                                </p>

                              )}


                              {/* BADGES */}

                              <div className="flex flex-wrap gap-2 mt-4">

                                <span
                                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${getVerificationStyle(
                                    item.verification
                                  )}`}
                                >
                                  {item.verification ===
                                  "Verified"
                                    ? "✓ Verified"
                                    : item.verification ===
                                      "Suspicious"
                                    ? "⚠ Suspicious"
                                    : item.verification ===
                                      "Fake"
                                    ? "✕ Fake"
                                    : "Verification Pending"}
                                </span>


                                {/* AI SCORE */}

                                {typeof item.aiScore ===
                                  "number" && (

                                  <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getAIScoreStyle(
                                      item.aiScore
                                    )}`}
                                  >
                                    🤖 AI Trust{" "}
                                    {
                                      item.aiScore
                                    }%
                                  </span>

                                )}

                              </div>

                            </div>

                          </div>


                          {/* RIGHT SIDE */}

                          <div className="xl:min-w-[180px] flex xl:flex-col items-center xl:items-end justify-between gap-4">

                            {/* LOCATION INFO */}

                            <div className="text-right">

                              <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                Pickup
                              </p>

                              <p className="font-bold text-slate-700 mt-1">
                                📍 Available
                              </p>

                            </div>


                            {/* ACCEPT BUTTON */}

                            <button
                              disabled={
                                !!item.acceptedBy ||
                                item.status !==
                                  "Approved" ||
                                item.verification ===
                                  "Fake"
                              }
                              onClick={() =>
                                handleAccept(
                                  item._id
                                )
                              }
                              className={`px-7 py-3 rounded-xl font-bold transition whitespace-nowrap ${
                                item.acceptedBy
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : item.status !==
                                      "Approved"
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : item.verification ===
                                    "Fake"
                                  ? "bg-red-100 text-red-400 cursor-not-allowed"
                                  : "bg-green-600 text-white hover:bg-green-700 shadow-md"
                              }`}
                            >

                              {item.acceptedBy
                                ? "✓ Accepted"
                                : item.status !==
                                  "Approved"
                                ? "Awaiting Approval"
                                : item.verification ===
                                  "Fake"
                                ? "Unavailable"
                                : "Accept Pickup →"}

                            </button>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </section>



        </main>

      </div>

    </div>

  );
}

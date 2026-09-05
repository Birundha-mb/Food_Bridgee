import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getDonations,
  updateDonationStatus,
} from "../services/donationService";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartPie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClipboardList,
  FaTruck,
  FaClock,
  FaSearch,
  FaFilter,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaSyncAlt,
} from "react-icons/fa";


export default function Admin() {

  const [donations, setDonations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [selectedVerification, setSelectedVerification] =
    useState("All");

  const [updatingId, setUpdatingId] =
    useState(null);


  // ==============================
  // FETCH DONATIONS
  // ==============================

  useEffect(() => {
    fetchDonations();
  }, []);


  const fetchDonations = async () => {

    try {

      setLoading(true);

      const response =
        await getDonations();

      setDonations(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Admin donation error:",
        error
      );

      setDonations([]);

    } finally {

      setLoading(false);

    }
  };


  // ==============================
  // UPDATE DONATION STATUS
  // ==============================

  const handleStatusUpdate =
    async (id, status) => {

      try {

        setUpdatingId(id);

        await updateDonationStatus(
          id,
          status
        );

        await fetchDonations();

      } catch (error) {

        console.error(
          "Status update error:",
          error
        );

        alert(
          "Unable to update donation status."
        );

      } finally {

        setUpdatingId(null);

      }
    };


  // ==============================
  // STATISTICS
  // ==============================

  const totalDonations =
    donations.length;


  const verifiedDonations =
    donations.filter(
      (d) =>
        d.verification === "Verified"
    ).length;


  const suspiciousDonations =
    donations.filter(
      (d) =>
        d.verification === "Suspicious"
    ).length;


  const fakeDonations =
    donations.filter(
      (d) =>
        d.verification === "Fake"
    ).length;


  const acceptedDonations =
    donations.filter(
      (d) => d.acceptedBy
    ).length;


  const pendingDonations =
    donations.filter(
      (d) =>
        !d.acceptedBy &&
        d.status !== "Rejected"
    ).length;


  const approvedDonations =
    donations.filter(
      (d) =>
        d.status === "Approved"
    ).length;


  const rejectedDonations =
    donations.filter(
      (d) =>
        d.status === "Rejected"
    ).length;


  // ==============================
  // CHART DATA
  // ==============================

  const chartData = [
    {
      name: "Verified",
      value: verifiedDonations,
    },
    {
      name: "Suspicious",
      value: suspiciousDonations,
    },
    {
      name: "Fake",
      value: fakeDonations,
    },
  ];


  const barData = [
    {
      name: "Pending",
      donations: pendingDonations,
    },
    {
      name: "Approved",
      donations: approvedDonations,
    },
    {
      name: "Accepted",
      donations: acceptedDonations,
    },
    {
      name: "Rejected",
      donations: rejectedDonations,
    },
  ];


  // ==============================
  // FILTER DONATIONS
  // ==============================

  const filteredDonations =
    useMemo(() => {

      return donations.filter(
        (item) => {

          const searchText =
            search.toLowerCase().trim();

          const matchesSearch =
            !searchText ||
            item.foodName
              ?.toLowerCase()
              .includes(searchText) ||
            item.address
              ?.toLowerCase()
              .includes(searchText) ||
            item.quantity
              ?.toString()
              .toLowerCase()
              .includes(searchText);


          const matchesStatus =
            selectedStatus === "All" ||
            item.status === selectedStatus;


          const matchesVerification =
            selectedVerification === "All" ||
            item.verification ===
              selectedVerification;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesVerification
          );

        }
      );

    }, [
      donations,
      search,
      selectedStatus,
      selectedVerification,
    ]);


  return (

    <div className="min-h-screen bg-[#f7fbf8]">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN */}

      <main className="ml-[260px] min-h-screen">

        <Navbar />


        <section className="px-8 py-7">

          <div className="max-w-7xl mx-auto">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

                  <p className="text-sm font-bold text-green-600">
                    Administrator Control Center
                  </p>

                </div>

                <h1 className="text-4xl font-bold text-gray-800">
                  Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                  Monitor donations, verification activity,
                  and food distribution operations.
                </p>

              </div>


              <button
                onClick={fetchDonations}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 px-5 py-3 rounded-xl font-semibold shadow-sm transition"
              >

                <FaSyncAlt />

                Refresh Data

              </button>

            </div>


            {/* ================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">


              {/* TOTAL */}

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Donations
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {totalDonations}
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl">

                    <FaClipboardList />

                  </div>

                </div>

                <p className="text-xs text-gray-400 mt-4">
                  All submitted donations
                </p>

              </div>


              {/* VERIFIED */}

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Verified
                    </p>

                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {verifiedDonations}
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">

                    <FaCheckCircle />

                  </div>

                </div>

                <p className="text-xs text-gray-400 mt-4">
                  AI / system verified
                </p>

              </div>


              {/* SUSPICIOUS */}

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Suspicious
                    </p>

                    <p className="text-3xl font-bold text-orange-500 mt-2">
                      {suspiciousDonations}
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center text-xl">

                    <FaExclamationTriangle />

                  </div>

                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Requires administrator review
                </p>

              </div>


              {/* FAKE */}

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Fake Donations
                    </p>

                    <p className="text-3xl font-bold text-red-600 mt-2">
                      {fakeDonations}
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl">

                    <FaTimesCircle />

                  </div>

                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Flagged by verification
                </p>

              </div>

            </div>


            {/* ================================= */}
            {/* SECONDARY STATS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">


              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                    <FaTruck />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Accepted
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                      {acceptedDonations}
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">

                    <FaClock />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Pending
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                      {pendingDonations}
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">

                    <FaCheckCircle />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Approved
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                      {approvedDonations}
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">

                    <FaShieldAlt />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Approval Rate
                    </p>

                    <p className="text-2xl font-bold text-gray-800">

                      {totalDonations > 0
                        ? Math.round(
                            (approvedDonations /
                              totalDonations) *
                              100
                          )
                        : 0}
                      %

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================================= */}
            {/* ANALYTICS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-7">


              {/* PIE */}

              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      AI Verification
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Donation verification overview
                    </p>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">

                    <FaChartPie />

                  </div>

                </div>


                {totalDonations === 0 ? (

                  <div className="h-[320px] flex items-center justify-center text-gray-400">
                    No verification data available
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <PieChart>

                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={105}
                        innerRadius={55}
                        paddingAngle={3}
                        label
                      >

                        <Cell fill="#16a34a" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#dc2626" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                )}

              </div>


              {/* BAR */}

              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      Donation Status
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Current distribution workflow
                    </p>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                    <FaTruck />

                  </div>

                </div>


                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <BarChart data={barData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis
                      allowDecimals={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="donations"
                      fill="#16a34a"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* ================================= */}
            {/* DONATION MANAGEMENT */}
            {/* ================================= */}

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">


              {/* HEADER */}

              <div className="p-6 border-b border-gray-100">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      Donation Management
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Review and manage submitted food donations.
                    </p>

                  </div>

                  <div className="text-sm font-semibold text-gray-500">

                    Showing{" "}
                    <span className="text-gray-800">
                      {filteredDonations.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-gray-800">
                      {totalDonations}
                    </span>

                  </div>

                </div>


                {/* FILTERS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">


                  {/* SEARCH */}

                  <div className="relative">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search food or address..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition text-sm"
                    />

                  </div>


                  {/* STATUS */}

                  <div className="relative">

                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

                    <select
                      value={selectedStatus}
                      onChange={(e) =>
                        setSelectedStatus(
                          e.target.value
                        )
                      }
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 text-sm bg-white"
                    >

                      <option value="All">
                        All Statuses
                      </option>

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Approved">
                        Approved
                      </option>

                      <option value="Accepted">
                        Accepted
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </div>


                  {/* VERIFICATION */}

                  <div className="relative">

                    <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

                    <select
                      value={
                        selectedVerification
                      }
                      onChange={(e) =>
                        setSelectedVerification(
                          e.target.value
                        )
                      }
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 text-sm bg-white"
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

              </div>


              {/* DONATION LIST */}

              <div className="p-6">


                {loading ? (

                  <div className="py-16 text-center">

                    <div className="w-9 h-9 mx-auto border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>

                    <p className="text-sm text-gray-500 mt-4">
                      Loading donation records...
                    </p>

                  </div>

                ) : filteredDonations.length === 0 ? (

                  <div className="py-16 text-center">

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
                      <FaClipboardList />
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mt-5">
                      No donations found
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Try changing your search or filters.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {filteredDonations.map(
                      (item) => (

                        <div
                          key={item._id}
                          className="border border-gray-100 rounded-2xl p-4 hover:border-green-200 hover:shadow-sm transition"
                        >

                          <div className="flex flex-col xl:flex-row xl:items-center gap-5">


                            {/* IMAGE */}

                            {item.image ? (

                              <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                                alt={
                                  item.foodName ||
                                  "Food donation"
                                }
                                className="w-24 h-24 rounded-2xl object-cover shrink-0"
                              />

                            ) : (

                              <div className="w-24 h-24 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
                                🍱
                              </div>

                            )}


                            {/* DETAILS */}

                            <div className="flex-1 min-w-0">

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-xl font-bold text-gray-800">
                                  {item.foodName ||
                                    "Food Donation"}
                                </h3>


                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    item.verification ===
                                    "Verified"
                                      ? "bg-green-100 text-green-700"
                                      : item.verification ===
                                        "Suspicious"
                                      ? "bg-orange-100 text-orange-700"
                                      : item.verification ===
                                        "Fake"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >

                                  {item.verification ||
                                    "Not Verified"}

                                </span>

                              </div>


                              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">

                                <FaMapMarkerAlt className="text-gray-400 shrink-0" />

                                <span className="truncate">
                                  {item.address ||
                                    "Address unavailable"}
                                </span>

                              </p>


                              <div className="flex flex-wrap gap-2 mt-3">

                                <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-semibold">

                                  Quantity:{" "}
                                  {item.quantity ||
                                    "N/A"}

                                </span>


                                {item.aiScore !==
                                  undefined &&
                                  item.aiScore !==
                                    null && (

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">

                                      AI Score:{" "}
                                      {item.aiScore}%

                                    </span>

                                  )}


                                {item.acceptedBy && (

                                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold">

                                    🚚{" "}
                                    {item.acceptedBy}

                                  </span>

                                )}

                              </div>

                            </div>


                            {/* STATUS + ACTIONS */}

                            <div className="xl:w-[220px] shrink-0">

                              <div className="flex xl:justify-end mb-3">

                                <span
                                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                                    item.status ===
                                    "Approved"
                                      ? "bg-green-100 text-green-700"
                                      : item.status ===
                                        "Accepted"
                                      ? "bg-blue-100 text-blue-700"
                                      : item.status ===
                                        "Delivered"
                                      ? "bg-purple-100 text-purple-700"
                                      : item.status ===
                                        "Rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-orange-100 text-orange-700"
                                  }`}
                                >

                                  {item.status ||
                                    "Pending"}

                                </span>

                              </div>


                              <div className="flex gap-2 xl:justify-end">


                                {/* APPROVE */}

                                <button
                                  disabled={
                                    updatingId ===
                                    item._id ||
                                    item.status ===
                                      "Approved"
                                  }
                                  onClick={() =>
                                    handleStatusUpdate(
                                      item._id,
                                      "Approved"
                                    )
                                  }
                                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
                                >

                                  <FaCheckCircle />

                                  {updatingId ===
                                  item._id
                                    ? "Updating..."
                                    : "Approve"}

                                </button>


                                {/* REJECT */}

                                <button
                                  disabled={
                                    updatingId ===
                                    item._id ||
                                    item.status ===
                                      "Rejected"
                                  }
                                  onClick={() =>
                                    handleStatusUpdate(
                                      item._id,
                                      "Rejected"
                                    )
                                  }
                                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
                                >

                                  <FaTimesCircle />

                                  Reject

                                </button>

                              </div>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


            {/* ================================= */}
            {/* ADMIN INFORMATION */}
            {/* ================================= */}

            <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5">

              <div className="flex gap-4">

                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">

                  <FaShieldAlt />

                </div>

                <div>

                  <h3 className="font-bold text-gray-800">
                    FoodBridge Administration
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 leading-6">
                    Use this panel to monitor donation activity,
                    review AI verification results, and approve
                    or reject food donations before distribution.
                  </p>

                </div>

              </div>

            </div>


          </div>

        </section>

      </main>

    </div>
  );
}

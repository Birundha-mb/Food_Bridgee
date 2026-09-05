import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import {
  useEffect,
  useState,
} from "react";

import {
  getDonations,
} from "../services/donationService";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "leaflet/dist/leaflet.css";


// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


export default function Tracking() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");


  // Default map location
  // Used until actual latitude/longitude is stored
  // in the donation database.
  const defaultLocation = [12.9716, 77.5946];


  // Fetch donations
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
        "Tracking data error:",
        error
      );

      setDonations([]);

    } finally {

      setLoading(false);

    }

  };


  // Filter donations
  const filteredDonations =
    donations.filter((item) => {

      const matchesSearch =
        item.foodName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.address
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // Status counts
  const totalDonations =
    donations.length;

  const approvedDonations =
    donations.filter(
      (item) =>
        item.status === "Approved"
    ).length;

  const acceptedDonations =
    donations.filter(
      (item) =>
        item.status === "Accepted"
    ).length;

  const pendingDonations =
    donations.filter(
      (item) =>
        item.status === "Pending"
    ).length;


  return (

    <div className="min-h-screen bg-[#f7fbf8]">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN */}

      <main className="ml-[260px] min-h-screen">

        {/* NAVBAR */}

        <Navbar />


        {/* PAGE */}

        <section className="px-8 py-6">

          <div className="max-w-7xl mx-auto">


            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                  <p className="text-sm font-semibold text-green-600">
                    Live Monitoring
                  </p>

                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                  Food Tracking
                </h1>

                <p className="text-gray-500 mt-1">
                  Monitor active food donations and their
                  delivery status.
                </p>

              </div>


              {/* ACTIVE COUNT */}

              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    📍
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Donations on map
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                      {filteredDonations.length}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* STATISTICS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">


              {/* TOTAL */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Donations
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                      {totalDonations}
                    </h2>

                  </div>

                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                    🍱
                  </div>

                </div>

              </div>


              {/* APPROVED */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Approved
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                      {approvedDonations}
                    </h2>

                  </div>

                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                    ✓
                  </div>

                </div>

              </div>


              {/* ACCEPTED */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Accepted
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                      {acceptedDonations}
                    </h2>

                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                    🚚
                  </div>

                </div>

              </div>


              {/* PENDING */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Pending
                    </p>

                    <h2 className="text-3xl font-bold text-orange-500 mt-2">
                      {pendingDonations}
                    </h2>

                  </div>

                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                    ⏳
                  </div>

                </div>

              </div>

            </div>


            {/* MAP + LIST */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


              {/* MAP */}

              <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">


                {/* MAP HEADER */}

                <div className="p-5 border-b border-gray-100">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h2 className="text-xl font-bold text-gray-800">
                        Live Donation Map
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        View donation pickup locations.
                      </p>

                    </div>


                    <div className="flex items-center gap-2">

                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                      <span className="text-xs font-semibold text-gray-600">
                        Live
                      </span>

                    </div>

                  </div>

                </div>


                {/* MAP */}

                <div className="relative">

                  <MapContainer
                    center={defaultLocation}
                    zoom={12}
                    className="h-[600px] w-full z-0"
                  >

                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {filteredDonations.map(
                      (item, index) => {

                        /*
                          IMPORTANT:

                          We do NOT use Math.random()
                          here.

                          Until your database stores
                          latitude and longitude, all
                          donations use the default
                          map location.

                          Once backend coordinates are
                          available, replace this with:

                          const lat = item.latitude;
                          const lng = item.longitude;
                        */

                        const lat =
                          Number(item.latitude) ||
                          defaultLocation[0];

                        const lng =
                          Number(item.longitude) ||
                          defaultLocation[1];


                        return (

                          <Marker
                            key={
                              item._id ||
                              item.id ||
                              index
                            }
                            position={[
                              lat,
                              lng,
                            ]}
                          >

                            <Popup>

                              <div className="w-[260px]">

                                {/* IMAGE */}

                                {item.image ? (

                                  <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                                    alt={
                                      item.foodName ||
                                      "Food donation"
                                    }
                                    className="w-full h-36 object-cover rounded-xl"
                                  />

                                ) : (

                                  <div className="w-full h-36 rounded-xl bg-green-50 flex items-center justify-center text-4xl">
                                    🍱
                                  </div>

                                )}


                                {/* NAME */}

                                <h2 className="text-lg font-bold mt-3 text-gray-800">
                                  {item.foodName ||
                                    "Food Donation"}
                                </h2>


                                {/* QUANTITY */}

                                <p className="text-sm mt-2 text-gray-600">
                                  <strong>
                                    Quantity:
                                  </strong>{" "}
                                  {item.quantity ||
                                    "Not specified"}
                                </p>


                                {/* ADDRESS */}

                                <p className="text-sm mt-1 text-gray-600">
                                  <strong>
                                    Pickup:
                                  </strong>{" "}
                                  {item.address ||
                                    "Not specified"}
                                </p>


                                {/* STATUS */}

                                <p className="text-sm mt-2 font-bold text-green-700">
                                  Status:{" "}
                                  {item.status ||
                                    "Pending"}
                                </p>


                                {/* VOLUNTEER */}

                                {item.acceptedBy && (

                                  <p className="text-sm mt-1 font-semibold text-blue-700">
                                    Volunteer:{" "}
                                    {item.acceptedBy}
                                  </p>

                                )}

                              </div>

                            </Popup>

                          </Marker>

                        );

                      }
                    )}

                  </MapContainer>


                  {/* MAP LEGEND */}

                  <div className="absolute bottom-5 left-5 z-[1000] bg-white rounded-xl shadow-lg px-4 py-3">

                    <div className="flex items-center gap-2">

                      <span className="w-3 h-3 rounded-full bg-green-500"></span>

                      <span className="text-xs font-semibold text-gray-700">
                        Donation Location
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* DONATION LIST */}

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">


                {/* LIST HEADER */}

                <div className="p-5 border-b border-gray-100">

                  <h2 className="text-xl font-bold text-gray-800">
                    Donation Activity
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Track individual donations.
                  </p>

                </div>


                {/* SEARCH */}

                <div className="p-4 border-b border-gray-100">

                  <div className="relative">

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
                      placeholder="Search donations..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                    />

                  </div>

                </div>


                {/* FILTER */}

                <div className="px-4 py-3 border-b border-gray-100">

                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500"
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

                  </select>

                </div>


                {/* LIST */}

                <div className="max-h-[500px] overflow-y-auto">

                  {loading ? (

                    <div className="p-10 text-center">

                      <div className="w-8 h-8 mx-auto border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

                      <p className="text-sm text-gray-500 mt-4">
                        Loading donations...
                      </p>

                    </div>

                  ) : filteredDonations.length === 0 ? (

                    <div className="p-10 text-center">

                      <div className="text-4xl mb-3">
                        📍
                      </div>

                      <h3 className="font-bold text-gray-800">
                        No donations found
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Try changing your search or filter.
                      </p>

                    </div>

                  ) : (

                    <div>

                      {filteredDonations.map(
                        (item, index) => (

                          <div
                            key={
                              item._id ||
                              item.id ||
                              index
                            }
                            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition"
                          >

                            <div className="flex items-start gap-3">

                              {/* IMAGE */}

                              {item.image ? (

                                <img
                                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                                  alt=""
                                  className="w-14 h-14 rounded-xl object-cover"
                                />

                              ) : (

                                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                                  🍱
                                </div>

                              )}


                              <div className="flex-1 min-w-0">

                                <div className="flex items-start justify-between gap-2">

                                  <h3 className="font-bold text-sm text-gray-800 truncate">
                                    {item.foodName ||
                                      "Food Donation"}
                                  </h3>

                                  <span
                                    className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-bold ${
                                      item.status ===
                                      "Approved"
                                        ? "bg-green-100 text-green-700"
                                        : item.status ===
                                          "Accepted"
                                        ? "bg-blue-100 text-blue-700"
                                        : item.status ===
                                          "Delivered"
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-orange-100 text-orange-600"
                                    }`}
                                  >
                                    {item.status ||
                                      "Pending"}
                                  </span>

                                </div>


                                <p className="text-xs text-gray-500 mt-1 truncate">
                                  📍{" "}
                                  {item.address ||
                                    "Address unavailable"}
                                </p>


                                <p className="text-xs text-gray-500 mt-1">
                                  Quantity:{" "}
                                  {item.quantity ||
                                    "N/A"}
                                </p>


                                {item.acceptedBy && (

                                  <p className="text-xs text-blue-600 font-semibold mt-1">
                                    🚚{" "}
                                    {item.acceptedBy}
                                  </p>

                                )}

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>

            </div>


            {/* INFORMATION NOTE */}

            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">

              <div className="flex gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl shrink-0">
                  ℹ️
                </div>

                <div>

                  <h3 className="font-bold text-gray-800">
                    Location accuracy
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 leading-6">
                    FoodBridge currently displays the donation
                    on the map using the available location
                    coordinates. For precise live tracking,
                    the donation database should store latitude
                    and longitude for each pickup address.
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

import { useState } from "react";
import socket from "../services/socket";
import Sidebar from "../components/Sidebar";
import { createDonation } from "../services/donationService";

export default function Donate() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    address: "",
    details: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];

      setFormData((prev) => ({
        ...prev,
        image: file || null,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setPreview(null);

    const fileInput = document.getElementById("food-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.foodName.trim()) {
      alert("Please enter the food name.");
      return;
    }

    if (!formData.quantity.trim()) {
      alert("Please enter the quantity.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter the pickup address.");
      return;
    }

    if (!formData.image) {
      alert("Please upload a food image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("foodName", formData.foodName);
      data.append("quantity", formData.quantity);
      data.append("address", formData.address);
      data.append("details", formData.details);
      data.append("image", formData.image);

      const response = await createDonation(data);

      socket.emit("sendNotification", {
        message: `${user.name || "A donor"} submitted a new food donation.`,
        time: new Date().toLocaleTimeString(),
      });

      alert(
        response?.data?.message ||
          "Donation submitted successfully!"
      );

      setFormData({
        foodName: "",
        quantity: "",
        address: "",
        details: "",
        image: null,
      });

      setPreview(null);

      const fileInput = document.getElementById("food-image");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Donation error:", error);

      alert(
        error?.response?.data?.message ||
          "Donation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbf8]">
      <Sidebar />

      <main className="ml-[260px] min-h-screen">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-gray-100 px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-semibold mb-1">
                Food Donation
              </p>

              <h1 className="text-3xl font-bold text-gray-800">
                Donate Surplus Food
              </h1>

              <p className="text-gray-500 mt-1">
                Turn your extra food into a meaningful meal for someone
                in need.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {user.name || "FoodBridge User"}
                </p>

                <p className="text-xs text-gray-500 capitalize">
                  {user.role || "Donor"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="px-8 py-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* MAIN FORM */}
            <div className="xl:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
              >
                {/* FORM HEADER */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
                    🍱
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Donation Details
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Provide accurate information so volunteers can
                      collect your donation safely.
                    </p>
                  </div>
                </div>

                {/* FOOD NAME + QUANTITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Food Name
                    </label>

                    <input
                      type="text"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleChange}
                      placeholder="e.g. Vegetable Rice"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>

                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 10 plates / 5 kg"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                    />
                  </div>

                </div>

                {/* ADDRESS */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter the complete address where the food can be collected"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none resize-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                  />
                </div>

                {/* DETAILS */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Details
                    <span className="text-gray-400 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Mention preparation time, expiry information, packaging details, allergens, or any other useful information..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none resize-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                  />
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Food Image
                  </label>

                  {!preview ? (
                    <label
                      htmlFor="food-image"
                      className="block border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition"
                    >
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-4">
                        📷
                      </div>

                      <p className="font-semibold text-gray-700">
                        Upload a photo of the food
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        A clear image helps with verification
                      </p>

                      <span className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold">
                        Choose Image
                      </span>

                      <input
                        id="food-image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                      <img
                        src={preview}
                        alt="Food preview"
                        className="w-full h-72 object-cover"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-4 right-4 bg-white text-red-500 px-4 py-2 rounded-lg shadow-md font-semibold text-sm hover:bg-red-50 transition"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                {/* SUBMIT */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl text-white font-bold text-base transition shadow-sm ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 hover:shadow-md"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Submitting Donation...
                      </span>
                    ) : (
                      "Submit Donation"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              {/* DONATION TIPS */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                    💡
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Donation Tips
                    </h3>

                    <p className="text-xs text-gray-500">
                      Make your donation more useful
                    </p>
                  </div>
                </div>

                <div className="space-y-5">

                  <div className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>

                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        Add a clear food name
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Mention exactly what type of food you are
                        donating.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>

                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        Mention the quantity
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Use plates, packets, kilograms, or another
                        suitable unit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>

                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        Provide the exact address
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Volunteers need a clear pickup location.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                      4
                    </span>

                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        Upload a genuine photo
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Use a recent and clear picture of the donated
                        food.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              

              {/* DONATION NOTE */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="flex gap-3">
                  <div className="text-xl">
                    ❤️
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">
                      Every donation matters
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 leading-5">
                      Your surplus food can become a nutritious meal
                      for someone in your community.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
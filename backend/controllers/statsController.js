const Donation = require("../models/Donation");
const User = require("../models/User");

const getStats = async (req, res) => {
  try {
    // Total donations
    const totalDonations = await Donation.countDocuments();

    // Total volunteers
    const totalVolunteers = await User.countDocuments({
      role: "volunteer",
    });

    // Completed / delivered donations
    const deliveredDonations = await Donation.find({
      status: "Delivered",
    });

    // Calculate food saved
    let foodSaved = 0;

    deliveredDonations.forEach((donation) => {
      const quantity = parseFloat(donation.quantity);

      if (!isNaN(quantity)) {
        foodSaved += quantity;
      }
    });

    // Estimated people fed
    const peopleFed = Math.round(foodSaved * 3);

    res.status(200).json({
      totalDonations,
      totalVolunteers,
      peopleFed,
      foodSaved,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching statistics",
    });

  }
};

module.exports = {
  getStats,
};
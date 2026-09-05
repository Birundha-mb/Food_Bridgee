const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {

  try {
    const randomScore =
  Math.floor(Math.random() * 100);

const verificationStatus =
  randomScore > 50
    ? "Verified"
    : "Suspicious";
    let aiScore = 100;

let verification = "Verified";

const suspiciousWords = [
  "test",
  "fake",
  "asdf",
  "sample",
  "null",
];

const foodName =
  req.body.foodName.toLowerCase();

const address =
  req.body.address.toLowerCase();

if (!req.file) {

  aiScore -= 35;

}

if (
  req.body.quantity <= 1
) {

  aiScore -= 20;

}

if (
  foodName.length < 3
) {

  aiScore -= 15;

}

if (
  address.length < 8
) {

  aiScore -= 15;

}

suspiciousWords.forEach(
  (word) => {

    if (
      foodName.includes(word)
    ) {

      aiScore -= 20;

    }

  }
);

const existingDonation =
  await Donation.findOne({

    foodName:
      req.body.foodName,

    address:
      req.body.address,

  });

if (existingDonation) {

  aiScore -= 25;

}

if (
  req.body.quantity > 500
) {

  aiScore -= 10;

}

if (
  req.body.foodName
    .split(" ").length < 2
) {

  aiScore -= 10;

}

if (aiScore < 70) {

  verification =
    "Suspicious";

}

if (aiScore < 40) {

  verification =
    "Fake";

}

if (aiScore <= 30) {

  return res.status(400).json({

    message:
      "AI blocked fake donation",

  });

}
    const donation = await Donation.create({
        
      foodName: req.body.foodName,

      quantity: req.body.quantity,

      address: req.body.address,

      details: req.body.details,

      image: req.file
        ? req.file.filename
        : "",

        verification: verification,

aiScore: aiScore,

    });
    global.io.emit(
  "newDonation",
  donation
);
    res.status(201).json({
      message: "Donation Created",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getDonations = async (req, res) => {

  try {

    const donations = await Donation.find()
      .sort({ createdAt: -1 });

    res.status(200).json(donations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
exports.updateDonationStatus =
  async (req, res) => {

    try {

      const donation =
        await Donation.findByIdAndUpdate(

          req.params.id,

          {
            status: req.body.status,
          },

          {
            new: true,
          }

        );

      res.status(200).json(donation);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};
exports.acceptDonation =
  async (req, res) => {

    try {

      const donation =
        await Donation.findByIdAndUpdate(

          req.params.id,

          {
            acceptedBy:
              req.body.acceptedBy,

            status: "Accepted",
          },

          {
            new: true,
          }

        );

      global.io.emit(
        "donationAccepted",
        donation
      );

      res.status(200).json(donation);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};
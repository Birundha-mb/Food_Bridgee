const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  createDonation,
  getDonations,
  updateDonationStatus,
  acceptDonation,
} = require("../controllers/donationController");

router.post(
  "/",
  upload.single("image"),
  createDonation
);

router.get("/", getDonations);
router.put(
  "/:id",
  updateDonationStatus
);
router.put(
  "/accept/:id",
  acceptDonation
);

module.exports = router;
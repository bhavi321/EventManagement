const express = require("express");
const router = express.Router();

const { getEventsForProfile, createEvent, getAllEvents, updateEvent } = require("../controllers/eventController");

router.get("/profile/:profileId", getEventsForProfile);
router.post("/", createEvent);
router.get("/", getAllEvents);
router.put("/:eventId", updateEvent);

module.exports = router;
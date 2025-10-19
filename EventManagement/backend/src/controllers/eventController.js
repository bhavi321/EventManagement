const eventService = require("../service/eventService");

const getEventsForProfile = async (req, res) => {
  try {
    const events = await eventService.getEventsForProfile(req.params.profileId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createEvent = async (req, res) => {
  try {
    console.log('req.body: ', req.body)
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.log('error: ', error)
    res.status(400).json({ message: error.message });
  }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.eventId, req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getEventsForProfile,
  createEvent,
  getAllEvents,
  updateEvent,
};
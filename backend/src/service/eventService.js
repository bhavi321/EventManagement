const Event = require("../models/Event");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

// Get all events for a specific profile
const getEventsForProfile = async (profileId) => {
    const events = await Event.find({
      profiles: profileId,
    })
      .populate("profiles", "name timezone")
      .sort({ startDate: 1 });

    return events;
  }
  
  // Create a new event
  const createEvent = async (eventData) => {
      const { profiles, timezone, startDate, endDate } = eventData;
      console.log('profiles: ', profiles);
      
      if (!profiles || profiles.length === 0) {
        throw new Error("At least one profile is required");
      }
  
      if (!timezone) {
        throw new Error("Timezone is required");
      }
  
      if (!startDate || !endDate) {
        throw new Error("Start and end dates are required");
      }
  
      const start = dayjs(startDate);
      const end = dayjs(endDate);
  
      if (!start.isValid() || !end.isValid()) {
        throw new Error("Invalid date format");
      }
  
      if (end.isBefore(start)) {
        throw new Error("End date cannot be before start date");
      }
  
      const event = new Event({
        profiles,
        timezone,
        startDate: start.toDate(),
        endDate: end.toDate(),
        updateLogs: [],
      });
  
      const savedEvent = await event.save();
      const populatedEvent = await Event.findById(savedEvent._id).populate("profiles", "name timezone");
  
      return populatedEvent;
  }

  // Get all events
  const getAllEvents = async () => {
    try {
      const events = await Event.find()
        .populate("profiles", "name timezone")
        .sort({ startDate: 1 });
  
      return events;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Update an event
  const updateEvent = async (eventId, eventData) => {
    
      const { profiles, timezone, startDate, endDate } = eventData;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        throw new Error("Event not found");
      }

      // Validate dates if either is being updated
      const finalStartDate = startDate ? dayjs(startDate) : dayjs(event.startDate);
      const finalEndDate = endDate ? dayjs(endDate) : dayjs(event.endDate);

      if (!finalStartDate.isValid() || !finalEndDate.isValid()) {
        throw new Error("Invalid date format");
      }

      if (finalEndDate.isBefore(finalStartDate)) {
        throw new Error("End date cannot be before start date");
      }
  
      // Create update logs
      const updateLogs = [];
  
      if (profiles && JSON.stringify(profiles) !== JSON.stringify(event.profiles)) {
        updateLogs.push({
          field: "profiles",
          oldValue: event.profiles,
          newValue: profiles,
          updatedAt: new Date(),
        });
      }
  
      if (timezone && timezone !== event.timezone) {
        updateLogs.push({
          field: "timezone",
          oldValue: event.timezone,
          newValue: timezone,
          updatedAt: new Date(),
        });
      }
  
      if (startDate && new Date(startDate).getTime() !== event.startDate.getTime()) {
        updateLogs.push({
          field: "startDate",
          oldValue: event.startDate,
          newValue: new Date(startDate),
          updatedAt: new Date(),
        });
      }
  
      if (endDate && new Date(endDate).getTime() !== event.endDate.getTime()) {
        updateLogs.push({
          field: "endDate",
          oldValue: event.endDate,
          newValue: new Date(endDate),
          updatedAt: new Date(),
        });
      }
  
      // Update event
      if (profiles) event.profiles = profiles;
      if (timezone) event.timezone = timezone;
      if (startDate) event.startDate = new Date(startDate);
      if (endDate) event.endDate = new Date(endDate);
  
      // Add logs to event
      event.updateLogs.push(...updateLogs);
  
      const updatedEvent = await event.save();
      const populatedEvent = await Event.findById(updatedEvent._id).populate("profiles", "name timezone");
  
      return populatedEvent;
  }
  
  module.exports = {
    getEventsForProfile,
    createEvent,
    getAllEvents,
    updateEvent,
  };
const mongoose = require("mongoose");

const updateLogSchema = new mongoose.Schema({
    field: String,
    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    updatedAt: Date,
  });
  
  const eventSchema = new mongoose.Schema(
    {
      profiles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      timezone: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      updateLogs: [updateLogSchema],
    },
    {
      timestamps: true,
    }
  );
  
  const Event = mongoose.model("Event", eventSchema);

  module.exports = Event;
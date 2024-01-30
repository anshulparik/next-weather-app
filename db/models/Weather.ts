import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true
  },
  tempC: {
    type: Number,
    required: true,
  },
  tempF: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  feelsLike: {
    type: Number,
    required: true,
  },
  conditionImg: {
    type: String,
    required: true,
  },
  conditionText: {
    type: String,
    required: true,
  },
}); 

export const Weather =
  mongoose.models.Weather || mongoose.model("Weather", weatherSchema);

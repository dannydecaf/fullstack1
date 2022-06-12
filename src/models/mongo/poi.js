import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poiSchema = new Schema({
  title: String,
  description: String,
  longitude: Number,
  latitude: Number,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Poi = Mongoose.model("Poi", poiSchema);
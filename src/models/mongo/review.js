import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  reviewer: String,
  review: String,
  rating: Number,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "POI",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);
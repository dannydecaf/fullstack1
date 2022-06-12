import { Review } from "./review.js";
import { Poi } from "./poi.js";

export const reviewMongoStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async addReview(poiId, review) {
    review.poiid = poiId;
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  async getReviewsByPoiId(id) {
    const reviews = await Review.find({ poiid: id }).lean();
    return reviews;
  },

  async getReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  async deleteReview(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReviews() {
    await Review.deleteMany({});
  },

  async updateReview(review, updatedReview) {
    review.reviewer = updatedReview.reviewer;
    review.review = updatedReview.review;
    review.rating = updatedReview.rating;
    await review.save();
  },
};

import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/reviews.json"));
db.data = { reviews: [] };

export const reviewJsonStore = {
  async getAllReviews() {
    await db.read();
    return db.data.reviews;
  },

  async addReview(poiId, review) {
    await db.read();
    review._id = v4();
    review.poiid = poiId;
    db.data.reviews.push(review);
    await db.write();
    return review;
  },

  async getReviewsByPoiId(id) {
    await db.read();
    return db.data.reviews.filter((review) => review.poiid === id);
  },

  async getReviewById(id) {
    await db.read();
    return db.data.reviews.find((review) => review._id === id);
  },

  async deleteReview(id) {
    await db.read();
    const index = db.data.reviews.findIndex((review) => review._id === id);
    db.data.reviews.splice(index, 1);
    await db.write();
  },

  async deleteAllReviews() {
    db.data.reviews = [];
    await db.write();
  },

  async updateReview(review, updatedReview) {
    review.reviewer = updatedReview.reviewer;
    review.review = updatedReview.review;
    review.rating = updatedReview.rating;
    await db.write();
  },
};

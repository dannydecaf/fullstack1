import { v4 } from "uuid";

let reviews = [];

export const reviewMemStore = {
  async getAllReviews() {
    return reviews;
  },

  async addReviews(poiId, review) {
    review._id = v4();
    review.poiid = poiId;
    review.push(review);
    return review;
  },

  async getReviewssByPoiId(id) {
    return reviews.filter((review) => review.poiid === id);
  },

  async getReviewById(id) {
    return reviews.find((review) => review._id === id);
  },

  async getPoiReviews(poiId) {
    return reviews.filter((review) => review.poiid === poiId);
  },

  async deleteReview(id) {
    const index = reviews.findIndex((review) => review._id === id);
    reviews.splice(index, 1);
  },

  async deleteAllReviews() {
    reviews = [];
  },

  async updateReview(review, updatedReview) {
    review.reviewer = updatedReview.reviewer;
    review.review = updatedReview.review;
    review.rating = updatedReview.rating;
  },
};

import { v4 } from "uuid";
import { reviewMemStore } from "./review-mem-store.js";

let pois = [];

export const poiMemStore = {
  async getAllPois() {
    return pois;
  },

  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },

  async getPoiById(id) {
    const list = pois.find((poi) => poi._id === id);
    if (list) {
      list.reviews = await reviewMemStore.getReviewsByPoiId(list._id);
      return list;
    }
    return null;
  },

  async getUserPois(userid) {
    return pois.filter((poi) => poi.userid === userid);
  },

  async deletePoiById(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    if (index !== -1) pois.splice(index, 1);
  },

  async deleteAllPois() {
    pois = [];
  },
};
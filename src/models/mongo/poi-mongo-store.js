import { Poi } from "./poi.js";
import { reviewMongoStore } from "./review-mongo-store.js"

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().lean();
    return pois;
  },

  async getPoiById(id) {
    if (id) {
      const poi = await Poi.findOne({ _id: id }).lean();
      if (poi) {
        poi.reviews = await reviewMongoStore.getReviewsByPoiId(poi._id);
      }
      return poi;
    }
    return null;
  },

  async addPoi(poi) {
    const newPoi = new Poi(poi);
    const poiObj = await newPoi.save();
    return this.getPoiById(poiObj._id);
  },

  async updatePoi(updatedPoi) {
    const poi = await Poi.findOne({ _id: updatedPoi._id });
    poi.title = updatedPoi.title;
    poi.description = updatedPoi.description;
    poi.longitude = updatedPoi.longitude;
    poi.latitude = updatedPoi.latitude;
    poi.img = updatedPoi.img;
    await poi.save();
  },

  async getUserPois(id) {
    const poi = await Poi.find({ userid: id }).lean();
    return poi;
  },

  async deletePoiById(id) {
    try {
      await Poi.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPois() {
    await Poi.deleteMany({});
  }
};
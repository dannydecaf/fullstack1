import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(countyId, place) {
    await db.read();
    place._id = v4();
    place.countyid = countyId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCountyId(id) {
    await db.read();
    return db.data.places.filter((place) => place.countyid === id);
  },

  async getPlaceById(id) {
    await db.read();
    return db.data.places.find((place) => place._id === id);
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.place = updatedPlace.place;
    place.description = updatedPlace.description;
    place.latitude = updatedPlace.latitude;
    place.longitude = updatedPlace.longitude;
    await db.write();
  },
};

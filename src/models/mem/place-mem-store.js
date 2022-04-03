import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlaces(countyId, place) {
    place._id = v4();
    place.countyid = countyId;
    places.push(place);
    return place;
  },

  async getPlacesByCountyId(id) {
    return places.filter((place) => place.countyid === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getCountyPlaces(countyId) {
    return places.filter((place) => place.countyid === countyId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.place = updatedPlace.place;
    place.description = updatedPlace.description;
    place.latitude = updatedPlace.latitude;
    place.longitude = updatedPlace.longitude;
  },
};

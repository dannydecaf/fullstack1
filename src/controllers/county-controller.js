import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";

export const countyController = {
  index: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const viewData = {
        title: "County",
        county: county,
      };
      return h.view("county-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("county-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const newPlace = {
        place: request.payload.place,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placeStore.addPlace(county._id, newPlace);
      return h.redirect(`/county/${county._id}`);
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/county/${county._id}`);
    },
  },
};
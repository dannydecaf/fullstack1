import { db } from "../models/db.js";
import { PoiSpec, ReviewSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const viewData = {
        title: "Poi",
        poi: poi,
      };
      return h.view("poi-view", viewData);
    },
  },

  addReview: {
    validate: {
      payload: ReviewSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poi-view", { title: "Add review error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const newReview = {
        reviewer: request.payload.reviewer,
        review: request.payload.review,
        rating: Number(request.payload.rating),
      };
      await db.reviewStore.addReview(poi._id, newReview);
      return h.redirect(`/poi/${poi._id}`);
    },
  },

  deleteReview: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      await db.reviewStore.deleteReview(request.params.reviewid);
      return h.redirect(`/poi/${poi._id}`);
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          poi.img = url;
          db.poiStore.updatePoi(poi);
        }
        return h.redirect(`/poi/${poi._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/poi/${poi._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};
import {db} from "../models/db.js";
import {ReviewSpec, PublicPoiSpec} from "../models/joi-schemas.js";

export const publicPoiController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            // const publicPoi = await db.poiStore.getUserPublicPois(loggedInUser._id);
            const publicPoi = await db.publicPoiStore.getAllPublicPois();
            const viewData = {
                title: "Public POI Dashboard",
                user: loggedInUser,
                publicPoi: publicPoi,
            };
            return h.view("public-poi-view", viewData);
        },
    },

    addPublicPoi: {
        validate: {
            payload: PublicPoiSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("public-poi-view", { title: "Add PublicPoi error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newPublicPoi = {
                userid: loggedInUser._id,
                name: request.payload.name,
            };
            await db.publicPoiStore.addPublicPoi(newPublicPoi);
            return h.redirect("/public");
        },
    },
    deletePublicPoi: {
        handler: async function (request, h) {
            const publicPoi = await db.publicPoiStore.getPublicPoiById(request.params.id);
            await db.publicPoiStore.deletePublicPoiById(publicPoi._id);
            return h.redirect("/public");
        },
    },

    showReviews: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            // const publicPoi = await db.publicPoiStore.getAllPublicPois();
            const review = await db.reviewStore.getAllReviews();
            const viewData = {
                title: "Review Dashboard",
                user: loggedInUser,
                review: review,
            };
            return h.view("review-view", viewData);
        },
    },

    addReview: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("review-view", { name: "Add review error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const publicPoi = await db.publicPoiStore.getPublicPoiById(request.params.id);
            const newReview = {
                name: request.payload.name,
                description: request.payload.description,
                // date
                // rating/stars
                // User - donation form
            };
            await db.reviewStore.addReview(publicPoi._id, newReview);
            return h.redirect(`/review/${publicPoi._id}`);
        },
    },

    deleteReview: {
        handler: async function (request, h) {
            const publicPoi = await db.publicPoiStore.getPublicPoiById(request.params.id);
            await db.reviewStore.deleteReview(request.params.reviewid);
            return h.redirect(`/review/${publicPoi._id}`);
        },
    },
};


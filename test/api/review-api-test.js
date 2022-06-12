import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { master, antrim, testPois, testReviews, boora } from "../fixtures.js";

suite("Review API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(master);
    await placemarkService.authenticate(master);
    await placemarkService.deleteAllPois();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllReviews();
    user = await placemarkService.createUser(master);
    await placemarkService.authenticate(master);
    antrim.userid = user._id;
    beethovenSonatas = await placemarkService.createPoi(antrim);
  });

  teardown(async () => {});

  test("create review", async () => {
    const returnedReview = await placemarkService.createReview(beethovenSonatas._id, boora);
    assertSubset(boora, returnedReview);
  });

  test("create Multiple reviews", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createReview(beethovenSonatas._id, testReviews[i]);
    }
    const returnedReviews = await placemarkService.getAllReviews();
    assert.equal(returnedReviews.length, testReviews.length);
    for (let i = 0; i < returnedReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const review = await placemarkService.getReview(returnedReviews[i]._id);
      assertSubset(review, returnedReviews[i]);
    }
  });

  test("Delete Review", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createReview (beethovenSonatas._id, testReviews[i]);
    }
    let returnedReviews = await placemarkService.getAllReviews();
    assert.equal(returnedReviews.length, testReviews.length);
    for (let i = 0; i < returnedReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const review = await placemarkService.deleteReview(returnedReviews[i]._id);
    }
    returnedReviews = await placemarkService.getAllReviews();
    assert.equal(returnedReviews.length, 0);
  });

  test("denormalised poi", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createReview(beethovenSonatas._id, testReviews[i]);
    }
    const returnedPoi = await placemarkService.getPoi(beethovenSonatas._id);
    assert.equal(returnedPoi.reviews.length, testReviews.length);
    for (let i = 0; i < testReviews.length; i += 1) {
      assertSubset(testReviews[i], returnedPoi.reviews[i]);
    }
  });
});

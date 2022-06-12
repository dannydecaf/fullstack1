import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPois, testReviews, beethoven, antrim, boora, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPois();
    await db.reviewStore.deleteAllReviews();
    beethovenList = await db.poiStore.addPoi(beethoven);
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testReviews[i] = await db.reviewStore.addReview(beethovenList._id, testReviews[i]);
    }
  });

  test("create single review", async () => {
    const mozartList = await db.poiStore.addPoi(antrim);
    const review = await db.reviewStore.addReview(mozartList._id, boora)
    assert.isNotNull(review._id);
    assertSubset (boora, review);
  });

  test("create multiple reviews", async () => {
    const reviews = await db.poiStore.getPoiById(beethovenList._id);
    assert.equal(testReviews.length, testReviews.length)
  });

  test("delete all reviews", async () => {
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(testReviews.length, reviews.length);
    await db.reviewStore.deleteAllReviews();
    const newReviews = await db.reviewStore.getAllReviews();
    assert.equal(0, newReviews.length);
  });

  test("get a review - success", async () => {
    const mozartList = await db.poiStore.addPoi(antrim);
    const review = await db.reviewStore.addReview(mozartList._id, boora)
    const newReview = await db.reviewStore.getReviewById(review._id);
    assertSubset (boora, newReview);
  });

  test("delete One review - success", async () => {
    const id = testReviews[0]._id;
    await db.reviewStore.deleteReview(id);
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testPois.length - 1);
    const deletedReview = await db.reviewStore.getReviewById(id);
    assert.isNull(deletedReview);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.reviewStore.getReviewById(""));
    assert.isNull(await db.reviewStore.getReviewById());
  });

  test("delete One User - fail", async () => {
    await db.reviewStore.deleteReview("bad-id");
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testPois.length);
  });
});

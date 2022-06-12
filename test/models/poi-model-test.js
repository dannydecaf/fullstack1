import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPois, antrim } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("POI Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPois();
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(testPois[i]);
    }
  });

  test("create a poi", async () => {
    const poi = await db.poiStore.addPoi(antrim);
    assertSubset(antrim, poi);
    assert.isDefined(poi._id);
  });

  test("delete all POIs", async () => {
    let returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 18);
    await db.poiStore.deleteAllPois();
    returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("get a poi - success", async () => {
    const poi = await db.poiStore.addPoi(antrim);
    const returnedPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset(antrim, poi);
  });

  test("delete One POI - success", async () => {
    const id = testPois[0]._id;
    await db.poiStore.deletePoiById(id);
    const returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, testPois.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(id);
    assert.isNull(deletedPoi);
  });

  test("get a POI - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete One POI - fail", async () => {
    await db.poiStore.deletePoiById("bad-id");
    const allPois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, allPois.length);
  });
});

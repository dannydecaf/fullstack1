import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { placeJsonStore } from "./place-json-store.js";

const db = new Low(new JSONFile("./src/models/json/counties.json"));
db.data = { counties: [] };

export const countyJsonStore = {
  async getAllCounties() {
    await db.read();
    return db.data.counties;
  },

  async addCounty(county) {
    await db.read();
    county._id = v4();
    db.data.counties.push(county);
    await db.write();
    return county;
  },

  async getCountyById(id) {
    await db.read();
    const list = db.data.counties.find((county) => county._id === id);
    list.places = await placeJsonStore.getPlacesByCountyId(list._id);
    return list;
  },

  async getUserCounties(userid) {
    await db.read();
    return db.data.counties.filter((county) => county.userid === userid);
  },

  async deleteCountyById(id) {
    await db.read();
    const index = db.data.counties.findIndex((county) => county._id === id);
    db.data.counties.splice(index, 1);
    await db.write();
  },

  async deleteAllCounties() {
    db.data.counties = [];
    await db.write();
  },
};

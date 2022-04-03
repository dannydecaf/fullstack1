import { assert } from "chai";
import { db } from "../src/models/db.js";

suite("User API tests", () => {

  const master = {
    firstName: "Master",
    lastName: "User",
    email: "master@placemark.com",
    password: "mstr091256!",
  };

  setup(async () => {
    db.init();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(master);
    assert.deepEqual(master, newUser)
  });
});
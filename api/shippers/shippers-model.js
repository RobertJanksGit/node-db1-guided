db = require("../../data/db-config");

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};

async function get() {
  // const result = db.raw("select * from shippers;");
  const result = await db("shippers");
  // .select("phone", "shippername");
  return result;
}

async function getById(id) {
  const result = await db("shippers").where("shipperid", id).first();
  return result;
}

async function create(shipper) {
  const [id] = await db("shippers").insert(shipper);
  const result = await getById(id);
  return result;
}

async function update(id, changes) {
  await db("shippers").update(changes).where("shipperid", id);
  const result = await getById(id);
  return result;
}

async function remove(id) {
  const deletedShipper = await getById(id);
  await db("shippers").del().where("shipperid", id);
  return deletedShipper;
}

const knex = require("../knex");
const bcrypt = require("bcryptjs");

const GetUserByUsername = async (username) => {
  try {
    console.log("username", username);
    return await knex("users").first("*").where("username", username);
  } catch (error) {
    console.log("GetUserByUsername error", error);
    return error;
  }
};

const GetUserById = async (id) =>
  await knex("users")
    .first({ id: "id", username: "username", email: "email" })
    .where("id", id);

const CreateUser = async (person) => {
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }
    return bcrypt.hash(person.password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      return await knex("users").insert({
        username: person.username,
        email: person.email,
        password: hash,
      });
    });
  });
};

module.exports = {
  GetUserByUsername,
  GetUserById,
  CreateUser,
};

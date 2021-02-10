const knex = require("../knex");
const bcrypt = require("bcryptjs");

const GetUserByUsername = async (username) => {
  try {
    return await knex("users").first("*").where({ username: username });
  } catch (error) {
    return error;
  }
};

const GetUserById = async (id) => await knex("users").first({ id: "id", username: "username", email: "email" }).where("id", id);

const GetUserByToken = async (token) => await knex("users").first({ id: "id", username: "username", email: "email", token: "token" }).where("token", token);

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

const updateUserTokenById = async (id, token) => {
  console.log("id", id);
  console.log("token", token);
  return await knex("users").update({ token: token }).where("id", id);
};

module.exports = {
  GetUserByUsername,
  GetUserById,
  CreateUser,
  updateUserTokenById,
  GetUserByToken,
};

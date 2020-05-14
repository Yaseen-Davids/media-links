const knex = require("../knex");
const bcrypt = require("bcryptjs");

const GetUserByUsername = async (username) =>
  await knex("users").first("*").where("username", username);

const GetUserById = async (id) =>
  await knex("users")
    .first({
      id: "id",
      username: "username",
      email: "email",
    })
    .where("id", id);

const CreateUser = async (person) => {
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return err;
    }
    bcrypt.hash(person.password, salt, async (err, hash) => {
      if (err) {
        return err;
      }
      try {
        return await knex("users").insert({
          username: person.username,
          email: person.email,
          password: hash,
        });
      } catch (e) {
        return e;
      }
    });
  });
};

module.exports = {
  GetUserByUsername,
  GetUserById,
  CreateUser,
};

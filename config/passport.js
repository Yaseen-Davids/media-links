const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const { GetUserByUsername, GetUserById } = require("../repositories/user");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("username", username);
        console.log("password", password);

        bcrypt.hash(passwor, salt, async (error, hash) => {
          console.log("hash", hash);
        });

        const user = await GetUserByUsername(username);

        console.log("user", user);

        if (!user || user == undefined) {
          throw "User does not exist";
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log("bcrypt", err);
            return err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            console.log("Incorrect Username or Password");
            return done(null, false, {
              message: "Incorrect Username or Password",
            });
          }
        });
      } catch (error) {
        console.log("no user", user);
        return done(null, false, { message: error });
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await GetUserById(id);
    if (user) {
      done(null, user);
    }
  });
};

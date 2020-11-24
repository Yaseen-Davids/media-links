const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const { GetUserByUsername, GetUserById } = require("../repositories/user");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("PASSPORT STRATEGY");

        const user = await GetUserByUsername(username);

        console.log("passport user::: ", user);

        if (!user) {
          throw "User does not exist";
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log("bcrypt err:::: ", err);
            return err;
          }
          if (isMatch) {
            console.log("bcrypt isMatch");
            return done(null, user);
          } else {
            console.log("bcrypt Incorrect Username or Password");
            return done(null, false, {
              message: "Incorrect Username or Password",
            });
          }
        });
      } catch (error) {
        console.log("passport error::::", error);
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

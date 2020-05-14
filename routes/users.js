const express = require("express");
const router = express.Router();
const passport = require("passport");
const { CreateUser, GetUserById } = require("../repositories/user");
const { ensureAuthenticated } = require("../repositories/base");

router.get("/whoami", ensureAuthenticated, async (req, res, next) => {
  try {
    const user = await GetUserById(req.user.id);
    if (!user) {
      throw new Error("User not found!");
    }
    return res.send(user).end();
  } catch (error) {
    console.log("error", error);
    return next(e);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    try {
      if (err) {
        throw new Error(err);
      }
      if (!user) {
        throw new Error("Username or password is incorrect");
      }
      req.logIn(user, function (error) {
        if (error) {
          throw new Error(error);
        }
        return res.send();
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/register", async (req, res, next) => {
  try {
    await CreateUser(req.body);
    res.send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

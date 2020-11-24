const express = require("express");
const router = express.Router();
const passport = require("passport");
const { CreateUser, GetUserById } = require("../repositories/user");
const { ensureAuthenticated } = require("../repositories/base");

router.get("/whoami", ensureAuthenticated, async (req, res, next) => {
  try {
    const user = await GetUserById(req.user.id);
    if (!user) {
      return res.status(401).send();
    }
    return res.json({ ...user }).end();
  } catch (error) {
    return next(e);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    console.log("login neweerr", err);
    console.log("login user", user);
    try {
      if (err) {
        console.log("login err::::", err);
        throw new Error(err);
      }
      if (!user) {
        console.log("login err:::: Username or password is incorrect");
        throw new Error("Username or password is incorrect");
      }
      req.logIn(user, (error) => {
        if (error) {
          console.log("login error::::", error);
          throw new Error(error);
        }
        return res.send();
      });
    } catch (error) {
      console.log("login 12 error::::", error);
      return next(error);
    }
  })(req, res, next);
});

router.get("/logout", async (req, res, next) => {
  try {
    req.logout();
    return res.send();
  } catch (error) {
    return next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    await CreateUser(req.body);
    return res.send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

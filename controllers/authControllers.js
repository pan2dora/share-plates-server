const bcrypt = require("bcrypt");
const passport = require("passport");
// const User = require("../models/userModel");

const register = async (req, res, next) => {
  const { firstName, lastName, username, password, googleId } = req.body;
  console.log("This works", req.body);
  try {
    if (error) {
      return next(error);
    } else if (!firstName || !username || !password) {
      return res.status(400).json({
        error: { message: "Missing required fields." },
        statusCode: 400,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      googleId: googleId,
    };

    await newUser.save();

    req.login(newUser, (error) => {
      newUser.password = undefined;

      if (error) {
        return next(error);
      }
    });

    return res.status(201).json({
      success: { message: "New User Created!" },
      data: { newUser },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  if (err) {
    return next(err);
  }

  const userCopy = { ...req.user._doc };
  userCopy.password = undefined;
  console.log(userCopy);

  res.status(200).json({
    success: { message: "Login successful " },
    data: { user: userCopy },
  });
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
  });

  res.clearCookie("connect.sid");

  console.log("Initializing logout controller logic...");
  console.log("Session Destroyed");
  response.clearCookie("connect.sid");
  res.status(200).json({
    success: { message: "User Logged out!" },
    statusCode: 200,
  });

  // return res.status(200).json({
  //   success: { message: "User logged out!" },
  //   statusCode: 200,
  // });
};

const localLogin = async (req, res, next) => {
  const userCopy = { ...req.user._doc };
  userCopy.password = undefined;
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: { message: "There is not a user detected. Please try again" },
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      console.log(userCopy);

      res.status(200).json({
        success: { message: "Login Successful" },
        data: { user: userCopy },
        result: result,
        statusCode: 200,
      });
    });
  });
};

module.exports = { register, login, logout, localLogin };

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/userModels");

const register = async (req, res, next) => {
  const { firstname, lastname, username, password, googleId } = req.body;
  console.log("This works", req.body);
  try {
    if (!firstname || !username || !password) {
      return res.status(400).json({
        error: { message: "Missing required fields." },
        statusCode: 400,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: hashedPassword,
      googleId: googleId,
    });

    await newUser.save();

    req.login(newUser, (error) => {
      newUser.password = undefined;
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
  if (error) {
    return next(error);
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
  req.logout((error) => {
    if (error) {
      return next(err);
    }
  });

  req.session.destroy((error) => {
    if (error) {
      return next(error);
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
      const userCopy = { ...req.user._doc };
      userCopy.password = undefined;
      console.log(userCopy);

      res.status(200).json({
        success: { message: "Login Successful" },
        data: { user: userCopy },
        statusCode: 200,
      });
    });
  });
};

module.exports = { register, login, logout, localLogin };

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/index.js';
import sendResponse from '../utils/sendResponse.js';

const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

class AuthController {
  static hashPassword = (password) => {
    return bcrypt.hash(password, Number(SALT_ROUNDS));
  };

  static generateAccessToken = (payload) => {
    return jwt.sign(payload, PASSPORT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
  };

  static generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXP,
    });
  };

  static verifyToken = (token) => {
    return jwt.verify(token, PASSPORT_SECRET);
  };

  static register = async (req, res, next) => {
    try {
      // 檢查使用者信箱是否已被註冊
      const { email, username, password, role } = req.body;
      const emailExist = await UserModel.findOne({ email });

      if (emailExist) {
        return sendResponse({
          res,
          status: 400,
          message: 'Email has been registered.',
        });
      }

      const newUser = new UserModel({ email, username, password, role });
      await newUser.save();
      sendResponse({
        res,
        status: 200,
        message: 'Registered successfully. Please log in.',
      });
    } catch (err) {
      next(err);
    }
  };

  static login = async (req, res, next) => {
    try {
      // 檢查是否有該使用者
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return sendResponse({
          res,
          status: 400,
          message: 'User not found.',
        });
      }

      // 檢查密碼是否正確
      const hashPassword = user.password;
      const isMatched = await user.isPasswordMatched(password, hashPassword);

      if (!isMatched) {
        return sendResponse({
          res,
          status: 400,
          message: 'Wrong password.',
        });
      }

      // 製作JWT
      const { username, role, _id } = user;
      const payload = { username, role, email };
      const accessToken = AuthController.generateAccessToken(payload);
      const refreshToken = AuthController.generateRefreshToken(payload);

      sendResponse({
        res,
        status: 200,
        message: 'Login successfully.',
        value: {
          accessToken,
          refreshToken,
          role,
          id: _id,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  static resetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      // TODO
      // 寄信到使用者email
    } catch (err) {
      next(err);
    }
  };

  static getUserInfo = async (req, res, next) => {
    try {
      const user = req.user;
      const { username, email, date } = user;
      sendResponse({
        res,
        status: 200,
        value: {
          username,
          email,
          date,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;

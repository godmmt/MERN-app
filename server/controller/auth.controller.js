import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/index.js';

class AuthController {
  static hashPassword = (password) => {
    return bcrypt.hash(password, 10);
  };

  static generateAccessToken = (tokenObj) => {
    return jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
  };

  static generateRefreshToken = (tokenObj) => {
    return jwt.sign(tokenObj, process.env.REFRESH_TOKEN_SECRET);
  };

  /*-------註冊-------*/
  static register = async (req, res) => {
    // 檢查使用者信箱是否已被註冊
    const { email, username, password, role } = req.body;
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(400).send({
        success: false,
        message: 'Email has already been registered.',
      });
    }

    // 通過以上的檢查都OK後就幫使用者註冊
    try {
      const newUser = new UserModel({ email, username, password, role });
      const savedUser = await newUser.save();
      res.status(200).send({
        success: true,
        saveObject: savedUser,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };

  /*-------登入-------*/
  static login = async (req, res) => {
    try {
      // 檢查資料庫是否有該使用者
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: 'User not found.',
        });
      }

      // 有的話就產生JWT
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (isMatch) {
          // 製作JWT
          const accessToken = AuthController.generateAccessToken({ email, password });
          const refreshToken = AuthController.generateRefreshToken({ email, password });
          // 伺服器回傳物件包含屬性success & token & 物件user
          res.status(200).send({
            success: true,
            token: `bearer ${accessToken}`,
            refreshToken,
            user,
          });
        } else {
          res.status(400).send({
            success: false,
            message: 'Wrong password.',
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  };

  static resetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    try {
    } catch (error) {}
  };

  // static refreshToken = async (req, res) => {};

  // static revokeToken = async (req, res) => {};
}

export default AuthController;

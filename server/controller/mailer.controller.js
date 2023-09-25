import 'dotenv/config';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import ejs from 'ejs';
import SubscriberModel from '../models/subscriber.model.js';
import { UserModel } from '../models/index.js';
import sendResponse from '../utils/sendResponse.js';

// 到GCP啟用API服務
// 參考：https://israynotarray.com/nodejs/20230722/1626712457/
// 拿取refreshToken和accessToken，可以參考：https://rupali.hashnode.dev/send-emails-in-nodejs-using-nodemailer-gmail-oauth2
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
const EMAIL_CLIENT_ID = process.env.EMAIL_CLIENT_ID;
const EMAIL_CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
const EMAIL_REDIRECT_URL = process.env.EMAIL_REDIRECT_URL;
const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;

// 創建google OAuth2客戶端
const oAuth2Client = new OAuth2Client(EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REDIRECT_URL);

// 刷新token
oAuth2Client.setCredentials({
  refresh_token: EMAIL_REFRESH_TOKEN,
});

// 創建SMTP連接埠
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: EMAIL_ACCOUNT,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
});

class MailerController {
  // 忘記密碼
  static forgetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return sendResponse({
        res,
        status: 400,
        message: 'User not found.',
      });
    }

    ejs.renderFile(process.cwd() + '/templates/email/forgetPassword.ejs', { username: user.username }, (err, html) => {
      if (err) {
        console.log(err);
        return sendResponse({
          res,
          status: 500,
          message: err.message,
        });
      }

      const mailDetails = {
        from: EMAIL_ACCOUNT,
        to: email,
        subject: 'Reset your password',
        html,
      };
      transport.sendMail(mailDetails, (err, info) => {
        if (err) {
          console.log(err);
          return sendResponse({
            res,
            status: 500,
            message: err.message,
          });
        }

        sendResponse({
          res,
          status: 200,
          message: 'A password reset email has been sent to your mailbox.',
        });
      });
    });
  };

  // 訂閱電子報
  static subscribeNewsLetter = async (req, res) => {
    const { email } = req.body;

    const subscriber = await SubscriberModel.findOne({ email });

    if (subscriber) {
      return sendResponse({
        res,
        status: 200,
        message: "You've already subscribed.",
      });
    }

    try {
      const newSubscriber = new SubscriberModel({ email });
      await newSubscriber.save();
      ejs.renderFile(
        process.cwd() + '/templates/email/newsletter.ejs',
        { email: Buffer.from(email).toString('base64'), link: process.env.CLIENT_SERVER },
        (err, html) => {
          if (err) {
            console.log(err);
            return sendResponse({
              res,
              status: 500,
              message: err.message,
            });
          }

          const mailDetails = {
            from: EMAIL_ACCOUNT,
            to: email,
            subject: 'Thanks for your subscription.',
            html,
          };

          transport.sendMail(mailDetails, (err, info) => {
            if (err) {
              console.log(err);
              return sendResponse({
                res,
                status: 500,
                message: err.message,
              });
            }

            sendResponse({
              res,
              status: 200,
              message: 'Thank you for your subscription! Please check your mailbox.',
            });
          });
        }
      );
    } catch (err) {
      console.log(err);
      sendResponse({
        res,
        status: 500,
        message: err.message,
      });
    }
  };

  // 取消電子報
  static unsubscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    const decodeEmail = Buffer.from(email, 'base64').toString();

    const subscriber = await SubscriberModel.findOne({ email: decodeEmail });

    if (!subscriber) {
      return sendResponse({
        res,
        status: 400,
        message: "Can't find subscriber.",
      });
    }

    try {
      await SubscriberModel.deleteOne({ email: decodeEmail });
      sendResponse({
        res,
        status: 200,
        message: 'You have been successfully removed from our mailing list. You will no longer receive email updates from us.',
      });
    } catch (err) {
      console.log(err);
      sendResponse({
        res,
        status: 500,
        message: err.message,
      });
    }
  };
}

export default MailerController;

import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { UserModel } from '../models/index.js';

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

    ejs.renderFile(process.cwd() + '/templates/email/forgetPassword.ejs', { username: user.username, link: '#' }, (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send(err.message);
      }

      const mailDetails = {
        from: EMAIL_ACCOUNT,
        to: email,
        subject: 'Reset your password',
        html,
      };
      transport.sendMail(mailDetails, (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        } else {
          res.status(200).send('A password reset email has been sent to your mailbox.');
        }
      });
    });
  };

  // 訂閱電子報
  static subscribeNewsLetter = async (req, res) => {
    const { email } = req.body;

    ejs.renderFile(process.cwd() + '/templates/email/newsletter.ejs', {}, (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send(err.message);
      }

      const mailDetails = {
        from: EMAIL_ACCOUNT,
        to: email,
        subject: 'Thanks for your subscription.',
        html,
      };

      transport.sendMail(mailDetails, (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        } else {
          res.status(200).send('Thank you for your subscription!');
        }
      });
    });
  };
}

export default MailerController;

import 'dotenv/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// 到GCP啟用API服務
// 參考：https://www.youtube.com/watch?v=k-6KFSnaFTU&ab_channel=ProgrammingInBlood

const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_CLIENT_ID = process.env.EMAIL_CLIENT_ID;
const EMAIL_CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
const EMAIL_REDIRECT_URL = process.env.EMAIL_REDIRECT_URL;
const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;

const createTransporter = async () => {
  try {
    /* 
    // 創建google OAuth2客戶端
    const oAuth2Client = new google.auth.OAuth2(EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REDIRECT_URL);

    // 刷新token
    oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });

    // 拿取新的access token
    const accessToken = await oAuth2Client.getAccessToken();

    // 創建SMTP連接埠
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_ACCOUNT,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    */

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
      },
    });

    return transport;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const transport = await createTransporter();

export default transport;

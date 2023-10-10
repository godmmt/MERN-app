import 'dotenv/config';
import ejs from 'ejs';
import SubscriberModel from '../models/subscriber.model.js';
import { UserModel } from '../models/index.js';
import sendResponse from '../utils/sendResponse.js';
import transport from '../config/mail.config.js';

const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;

class MailerController {
  // 忘記密碼-變更密碼
  static resetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return sendResponse({
        res,
        status: 400,
        message: 'This account does not exist.',
      });
    }

    ejs.renderFile(process.cwd() + '/templates/email/resetPassword.ejs', { username: user.username }, (err, html) => {
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

          transport.sendMail(mailDetails, async (err, info) => {
            if (err) {
              console.log(err);
              return sendResponse({
                res,
                status: 500,
                message: err.message,
              });
            }

            const newSubscriber = new SubscriberModel({ email });
            await newSubscriber.save();
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
    // 解碼以 base64 編碼的郵件地址
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

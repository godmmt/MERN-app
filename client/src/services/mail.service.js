// TODO：發送信件的 APIs

import axios from 'config/axios.config';
class MailerService {
  static subscribeNewsletter(email) {
    return axios.post('/mailer/subscribe-newsletter', { email });
  }

  static unsubscribeNewsletter(email) {}

  static forgetPassword(email) {}
}

export default MailerService;

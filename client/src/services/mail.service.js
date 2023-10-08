// 發送信件的 APIs

import axios from 'config/axios.config';
class MailerService {
  static subscribeNewsletter(email) {
    return axios.post('/mailer/subscribe-newsletter', { email });
  }

  static unsubscribeNewsletter(email) {
    return axios.post('/mailer/unsubscribe-newsletter', { email });
  }

  static resetPassword(email) {
    return axios.post('/mailer/reset-password', { email });
  }
}

export default MailerService;

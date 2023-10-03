import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import MailerService from 'services/mail.service';
import './subscription.scss';

const Subscription = () => {
  const emailInput = useRef(null);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = async () => {
    const email = emailInput.current.value;
    // TODO: 串接訂閱電子報 API
    try {
      const res = await MailerService.subscribeNewsletter(email);
      setSubscribeMessage(res.data.message);
    } catch (err) {
      setSubscribeMessage(err.data.message === 'No recipients defined' ? 'Your email seems to be incorrect. Please re-enter.' : err.data.message);
    }
  };

  return (
    <section className='subscription'>
      <div>SUBSCRIBE</div>
      <h3>All Access Membership</h3>
      <p>Unleash the Secrets of Knowledge, Subscribe to our Newsletter!</p>
      <div className='action'>
        <input type='email' placeholder='Please enter your email' ref={emailInput} />
        <Button onClick={handleSubscribe}>Subscribe!</Button>
        <p>{subscribeMessage}</p>
      </div>
    </section>
  );
};

export default Subscription;

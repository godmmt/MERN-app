import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import MailerService from 'services/mail.service';
import './subscription.scss';

const Subscription = () => {
  const emailInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const email = emailInput.current.value;
    if (email.trim() === '') {
      window.alert('Please enter a valid email.');
      emailInput.current.value = '';
      return;
    }
    setLoading(true);
    try {
      const res = await MailerService.subscribeNewsletter(email);
      window.alert(res.data.message);
    } catch (err) {
      window.alert(err.data.message === 'No recipients defined' ? 'Your email seems to be incorrect. Please re-enter.' : err.data.message);
    }
    emailInput.current.value = '';
    setLoading(false);
  };

  return (
    <section className='subscription'>
      <div>SUBSCRIBE</div>
      <h3>All Access Membership</h3>
      <p>Unleash the Secrets of Knowledge, Subscribe to our Newsletter!</p>
      <div className='action'>
        <input type='email' placeholder='Please enter your email' ref={emailInput} />
        <Button loading={loading} onClick={handleSubscribe}>
          Subscribe!
        </Button>
      </div>
    </section>
  );
};

export default Subscription;

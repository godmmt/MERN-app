import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import MailerService from 'services/mail.service';
import './subscription.scss';

const Subscription = () => {
  const emailInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    toast.dismiss(); // clear toasts
    const email = emailInput.current.value;
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(email);
    };
    if (email.trim() === '' || !isValidEmail(email)) {
      toast.warning('Please enter a valid email.');
      emailInput.current.value = '';
      return;
    }
    setLoading(true);
    const pendingToastId = toast.loading('Wait a moment ...');
    try {
      const res = await MailerService.subscribeNewsletter(email);
      toast.update(pendingToastId, { render: res.data.message || 'Subscribe Success', type: 'success', isLoading: false, closeOnClick: true });
    } catch (err) {
      toast.update(pendingToastId, { render: err.data?.message || 'System Error', type: 'error', isLoading: false, closeOnClick: true });
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

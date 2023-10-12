import React, { useRef } from 'react';
import Button from 'components/Button';
import MailerService from 'services/mail.service';
import useLoadingButton from 'hooks/useLoadingButton';
import './subscription.scss';

const Subscription = () => {
  const emailInput = useRef(null);
  const { isButtonVisible, hideButton, showButton } = useLoadingButton();

  const handleSubscribe = async () => {
    const email = emailInput.current.value;
    hideButton();
    try {
      const res = await MailerService.subscribeNewsletter(email);
      window.alert(res.data.message);
    } catch (err) {
      window.alert(err.data.message === 'No recipients defined' ? 'Your email seems to be incorrect. Please re-enter.' : err.data.message);
    }
    emailInput.current.value = '';
    showButton();
  };

  return (
    <section className='subscription'>
      <div>SUBSCRIBE</div>
      <h3>All Access Membership</h3>
      <p>Unleash the Secrets of Knowledge, Subscribe to our Newsletter!</p>
      <div className='action'>
        <input type='email' placeholder='Please enter your email' ref={emailInput} />
        <Button cx={isButtonVisible ? '' : 'hide-button'} onClick={handleSubscribe}>
          Subscribe!
        </Button>
      </div>
    </section>
  );
};

export default Subscription;

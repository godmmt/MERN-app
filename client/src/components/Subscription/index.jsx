import React, { useRef } from 'react';
import Button from 'components/Button';
import './subscription.scss';

const Subscription = () => {
  const emailInput = useRef('');

  const handleSubscribe = () => {
    console.log(emailInput.current.value);
  };

  return (
    <section className='subscription'>
      <div>SUBSCRIBE</div>
      <h3>All Access Membership</h3>
      <p>Unleash the Secrets of Knowledge, Subscribe to our Newsletter!</p>
      <div className='action'>
        <input type='text' placeholder='Please enter your email' ref={emailInput} />
        <Button onClick={handleSubscribe}>Subscribe!</Button>
      </div>
    </section>
  );
};

export default Subscription;

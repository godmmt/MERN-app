import React, { useEffect, useState } from 'react';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import './scrollToTopBtn.scss';

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(!!(window.scrollY > window.innerHeight));
    };
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button className='scroll-to-top-btn' onClick={scrollToTop}>
        <FontAwesomeIcon className='circle-up-icon' icon={faCircleArrowUp} fixedWidth />
      </button>
    )
  );
};

export default ScrollToTopBtn;

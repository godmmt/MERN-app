import React from 'react';

const Footer = () => {
  return (
    <footer className='p-3 mt-4 text-muted border-top position-fixed bottom-0 w-100'>
      &copy; {new Date().getFullYear()} Ming
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import { ROUTER_PATH } from 'App';
import Button from 'components/Button';
import './postCourse.scss';

const PostCourse = (props) => {
  const { currentUser, setIsModalOpen } = props;
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    setIsModalOpen(true);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeSubtitle = (e) => {
    setSubtitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeImg = (e) => {
    setImg(e.target.value);
  };

  const postCourse = () => {
    CourseService.post({ title, subtitle, description, price, img })
      .then((res) => {
        console.log({ res });
        window.alert('New course has been created. Now redirect to My Course page.');
        navigate(ROUTER_PATH.profile);
      })
      .catch((error) => {
        console.log({ error });
        setMessage(error.data);
      });
  };

  return (
    <main className='post-course'>
      {!currentUser && (
        <div className='alert-msg'>
          <p>You must login first before seeing posts.</p>
          <Button cx='login-btn' onClick={handleTakeToLogin}>
            Click me to login
          </Button>
        </div>
      )}
      {currentUser && currentUser.user.role !== 'instructor' && (
        <div className='alert-msg'>
          <p>Only instructors can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div className='form'>
          <div className='form-header'>
            <h2>Enter the information for the course you want to teach.</h2>
          </div>
          <div className='form-content'>
            <div>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title' onChange={handleChangeTitle} />
            </div>
            <div>
              <label htmlFor='subtitle'>Subtitle</label>
              <input type='text' id='subtitle' onChange={handleChangeSubtitle} />
            </div>

            <div>
              <label htmlFor='price'>Price</label>
              <input type='number' id='price' onChange={handleChangePrice} />
            </div>
            <div>
              <label htmlFor='img'>Your course's image</label>
              <input type='text' id='img' onChange={handleChangeImg} placeholder='url only' />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea id='description' onChange={handleChangeDescription}></textarea>
            </div>
          </div>
          {message && <div className='error-msg'>{message}</div>}
          <Button cx='submit-btn' onClick={postCourse}>
            Submit
          </Button>
        </div>
      )}
    </main>
  );
};

export default PostCourse;

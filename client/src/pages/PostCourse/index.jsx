import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import { ROUTER_PATH } from 'App';
import Button from 'components/Button';
import LoginWarning from 'components/LoginWarning';
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
      <LoginWarning currentUser={currentUser} setIsModalOpen={setIsModalOpen}></LoginWarning>

      {currentUser && currentUser.user.role !== 'instructor' && (
        <section className='alert-msg'>
          <p>Only instructors can post new courses.</p>
        </section>
      )}

      <section className='main-content'>
        {currentUser && currentUser.user.role === 'instructor' && (
          <div className='form'>
            <div className='form-header'>
              <h2>Enter the information for the course you want to teach.</h2>
            </div>
            <div className='form-content'>
              <div className='input-field'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' onChange={handleChangeTitle} />
              </div>
              <div className='input-field'>
                <label htmlFor='subtitle'>Subtitle</label>
                <input type='text' id='subtitle' onChange={handleChangeSubtitle} />
              </div>
              <div className='input-field'>
                <label htmlFor='price'>Price</label>
                <input type='number' id='price' onChange={handleChangePrice} />
              </div>
              <div className='input-field'>
                <label htmlFor='img'>Your course's image</label>
                <input type='text' id='img' onChange={handleChangeImg} placeholder='url only' />
              </div>
              <div className='input-field'>
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
      </section>
    </main>
  );
};

export default PostCourse;

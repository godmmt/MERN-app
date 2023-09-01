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
        navigate(ROUTER_PATH.myCourses);
      })
      .catch((error) => {
        console.log({ error });
        setMessage(error.data);
      });
  };

  return (
    <main className='post-course'>
      {!currentUser && (
        <div>
          <p>You must login first before seeing posts.</p>
          <button onClick={handleTakeToLogin}>Take me to login page.</button>
        </div>
      )}
      {currentUser && currentUser.user.role !== 'instructor' && (
        <div>
          <h1>Only instructors can post new courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' onChange={handleChangeTitle} />
          <br />
          <label htmlFor='subtitle'>Subtitle:</label>
          <input type='text' id='subtitle' onChange={handleChangeSubtitle} />
          <br />
          <label htmlFor='description'>Description:</label>
          <textarea id='description' onChange={handleChangeDescription}></textarea>
          <br />
          <label htmlFor='price'>Price:</label>
          <input type='number' id='price' onChange={handleChangePrice} />
          <br />
          <label htmlFor='img'>Your course's img:</label>
          <input type='text' id='img' onChange={handleChangeImg} />
          <br />
          <Button onClick={postCourse}>Submit</Button>
          <br />
          {message && <div role='alert'>{message}</div>}
        </div>
      )}
    </main>
  );
};

export default PostCourse;

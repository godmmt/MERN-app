import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import './postCourse.scss';

const PostCourse = (props) => {
  const { currentUser } = props;
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate('/login');
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
  const postCourse = () => {
    CourseService.post({ title, subtitle, description, price })
      .then(() => {
        window.alert('New course has been created.');
        navigate('/my-courses');
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
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
          <label htmlFor='exampleForTitle'>Title</label>
          <input name='title' type='text' id='exampleForTitle' onChange={handleChangeTitle} />
          <br />
          <label htmlFor='exampleForSubtitle'>Subtitle</label>
          <input name='subtitle' type='text' id='exampleForSubtitle' onChange={handleChangeSubtitle} />
          <br />
          <label htmlFor='exampleForContent'>Content</label>
          <textarea id='exampleForContent' aria-describedby='emailHelp' name='content' onChange={handleChangeDescription}></textarea>
          <br />
          <label htmlFor='exampleForPrice'>Price</label>
          <input name='price' type='number' id='exampleForPrice' onChange={handleChangePrice} />
          <br />
          <button onClick={postCourse}>Submit</button>
          <br />
          <br />
          {message && <div role='alert'>{message}</div>}
        </div>
      )}
    </main>
  );
};

export default PostCourse;

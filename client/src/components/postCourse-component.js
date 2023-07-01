import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CourseService from '../services/course.service';

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push('/login');
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert('New course has been created.');
        history.push('/course');
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>You must login first before seeing posts.</p>
          <button class='btn btn-primary btn-lg' onClick={handleTakeToLogin}>
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== 'instructor' && (
        <div>
          <h1>Only instructors can post new courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div className='form-group'>
          <label for='exampleForTitle'>Title</label>
          <input
            name='title'
            type='text'
            className='form-control'
            id='exampleForTitle'
            onChange={handleChangeTitle}
          />
          <br />
          <label for='exampleForContent'>Content</label>
          <textarea
            className='form-control'
            id='exampleForContent'
            aria-describedby='emailHelp'
            name='content'
            onChange={handleChangeDescription}
          ></textarea>
          <br />
          <label for='exampleForPrice'>Price</label>
          <input
            name='price'
            type='number'
            className='form-control'
            id='exampleForPrice'
            onChange={handleChangePrice}
          />
          <br />
          <button className='btn btn-primary' onClick={postCourse}>
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className='alert alert-warning' role='alert'>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;

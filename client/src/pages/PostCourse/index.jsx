import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import CourseService from '../../services/course.service';
import { ROUTER_PATH } from 'App';
import Button from 'components/Button';
import useCurrentUser from 'hooks/useCurrentUser';
import './postCourse.scss';

const postCourseSchema = Joi.object({
  title: Joi.string().min(6).max(50).required(),
  subtitle: Joi.string().min(6).max(50).required(),
  description: Joi.string().required(),
  price: Joi.number().min(10).max(9999).required(),
  image: Joi.object({
    0: Joi.required(),
  }).required(),
});

const Field = (props) => {
  const { errors, fieldKey, children } = props;
  return (
    <div className={`input-field ${errors[fieldKey] ? 'not-validated' : ''}`}>
      <label htmlFor={fieldKey}>{fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}</label>
      {children}
      {errors[fieldKey] && <p className='error-msg'>{errors[fieldKey]?.message}</p>}
    </div>
  );
};

const PostCourse = () => {
  const { currentUser } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(postCourseSchema),
  });

  const navigate = useNavigate();

  const [imgPreview, setImgPreview] = useState(null);

  const handleImgPreview = (e) => {
    const newImgPreview = e.target.files.length > 0 ? URL.createObjectURL(e.target.files[0]) : null;
    setImgPreview(newImgPreview);
  };

  useEffect(() => {
    return () => {
      if (imgPreview) {
        URL.revokeObjectURL(imgPreview);
      }
    };
  }, [imgPreview]);

  const postCourse = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === 'image') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }

    CourseService.post(formData)
      .then((res) => {
        window.alert('New course has been created. Now redirect to My Course page.');
        navigate(ROUTER_PATH.profile);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <main className='post-course'>
      {currentUser.user.role !== 'instructor' && (
        <section className='alert-msg'>
          <p>Only instructors can post new courses.</p>
        </section>
      )}

      <section className='main-content'>
        {currentUser.user.role === 'instructor' && (
          <form className='form' onSubmit={handleSubmit(postCourse)}>
            <div className='form-header'>
              <h2>Enter the information for the course you want to teach.</h2>
            </div>
            <div className='form-content'>
              <Field errors={errors} fieldKey='title'>
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='JavaScript Zero to Hero 2023'
                  {...register('title', { required: true, minLength: 6, maxLength: 50 })}
                />
              </Field>
              <Field errors={errors} fieldKey='subtitle'>
                <input
                  type='text'
                  id='subtitle'
                  name='subtitle'
                  placeholder='Learn How to Program in JavaScript and its frameworks.'
                  {...register('subtitle', { required: true, minLength: 6, maxLength: 50 })}
                />
              </Field>
              <Field errors={errors} fieldKey='price'>
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Enter your ideal course price.'
                  {...register('price', { required: true, min: 10, max: 9999 })}
                />
              </Field>
              <Field errors={errors} fieldKey='image'>
                <input
                  type='file'
                  id='image'
                  name='image'
                  accept='image/png, image/jpeg, image/jpg'
                  {...register('image')}
                  onChange={handleImgPreview}
                />
                {imgPreview && <img src={imgPreview} alt='course-img-preview' className='preview-img' />}
              </Field>
              <Field errors={errors} fieldKey='description'>
                <textarea
                  id='description'
                  name='description'
                  placeholder='Become an expert using HTML, CSS, Bootstrap, JavaScript, React and So Much More!'
                  {...register('description', { required: true })}
                ></textarea>
              </Field>
            </div>
            <Button type='submit' cx='submit-btn'>
              Submit
            </Button>
          </form>
        )}
      </section>
    </main>
  );
};

export default PostCourse;

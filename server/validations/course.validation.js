import Joi from 'joi';

// 新增課程驗證器
class CourseValidator {
  static hasValidCourseInfo = (req, res, next) => {
    const data = { ...req.body, image: req.file };

    const schema = Joi.object({
      title: Joi.string().min(6).max(50).required(),
      subtitle: Joi.string().min(6).max(50).required(),
      description: Joi.string().required(),
      price: Joi.number().min(10).max(9999).required(),
      image: Joi.object().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    next();
  };
}

export default CourseValidator;

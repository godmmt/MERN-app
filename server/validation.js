import Joi from 'joi';

//  Register Validation 註冊驗證器
export const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid('student', 'instructor'),
  });
  return schema.validate(data);
};

// Login Validation 登入驗證器 - 登入只需驗證信箱和密碼
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// 新增課程驗證器
export const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    subtitle: Joi.string().min(6).max(50).required(),
    description: Joi.string().required(),
    price: Joi.number().min(10).max(9999).required(),
    img: Joi.string().required(),
  });
  return schema.validate(data);
};

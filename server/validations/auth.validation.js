import Joi from 'joi';

class AuthValidator {
  // 註冊驗證器
  static hasRegisterInfo = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object({
      username: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(6).max(50).required().email(),
      password: Joi.string().min(6).max(255).required(),
      role: Joi.string().required().valid('student', 'instructor'),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }

    next();
  };

  // 登入驗證器 - 登入只需驗證信箱和密碼
  static hasLoginInfo = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object({
      email: Joi.string().min(6).max(50).required().email(),
      password: Joi.string().min(6).max(255).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }

    next();
  };

  // 具有學生權限
  static hasStudentPermission = (req, res, next) => {
    if (req.user.isStudent() || req.user.isAdmin()) {
      return next();
    }
    return res.status(400).send('You are not a student.');
  };

  // 具有老師權限
  static hasInstructorPermission = (req, res, next) => {
    console.log('[req.user]', req.user.isInstructor());
    if (req.user.isInstructor() || req.user.isAdmin()) {
      return next();
    }
    return res.status(400).send('You are not an Instructor.');
  };

  // 具有管理員權限
  static hasAdminPermission = (req, res, next) => {
    if (req.user.isAdmin()) {
      return next();
    }
    return res.status(400).send('You are not an administrator.');
  };
}

export default AuthValidator;

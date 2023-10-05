import Joi from 'joi';

class RecoverPasswordValidator {
  // 找回密碼驗證器 - 只需驗證信箱
  static hasEmailInfo = (req, res, next) => {
    const data = req.body;
    const schema = Joi.object({
      email: Joi.string().min(6).max(320).required().email(),
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
}

export default RecoverPasswordValidator;

import Imgur from 'imgur';
import multer from 'multer';

// 設定imgur實例
const { ImgurClient } = Imgur;
const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN,
});

// 設定multer中間件config
const parse = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type'));
    }
  },
}).single('image');

class ImgurController {
  static parseImage = (req, res, next) => {
    parse(req, res, (err) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      next();
    });
  };

  static uploadImage = async (req, res, next) => {
    try {
      const response = await client.upload({
        image: req.file.buffer.toString('base64'),
        type: 'base64',
        album: process.env.IMGUR_ALBUM_ID,
      });
      req.imgURL = response.data.link;
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

export default ImgurController;

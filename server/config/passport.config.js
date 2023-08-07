import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: process.env.PASSPORT_SECRET,
    },
    function (jwt_payload, done) {
      UserModel.findOne({ _id: jwt_payload._id })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

export default passport;

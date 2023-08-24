import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/index.js';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await UserModel.findOne({ _id: jwt_payload._id });
        return done(null, user ?? false);
      } catch (error) {
        return done(err, false);
      }
    }
  )
);

export default passport;

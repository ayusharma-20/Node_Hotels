const passport = require("passport");
const LocalStrategy = require("passport-local");

const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (userid, password, done) => {
    try {
      const user = await Person.findOne({ username: userid });
      if (!user) {
        return done(null, false, { message: "Incorrect Password" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;

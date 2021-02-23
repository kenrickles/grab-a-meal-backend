import pkg from 'sequelize';

const { getHash } = require('../utilities/auth.js');

const { UniqueConstraintError, ValidationError, DatabaseError } = pkg;

export default function users(db) {
  const login = async (req, res) => {
    console.log('post request to login came in');

    // set object to store responses
    const responseData = {};

    try {
      const emailInput = req.body.email;
      const passwordInput = req.body.password;
      const hashedPasswordInput = getHash(passwordInput);

      // try to find a user
      const user = await db.User.findOne(
        {
          where: { email: emailInput, password: hashedPasswordInput },
        },
      );

      // check if a user is found
      if (user === null) {
        console.log('user not found');

        // add message to inform user of invalid email/password
        responseData.invalidMessage = 'Sorry you have keyed in an incorrect email/password';

        // render the login form
        res.send(responseData);
      } else {
        console.log('found user, logged in!');

        // generate a hashed userId
        const loggedInHash = getHash(user.id);

        // set cookies with the userId and hashed userId
        res.cookie('userId', user.id);
        res.cookie('loggedInHash', loggedInHash);

        // add key to inform front end that a user has loggedIn successfully
        responseData.loggedIn = true;

        // redirect to home page
        res.send(responseData);
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const getRegistrationPageData = async (req, res) => {
    console.log('render a registration page');

    // set object to store array of countries data from the database
    const templateData = {};

    try {
      // find array of countries data
      const countries = await db.Country.findAll();

      templateData.countries = countries;

      // send the countries data to response
      res.send(templateData);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const register = async (req, res) => {
    console.log('post request to register came in!');

    try {
      const {
        email, password, name, gender, countryId, dateOfBirth,
      } = req.body;
      const hashedPassword = getHash(password);

      // try to create a user
      const user = await db.User.create({
        email,
        password: hashedPassword,
        name,
        gender,
        countryId,
        dateOfBirth,
      });

      // generate a hashed userId
      const loggedInHash = getHash(user.id);

      // set cookies with the userId and hashed userId
      res.cookie('userId', user.id);
      res.cookie('loggedInHash', loggedInHash);

      // send back a response that the user has been created
      res.send({ createdUser: true });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        // email is not unique
        console.log('SORRY UNIQUE ERROR');
        console.log(error);

        const invalidMessage = 'The email you entered already exists.';

        res.send({ invalidMessage });
      } else if (error instanceof ValidationError) {
        console.log('SORRY VALIDATION ERROR');
        console.log(error);
        console.log('THIS IS WHAT HAPPENED:');
        console.log(error.errors[0].message);
        res.status(500).send(error);
      } else if (error instanceof DatabaseError) {
        console.log('SORRY DB ERROR');
        console.log(error);
        res.status(500).send(error);
      }
      else {
        console.log(error);
        res.status(500).send(error);
      }
    }
  };

  const logout = async (req, res) => {
    console.log('request to logout came in');

    res.clearCookie('userId');
    res.clearCookie('loggedInHash');

    res.send({ loggedOut: true });
  };

  return {
    login, getRegistrationPageData, register, logout,
  };
}

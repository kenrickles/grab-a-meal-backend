import db from './models/index.mjs';

// import your controllers here
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const UsersController = initUsersController(db);

  // define your route matchers here using app
  app.post('/login', UsersController.login);
  app.post('/register', UsersController.register);
}

import db from './models/index.mjs';

// import your controllers here
import initUsersController from './controllers/users.mjs';
import initActivityController from './controllers/activities.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const UsersController = initUsersController(db);
  const ActivitiesController = initActivityController(db);

  // define your route matchers here using app
  app.post('/login', UsersController.login);
  app.get('/activities', ActivitiesController.index);
}

import db from './models/index.mjs';
import checkAuthMiddleware from './utilities/check-auth.mjs';

// import your controllers here
import initUsersController from './controllers/users.mjs';
import initActivityController from './controllers/activities.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const checkAuth = checkAuthMiddleware(db);
  const UsersController = initUsersController(db);
  const ActivitiesController = initActivityController(db);

  // define your route matchers here using app
  // when a HTTP post request is made to 'HOSTNAME/login', run the UsersController.login function
  app.get('home');
  app.get('messages');
  app.post('/login', UsersController.login);
  app.post('/register', UsersController.register);
  app.delete('/logout', UsersController.logout);
  app.get('/activities', checkAuth, ActivitiesController.index);
  app.post('/activities', checkAuth, ActivitiesController.create);
  app.post('/activities/:id/participants', checkAuth, ActivitiesController.join);
  app.put('/activities/:id', checkAuth, ActivitiesController.update);
  app.delete('/activities/:id/participants', checkAuth, ActivitiesController.leave);
  app.delete('/activities/:id', checkAuth, ActivitiesController.deleteActivity);
}

// db is an argument to this function so

// that we can make db queries inside
export default function initActivityController(db) {
  const index = (request, response) => {
    db.Activity.findAll({
      include: [
        { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
        db.ActivitiesUser,
      ],
    })
      .then((activities) => {
        console.log(request.user);
        response.send({ activities });
      })
      .catch((error) => console.log(error));
  };

  const create = async (request, response) => {
    const { user } = request;

    // if there is no logged in user, send a 403 request forbidden response
    if (user === null) {
      console.log('inside forbidden response');
      response.sendStatus(403);
      // return so code below will not run
      return;
    }

    try {
      const newActivity = await db.Activity.create({
        name: request.body.name,
        description: request.body.description,
        dateTime: request.body.dateTime,
        totalNumOfParticipants: request.body.totalNumOfParticipants,
        location: request.body.location,
        isExisting: true,
        categoryId: request.body.categoryId,
        creatorId: user.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(newActivity);

      await db.ActivitiesUser.create({
        activityId: newActivity.id,
        userId: user.id,
      });

      response.send({ newActivity });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  const join = async (request, response) => {
    const { user } = request;
    const activityId = request.params.id;

    // if there is no logged in user, send a 403 request forbidden response
    if (user === null) {
      console.log('inside forbidden response');
      response.sendStatus(403);
      // return so code below will not run
      return;
    }

    try {
      await db.ActivitiesUser.create({
        activityId,
        userId: user.id,
      });

      // get the updated activities from the database
      const activities = await db.Activity.findAll({
        include: [
          { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
          db.ActivitiesUser,
        ],
      });

      // send the updated activities to the response
      response.send({ activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  const update = async (request, response) => {
    console.log('request to edit an activity ');

    // store the user's data (or null if no user is logged in) gotten from the
    // previous middleware, checkAuth
    const { user } = request;

    // if there is no logged in user, send a 403 request forbidden response
    if (user === null) {
      console.log('inside forbidden response');
      response.sendStatus(403);
      // return so code below will not run
      return;
    }

    try {
      // get the activity id from the url
      const activityId = request.params.id;
      // data from the request to be updated in the database
      const editedActivity = request.body;

      // update the database with the edited activity
      await db.Activity.update(
        {
          name: editedActivity.name,
          description: editedActivity.description,
          dateTime: editedActivity.dateTime,
          totalNumOfParticipants: editedActivity.totalNumOfParticipants,
          location: editedActivity.location,
          categoryId: editedActivity.categoryId,
        },
        {
          where: {
            id: activityId,
          },
        },
      );

      // get the updated activities from the database
      const activities = await db.Activity.findAll({
        include: [
          { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
          db.ActivitiesUser,
        ],
      });

      response.send({ activities });
    } catch (error) {
      console.log(error);
      // send error to browser
      response.status(500).send(error);
    }
  };

  // to update the activities_users table when a user leaves an activity
  const leave = async (request, response) => {
    console.log('request to leave an activity ');

    // store the user's data (or null if no user is logged in) gotten from the
    // previous middleware, checkAuth
    const { user } = request;

    // if there is no logged in user, send a 403 request forbidden response
    if (user === null) {
      console.log('inside forbidden response');
      response.sendStatus(403);
      // return so code below will not run
      return;
    }

    try {
      // get the activity id from the url
      const activityId = request.params.id;

      // update the database that the user is no longer a participant of the activity
      await db.ActivitiesUser.update(
        {
          isActive: false,
        },
        {
          where: {
            activityId,
            userId: user.id,
          },
        },
      );

      // get the updated activities data from the database
      const activities = await db.Activity.findAll({
        include: [
          { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
          db.ActivitiesUser,
        ],
      });

      response.send({ activities });
    } catch (error) {
      console.log(error);
      // send error to browser
      response.status(500).send(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, create, join, update, leave,
  };
}

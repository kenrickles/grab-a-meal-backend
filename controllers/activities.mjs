// db is an argument to this function so

// that we can make db queries inside
export default function initActivityController(db) {
  // find all existing activities in the database
  const findExistingActivities = () => db.Activity.findAll({
    // only retrieve activities where the isExisting field is true
    where: {
      isExisting: true,
    },
    include: [
      // retrieve the name and photo of the activity's creator from the users table
      { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
      // retrieve the participants' id, name and photo from the users table
      {
        model: db.User,
        attributes: ['id', 'name', 'photo'],
        through: {
          // filter participants where the isActive field is true in the activities_users table
          // i.e. only retrieve participants that have not left the activity
          where: { isActive: true },
        },
      },
    ],
  });

  // finds all activities in the database
  const index = async (request, response) => {
    const { user } = request;

    // if there is no logged in user, send a 403 request forbidden response
    if (user === null) {
      console.log('inside forbidden response');
      response.sendStatus(403);
      // return so code below will not run
      return;
    }

    try {
      const activities = await findExistingActivities();

      response.send({ activities });
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // creates a new activity in the database
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
      // try to create a new activity in the database
      const newActivity = await db.Activity.create({
        name: request.body.name,
        description: request.body.description,
        dateTime: request.body.dateTime,
        totalNumOfParticipants: request.body.totalNumOfParticipants,
        location: request.body.location,
        usualPrice: request.body.usualPrice,
        discountedPrice: request.body.discountedPrice,
        isExisting: true,
        categoryId: request.body.categoryId,
        creatorId: user.id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // create a new activities_user entry in the database
      await db.ActivitiesUser.create({
        activityId: newActivity.id,
        userId: user.id,
      });

      // get the updated activities from the database
      const activities = await findExistingActivities();

      // find the newly created activity details from the activities array
      const newActivityDetails = activities.find((el) => el.id === newActivity.id);
      console.log('newActivityDetails', newActivityDetails);

      // send the data back to response
      response.send({ newActivityDetails, activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // creates a new activities_user entry in the database
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
      // try to create a new activities_user entry in the database
      await db.ActivitiesUser.create({
        activityId,
        userId: user.id,
      });

      // get the updated activities from the database
      const activities = await findExistingActivities();

      // send the updated activities to the response
      response.send({ activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // update an activity in the database
  const update = async (request, response) => {
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

      await db.Activity.update(
        {
          name: editedActivity.name,
          description: editedActivity.description,
          dateTime: editedActivity.dateTime,
          totalNumOfParticipants: editedActivity.totalNumOfParticipants,
          location: editedActivity.location,
          usualPrice: editedActivity.usualPrice,
          discountedPrice: editedActivity.discountedPrice,
          categoryId: editedActivity.categoryId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          where: {
            id: activityId,
          },
        },
      );

      // get the updated activities from the database
      const activities = await findExistingActivities();

      // find the updated activity details from the activities array
      const updatedActivity = activities.find((el) => el.id === Number(activityId));

      response.send({ updatedActivity, activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // update database that a user is no longer a participant of an activity
  const leave = async (request, response) => {
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
      // update the isActive field in the activities_user table for the entry
      // corresponding to activityId and userId
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

      // get the updated activities from the database
      const activities = await findExistingActivities();

      // send the updated activities to the response
      response.send({ activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // update database that an activity is cancelled
  const deleteActivity = async (request, response) => {
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
      await db.Activity.update(
        {
          isExisting: false,
        },
        {
          where: {
            id: activityId,
          },
        },
      );

      // get the updated activities from the database
      const activities = await findExistingActivities();

      // send the updated activities to the response
      response.send({ activities });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes.mjs file to see this used
  return {
    index, create, join, update, leave, deleteActivity,
  };
}

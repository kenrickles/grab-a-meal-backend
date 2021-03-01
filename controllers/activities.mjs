// db is an argument to this function so

// that we can make db queries inside
export default function initActivityController(db) {
  const index = (request, response) => {
    db.Activity.findAll({
      include: [
        { model: db.User, as: 'creator', attributes: ['name', 'photo'] },
        {
          model: db.User,
          attributes: ['id', 'name', 'photo'],
          through: {
            where: { isActive: true },
          },
        },
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
        usualPrice: request.body.usualPrice,
        discountedPrice: request.body.discountedPrice,
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
          {
            model: db.User,
            attributes: ['id', 'name', 'photo'],
            through: {
              where: { isActive: true },
            },
          },
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

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, create, join,
  };
}

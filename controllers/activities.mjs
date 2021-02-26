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
  // const findOne = (request, response) => {
  //   db.Activity.findOne()
  //   .then((activities))
  // };
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

      response.send({ newActivity });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, create,
  };
}

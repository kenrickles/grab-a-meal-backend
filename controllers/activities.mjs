// db is an argument to this function so
// that we can make db queries inside
export default function initActivityController(db) {
  const index = (request, response) => {
    db.Activity.findAll()
      .then((activities) => {
        response.send({ activities });
      })
      .catch((error) => console.log(error));
  };
  const createActivity = async (request, response) => {
    try {
      const newActivity = await db.Activity.create({
        name: request.body.name,
        description: request.body.description,
        dateTime: new Date(request.body.startDate),
        totalNumOfParticipants: request.body.totalNumOfParticipants,
        location: request.body.location,
        is_existing: true,
        categoryId: request.body.categoryId,
        creatorId: request.body.userId,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(newActivity);
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, createActivity,
  };
}

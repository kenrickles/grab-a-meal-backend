export default function initCategoriesController(db) {
  const getCategories = async (req, res) => {
    // set object to store data to be sent to response
    const data = {};

    try {
      // find all categories from the database
      const categoriesList = await db.Category.findAll();
      data.categoriesList = categoriesList;

      // send back the categories to the response
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return { getCategories };
}

import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initCategoryModel from './category.mjs';
import initActivityModel from './activity.mjs';
import initMessageModel from './message.mjs';
import initActivitiesUserModel from './activitiesUser.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// add your model definitions to db here
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// models are always singular
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

db.Activity = initActivityModel(sequelize, Sequelize.DataTypes);
db.ActivitiesUser = initActivitiesUserModel(sequelize, Sequelize.DataTypes);
db.Message = initMessageModel(sequelize, Sequelize.DataTypes);

// Many to many relationship for User and Activity
db.Activity.belongsToMany(db.User, { through: db.ActivitiesUser });
db.User.belongsToMany(db.Activity, { through: db.ActivitiesUser });

// mentioning this will allow sequelize to create getter and setter mtds (eg. getHelper)
// and create a helperId column in the requests table if not already created in the model
db.User.hasMany(db.Activity, { as: 'creator', foreignKey: 'creatorId' });
db.Activity.belongsTo(db.User, { as: 'creator' });

// Category relationship with Activities
db.Category.hasMany(db.Activity);
db.Activity.belongsTo(db.Category);

// User and message relationship
db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);

// message and activity relationship
db.Activity.hasMany(db.Message);
db.Message.belongsTo(db.Activity);

// User to ActivitiesUser
db.User.hasMany(db.ActivitiesUser);
db.ActivitiesUser.belongsTo(db.User);

// Activity to ActivitiesUser
db.Activity.hasMany(db.ActivitiesUser);
db.ActivitiesUser.belongsTo(db.Activity);

export default db;

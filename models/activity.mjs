export default function initActivityModel(sequelize, DataTypes) {
  return sequelize.define(
    'activity',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      dateTime: {
        type: DataTypes.DATE,
      },
      totalNumOfParticipants: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
      },
      usual_price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discounted_price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      isExisting: {
        type: DataTypes.BOOLEAN,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}

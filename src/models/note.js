

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
    }
  );
  Note.associate = function (models) {
    Note.belongsToMany(models.User, { through: models.UserNotes })
  };
  return Note;
};

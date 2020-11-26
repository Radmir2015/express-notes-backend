

module.exports = (sequelize, DataTypes) => {
  const SharedNote = sequelize.define(
    'SharedNote',
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );
  SharedNote.associate = function (models) {
    SharedNote.belongsTo(models.Note)
  };
  return SharedNote;
};

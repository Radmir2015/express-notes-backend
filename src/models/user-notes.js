

module.exports = (sequelize, DataTypes) => {
    const UserNotes = sequelize.define(
      'UserNotes',
      {}
    );
    return UserNotes;
  };
  
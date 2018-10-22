module.exports = function(sequelize, DataTypes) {
    var Derp = sequelize.define("Derp", {
  
      thread: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      post: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 250]
        }
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Personal"
      },
      name: {
        type: DataTypes.STRING,

      }
      
    });
    return Derp;
};
  
  
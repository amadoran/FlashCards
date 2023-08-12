const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flashcard_topic', {
    flashcard_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'flashcard',
        key: 'id'
      }
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topic',
        key: 'id'
      }
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'flashcard_topic',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_flashcard_has_topic_topic1_idx",
        using: "BTREE",
        fields: [
          { name: "topic_id" },
        ]
      },
      {
        name: "fk_flashcard_has_topic_flashcard_idx",
        using: "BTREE",
        fields: [
          { name: "flashcard_id" },
        ]
      },
    ]
  });
};

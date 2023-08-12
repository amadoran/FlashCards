var DataTypes = require("sequelize").DataTypes;
var _flashcard = require("./flashcard");
var _flashcard_topic = require("./flashcard_topic");
var _topic = require("./topic");
var _user = require("./user");

function initModels(sequelize) {
  var flashcard = _flashcard(sequelize, DataTypes);
  var flashcard_topic = _flashcard_topic(sequelize, DataTypes);
  var topic = _topic(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  flashcard_topic.belongsTo(flashcard, { as: "flashcard", foreignKey: "flashcard_id"});
  flashcard.hasMany(flashcard_topic, { as: "flashcard_topics", foreignKey: "flashcard_id"});
  flashcard_topic.belongsTo(topic, { as: "topic", foreignKey: "topic_id"});
  topic.hasMany(flashcard_topic, { as: "flashcard_topics", foreignKey: "topic_id"});
  flashcard.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(flashcard, { as: "flashcards", foreignKey: "user_id"});
  topic.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(topic, { as: "topics", foreignKey: "user_id"});

  return {
    flashcard,
    flashcard_topic,
    topic,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

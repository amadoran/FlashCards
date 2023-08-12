'use strict';
/* IMPORTE El ARCHIVO CON EL MODELO */
const user = require('../models').user;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /* CREACIÓN DE LA TABLA A PARTIR DE LA CLASE */
    await user.sync()
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /* ELIMINACIÓN LA TABLA */
    await queryInterface.dropTable('user');
  }
};

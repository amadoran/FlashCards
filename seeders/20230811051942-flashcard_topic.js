'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    /* INSERTAR UNA LISTA DE OBJETOS (REGISTROS) EN LA TABLA */
    await queryInterface.bulkInsert('flashcard_topic', [
	     
      /* LA ESTRUCTURA DE LOS OBJETOS JSON (CLAVE-VALOR), DE ACUERDO CON EL MODELO RELACIONADO */
      {
        flashcard_id: 11,
        topic_id: 11
      },
      {
        flashcard_id: 12,
        topic_id: 12
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    /* ELIMINAR TODOS LOS REGISTROS DE LA TABLA */
    await queryInterface.bulkDelete('flashcard_topic', null, {});
  }
};
 // Importing Knex Type to give infos for intellisense
 import Knex from 'knex';
 
 export async function up(knex: Knex){
  // Create a table
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    // Max string caracters 2 for example 'PR'
    table.string('uf', 2).notNullable();
  });
 };

 export async function down(knex: Knex){
  // Remove a table (Roll back)
  return knex.schema.dropTable('point');
 }
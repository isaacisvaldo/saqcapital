import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('admin', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('nome').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('tell').notNullable();
        table.string('genero').defaultTo("M");
        table.string('senha').notNullable();
        table.string('estado').notNullable();
        table.string('role').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('admin')
}

//id, img, nome, nascimento, user, email,tell,senha,estado
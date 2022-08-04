import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('utilizador', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('nome').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('tell').notNullable();
        table.string('nascimento').notNullable();
        table.string('provincia').notNullable();
        table.string('municipio').notNullable();
        table.string('endereco').notNullable();
        table.string('genero').defaultTo("M");
        table.string('senha').notNullable();
        table.string('estado').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('utilizador')
}

//image,nome,username,email,tell,genero,senha,estado
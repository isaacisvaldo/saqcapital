import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('empresa', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('endereco').defaultTo("Luanda/Cazenga");
        table.string('provincia').defaultTo("luanda");
        table.string('municipio').defaultTo("Cazenga");
        table.string('website').notNullable();
        table.string('nif').notNullable();
        table.string('descricao').notNullable();
        table.string('tell').notNullable();
        table.string('senha').notNullable();
        table.string('estado').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('empresa')
}

//nome, idProfessor, data-inicio, data-fim, image, desc, estado
import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('investidor', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('nome').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('tell').notNullable();
        table.string('genero').defaultTo("M");
        table.string('nif').notNullable();
        table.string('biografia').notNullable();
        table.string('endereco').defaultTo("Luanda");
        table.string('provincia').defaultTo("Provincia");
        table.string('municipio').defaultTo("Municipio");
        table.string('senha').notNullable();
        table.string('estado').notNullable();
        
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('investidor')
}

//nome, nomeMedico, userMedico, emailMedico, tellMedico, passMedico
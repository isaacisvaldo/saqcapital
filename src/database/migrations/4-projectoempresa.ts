import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('projectoempresa', (table)=>{
        table.increments('idProjecto').primary();
        table.timestamp('data').defaultTo(knex.fn.now());
        table.string('estado').notNullable();
        table.string('participantes').notNullable();
        table.string('image_projecto').notNullable();
        table.string('linkurl').notNullable().defaultTo('indisponivel');
        table.string('nome_projecto').notNullable();
        table.string('descricao_projecto').notNullable();
        table.integer('valorInvestir').notNullable();
        table.integer('idEmpresa').notNullable().references('idEmpresa').inTable('empresa');
       
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projectoempresa')
}

//dataMarcacao, estadoMarcacao, mes, dia, ano, diaExtenso, idPaciente,idMedico
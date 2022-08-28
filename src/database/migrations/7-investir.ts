import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('investir', (table)=>{
        table.increments('id').primary();
        table.timestamp('data').defaultTo(knex.fn.now());
        table.string('descricao').notNullable();
        table.integer('valorInvestir').notNullable();
        table.integer('idProjectoEmpresa').notNullable().references('idProjectoEmpresa').inTable('projectoempresa');
        table.integer('idInvestidor').notNullable().references('idInvestido').inTable('investidor');
      
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('investir')
}

//dataMarcacao, estadoMarcacao, mes, dia, ano, diaExtenso, idPaciente,idMedico
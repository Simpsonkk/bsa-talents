import { type Knex } from 'knex';

const TABLE_NAME = 'bsa_badges';

const ColumnName = {
    TYPE: 'type',
    MAX_SCORE: 'max_score',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropUnique([ColumnName.TYPE]);
        table.integer(ColumnName.MAX_SCORE).nullable().alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.TYPE).unique().alter();
        table.integer(ColumnName.MAX_SCORE).notNullable().alter();
    });
}

export { down, up };

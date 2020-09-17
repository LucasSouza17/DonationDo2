import Knex from 'knex';

export async function seed(knex: Knex){
  await knex('categoria').insert([
    {Nome: "Roupas", icone: "roupas.svg"},
    {Nome: "Comida", icone: "comida.svg"},
    {Nome: "Materias Escolares", icone: "materias_escolares.svg"},
    {Nome: "Reciclável", icone: "reciclavel.svg"},
  ])
}
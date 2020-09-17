import Knex from 'knex';

export async function seed(knex: Knex){
  await knex('item').insert([
    {Nome: "Roupas", icone: "roupas.svg"},
    {Nome: "Alimentos", icone: "alimentos.svg"},
    {Nome: "Materiais Escolares", icone: "materias_escolares.svg"},
    {Nome: "Dinheiro", icone: "dinheiro.svg"},
    {Nome: "Móveis", icone: "moveis.svg"},
    {Nome: "Brinquedos", icone: "brinquedos.svg"},
    {Nome: "Eletrônicos", icone: "eletronicos.svg"},
    {Nome: "Outros", icone: "outros.svg"}
  ])
}
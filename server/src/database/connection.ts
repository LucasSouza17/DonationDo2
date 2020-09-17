import Knex from 'knex';

const connection = Knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'donation.do'
  }
});

export default connection;
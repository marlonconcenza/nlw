import knex from 'knex';
//import path from 'path';

//__dirname: Retorna o diretório do arquivo atual

// const connection = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: path.resolve(__dirname, 'database.sqlite')
//     },
//     useNullAsDefault: true
// });

var connection = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : 'ec2-18-235-97-230.compute-1.amazonaws.com',
        user : 'jxuibyuvhayost',
        password : '7a2ab8f5c9b840cf2b39098e6d975b20801cba741a6b13dfa6c2727d5554cebc',
        database : 'dc7eg2t1jo64eg',
        port: 5432
    }
});

export default connection;
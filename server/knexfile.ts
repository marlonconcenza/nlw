import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host : 'ec2-18-235-97-230.compute-1.amazonaws.com',
        user : 'jxuibyuvhayost',
        password : '7a2ab8f5c9b840cf2b39098e6d975b20801cba741a6b13dfa6c2727d5554cebc',
        database : 'dc7eg2t1jo64eg',
        port: 5432
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
};
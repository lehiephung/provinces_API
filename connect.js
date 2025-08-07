const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql2.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

connection.connect(err => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.message);
    } else {
        console.log('✅ Connected to MySQL');
    }
});


module.exports = connection.promise();



// const provinces = Object.values(JSON.parse(fs.readFileSync('./data/province.json', 'utf8')));
// const wards = Object.values(JSON.parse(fs.readFileSync('./data/ward.json', 'utf8')));

// // provinces.forEach(p => {
// //     connection.query('INSERT INTO provinces (name, slug, type, name_with_type, code) VALUES( ?, ?, ?, ?, ?)',
// //         [p.name, p.slug, p.type, p.name_with_type, p.code]
// //     )
// // })

// wards.forEach(w => {
//     connection.query('INSERT INTO wards (name, type, slug, name_with_type, path, path_with_type, code, parent_code) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
//         [w.name, w.type, w.slug, w.name_with_type, w.path, w.path_with_type, w.code, w.parent_code]
//     )
// })

// connection.end();
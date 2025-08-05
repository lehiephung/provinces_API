const db = require("../connect.js");

// Get all provinces
// exports.getAllProvinces = (req, res) => {
//   db.query('SELECT slug, name, type, name_with_type FROM provinces')
//     .then(([rows]) => {
//       res.json(rows);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Lỗi server' });
//     });
// };
exports.getAllProvinces = async (req, res) => {
  const search = req.query.search;
  let query = 'SELECT code, slug, name, type, name_with_type FROM provinces';
  let params = [];

  if(search){
    query += ' WHERE name LIKE ? OR name_with_type LIKE ?';
    params = [`%${search}%`, `%${search}%`];
  }

  db.query(query, params)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Lỗi server' });
    });
}

// Get province by code
exports.getProvinceByCode = async (req, res) => {
  const code = req.params.code;
  try {
    const [rows] = await db.query('SELECT slug, name, type, name_with_type FROM provinces WHERE code = ?', [code]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tỉnh' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

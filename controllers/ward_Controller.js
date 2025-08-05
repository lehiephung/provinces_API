const db = require("../connect.js");

// Get all wards of a province by code
exports.getAllWardsOfProvinceByCode = (req, res) => {
    const code = req.params.code;
    db.query('SELECT slug, name, type, name_with_type FROM wards WHERE parent_code = ?', [code])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Không tìm thấy phường/xã' });
            }
            res.json(rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server' });
        });
}

// Get wards by code
exports.getWardByCode = (req, res) => {
    const code = req.params.code;
    db.query('SELECT slug, name, type, name_with_type FROM wards WHERE code = ?', [code])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Không tìm thấy phường/xã' });
            }
            res.json(rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server' });
        });
}

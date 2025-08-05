const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

//load provinces data
const provincesData = JSON.parse(
    fs.readFileSync('./data/province.json', 'utf8')
);
//load wards data
const wardsData = JSON.parse(
    fs.readFileSync('./data/ward.json', 'utf8')
);

//Route to get all provinces
app.get('/api/provinces', (req, res) => {
    const provinces = Object.values(provincesData).map(p => ({
        code: p.code,
        name: p.name_with_type,
        type: p.type,
        slug: p.slug,
    }));
    res.json(provinces);
});

//Route to get a specific province by code
app.get('/api/p/:code', (req, res) => {
    const code = req.params.code;
    const province = provincesData[code];
    if (!province){
        return res.status(404).json({ error: 'Province not found' });
    }
    res.json({
        slug: province.slug,
        type: province.type,
        name: province.name,
        name_with_type: province.name_with_type,
    });
});

//Route to get all wards
app.get('/api/wards', (req, res) => {
    const wards = Object.values(wardsData).map(w => ({
        code: w.code,
        name: w.name_with_type,
        type: w.type,
        slug: w.slug,
        parent_code: w.parent_code,
    }));
    res.json(wards);
});

// //Route to get all wards of a specific province
app.get('/api/p/:code/wards', (req, res) => {
    const code = req.params.code;
    const province = provincesData[code];
    if (!province){
        return res.status(404).json({ error: 'Province not found' });
    }
    const wards = Object.values(wardsData).filter(w => w.parent_code === code).map(w => ({
        code: w.code,
        name: w.name_with_type,
        type: w.type,
        slug: w.slug,
        parent_code: w.parent_code,
    }));
    res.json(wards);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


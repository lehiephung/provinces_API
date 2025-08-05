const express = require("express");
const app = express();
const port = 3000;

const provinceRoutes = require("./routes/province_Routes");
const wardRoutes = require("./routes/ward_Routes");

app.use("/api/provinces", provinceRoutes);
app.use("/api/provinces", wardRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
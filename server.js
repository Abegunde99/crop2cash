const app = require("./app");
require("dotenv").config();
const db = require("./config/db");


const PORT = process.env.PORT || 5006;



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

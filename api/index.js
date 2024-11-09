const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "",
    database: "wrcursos",
});
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Test
app.get('/', (req, res) => {
    return res.status(200).json("Node API works!");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
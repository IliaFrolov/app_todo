const express = require("express");
const todoController = require('./controllers/todoController')


const app = express();

// app.set('view engine', 'ejs')

app.use(express.static(__dirname + "/public"));

todoController(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async function () {
    console.log("Сервер ожидает подключения...");

});

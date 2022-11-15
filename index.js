const express = require('express');
const app = express();
const { jsPDF } = require("jspdf"); // will automatically load the node version

const doc = new jsPDF();
doc.text("PABLO HENRIQUE DA SILVA CUNHA", 10, 10);
doc.save("a4.pdf");


app.set('view engine', 'ejs');
app.use(express.static('public/'));

app.get('/', (req, res) => {
    res.render('index', {doc:doc});
})

// app.get()

app.listen(8080, () => {
    console.log("Servidor rodando\nhttp://localhost:8080")
});
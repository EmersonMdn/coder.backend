const express = require("express");
const app = express();
const fs = require("fs");

class Producto {
  constructor(archivo) {
    this.archivo = archivo;
  }
  getData() {
    const productos = fs.readFileSync(this.archivo, "utf-8");
    const parseData = JSON.parse(productos);
    return parseData;
  }
  getRandom() {
    const productos = this.getData();
    const idRandom = parseInt(Math.random() * productos.length);
    return productos[idRandom];
  }
}

const productos = new Producto('data.txt');

app.get("/productos", (req, res) => {
  
  res.send(productos.getData());
});
app.get("/productoRandom", (req, res) => {
  const idRandom = parseInt(Math.random() * productos.length);

  res.send([productos.getRandom()]);
});

app.listen(8080, () => {
  console.log("servidor en linea");
});

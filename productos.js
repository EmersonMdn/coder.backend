const express = require("express");

const { Router } = express;
const router = Router();

let Products = [];

router.get("/", (req, res) => {
  res.send({ Products });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id > Products.length) {
      throw new Error("Id indicado no existe");
    }
    let user = Products.find((item) => item.id == id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Not Found" + err);
  }
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  let id = Products.length + 1;

  Products.push({ title, price, thumbnail, id });
  res.send({ added: { title, price, thumbnail, id } });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id > Products.length) {
      throw new Error("Id indicado no existe");
    }
    let { title, price, thumbnail } = req.body;
    let index = Products.findIndex((item) => item.id == id);
    Products[index] = { title, price, thumbnail, id };
    res.send({ cambiado: Products[index] });
  } catch (err) {
    console.log("Producto no encontrado");
    res.status(400).send("Not Found" + err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id > Products.length) {
      throw new Error("Id indicado no existe");
    }
    let index = Products.findIndex((item) => item.id == id);
    Products.splice(index, 1);
    res.send("ELIMINADO");
  } catch (err) {
    console.log("Producto no encontrado");
    res.status(400).send("Not Found " + err);
  }
});

module.exports = router;

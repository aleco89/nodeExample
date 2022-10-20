import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());

const product: { id: number; name: string; marca: string }[] = [];

app.get("/hola", (req, res) => {
  res.status(200).json(product);
});
/*
Libreria body-parser resuelve problemas al interpretar el body 
*/

app.post("/hola", (req, res) => {
  const { name, marca } = req.body;
  try {
    if (!name || !marca) throw new Error("che pasame el name y marca");
    product.push({ id: new Date().getTime(), name, marca });
    res.status(200).json(...product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.put("/hola", (req, res) => {
  const { name, marca, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "no se encontró el producto" });
  product[index] = { ...product[index], name, marca };
  res.status(200).json(product[index]);
});

app.delete("/hola", (req, res) => {
  res.status(200).json({ name: "Ana" });
});

app.listen(3000);

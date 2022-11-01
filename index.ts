import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json(), urlencoded({ extended: true }));
app.use(cors());
// tb puedo crear una variable allowedOrigins y declarar los sitios desde los cuales voy a acceder

const product: { id: number; name: string; marca: string }[] = [
  {
    name: "Teclado",
    marca: "Logitech",
    id: 2131231,
  },
  {
    name: "Placa",
    marca: "AMD",
    id: 21312312,
  },
];

app.get("/products", (req, res) => {
  res.status(200).json(product);
});
/*
Libreria body-parser resuelve problemas al interpretar el body 
*/

app.post("/products", (req, res) => {
  const { name, marca } = req.body;
  if (!name || !marca)
    return res
      .status(400)
      .json({ message: "fields 'name' and 'marca' are requiered" });
  product.push({ id: new Date().getTime(), name, marca });
  return res.status(200).json(...product.slice(-1));
});

app.put("/products/:id", (req, res) => {
  const { name, marca } = req.body;
  const id = Number(req.params.id);
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "product not found" });
  product[index] = { ...product[index], name, marca };
  res.status(200).json(product[index]);
});

app.delete("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "product not found" });

  return res.status(200).json(product.splice(index, 1));
});

app.listen(3000);

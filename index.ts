import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json(), urlencoded({ extended: true }));
app.use(cors());
// tb puedo crear una variable allowedOrigins y declarar los sitios desde los cuales voy a acceder

const product: { id: number; name: string; brand: string }[] = [
  {
    name: "Teclado",
    brand: "Logitech",
    id: 69448,
  },
  {
    name: "Placa",
    brand: "AMD",
    id: 846453,
  },
  {
    name: "Teclado",
    brand: "Logitech",
    id: 43983,
  },
  {
    name: "Placa",
    brand: "AMD",
    id: 439483,
  },
  {
    name: "Teclado",
    brand: "Logitech",
    id: 463563,
  },
  {
    name: "Placa",
    brand: "AMD",
    id: 6453,
  },
  {
    name: "Teclado",
    brand: "Corsair",
    id: 8647,
  },
  {
    name: "Placa",
    brand: "Nvidia",
    id: 54686,
  },
];

app.get("/products", (req, res) => {
  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);
  const search: string = String(req.query.search);

  const result = {};

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (search != "") {
    const filteredProducts = product.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search)
    );
    const resultFilteredProducts = filteredProducts.slice(startIndex, endIndex);
    res.status(200).json(resultFilteredProducts);
  }
  const resultProducts = product.slice(startIndex, endIndex);
  res.status(200).json(resultProducts);
});

app.post("/products", (req, res) => {
  const { name, brand } = req.body;
  if (!name || !brand)
    return res
      .status(400)
      .json({ message: "fields 'name' and 'brand' are requiered" });
  product.push({ id: new Date().getTime(), name, brand });
  return res.status(200).json(...product.slice(-1));
});

app.put("/products/:id", (req, res) => {
  const { name, brand } = req.body;
  const id = Number(req.params.id);
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "product not found" });
  product[index] = { ...product[index], name, brand };
  res.status(200).json(product[index]);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "product not found" });

  return res.status(200).json(product.splice(index, 1));
});

app.listen(3000);

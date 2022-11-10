import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json(), urlencoded({ extended: true }));
app.use(cors());
// tb puedo crear una variable allowedOrigins y declarar los sitios desde los cuales voy a acceder

type Product = {
  id: number;
  name: string;
  brand: string;
};

const products: Product[] = [
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
  const query = req.query as {
    search?: string;
    page?: number;
    limit?: number;
  };
  let currentProducts: Product[] = products;
  let startIndex = (query.page - 1) * query.limit;
  let endIndex = query.page * query.limit;
  let totalPages = Math.ceil(currentProducts.length / query.limit);

  if (query.search) {
    currentProducts = currentProducts.filter(
      (p) => p.name.toLowerCase().includes(query.search) || p.brand.toLowerCase().includes(query.search.toLowerCase())
    );
  }
  if (query.page) {
    const resultProducts = currentProducts.slice(startIndex, endIndex);
    return res.status(200).json({ resultProducts, totalPages });
  }
  return res.status(200).json(currentProducts);
});

app.post("/products", (req, res) => {
  const { name, brand } = req.body;
  if (!name || !brand) return res.status(400).json({ message: "fields 'name' and 'brand' are requiered" });
  products.push({ id: new Date().getTime(), name, brand });
  return res.status(200).json(...products.slice(-1));
});

app.put("/products/:id", (req, res) => {
  const { name, brand } = req.body;
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return res.status(400).json({ message: "product not found" });
  products[index] = { ...products[index], name, brand };
  res.status(200).json(products[index]);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return res.status(400).json({ message: "product not found" });

  return res.status(200).json(products.splice(index, 1));
});

app.listen(3000);

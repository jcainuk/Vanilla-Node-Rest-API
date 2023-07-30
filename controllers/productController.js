const Product = require("../models/productModel");
const { getPostData } = require("../utils");

//@desc  Gets all products
//@route GET /api/products
function getProducts(req, res) {
  Product.findAll()
    .then((products) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    })
    .catch((error) => {
      console.log(error);
    });
}

//@desc  Gets single product
//@route GET /api/products/:id
function getProduct(req, res, id) {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product Not Found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//@desc  Create a product
//@route POST /api/products
function createProduct(req, res) {
  getPostData(req)
    .then((body) => {
      const { title, description, price } = JSON.parse(body);

      const product = {
        title,
        description,
        price
      };

      return Product.create(product);
    })
    .then((newProduct) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    })
    .catch((error) => {
      console.log(error);
    });
}

//@desc  Update a product
//@route PUT /api/products/:id
function updateProduct(req, res, id) {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product Not Found" }));
      } else {
        return getPostData(req).then((body) => {
          const { title, description, price } = JSON.parse(body);

          const productData = {
            title: title || product.title,
            description: description || product.description,
            price: price || product.price
          };

          return Product.update(id, productData);
        });
      }
    })
    .then((updProduct) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updProduct));
    })
    .catch((error) => {
      console.log(error);
    });
}

//@desc  Deletes single product
//@route DELETE /api/products/:id
function deleteProduct(req, res, id) {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product Not Found" }));
      } else {
        return Product.remove(id);
      }
    })
    .then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

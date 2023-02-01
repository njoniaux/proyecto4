var express = require("express");
const axios = require("axios");
var router = express.Router();

const multer = require("multer");
const FormData = require("form-data");
const upload = multer();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/photos", async function (req, res, next) {
  const URL = "http://localhost:4444/rest/fotos/findAll/json";
  const config = {
    proxy: {
      host: "localhost",
      port: 4444,
    },
  };
  const response = await axios.get(URL, config);

  response.data.map((item) => {
    item.url = "http://localhost:4444/" + item.ruta.replace("public/", "");
  });

  res.render("fotos", { title: "Fotos", fotos: response.data });
});

router.get("/photos/add", function (req, res, next) {
  res.render("fotos_formulario", { title: "Express" });
});

router.post(
  "/photos/save",
  upload.single("route"),
  async function (req, res, next) {
    console.log(req);
    let { titulo, descripcion, calificacion } = req.body;
    let { buffer, originalname } = req.file;

    const URL = "http://localhost:4444/rest/fotos/save";

    let data = new FormData();
    data.append("titulo", titulo);
    data.append("descripcion", descripcion);
    data.append("calificacion", calificacion);
    data.append("ruta", originalname);
    data.append("archivo", buffer, originalname);
    console.log(data.getHeaders());
    const config = {
      headers: data.getHeaders(),
      proxy: {
        host: "localhost",
        port: 4444,
      },
    };
    const response = await axios.post(URL, data, config);

    if (response.status == "200" && response.statusText == "OK") {
      res.redirect("/photos");
    } else {
      res.redirect("/");
    }
  }
);
router.get("/photos/editPhoto/:id", async function (req, res, next) {
  const { id } = req.params;
  const URL = `http://localhost:4444/rest/fotos/findById/${id}/json`;
  const config = {
    proxy: {
      host: "localhost",
      port: 4444,
    },
  };
  const response = await axios.get(URL, config);
  console.log(response.data[0]);
  res.render("fotos_form", { title: "Express", foto: response.data[0] });
});

router.post(
  "/photos/put",
  upload.single("route"),
  async function (req, res, next) {
    //let { id, title, description, rate } = req.body
    req.body["ruta"] = req.file.originalname;
    //let { buffer, originalname } = req.file
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    const URL = "http://localhost:4444/rest/fotos/update";

    const config = {
      headers: { "Content-Type": "application/json" },
      proxy: {
        host: "localhost",
        port: 4444,
      },
    };
    const response = await axios.put(URL, JSON.stringify(req.body), config);
    if (response.status == "200" && response.statusText == "OK") {
      res.redirect("/photos");
    } else {
      res.redirect("/");
    }
  }
);

router.get("/photos/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  const URL = "http://localhost:4444/rest/fotos/delete/" + id;
  const config = {
    proxy: {
      host: "localhost",
      port: 4444,
    },
  };

  const response = await axios.delete(URL, config);
  if (response.status == "200" && response.statusText == "OK") {
    res.redirect("/photos");
  }
});

router.get("/customers", async function (req, res, next) {
  const URL = "http://localhost:4444/rest/customers/findAll/json";
  const config = {
    proxy: {
      host: "localhost",
      port: 4444,
    },
  };
  const response = await axios.get(URL, config);

  res.render("customers", { title: "Customers", customers: response.data });
});

function calculateTotal(customerSales) {
  let total = 0;
  customerSales.forEach((sale) => {
    total += sale.priceEach * sale.quantityOrdered;
  });
  return total;
}
router.get("/customers/info/:id", async function (req, res, next) {
  const id = req.params.id;
  const URL = `https://nosql-aa319-default-rtdb.firebaseio.com/collection.json?orderBy="customerNumber"&equalTo=${id}`;

  try {
    const salesData = await axios.get(URL);
    const customerSales = Object.values(salesData.data).filter(
      (sale) => sale.status === "Shipped"
    );

    const URL1 = "http://localhost:4444/rest/customers/calculate";
    const config = {
      proxy: {
        host: "localhost",
        port: 4444,
      },
    };
    let data = customerSales;
    const response = await axios.post(URL1, data, config);
    res.render("customer_info", {
      title: "Customer Sales",
      customerSales: customerSales,
      totalSales: response.data.totalSales,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching sales data", error });
  }
});

router.get("/customers/products/:id", async function (req, res, next) {
  const id = req.params.id;
  const URL = `https://nosql-aa319-default-rtdb.firebaseio.com/collection.json?orderBy="customerNumber"&equalTo=${id}`;

  try {
    const productData = await axios.get(URL);
    const customerProducts = Object.values(productData.data).map(
      ({ productName, productCode, productLine }) => ({
        productName,
        productCode,
        productLine,
      })
    );
    res.render("customer_products", {
      title: "Customer Products",
      customerProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching product data",
      error,
    });
  }
});

module.exports = router;

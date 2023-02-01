var express = require("express");
var router = express.Router();

const { Sequelize, Op } = require("sequelize");

const Customer = require("../models").customer;

router.get("/findAll/json", function (req, res, next) {
  Customer.findAll({
    attributes: {
      exclude: [
        "CustomerFirstName",
        "CustomerLastName",
        "salesRepEmployeeNumber",
        "phone",
        "addressLine1",
        "addressLine2",
        "postalCode",
      ],
    },
  })
    .then((customers) => {
      res.json(customers);
    })
    .catch((error) => res.status(400).send(error));
});

router.get("/findAll/view", function (req, res, next) {
  Customer.findAll({
    attributes: {
      exclude: [
        "CustomerFirstName",
        "CustomerLastName",
        "salesRepEmployeeNumber",
        "phone",
        "addressLine1",
        "addressLine2",
        "postalCode",
      ],
    },
  })
    .then((customers) => {
      res.render("customers", { title: "Customers", arrCustomers: customers });
    })
    .catch((error) => res.status(400).send(error));
});

router.post("/calculate", (req, res) => {
  console.log("CUM ROUTE SERVER LLEGO");
  const customerSales = req.body;
  const totalSales = calculateTotal(customerSales);
  res.status(200).send({ totalSales });
  console.log("CUM ROUTE SERVER SE FUE");
});

module.exports = router;

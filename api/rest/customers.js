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

function calculateTotal(customerSales) {
  let total = 0;
  customerSales.forEach((sale) => {
    total += sale.priceEach * sale.quantityOrdered;
  });
  return total;
}

router.post("/calculate", function (req, res, next) {
  console.log("CUM REST LLEGO");
  const customerSales = req.body;
  const totalSales = calculateTotal(customerSales);
  res.json({ totalSales });
  console.log("CUM REST SE FUE");
});

module.exports = router;

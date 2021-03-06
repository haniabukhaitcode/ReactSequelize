const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get gig list
router.get("/", (req, res) =>
  User.findAll()
    .then(users =>
      res.render("users", {
        users
      })
    )
    .catch(err => console.log(err))
);

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    // Insert into table
    User.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(users => res.redirect("/users"))
      .catch(err => console.log(err));
  }
});

// Search for users
router.get("/search", (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  User.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then(users => res.render("users", { users }))
    .catch(err => console.log(err));
});

module.exports = router;

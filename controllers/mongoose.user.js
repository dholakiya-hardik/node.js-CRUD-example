const connection = require("../models/mongoose.connection.js");
const User = require("../models/user.model")
module.exports = {
  /* GET home page. */
  getUserList(req, res, next) {
    User.find({})
      .then((result) => {
        res.render("user", {
          data: result,
        });
      })
      .catch((err) => {
        req.flash("error", err);
        res.render("user", {
          data: "",
        });
      });
  },
  // SHOW ADD USER FORM
  createUser(req, res, next) {
    // render to views/user/add.ejs
    res.render("user/userForm", {
      id: "",
      name: "",
      email: "",
    });
  },
  // ADD NEW USER POST ACTION
  saveUser(req, res, next) {
    const user = new User ({name: req.body.name.trim(), email: req.body.email.trim()})
    user.save()
      .then((result) => {
        req.flash("success", "Data added successfully!");
        res.redirect("/user/list");
      })
      .catch((err) => {
        req.flash("error", err);

        // render to views/user/userForm.ejs
        res.render("user/userForm", {
          name: user.name,
          email: user.email,
        });
      });
  },

  // SHOW EDIT USER FORM
  editUser(req, res, next) {
    console.log("req.params.id",req.params.id)
    User.findOne({_id: req.params.id})
      .then((rows) => {
        // if user not found
        if (rows.length <= 0) {
          req.flash("error", "users not found with id = " + req.params.id);
          res.redirect("/user");
        } else {
          // if user found
          // render to views/user/edit.ejs template file
          res.render("user/userForm", {
            id: rows._id,
            name: rows.name,
            email: rows.email,
          });
        }
      })
      .catch((err) => {
        req.flash("error", "users not found with!" + req.params.id);
        res.redirect("/user");
      });
  },

  // EDIT USER POST ACTION
  updateUser(req, res, next) {
    var user = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
    };

    User.updateOne({_id:req.params.id},{$set:user})
      .then((result) => {
        req.flash("success", "Data updated successfully!");
        res.redirect("/user/list");
      })
      .catch((err) => {
        req.flash("error", err);

        // render to views/user/add.ejs
        res.render("user/userForm", {
          id: req.params._id,
          name: req.body.name,
          email: req.body.email,
        });
      });
  },

  // DELETE USER
  deleteUser(req, res, next) {
    User.deleteOne({_id: req.params.id})
      .then((result) => {
        console.log("result delet ",result)
        req.flash(
          "success",
          "User deleted successfully!"
        );
        // redirect to users list page
        res.redirect("/user/list");
      })
      .catch((err) => {
        req.flash("error", err);
        // redirect to users list page
        res.redirect("/user/list");
      });
  },
};

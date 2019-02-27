const router = require("express").Router();
const knex = require("knex");

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  // get the roles from the database
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  // retrieve a role by id
  db("roles")
    .where({ id: req.params.id })
    .first()
    .then(role => {
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.get('/:id', async (req, res) => {
//   const id = req.params.id
//   try {
//     const role = await db('roles')
//     .where({id})
//     return res.status(200).json(role)
//   } catch(error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// });

router.post("/", (req, res) => {
  // add a role to the database
  db("roles")
    .insert(req.body)
    .then(ids => {
      const [id] = ids;

      db("roles")
        .where({ id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update roles
  db("roles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("roles")
          .where({ id: req.params.id })
          .first()
          .then(role => {
            res.status(200).json(role);
          });
      } else {
        res.status(404).json({ message: "Role not found." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  // remove roles (inactivate the role)
  const id = req.params.id;

  db("roles")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "Role has been deleted." });
      } else {
        res.status(404).json({ message: "Role not found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;

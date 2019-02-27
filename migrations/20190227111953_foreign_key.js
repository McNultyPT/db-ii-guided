// changes to be applied to the database
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments();

    tbl.string("name", 128).notNullable();

    tbl
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.timestamps(true, true); //adds created_at and updated_at columns that default to current date and time.
  });
};

// how to undo changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

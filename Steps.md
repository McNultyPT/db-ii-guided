Make roles table

- run 'knex init' in terminal
- remove 'staging' and 'production' in knexfile and add 'useNullAsDefault: true'
- add '/data/' to filename so knex creates folder
- run 'knex migrate:make createRolesTable' in terminal
- write functions in created table file
- run 'knex migrate:latest' in terminal
- check sqlitestudio to see if migrations were successful
- run 'knex migrate:rollback' in terminal if need to rollback table created

Make user table

- run 'knex migrate:make foreign_key' in terminal to create user table
- write functions in created table file
- run 'knex migrate:latest' in terminal
- check sqlitestudio to see if migrations were successful

Create seeds

- run 'knex seed:make 01-roles' in terminal
- make changes to file
- run 'knex seed:run' in terminal

- go into router file and connect to knexfile.js
- check Postman to see if connected to database


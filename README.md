# node-js-mentoring-program-2020

* get user by id - `GET /api/:userId route`
* create user - `POST /api/create route` with validation
* update user - `POST /api/:userId route` with validation
* get auto-suggest list - `GET /api/list route` with limit and loginSubstring query params
* remove user (soft delete–user gets marked with isDeleted flag, but not removed from the collection) - `DELETE /api/:userId route`

To run the prepare script use the following command:

`npm run prepare_db --db=<URL of the Postgres DB>`

To run the API server use the following command (do not forget to insert .env file with DB URL):

`npm run start`

# ell-app
Help English Language Learners find things to do from a custom curated list. 

### Running Locally
In order to access the database remotely from a local connection. Run the following command:
	DATABASE_URL=$(heroku config:get DATABASE_URL -a ell-app) heroku local

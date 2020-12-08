# user-authentication-test

- /frontend - contains the frontend part, it's plain HTML and JavaScript
- /backend - contains the backend part, uses express and sequelize (postgres orm)

/backend/app.js - handles routes: 

Endpoints:
- app.post "/signup": creates a new user in the database, returns a JWT token
- app.post "/login": finds the user with the same email (email is a unique field), returns a JWT
- app.post "/profile/me": retrieves user's email

Frontend:
- index.html - Index page
- signup.html - Signup page
- login.html - Login page

- index.js - Checks if a cookie exists, if it does, call a post request to /profile/me to retrieve the user's email
- signup.js - When signup button is pressed, call a post request to /signup. Put the returned JWT inside a cookie
- login.js - Similar process to signup.js

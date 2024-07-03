### Getting Started

1. **Command to start the server:**

- yarn dev / npm run dev

1. **Add the .env file:**

#Execution port
PORT=4000

#DB connection url
CONNECTION_URL=mongodb://localhost:27017/test

#Server base url
BASE_URL=http://192.168.31.238:4000/

#Jwt configuration
JWT_SECRET=ASDhffcSAEWvbc
ACCESS_TOKEN_EXPIRATION=1d
REFRESH_TOKEN_EXPIRATION=2d

3. **Connecting to the database:**

- Navigate to `src/config/config.js` and update the `connectionUrl` key.

4. **API endpoint to register a user:**

- Use the following endpoint for new user registration:
  `http://localhost:4000/v1/user/addUser`

5. **Using formData for input:**

- Ensure the following fields are sent as formData: `name`, `email`, `password`, and `profileImage`.

6. **API endpoint for accessing profile images:**

- Access profile images using:
  `http://localhost:4000/uploads/fileName`

7. **Sending email verification:**

- Email verification is implemented using Nodemailer.
- Requires your email ID and an app password generated in account settings after enabling two-step verification.
- Store these keys securely in `src/config/config.js`.

8. **Email verification requirements:**

- Update `baseUrl` in `src/config/config.js` to match the server's system IP.
- Ensure the device sending emails and the server system are connected to the same WiFi network.

### Getting Started

1. **Command to start the server:**

- yarn dev / npm run dev

2. **Connecting to the database:**

- Navigate to `src/config/config.js` and update the `connectionUrl` key.

3. **API endpoint to register a user:**

- Use the following endpoint for new user registration:
  `http://localhost:4000/v1/user/register`

4. **Using formData for input:**

- Ensure the following fields are sent as formData: `name`, `email`, `password`, and `profileImage`.

5. **API endpoint for accessing profile images:**

- Access profile images using:
  `http://localhost:4000/uploads/fileName`

6. **Sending email verification:**

- Email verification is implemented using Nodemailer.
- Requires your email ID and an app password generated in account settings after enabling two-step verification.
- Store these keys securely in `src/config/config.js`.

7. **Email verification requirements:**

- Update `baseUrl` in `src/config/config.js` to match the server's system IP.
- Ensure the device sending emails and the server system are connected to the same WiFi network.

const { baseUrl } = require("../config/config");

const generateHtmlTemplate = ({ verificationToken }) => {
  return {
    subject: "Email Verification",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      margin-top: 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #218838;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Email Verification</h1>
    <p>Please click the button below to verify your email.</p>
    <a href='${baseUrl}v1/user/verifyEmail?token=${verificationToken}'>
    <button class="button" id="verifyButton">Verify Email</button>
    </a>
  </div>
</body>
</html>`,
  };
};

module.exports = { generateHtmlTemplate };

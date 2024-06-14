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

const generateEmailVerificationHtmlTemplate = () => {
  return {
    success: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Success</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Nr83e+VzW74VzifwZ0zMTAPCmN08JYt0J3Ff/pVWfv/O2Rq8CBFD8/LM4JLkG6eqtV1T9wsfFjb9ZMzGCBuLJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .icon {
      color: #28a745;
      font-size: 48px;
      margin-bottom: 20px;
    }
    h1 {
      color: #28a745;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <i class="fas fa-check-circle"></i> <!-- Font Awesome check circle icon -->
    </div>
    <h1>Email Verified Successfully</h1>
    <p>Your email has been successfully verified.</p>
  </div>
</body>
</html>`,
    failed: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Success</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Nr83e+VzW74VzifwZ0zMTAPCmN08JYt0J3Ff/pVWfv/O2Rq8CBFD8/LM4JLkG6eqtV1T9wsfFjb9ZMzGCBuLJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .icon {
      color: #28a745;
      font-size: 48px;
      margin-bottom: 20px;
    }
    h1 {
      color: red;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <i class="fas fa-check-circle"></i> <!-- Font Awesome check circle icon -->
    </div>
    <h1>Email Verification failed</h1>
    <p>Please sign up again to verify.</p>
  </div>
</body>
</html>`,
    alreadyVerified: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Success</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Nr83e+VzW74VzifwZ0zMTAPCmN08JYt0J3Ff/pVWfv/O2Rq8CBFD8/LM4JLkG6eqtV1T9wsfFjb9ZMzGCBuLJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .icon {
      color: #28a745;
      font-size: 48px;
      margin-bottom: 20px;
    }
    h1 {
      color: #28a745;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <i class="fas fa-check-circle"></i> <!-- Font Awesome check circle icon -->
    </div>
    <h1>Email Already Verified</h1>
    <p>Login and enjoy the app.</p>
  </div>
</body>
</html>`,
  };
};

module.exports = {
  generateHtmlTemplate,
  generateEmailVerificationHtmlTemplate,
};

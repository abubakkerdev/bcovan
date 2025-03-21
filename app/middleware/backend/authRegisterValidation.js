const token = process.env.REGISTRATION_TOKEN;

const authRegisterValidation = (req, res, next) => {
  const auth = req.headers.authorization;
   
  const encodedCredentials = auth.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const [username, password] = decodedCredentials.split(":");
 
  if (token === password) {
    next();
  } else {
    return res.send({
      error: { message: "Request URL not found on this Server." },
    });
  }
};

module.exports = authRegisterValidation;

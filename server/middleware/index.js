import jwt from "jsonwebtoken";

export const verifyUserLogin = async (req, res, next) => {
  const userToken = await req.headers["authorization-user"]?.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decodedUser = jwt.verify(userToken, process.env.JWT_CODE);
    req.userId = decodedUser.id;    
    next()
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
    console.log(error);
  }
};


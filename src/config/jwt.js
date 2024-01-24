import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
// import sequelize from "../models/connect.js";
// import initModels from "../models/init-models.js";

// const conn = initModels(sequelize);
const prisma = new PrismaClient();
const createToken = (data) => {
  return jwt.sign({ data }, "NODE38", { expiresIn: "1y" });
};

const checkToken = (token) => {
  return jwt.verify(token, "NODE38", (err, decodded) => {
    if (err) {
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
    return {
      statusCode: 200,
      data: decodded,
    };
  });
};
const khoaApi = async (req, res, next) => {
  // nếu thỏa yêu cầu của middleware thì bypass
  let { token } = req.headers;
  // kiểm trả có token trên header
  if (token) {
    let verifyToken = checkToken(token);
    if (verifyToken.statusCode == 401) {
      res.status(401).send("Invalid token");
      return;
    }
    // nếu muốn check role
    let {
      data: { nguoi_dung_id },
    } = verifyToken.data;
    //check user_id có tồn tại trong DB hay không
    let checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });
    if (!checkUser) {
      res.status(401).send("Invalid token");
      return;
    }
    // handle logic ở đây
    next(); // bypass
  } else {
    res.status(401).send("Unauthorized");
    return;
  }
};
export { createToken, checkToken, khoaApi };

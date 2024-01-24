import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    let { email, password, name, age, avt } = req.body;
    let data = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (data) {
      res.status(400).send("User is existed!");
    } else {
      let encodePassword = bcrypt.hashSync(password, 10);
      let newUser = {
        email,
        mat_khau: encodePassword,
        ho_ten: name,
        tuoi: parseInt(age),
        anh_dai_dien: avt,
      };
      await prisma.nguoi_dung.create({
        data: newUser,
      });
      res.status(201).send("User is created");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let data = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (data) {
      let checkPassword = bcrypt.compareSync(password, data.mat_khau);
      if (checkPassword) {
        let payload = {
          user_id: data.nguoi_dung_id,
        };
        let token = createToken(payload);
        res.status(200).send(token);
      } else {
        res.status(400).send("Password incorrect!");
      }
    } else {
      res.status(404).send("Log-in fail");
    }
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

export { signup, login };

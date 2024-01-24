import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.userId, 10);
    let { email, password, name, age, avt } = req.body;
    let checkUser = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: userId },
    });
    let encodePassword = bcrypt.hashSync(password, 10);
    if (checkUser) {
      let newUpdate = {
        email,
        mat_khau: encodePassword,
        ho_ten: name,
        tuoi: parseInt(age),
        anh_dai_dien: avt,
      };
      await prisma.nguoi_dung.update({
        where: { nguoi_dung_id: userId },
        data: newUpdate,
      });
      res.send(newUpdate);
    } else {
      res.status(404).send(`User with ID ${userId} not found`);
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

export { updateUser };

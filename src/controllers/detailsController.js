import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createComment = async (req, res) => {
  try {
    let { userId, imgId, comment, date } = req.body;
    let user = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: userId },
    });
    let image = await prisma.hinh_anh.findFirst({
      where: { hinh_id: imgId },
    });
    if (!user || !image) {
      return res.status(404).send("User or image not found");
    }
    const isoDate = new Date(date).toISOString();
    let newComment = await prisma.binh_luan.create({
      data: {
        nguoi_dung: { connect: { nguoi_dung_id: userId } },
        hinh_anh: { connect: { hinh_id: imgId } },
        noi_dung: comment,
        ngay_binh_luan: isoDate,
      },
    });
    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

export { createComment };

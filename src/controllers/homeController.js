import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET danh sách ảnh về
const getlistPhoto = async (req, res) => {
  try {
    let data = await prisma.hinh_anh.findMany();
    res.send(data);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//GET tìm kiếm danh sách ảnh theo tên
const getListByName = async (req, res) => {
  try {
    let { namePhoto } = req.query;
    const photos = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: namePhoto,
        },
      },
    });
    res.send(photos);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

export { getlistPhoto, getListByName };

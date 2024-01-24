import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET thông tin user
const getUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.userId, 10);
    const existingUser = await prisma.nguoi_dung.findMany({
      where: { nguoi_dung_id: userId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`User with ID ${userId} not found`);
    }
    const getUserOnId = await prisma.nguoi_dung.findMany({
      where: { nguoi_dung_id: userId },
    });
    res.send(getUserOnId);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//GET danh sách ảnh đã lưu theo user id
const getSavedImgByUserId = async (req, res) => {
  try {
    let userId = parseInt(req.params.userId, 10);
    const existingUser = await prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`User with ID ${userId} not found`);
    }
    const getImgByUser = await prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
    res.send(getImgByUser);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

//GET danh sách ảnh đã tạo theo user id
const getCreatedImg = async (req, res) => {
  try {
    let userId = parseInt(req.params.userId, 10);
    const existingUser = await prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`User with ID ${userId} not found`);
    }
    const getCreated = await prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
    res.send(getCreated);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//DELETE xóa ảnh đã tạo theo id ảnh
const deleteImg = async (req, res) => {
  try {
    let imgId = req.params.imgId;
    const existingImg = await prisma.hinh_anh.findUnique({
      where: { hinh_id: +imgId },
      include: {
        binh_luan: true,
        luu_anh: true,
      },
    });
    if (!existingImg) {
      return res.status(404).send(`Image with ID ${imgId} not found`);
    }
    const binhLuanIds = existingImg.binh_luan.map((bl) => bl.binh_luan_id);
    const luuAnhIds = existingImg.luu_anh.map((la) => la.luu_anh_id);

    await prisma.binh_luan.deleteMany({
      where: { binh_luan_id: { in: binhLuanIds } },
    });
    await prisma.luu_anh.deleteMany({
      where: { luu_anh_id: { in: luuAnhIds } },
    });
    await prisma.hinh_anh.delete({
      where: { hinh_id: imgId },
    });

    res.send(`Deleted image with id ${imgId}`);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

export { getUser, getSavedImgByUserId, getCreatedImg, deleteImg };

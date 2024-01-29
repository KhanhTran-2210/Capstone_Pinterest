import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET thông tin ảnh và người tạo ảnh bằng id ảnh.
const getInfoById = async (req, res) => {
  try {
    let photoId = parseInt(req.params.photoId, 10);
    const existingUser = await prisma.hinh_anh.findMany({
      where: { hinh_id: photoId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`Photo with ID ${photoId} not found`);
    }
    const getPhotoWithCreator = await prisma.hinh_anh.findUnique({
      where: { hinh_id: photoId },
      include: { nguoi_dung: true },
    });
    res.send(getPhotoWithCreator);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//GET thông tin bình luận theo id ảnh
const getCommentById = async (req, res) => {
  try {
    let photoId = parseInt(req.params.photoId, 10);
    const existingUser = await prisma.binh_luan.findMany({
      where: { hinh_id: photoId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`Photo with ID ${photoId} not found`);
    }
    const getCommentByPhotoId = await prisma.binh_luan.findMany({
      where: { hinh_id: photoId },
    });
    res.send(getCommentByPhotoId);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save).
const getPhotoSaved = async (req, res) => {
  try {
    let photoId = parseInt(req.params.photoId, 10);
    const existingUser = await prisma.luu_anh.findMany({
      where: { hinh_id: photoId },
    });
    if (existingUser.length === 0) {
      return res.status(404).send(`Photo with ID ${photoId} not found`);
    }
    const getPhotoSavedById = await prisma.luu_anh.findMany({
      where: { hinh_id: photoId },
    });
    res.send(getPhotoSavedById);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
//POST để lưu thông tin bình luận của người dùng với hình ảnh
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

export { createComment, getInfoById, getCommentById, getPhotoSaved };

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getInfoById = async (req,res) =>{
  try {
    let photoId = parseInt(req.params.photoId, 10) 
    const getPhotoWithCreator = await prisma.hinh_anh.findUnique({
      where:{hinh_id: photoId},
      include:{nguoi_dung:true}

    })
    res.send(getPhotoWithCreator)
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }

}
const getCommentById = async (req,res)=>{
  try {
    let photoId = parseInt(req.params.photoId, 10) 
    const getCommentByPhotoId = await prisma.binh_luan.findMany({
      where: {hinh_id:photoId},


    }) 
    res.send(getCommentByPhotoId)
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
}
const getPhotoSaved = async (req,res)=>{
  try {
    let PhotoId = parseInt(req.params.photoId, 10) 
    const getPhotoSavedById = await prisma.luu_anh.findMany({
      where:{hinh_id:PhotoId},
    })
    res.send(getPhotoSavedById)
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
}
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

export { createComment,getInfoById,getCommentById,getPhotoSaved};

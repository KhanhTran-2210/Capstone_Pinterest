import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const getlistPhoto = async (req,res) => {
    try {
        let data = await prisma.hinh_anh.findMany()
        res.send(data)
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

// const getListByName = async (req,res) => {
//     try {
//         let {namePhoto} = req.params 
        
//     } catch (error) {
//         res.status(500).send(`Error: ${error}`);
        
//     }
// }

export {getlistPhoto}
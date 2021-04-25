const express = require('express')
const Post = require('../Modules/postMesg')
const multer = require('multer')
const {createPost,getPost,deletePost,findpostByid} = require('../Controllers/postController')

const router = express.Router();

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        const fileName=`${Date.now()}_${file.originalname}`;
        cb(null,fileName)
    }
})

const upload= multer({ storage }).single("selectedFile");
router.post('/create', createPost)
router.get('/get',getPost)

router.delete('/delete/:id',deletePost)

router.param('id',findpostByid)
router.post('/add',upload,(req,res)=>{
   const post= new Post({
    title:req.body.title,
    message:req.body.message,
    creator:req.body.creator

})
console.log(req.file)
    post.save()
    .then(()=>res.json({post}))
    .catch((err)=> res.status(400).json({
        error:err
    }))
})

module.exports=router;
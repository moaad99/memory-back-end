const express = require('express')
const Post = require('../Modules/postMesg')
const multer = require('multer')
const {createPost,getPost,deletePost,findpostByid, updatePost} = require('../Controllers/postController')

const router = express.Router();

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cb)=>{
        const fileName=`${Date.now()}_${file.originalname}`;
        cb(null,fileName)
    }
})

const upload = multer({storage:storage})
router.post('/create', createPost)
router.get('/get',getPost)

router.delete('/delete/:id',deletePost)

router.post('/add',upload.single('article'),(req,res)=>{
   const post= new Post({
    title:req.body.title,
    message:req.body.message,
    creator:req.body.creator,
    article: req.file.filename,


})
    post.save()
    .then(()=>res.json({post}))
    .catch((err)=> res.status(400).json({
        error:err
    }))
})
router.put('/update/:id',upload.single('article'), updatePost)
    
 


module.exports=router;
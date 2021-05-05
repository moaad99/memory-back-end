const Post = require('../Modules/postMesg')


exports.getPost =(req,res) =>{

    

        Post.find().exec((err,post) =>{

            if(err){

                return res.status(404).json({

                    error: "Post message not found !!"
                })
            }

            res.json({
                post
            })

        })
}


exports.createPost =(req,res)=>{


    const post = new Post(req.body)

    post.save((err, post) =>{

            if(err){


                return res.status(404).json({

                    error: 'body request !!'
                })

            }

            res.json({
                post: post
            })


    })

}

exports.findpostByid= (req,res,next,id)=>{

    Post.findById(id).exec((err,post)=>{

        if(err|| !post){

            return res.status(404).json({

                error: "post not found !!"
            })
        }

        req.post=post
        next()

    })

}
exports.updatePost=(req,res)=>{
    
Post.findById(req.params.id)
    .then(articl=> {
        articl.title=req.body.title,
        articl.message=req.body.message,
        articl.creator=req.body.creator,
        articl.article= req.file.filename

        articl.save((err, post) =>{

            if(err){


                return res.status(404).json({

                    error: 'body request !!'
                })

            }

            res.json({
                post: articl
            })
        })

    
    })
    .catch((err)=> console.log(err))

}

exports.deletePost=(req,res)=>{

    Post.findById(req.params.id)

    .then((aricle)=>  {
        aricle.remove()
    res.json({message:'post removed'}
    )
    
    })
    
    .catch((err)=> console.log(err))



     

}


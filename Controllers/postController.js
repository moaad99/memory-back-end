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

exports.deletePost=(req,res)=>{

        let post= req.post

        post.remove((err,post)=>{


            if(err){

                return res.status(404).json({

                    error: "post not found !!"
                })
            }

            res.status(204).json({

                message:"post deleted"
            })
        })


}


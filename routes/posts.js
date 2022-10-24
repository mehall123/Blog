const express = require('express')
const router = express.Router()
const post = require('../models/post');

router.get('/',(req, res) => {
        post.find({}, function(err,posts){
        res.render('index',{
            postsList: posts
        })
    })
    })

router.get('/newpost', (req, res) => {
    res.render('newpost')
})

router.get('/delete',(req, res) => {
    post.find({}, function(err,posts){
        res.render('delete',{
            postsList: posts
        })
    })
})

router.get('/update', (req, res) => {
    post.find({}, function(err,posts){
        res.render('update',{
            postsList: posts
        })
    })
})
router.get('/updatepost', (req, res) => {
    updateID = req.query.button
    post.findById(updateID, function(err,posts){
        res.render('updatepost',{
            postsList: posts
        })
    })
})
router.get('/results',(req, res) => {
    search = req.query.search
    post.find({$text: { $search: search}}, function(err,posts){
    res.render('results',{
        postsList: posts
    })
})
})

.post("/new", function(req, res) {
   newPost = new post({
     author: req.body.author,
     heading: req.body.heading,
     content: req.body.content
    })
newPost.save()
res.redirect('/')
})

.post("/delete", function(req, res) {
    id = req.body.button
    post.findByIdAndRemove(id, function(err){
        if (err){
            console.log(err)
        }else{
            res.redirect('/delete')  
        }
    })
 })

 .post("/updatepost", function(req, res) {
      post.findByIdAndUpdate(
        { _id: req.body.button },
        { author: req.body.author,
          heading: req.body.heading,
          content: req.body.content,  
        },
        function(err) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/') 
          }
        }
      );   
 })
 
module.exports = router
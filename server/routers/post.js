const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');
const User = require('../schemas/users');


router.get('/',async(req,res,next)=>{
    try {
        const showpost = await Post.find({});
        res.json(showpost);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
router.post('/',async(req,res,next) => {
    try {
        let userinfo = await User.find({nickname : req.body.user_name});

        if (userinfo) {
            let address = userinfo[0].address;
            let profile_image = userinfo[0].profile_image;


            const postcontent = await Post.create({
            user_name: req.body.user_name,
            like: Math.floor(Math.random() * 1234567),
            problem_name: req.body.problem_name,
            profile_image: profile_image,
            title: req.body.title,
            content: req.body.content,
            created_at : new Date(),
            address: address,
    });
        return res.status(201).json(postcontent);
    } 
    else  {
        return res.status(500).send("You need to log in to post");
    }
    } catch (err) {
        console.log(err);
        next(err);
    }
});
router.get('/serach', async (req,res,next) => {
    try {
        let problem_title = req.query.problem_title;
        if(problem_title){
            const showpost = await Post.find({"problem_title": `${problem_title}`});
            return res.json(showpost);
        }
        else {
            return res.status(500).send("Query parameter does not exist");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/bookmark',async (req,res,next) => {
    let user_name = req.body.user_name;
    let postname = req.body.post_name;

    // 유저를 찾고 그 다음 포스트를 북마크 컬럼에 업데이트
    if(user_name && postname) {
        await User.update({"nickname": `${user_name}`},
        {$push: { bookmark : `${postname}`}}).then(res => {
            return res.status(200).send("성공");
        }).catch(err => {
            console.error(err);
            next(err);
            return res.status(500).send("실패영");
        });
    }
    else {
        return res.status(500).send("");
    }
})
router.get('/bookmark',async (req,res,next) => {
    let user_name = req.query.user_name;
    let result;
    let bookmarkdata;
    if(user_name){
        result = await User.find({"nickname": `${user_name}`});
        // nickname이 사용자와 같은 사람중
        let find = result[0].bookmark;
        console.log(find);
        // bookmark와 title이 같으면 결과 출력
        let query = find.map(e=>{return {title:e
        }});
        console.log(query);
        bookmarkdata = await Post.find({$or: query});
        return res.status(200).json(bookmarkdata);
    }
});
module.exports = router;
// TODO: 컨트롤러 코드
const { format } = require('mysql');
const User = require('../model/User');

//controller.main
exports.main = (req, res) => {
    res.render('index');
};

//controller.getSignin => 로그인페이지 렌더링
exports.getSignin = (req, res) => {
    res.render('signin');
};

//controller.postSignin => 로그인 성공 (true), 실패(false)
exports.postSignin = (req, res) => {
    User.postSignin(req.body, (result) => {
        if ( result == undefined){
        return res.send(false);
        }
        res.send(true);
    
});
}

//controller.getSignup => 회원가입 폼 렌더링
exports.getSignup = (req, res) => {
    res.render('signup');
};
// controller.postSignup => 회원가입 정보 DB에 insert -> 저장
exports.postSignup = (req, res) => {
    console.log(req.body);
    User.postSignup(req.body, (result) => {
        res.send({
            userid: result,
            name: req.body.name,
            pw: req.body.pw,
        });
    });
};




exports.postProfile = (req, res) => {
    
    // res.render('profile', {data: req.body.userid});
    // }

    User.postProfile(req.body.userid, (result)=>{
       if ( result === undefined){
       res.redirect('/user/signin');
       }
       res.render('profile', {data: result});
    })
};

exports.postEdit = (req, res) => {
    console.log(req.body);
 User.postEdit(req.body, (result)=>{
    return res.send('회원정보 성공 수정!');
 })
}

exports.postDelete = (req, res) => {
    User.postDelete(req.body, (result) => {
        console.log('Cvisitor.js: ', result);
        res.redirect('/user/signin');
        // res.redirect('/user/signin');
      });
}

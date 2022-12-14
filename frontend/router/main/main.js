var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');

/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동

router.get('/', function(req, res){


  console.log('main.js 실행');
  console.log('유저id : ' + req.user);
  var userNickname;
  if(req.user){
    var query = connection.query("select nickname from user where id=" + req.user + ";", function(err, rows){
      if(err) return err;
      else{
        if(rows[0]){
          console.log(rows[0].nickname);
          userNickname = rows[0].nickname;
          res.render('index.ejs', {user : userNickname});
        }
      }
    })
  }
  else{
    res.render('index.ejs', {user : userNickname});
  }
  
})

function before() {
  var token = document.cookie.match("jwt");
  console.log(token);
  $.ajax({
      type: "GET",
      url: "/api/me",
      beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type","application/json");
          xhr.setRequestHeader("Authorization","JWT " + token);
      },
      success: function (res) {
          console.log(res);
      }
  });
}


function getCookie(name) {

  var nameOfCookie = name + "="; 
  
  var x = 0;
  
  while (x <= document.cookie.length) {  
  
       var y = (x + nameOfCookie.length);
  
       if (document.cookie.substring(x, y) == nameOfCookie) { 
  
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)  
  
                 endOfCookie = document.cookie.length; 
  
            return unescape(document.cookie.substring(y, endOfCookie)); 
       }
  
       x = document.cookie.indexOf(" ", x) + 1;
  
       if (x == 0) 
  
            break;
      }
  
  return ""; 
  
  }

module.exports = router;
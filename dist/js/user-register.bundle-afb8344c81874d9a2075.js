webpackJsonp([12],{1:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var u=t(0),s=function(e){return e&&e.__esModule?e:{default:e}}(u),o={register:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/register.do"),method:"POST",data:e,success:r,error:t})},checkUsername:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/check_valid.do"),method:"POST",data:{type:"username",str:e},success:r,error:t})},login:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/login.do"),method:"POST",data:e,success:r,error:t})},getQuestion:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/forget_get_question.do"),method:"POST",data:{username:e},success:r,error:t})},checkAnswer:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/forget_check_answer.do"),method:"POST",data:e,success:r,error:t})},resetPassword:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/forget_reset_password.do"),method:"POST",data:e,success:r,error:t})},getUserInfo:function(e,r){s.default.request({url:s.default.getServerUrl("/user/get_information.do"),method:"POST",success:e,error:r})},updatePassword:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/reset_password.do"),method:"POST",data:e,success:r,error:t})},updateUserInfo:function(e,r,t){s.default.request({url:s.default.getServerUrl("/user/update_information.do"),method:"POST",data:e,success:r,error:t})},logout:function(e,r){s.default.request({url:s.default.getServerUrl("/user/logout.do"),method:"POST",success:e,error:r})},checkLogin:function(e,r){s.default.request({url:s.default.getServerUrl("/user/get_user_info.do"),method:"POST",success:e,error:r})}};r.default=o},10:function(e,r,t){"use strict";t(11)},11:function(e,r){},75:function(e,r,t){e.exports=t(76)},76:function(e,r,t){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}t(77),t(10);var s=t(0),o=u(s),a=t(1),n=u(a),i={show:function(e){$(".error-item").show().find(".error-msg").text(e)},hide:function(){$(".error-item").hide().find(".error-msg").text("")}},d={init:function(){this.bindEvent()},bindEvent:function(){var e=this;$("#user-name").blur(function(){var e=$.trim($("#user-name").val());n.default.checkUsername(e,function(e){i.hide()},function(e){i.show(e)})}),$("#submit").click(function(){e.submit()}),$(".user-content").keyup(function(r){13===r.keyCode&&e.submit()})},submit:function(){var e={username:$.trim($("#user-name").val()),password:$.trim($("#password").val()),passwordConfirm:$.trim($("#password-confirm").val()),phone:$.trim($("#phone").val()),email:$.trim($("#email").val()),question:$.trim($("#question").val()),answer:$.trim($("#answer").val())},r=this.formValidate(e);r.status?n.default.register(e,function(e){window.location.href="./result.html?type=register"},function(e){i.show(e)}):i.show(r.msg)},formValidate:function(e){var r={status:!1,msg:""};return o.default.validate(e.username,"require")?o.default.validate(e.password,"require")?e.password.length<6?(r.msg="密码不能少于6位~",r):e.password!==e.passwordConfirm?(r.msg="两次输入的密码不一样~",r):o.default.validate(e.phone,"phone")?o.default.validate(e.email,"email")?o.default.validate(e.question,"require")?o.default.validate(e.answer,"require")?(r.status=!0,r):(r.msg="提示问题答案不能为空~",r):(r.msg="提示问题不能为空~",r):(r.msg="输入的邮箱不正确~",r):(r.msg="输入的手机号不正确~",r):(r.msg="密码不能为空~",r):(r.msg="用户名不能为空~",r)}};$(function(){d.init()})},77:function(e,r){}},[75]);
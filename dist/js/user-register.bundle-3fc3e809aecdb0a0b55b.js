webpackJsonp([3],[function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),i={serverHost:""},s={request:function(t){$.ajax({type:t.method||"get",url:t.url||"",dataType:t.type||"json",data:t.data||"",success:function(e){0===e.status?"function"==typeof t.success&&t.success(e.data,e.msg):10===e.status?this.doLogin.bind(s):1===e.status&&"function"==typeof t.error&&t.error(e.msg)},error:function(e){"function"==typeof t.error&&t.error(e.statusText)}})},getServerUrl:function(t){return i.serverHost+t},getURLParam:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(e);return r?decodeURIComponent(r[2]):null},renderHTML:function(t,e){return n.compile(t).render(e)},successTips:function(t){alert(t||"操作成功！")},errorTips:function(t){alert(t||"哪有不对了~")},validate:function(t,e){var r=$.trim(t);return"require"===e?!!r:"phone"===e?/^1[3|4|5|8][0-9]\d{4,8}$/.test(t):"email"===e?/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(t):void 0},doLogin:function(){window.location.href="./user-login.html?redirect="+encodeURIComponent(window.location.href)},goHome:function(){window.location.href="./index.html"}};e.default=s},function(t,e,r){var n=r(2);n.Template=r(3).Template,n.template=n.Template,t.exports=n},function(t,e,r){!function(t){function e(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function r(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function n(t,e,r){if(e.charAt(r)!=t.charAt(0))return!1;for(var n=1,i=t.length;n<i;n++)if(e.charAt(r+n)!=t.charAt(n))return!1;return!0}function i(e,r,n,o){var u=[],c=null,l=null,f=null;for(l=n[n.length-1];e.length>0;){if(f=e.shift(),l&&"<"==l.tag&&!(f.tag in k))throw new Error("Illegal content in < super tag.");if(t.tags[f.tag]<=t.tags.$||s(f,o))n.push(f),f.nodes=i(e,f.tag,n,o);else{if("/"==f.tag){if(0===n.length)throw new Error("Closing tag without opener: /"+f.n);if(c=n.pop(),f.n!=c.n&&!a(f.n,c.n,o))throw new Error("Nesting error: "+c.n+" vs. "+f.n);return c.end=f.i,u}"\n"==f.tag&&(f.last=0==e.length||"\n"==e[0].tag)}u.push(f)}if(n.length>0)throw new Error("missing closing tag: "+n.pop().n);return u}function s(t,e){for(var r=0,n=e.length;r<n;r++)if(e[r].o==t.n)return t.tag="#",!0}function a(t,e,r){for(var n=0,i=r.length;n<i;n++)if(r[n].c==t&&r[n].o==e)return!0}function o(t){var e=[];for(var r in t)e.push('"'+c(r)+'": function(c,p,t,i) {'+t[r]+"}");return"{ "+e.join(",")+" }"}function u(t){var e=[];for(var r in t.partials)e.push('"'+c(r)+'":{name:"'+c(t.partials[r].name)+'", '+u(t.partials[r])+"}");return"partials: {"+e.join(",")+"}, subs: "+o(t.subs)}function c(t){return t.replace(b,"\\\\").replace(g,'\\"').replace(m,"\\n").replace(v,"\\r").replace(w,"\\u2028").replace(S,"\\u2029")}function l(t){return~t.indexOf(".")?"d":"f"}function f(t,e){var r="<"+(e.prefix||""),n=r+t.n+T++;return e.partials[n]={name:t.n,partials:{}},e.code+='t.b(t.rp("'+c(n)+'",c,p,"'+(t.indent||"")+'"));',n}function h(t,e){e.code+="t.b(t.t(t."+l(t.n)+'("'+c(t.n)+'",c,p,0)));'}function d(t){return"t.b("+t+");"}var p=/\S/,g=/\"/g,m=/\n/g,v=/\r/g,b=/\\/g,w=/\u2028/,S=/\u2029/;t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(i,s){function a(){d.length>0&&(g.push({tag:"_t",text:new String(d)}),d="")}function o(){for(var e=!0,r=b;r<g.length;r++)if(!(e=t.tags[g[r].tag]<t.tags._v||"_t"==g[r].tag&&null===g[r].text.match(p)))return!1;return e}function u(t,e){if(a(),t&&o())for(var r,n=b;n<g.length;n++)g[n].text&&((r=g[n+1])&&">"==r.tag&&(r.indent=g[n].text.toString()),g.splice(n,1));else e||g.push({tag:"\n"});m=!1,b=g.length}var c=i.length,l=0,f=null,h=null,d="",g=[],m=!1,v=0,b=0,w="{{",S="}}";for(s&&(s=s.split(" "),w=s[0],S=s[1]),v=0;v<c;v++)0==l?n(w,i,v)?(--v,a(),l=1):"\n"==i.charAt(v)?u(m):d+=i.charAt(v):1==l?(v+=w.length-1,h=t.tags[i.charAt(v+1)],f=h?i.charAt(v+1):"_v","="==f?(v=function(t,e){var n="="+S,i=t.indexOf(n,e),s=r(t.substring(t.indexOf("=",e)+1,i)).split(" ");return w=s[0],S=s[s.length-1],i+n.length-1}(i,v),l=0):(h&&v++,l=2),m=v):n(S,i,v)?(g.push({tag:f,n:r(d),otag:w,ctag:S,i:"/"==f?m-w.length:v+S.length}),d="",v+=S.length-1,l=0,"{"==f&&("}}"==S?v++:e(g[g.length-1]))):d+=i.charAt(v);return u(m,!0),g};var k={_t:!0,"\n":!0,$:!0,"/":!0};t.stringify=function(e,r,n){return"{code: function (c,p,i) { "+t.wrapMain(e.code)+" },"+u(e)+"}"};var T=0;t.generate=function(e,r,n){T=0;var i={code:"",subs:{},partials:{}};return t.walk(e,i),n.asString?this.stringify(i,r,n):this.makeTemplate(i,r,n)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,e,r){var n=this.makePartials(t);return n.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(n,e,this,r)},t.makePartials=function(t){var e,r={subs:{},partials:t.partials,name:t.name};for(e in r.partials)r.partials[e]=this.makePartials(r.partials[e]);for(e in t.subs)r.subs[e]=new Function("c","p","t","i",t.subs[e]);return r},t.codegen={"#":function(e,r){r.code+="if(t.s(t."+l(e.n)+'("'+c(e.n)+'",c,p,1),c,p,0,'+e.i+","+e.end+',"'+e.otag+" "+e.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(e.nodes,r),r.code+="});c.pop();}"},"^":function(e,r){r.code+="if(!t.s(t."+l(e.n)+'("'+c(e.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(e.nodes,r),r.code+="};"},">":f,"<":function(e,r){var n={partials:{},code:"",subs:{},inPartial:!0};t.walk(e.nodes,n);var i=r.partials[f(e,r)];i.subs=n.subs,i.partials=n.partials},$:function(e,r){var n={subs:{},code:"",partials:r.partials,prefix:e.n};t.walk(e.nodes,n),r.subs[e.n]=n.code,r.inPartial||(r.code+='t.sub("'+c(e.n)+'",c,p,i);')},"\n":function(t,e){e.code+=d('"\\n"'+(t.last?"":" + i"))},_v:function(t,e){e.code+="t.b(t.v(t."+l(t.n)+'("'+c(t.n)+'",c,p,0)));'},_t:function(t,e){e.code+=d('"'+c(t.text)+'"')},"{":h,"&":h},t.walk=function(e,r){for(var n,i=0,s=e.length;i<s;i++)(n=t.codegen[e[i].tag])&&n(e[i],r);return r},t.parse=function(t,e,r){return r=r||{},i(t,"",[],r.sectionTags||[])},t.cache={},t.cacheKey=function(t,e){return[t,!!e.asString,!!e.disableLambda,e.delimiters,!!e.modelGet].join("||")},t.compile=function(e,r){r=r||{};var n=t.cacheKey(e,r),i=this.cache[n];if(i){var s=i.partials;for(var a in s)delete s[a].instance;return i}return i=this.generate(this.parse(this.scan(e,r.delimiters),e,r),e,r),this.cache[n]=i}}(e)},function(t,e,r){!function(t){function e(t,e,r){var n;return e&&"object"==typeof e&&(void 0!==e[t]?n=e[t]:r&&e.get&&"function"==typeof e.get&&(n=e.get(t))),n}function r(t,e,r,n,i,s){function a(){}function o(){}a.prototype=t,o.prototype=t.subs;var u,c=new a;c.subs=new o,c.subsText={},c.buf="",n=n||{},c.stackSubs=n,c.subsText=s;for(u in e)n[u]||(n[u]=e[u]);for(u in n)c.subs[u]=n[u];i=i||{},c.stackPartials=i;for(u in r)i[u]||(i[u]=r[u]);for(u in i)c.partials[u]=i[u];return c}function n(t){return String(null===t||void 0===t?"":t)}function i(t){return t=n(t),l.test(t)?t.replace(s,"&amp;").replace(a,"&lt;").replace(o,"&gt;").replace(u,"&#39;").replace(c,"&quot;"):t}t.Template=function(t,e,r,n){t=t||{},this.r=t.code||this.r,this.c=r,this.options=n||{},this.text=e||"",this.partials=t.partials||{},this.subs=t.subs||{},this.buf=""},t.Template.prototype={r:function(t,e,r){return""},v:i,t:n,render:function(t,e,r){return this.ri([t],e||{},r)},ri:function(t,e,r){return this.r(t,e,r)},ep:function(t,e){var n=this.partials[t],i=e[n.name];if(n.instance&&n.base==i)return n.instance;if("string"==typeof i){if(!this.c)throw new Error("No compiler available.");i=this.c.compile(i,this.options)}if(!i)return null;if(this.partials[t].base=i,n.subs){e.stackText||(e.stackText={});for(key in n.subs)e.stackText[key]||(e.stackText[key]=void 0!==this.activeSub&&e.stackText[this.activeSub]?e.stackText[this.activeSub]:this.text);i=r(i,n.subs,n.partials,this.stackSubs,this.stackPartials,e.stackText)}return this.partials[t].instance=i,i},rp:function(t,e,r,n){var i=this.ep(t,r);return i?i.ri(e,r,n):""},rs:function(t,e,r){var n=t[t.length-1];if(!f(n))return void r(t,e,this);for(var i=0;i<n.length;i++)t.push(n[i]),r(t,e,this),t.pop()},s:function(t,e,r,n,i,s,a){var o;return(!f(t)||0!==t.length)&&("function"==typeof t&&(t=this.ms(t,e,r,n,i,s,a)),o=!!t,!n&&o&&e&&e.push("object"==typeof t?t:e[e.length-1]),o)},d:function(t,r,n,i){var s,a=t.split("."),o=this.f(a[0],r,n,i),u=this.options.modelGet,c=null;if("."===t&&f(r[r.length-2]))o=r[r.length-1];else for(var l=1;l<a.length;l++)s=e(a[l],o,u),void 0!==s?(c=o,o=s):o="";return!(i&&!o)&&(i||"function"!=typeof o||(r.push(c),o=this.mv(o,r,n),r.pop()),o)},f:function(t,r,n,i){for(var s=!1,a=null,o=!1,u=this.options.modelGet,c=r.length-1;c>=0;c--)if(a=r[c],void 0!==(s=e(t,a,u))){o=!0;break}return o?(i||"function"!=typeof s||(s=this.mv(s,r,n)),s):!i&&""},ls:function(t,e,r,i,s){var a=this.options.delimiters;return this.options.delimiters=s,this.b(this.ct(n(t.call(e,i)),e,r)),this.options.delimiters=a,!1},ct:function(t,e,r){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(e,r)},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ms:function(t,e,r,n,i,s,a){var o,u=e[e.length-1],c=t.call(u);return"function"==typeof c?!!n||(o=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(c,u,r,o.substring(i,s),a)):c},mv:function(t,e,r){var i=e[e.length-1],s=t.call(i);return"function"==typeof s?this.ct(n(s.call(i)),i,r):s},sub:function(t,e,r,n){var i=this.subs[t];i&&(this.activeSub=t,i(e,r,this,n),this.activeSub=!1)}};var s=/&/g,a=/</g,o=/>/g,u=/\'/g,c=/\"/g,l=/[&<>\"\']/,f=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(e)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=function(t){return t&&t.__esModule?t:{default:t}}(n),s={register:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/register.do"),method:"POST",data:t,success:e,error:r})},checkUsername:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/check_valid.do"),method:"POST",data:{type:"username",str:t},success:e,error:r})},login:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/login.do"),method:"POST",data:t,success:e,error:r})},getQuestion:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/forget_get_question.do"),method:"POST",data:{username:t},success:e,error:r})},checkAnswer:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/forget_check_answer.do"),method:"POST",data:t,success:e,error:r})},resetPassword:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/forget_reset_password.do"),method:"POST",data:t,success:e,error:r})},getUserInfo:function(t,e){i.default.request({url:i.default.getServerUrl("/user/get_information.do"),method:"POST",success:t,error:e})},updateUserInfo:function(t,e,r){i.default.request({url:i.default.getServerUrl("/user/update_information.do"),method:"POST",data:t,success:e,error:r})},logout:function(t,e){i.default.request({url:i.default.getServerUrl("/user/logout.do"),method:"POST",success:t,error:e})},checkLogin:function(t,e){i.default.request({url:i.default.getServerUrl("/user/get_user_info.do"),method:"POST",success:t,error:e})}};e.default=s},function(t,e,r){"use strict";r(6)},function(t,e){},,,,,,,,,,,,,,,,,,,,function(t,e,r){t.exports=r(27)},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r(28),r(5);var i=r(0),s=n(i),a=r(4),o=n(a),u={show:function(t){$(".error-item").show().find(".error-msg").text(t)},hide:function(){$(".error-item").hide().find(".error-msg").text("")}},c={init:function(){this.bindEvent()},bindEvent:function(){var t=this;$("#user-name").blur(function(){var t=$.trim($("#user-name").val());o.default.checkUsername(t,function(t){u.hide()},function(t){u.show(t)})}),$("#submit").click(function(){t.submit()}),$(".user-content").keyup(function(e){13===e.keyCode&&t.submit()})},submit:function(){var t={username:$.trim($("#user-name").val()),password:$.trim($("#password").val()),passwordConfirm:$.trim($("#password-confirm").val()),phone:$.trim($("#phone").val()),email:$.trim($("#email").val()),question:$.trim($("#question").val()),answer:$.trim($("#answer").val())},e=this.formValidate(t);e.status?o.default.register(t,function(t){window.location.href="./result.html?type=register"},function(t){u.show(t)}):u.show(e.msg)},formValidate:function(t){var e={status:!1,msg:""};return s.default.validate(t.username,"require")?s.default.validate(t.password,"require")?t.password.length<6?(e.msg="密码不能少于6位~",e):t.password!==t.passwordConfirm?(e.msg="两次输入的密码不一样~",e):s.default.validate(t.phone,"phone")?s.default.validate(t.email,"email")?s.default.validate(t.question,"require")?s.default.validate(t.answer,"require")?(e.status=!0,e):(e.msg="提示问题答案不能为空~",e):(e.msg="提示问题不能为空~",e):(e.msg="输入的邮箱不正确~",e):(e.msg="输入的手机号不正确~",e):(e.msg="密码不能为空~",e):(e.msg="用户名不能为空~",e)}};$(function(){c.init()})},function(t,e){}],[26]);
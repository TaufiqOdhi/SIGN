(this.webpackJsonpsign=this.webpackJsonpsign||[]).push([[0],{55:function(e,t,n){e.exports=n(66)},60:function(e,t,n){},61:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),c=n.n(l),o=(n(60),n(61),n(42)),i=n(18),m=n(13),u=n(4),s=n(83),E=n(86),g=n(88),d=n(81),f=n(84),h=n(87),p=n(82),b=n(85),w=n(90),k=n(89),v=Object(u.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}}}))(d.a),S=Object(u.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}}}))(p.a),j="https://us-central1-sign-e15cc.cloudfunctions.net/server/getScores?username="+window.location.href.split("https://sign-e15cc.firebaseapp.com/detail?username=")[1],y=function(){return fetch(j).then((function(e){return e.json()}))},O=Object(s.a)({table:{minWidth:700}});function C(){var e=O();return r.a.createElement(f.a,{component:b.a},r.a.createElement(E.a,{className:e.table,"aria-label":"customized table"},r.a.createElement(h.a,null,r.a.createElement(p.a,null,r.a.createElement(v,null,"Game"),r.a.createElement(v,{align:"center"},"Finish Score"),r.a.createElement(v,{align:"center"},"TimeScore"))),r.a.createElement(m.a,{promiseFn:y},r.a.createElement(m.a.Loading,null,"Loading....."),r.a.createElement(m.a.Resolved,null,(function(e){return r.a.createElement(g.a,null,e.map((function(e){return r.a.createElement(S,{key:e.no},r.a.createElement(v,{component:"th",scope:"row"},e.no),r.a.createElement(v,{align:"center"},e.finishscore),r.a.createElement(v,{align:"center"},e.timescore))})))})),r.a.createElement(m.a.Rejected,null,(function(e){return"Something went wrong: ".concat(e.message)})))))}var z=Object(u.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}}}))(d.a),F=Object(u.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}}}))(p.a),L=Object(s.a)({table:{minWidth:700}}),R=function(){return fetch("https://us-central1-sign-e15cc.cloudfunctions.net/server/getData").then((function(e){return e.json()}))};var W=function(){var e=L();return r.a.createElement(f.a,{component:b.a},r.a.createElement(E.a,{className:e.table,"aria-label":"customized table"},r.a.createElement(h.a,null,r.a.createElement(p.a,null,r.a.createElement(z,{align:"center"},"Username"),r.a.createElement(z,{align:"center"},"Nama"),r.a.createElement(z,{align:"center"},"Asal Sekolah"),r.a.createElement(z,{align:"center"},"Finish Score"),r.a.createElement(z,{align:"center"},"TimeScore"),r.a.createElement(z,{align:"center"},"Detail"),r.a.createElement(z,{align:"center"},"Certificate"))),r.a.createElement(m.a,{promiseFn:R},r.a.createElement(m.a.Loading,null,"Loading..."),r.a.createElement(m.a.Resolved,null,(function(e){return r.a.createElement(g.a,null,e.map((function(e){return r.a.createElement(F,null,r.a.createElement(z,{component:"th"},e.username),r.a.createElement(z,{align:"left"},e.nama),r.a.createElement(z,{align:"left"},e.asalSekolah),r.a.createElement(z,{align:"center"},e.finishscore),r.a.createElement(z,{align:"center"},e.timescore),r.a.createElement(z,{align:"center"},r.a.createElement(w.a,{href:"/detail?username="+e.username},r.a.createElement(k.a,null,"Detail"))),r.a.createElement(z,{align:"center"},r.a.createElement(w.a,{href:"https://us-central1-sign-e15cc.cloudfunctions.net/server?username="+e.username,target:"_blank"},r.a.createElement(k.a,{color:"primary"},"Open"))))})))})),r.a.createElement(m.a.Rejected,null,(function(e){return"Something went wrong: ".concat(e.message)})))))};var D=function(){return r.a.createElement(o.a,null,r.a.createElement("div",null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/detail"},r.a.createElement(C,null)),r.a.createElement(i.a,{path:"/"},r.a.createElement(W,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[55,1,2]]]);
//# sourceMappingURL=main.cb02aed1.chunk.js.map
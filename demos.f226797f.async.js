"use strict";(self.webpackChunk_pansy_request=self.webpackChunk_pansy_request||[]).push([[433],{81019:function(g,o,n){n.d(o,{BT:function(){return H},FD:function(){return k},EG:function(){return Q},LW:function(){return J}});var f=n(35290),u=n.n(f),E=n(411),c=n.n(E),h=n(7424),r=n(283),R=n(61411),P=n(44463),C=n.n(P),j=n(30279),S=n.n(j),_=n(13885),N=["getResponse"],l,d={},Z=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};d=t},z=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};d=_objectSpread(_objectSpread({},d),t),l=null,y()},y=function(){var t,e,m,v;return l||(l=_.ZP.create(d),(t=d)===null||t===void 0||(e=t.requestInterceptors)===null||e===void 0||e.forEach(function(s){return s instanceof Array?l.interceptors.request.use(s[0],s[1]):l.interceptors.request.use(s)}),(m=d)===null||m===void 0||(v=m.responseInterceptors)===null||v===void 0||v.forEach(function(s){return s instanceof Array?l.interceptors.response.use(s[0],s[1]):l.interceptors.response.use(s)}),l.interceptors.response.use(function(s){try{var i,M;if((i=d)!==null&&i!==void 0&&(M=i.errorConfig)!==null&&M!==void 0&&M.errorThrower&&d.errorConfig.errorThrower(s))return Promise.reject(s)}catch(D){return Promise.reject(D)}return s}),l)},G=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{method:"GET"},m=y(),v=e.getResponse,s=v===void 0?"data":v,i=C()(e,N);return new Promise(function(M,D){m.request(S()(S()({},i),{},{url:t})).then(function(O){var T,I;switch(s){case"data":I=(T=O.data)===null||T===void 0?void 0:T.data;break;case!1:I=O.data;break;default:I=O;break}M(I)}).catch(function(O){try{var T,I=(T=d.errorConfig)===null||T===void 0?void 0:T.errorHandler;I&&I(O,i,d)}catch(x){D(x)}D(O)})})},p;(function(a){a[a.SILENT=0]="SILENT",a[a.WARN_MESSAGE=1]="WARN_MESSAGE",a[a.ERROR_MESSAGE=2]="ERROR_MESSAGE",a[a.NOTIFICATION=3]="NOTIFICATION",a[a.REDIRECT=9]="REDIRECT"})(p||(p={})),(0,h.sj)({onRequest:function(t,e){if(t.url==="/api/user"){e.resolve({config:t,status:200,headers:{"content-type":"application/json"},response:{code:0,data:"Tom",message:"OK"}});return}if(t.url==="/api/userError"){e.resolve({config:t,status:200,headers:{"content-type":"application/json"},response:{code:400100,message:"\u7528\u6237\u4E0D\u5B58\u5728"}});return}e.next(t)}});var K=function(t){var e;return(t==null||(e=t.data)===null||e===void 0?void 0:e.code)!==0},F=function(t,e){if(e!=null&&e.skipErrorHandler)throw t;if(t!=null&&t.data&&K(t)){var m,v,s,i=t.data,M=((m=t.request)===null||m===void 0||(v=m.options)===null||v===void 0||(s=v.params)===null||s===void 0?void 0:s.showType)||(i==null?void 0:i.showType);if(i){var D=i.message,O=i.code;switch(M){case p.SILENT:break;case p.WARN_MESSAGE:r.ZP.warn(D);break;case p.ERROR_MESSAGE:r.ZP.error(D);break;case p.NOTIFICATION:R.Z.open({description:D,message:O});break;case p.REDIRECT:break;default:r.ZP.error(D)}}else t.response?r.ZP.error("Response status:",t.response.status):t.request?r.ZP.error("None response! Please retry."):r.ZP.error("Request error, please retry.")}throw t};Z({errorConfig:{errorHandler:F,errorThrower:K}});var A=G;function H(){return U.apply(this,arguments)}function U(){return U=c()(u()().mark(function a(){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("/api/user",{method:"GET"}));case 1:case"end":return e.stop()}},a)})),U.apply(this,arguments)}function k(){return W.apply(this,arguments)}function W(){return W=c()(u()().mark(function a(){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("/api/user",{method:"GET",getResponse:!1}));case 1:case"end":return e.stop()}},a)})),W.apply(this,arguments)}function Q(){return B.apply(this,arguments)}function B(){return B=c()(u()().mark(function a(){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("/api/user",{method:"GET",getResponse:!0}));case 1:case"end":return e.stop()}},a)})),B.apply(this,arguments)}function J(){return L.apply(this,arguments)}function L(){return L=c()(u()().mark(function a(){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("/api/userError"));case 1:case"end":return e.stop()}},a)})),L.apply(this,arguments)}},7217:function(g,o,n){n.r(o);var f=n(283),u=n(87405),E=n(88218),c=n(81019),h=n(11527);o.default=function(){var r=(0,E.Q)(c.BT,{manual:!0,onSuccess:function(C){f.ZP.info(C)}}),R=function(){r.run()};return(0,h.jsx)(u.Z,{onClick:R,children:"\u83B7\u53D6\u7528\u6237\u540D"})}},29178:function(g,o,n){n.r(o);var f=n(283),u=n(87405),E=n(88218),c=n(81019),h=n(11527);o.default=function(){var r=(0,E.Q)(c.FD,{manual:!0,onSuccess:function(C){f.ZP.info(JSON.stringify(C))}}),R=function(){r.run()};return(0,h.jsx)(u.Z,{onClick:R,children:"\u83B7\u53D6\u7528\u6237\u540D"})}},5132:function(g,o,n){n.r(o);var f=n(87405),u=n(88218),E=n(81019),c=n(11527);o.default=function(){var h=(0,u.Q)(E.EG,{manual:!0,onSuccess:function(P){console.log(P)}}),r=function(){h.run()};return(0,c.jsx)(f.Z,{onClick:r,children:"\u83B7\u53D6\u7528\u6237\u540D"})}},70040:function(g,o,n){n.r(o);var f=n(283),u=n(87405),E=n(88218),c=n(81019),h=n(11527);o.default=function(){var r=(0,E.Q)(c.LW,{manual:!0,onSuccess:function(C){f.ZP.info(JSON.stringify(C))}}),R=function(){r.run()};return(0,h.jsx)(u.Z,{onClick:R,children:"\u83B7\u53D6\u7528\u6237\u540D"})}}}]);

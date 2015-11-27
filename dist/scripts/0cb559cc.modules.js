!function(a,b,c){"use strict";function d(a){return null!=a&&""!==a&&"hasOwnProperty"!==a&&h.test("."+a)}function e(a,e){if(!d(e))throw g("badmember",'Dotted member path "@{0}" is invalid.',e);for(var f=e.split("."),h=0,i=f.length;i>h&&b.isDefined(a);h++){var j=f[h];a=null!==a?a[j]:c}return a}function f(a,c){c=c||{},b.forEach(c,function(a,b){delete c[b]});for(var d in a)!a.hasOwnProperty(d)||"$"===d.charAt(0)&&"$"===d.charAt(1)||(c[d]=a[d]);return c}var g=b.$$minErr("$resource"),h=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;b.module("ngResource",["ng"]).provider("$resource",function(){var a=/^https?:\/\/[^\/]*/,d=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$q",function(h,i){function j(a){return k(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function k(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,b?"%20":"+")}function l(a,b){this.template=a,this.defaults=p({},d.defaults,b),this.urlParams={}}function m(a,j,k,s){function t(a,b){var c={};return b=p({},j,b),o(b,function(b,d){r(b)&&(b=b()),c[d]=b&&b.charAt&&"@"==b.charAt(0)?e(a,b.substr(1)):b}),c}function u(a){return a.resource}function v(a){f(a||{},this)}var w=new l(a,s);return k=p({},d.defaults.actions,k),v.prototype.toJSON=function(){var a=p({},this);return delete a.$promise,delete a.$resolved,a},o(k,function(a,d){var e=/^(POST|PUT|PATCH)$/i.test(a.method);v[d]=function(j,k,l,m){var s,x,y,z={};switch(arguments.length){case 4:y=m,x=l;case 3:case 2:if(!r(k)){z=j,s=k,x=l;break}if(r(j)){x=j,y=k;break}x=k,y=l;case 1:r(j)?x=j:e?s=j:z=j;break;case 0:break;default:throw g("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var A=this instanceof v,B=A?s:a.isArray?[]:new v(s),C={},D=a.interceptor&&a.interceptor.response||u,E=a.interceptor&&a.interceptor.responseError||c;o(a,function(a,b){switch(b){default:C[b]=q(a);break;case"params":case"isArray":case"interceptor":break;case"timeout":C[b]=a}}),e&&(C.data=s),w.setUrlParams(C,p({},t(s,a.params||{}),z),a.url);var F=h(C).then(function(c){var e=c.data,h=B.$promise;if(e){if(b.isArray(e)!==!!a.isArray)throw g("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",d,a.isArray?"array":"object",b.isArray(e)?"array":"object",C.method,C.url);a.isArray?(B.length=0,o(e,function(a){"object"==typeof a?B.push(new v(a)):B.push(a)})):(f(e,B),B.$promise=h)}return B.$resolved=!0,c.resource=B,c},function(a){return B.$resolved=!0,(y||n)(a),i.reject(a)});return F=F.then(function(a){var b=D(a);return(x||n)(b,a.headers),b},E),A?F:(B.$promise=F,B.$resolved=!1,B)},v.prototype["$"+d]=function(a,b,c){r(a)&&(c=b,b=a,a={});var e=v[d].call(this,a,this,b,c);return e.$promise||e}}),v.bind=function(b){return m(a,p({},j,b),k)},v}var n=b.noop,o=b.forEach,p=b.extend,q=b.copy,r=b.isFunction;return l.prototype={setUrlParams:function(c,d,e){var f,h,i=this,k=e||i.template,l="",m=i.urlParams={};o(k.split(/\W/),function(a){if("hasOwnProperty"===a)throw g("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(a)&&a&&new RegExp("(^|[^\\\\]):"+a+"(\\W|$)").test(k)&&(m[a]=!0)}),k=k.replace(/\\:/g,":"),k=k.replace(a,function(a){return l=a,""}),d=d||{},o(i.urlParams,function(a,c){f=d.hasOwnProperty(c)?d[c]:i.defaults[c],b.isDefined(f)&&null!==f?(h=j(f),k=k.replace(new RegExp(":"+c+"(\\W|$)","g"),function(a,b){return h+b})):k=k.replace(new RegExp("(/?):"+c+"(\\W|$)","g"),function(a,b,c){return"/"==c.charAt(0)?c:b+c})}),i.defaults.stripTrailingSlashes&&(k=k.replace(/\/+$/,"")||"/"),k=k.replace(/\/\.(?=\w+($|\?))/,"."),c.url=l+k.replace(/\/\\\./,"/."),o(d,function(a,b){i.urlParams[b]||(c.params=c.params||{},c.params[b]=a)})}},m}]})}(window,window.angular),function(a,b,c){"use strict";function d(a,c,d){function e(a,d,e){var g,h;e=e||{},h=e.expires,g=b.isDefined(e.path)?e.path:f,b.isUndefined(d)&&(h="Thu, 01 Jan 1970 00:00:00 GMT",d=""),b.isString(h)&&(h=new Date(h));var i=encodeURIComponent(a)+"="+encodeURIComponent(d);i+=g?";path="+g:"",i+=e.domain?";domain="+e.domain:"",i+=h?";expires="+h.toUTCString():"",i+=e.secure?";secure":"";var j=i.length+1;return j>4096&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+j+" > 4096 bytes)!"),i}var f=d.baseHref(),g=a[0];return function(a,b,c){g.cookie=e(a,b,c)}}b.module("ngCookies",["ng"]).provider("$cookies",[function(){function a(a){return a?b.extend({},d,a):d}var d=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(d,e){return{get:function(a){return d()[a]},getObject:function(a){var c=this.get(a);return c?b.fromJson(c):c},getAll:function(){return d()},put:function(b,c,d){e(b,c,a(d))},putObject:function(a,c,d){this.put(a,b.toJson(c),d)},remove:function(b,d){e(b,c,a(d))}}}]}]),b.module("ngCookies").factory("$cookieStore",["$cookies",function(a){return{get:function(b){return a.getObject(b)},put:function(b,c){a.putObject(b,c)},remove:function(b){a.remove(b)}}}]),d.$inject=["$document","$log","$browser"],b.module("ngCookies").provider("$$cookieWriter",function(){this.$get=d})}(window,window.angular),function(a,b,c){"use strict";function d(){this.$get=["$$sanitizeUri",function(a){return function(b){var c=[];return g(b,j(c,function(b,c){return!/^unsafe/.test(a(b,c))})),c.join("")}}]}function e(a){var c=[],d=j(c,b.noop);return d.chars(a),c.join("")}function f(a,c){var d,e={},f=a.split(",");for(d=0;d<f.length;d++)e[c?b.lowercase(f[d]):f[d]]=!0;return e}function g(a,c){function d(a,d,f,g){if(d=b.lowercase(d),z[d])for(;t.last()&&A[t.last()];)e("",t.last());y[d]&&t.last()==d&&e("",d),g=v[d]||!!g,g||t.push(d);var i={};f.replace(n,function(a,b,c,d,e){var f=c||d||e||"";i[b]=h(f)}),c.start&&c.start(d,i,g)}function e(a,d){var e,f=0;if(d=b.lowercase(d))for(f=t.length-1;f>=0&&t[f]!=d;f--);if(f>=0){for(e=t.length-1;e>=f;e--)c.end&&c.end(t[e]);t.length=f}}"string"!=typeof a&&(a=null===a||"undefined"==typeof a?"":""+a);var f,g,i,j,t=[],u=a;for(t.last=function(){return t[t.length-1]};a;){if(j="",g=!0,t.last()&&C[t.last()]?(a=a.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+t.last()+"[^>]*>","i"),function(a,b){return b=b.replace(q,"$1").replace(s,"$1"),c.chars&&c.chars(h(b)),""}),e("",t.last())):(0===a.indexOf("<!--")?(f=a.indexOf("--",4),f>=0&&a.lastIndexOf("-->",f)===f&&(c.comment&&c.comment(a.substring(4,f)),a=a.substring(f+3),g=!1)):r.test(a)?(i=a.match(r),i&&(a=a.replace(i[0],""),g=!1)):p.test(a)?(i=a.match(m),i&&(a=a.substring(i[0].length),i[0].replace(m,e),g=!1)):o.test(a)&&(i=a.match(l),i?(i[4]&&(a=a.substring(i[0].length),i[0].replace(l,d)),g=!1):(j+="<",a=a.substring(1))),g&&(f=a.indexOf("<"),j+=0>f?a:a.substring(0,f),a=0>f?"":a.substring(f),c.chars&&c.chars(h(j)))),a==u)throw k("badparse","The sanitizer was unable to parse the following block of html: {0}",a);u=a}e()}function h(a){return a?(I.innerHTML=a.replace(/</g,"&lt;"),I.textContent):""}function i(a){return a.replace(/&/g,"&amp;").replace(t,function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1);return"&#"+(1024*(b-55296)+(c-56320)+65536)+";"}).replace(u,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function j(a,c){var d=!1,e=b.bind(a,a.push);return{start:function(a,f,g){a=b.lowercase(a),!d&&C[a]&&(d=a),d||D[a]!==!0||(e("<"),e(a),b.forEach(f,function(d,f){var g=b.lowercase(f),h="img"===a&&"src"===g||"background"===g;H[g]!==!0||E[g]===!0&&!c(d,h)||(e(" "),e(f),e('="'),e(i(d)),e('"'))}),e(g?"/>":">"))},end:function(a){a=b.lowercase(a),d||D[a]!==!0||(e("</"),e(a),e(">")),a==d&&(d=!1)},chars:function(a){d||e(i(a))}}}var k=b.$$minErr("$sanitize"),l=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,m=/^<\/\s*([\w:-]+)[^>]*>/,n=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,o=/^</,p=/^<\//,q=/<!--(.*?)-->/g,r=/<!DOCTYPE([^>]*?)>/i,s=/<!\[CDATA\[(.*?)]]>/g,t=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,u=/([^\#-~| |!])/g,v=f("area,br,col,hr,img,wbr"),w=f("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),x=f("rp,rt"),y=b.extend({},x,w),z=b.extend({},w,f("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),A=b.extend({},x,f("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),B=f("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"),C=f("script,style"),D=b.extend({},v,z,A,y,B),E=f("background,cite,href,longdesc,src,usemap,xlink:href"),F=f("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),G=f("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0),H=b.extend({},E,G,F),I=document.createElement("pre");b.module("ngSanitize",[]).provider("$sanitize",d),b.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,d=/^mailto:/i;return function(f,g){function h(a){a&&n.push(e(a))}function i(a,c){n.push("<a "),b.isDefined(g)&&n.push('target="',g,'" '),n.push('href="',a.replace(/"/g,"&quot;"),'">'),h(c),n.push("</a>")}if(!f)return f;for(var j,k,l,m=f,n=[];j=m.match(c);)k=j[0],j[2]||j[4]||(k=(j[3]?"http://":"mailto:")+k),l=j.index,h(m.substr(0,l)),i(k,j[0].replace(d,"")),m=m.substring(l+j[0].length);return h(m),a(n.join(""))}}])}(window,window.angular);
(function(){var g;var n=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a},q=function(a){return"gwd-page"==a.tagName.toLowerCase()||"gwd-page"==a.getAttribute("is")},r=function(a){if(q(a))return a;for(;a&&9!=a.nodeType;)if((a=a.parentElement)&&q(a))return a;return null},u=function(a,b,c,d){d=d||b;a.hasAttribute(b)?(a=a.getAttribute(b),c.setAttribute(d,a)):c.removeAttribute(d)};var v=["-ms-","-moz-","-webkit-",""],w=function(a,b,c,d){for(var e,m,f=0;f<v.length;++f)e=v[f]+b,m=(d?v[f]:"")+c,a.style.setProperty(e,m)};var x=function(a,b,c){if(c){var d=document.createEvent("CustomEvent");d.initCustomEvent(a,!0,!0,c)}else d=document.createEvent("Event"),d.initEvent(a,!0,!0);b.dispatchEvent(d);return d},y=function(a,b){setTimeout(function(){x("autoplayended",a,b)},0)},z=function(a,b){var c=function(d){a.removeEventListener("attached",c);b(d)};a.addEventListener("attached",c)};var A=function(a){a=a.trim();return window.Enabler?Enabler.getUrl(a):a};var B=function(a){var b=a.currentIndex-1;return b-b%a.frameSnapInterval},C=function(a,b){this.h=a;this.i=null;this.ga=b;this.B=!1};
C.prototype.play=function(a,b,c){if(this.h.frameCount&&null==this.i){b=b||"forwards";if(c){var d=Math.floor(a/c);a=c}else d=this.h.frameCount,a/=d;var e=[],m=B(this.h);c=m;for(var f=0;f<d;f++){if(0<f||!this.ga)c=D(c+E(b,1),this.h.frameCount);e.push(c)}b=function(){if(e.length){var k=e.shift();this.B=!0;this.h.goToFrame(k+1);this.B=!1;var h=this.h;x("frameautoplayed",h,{id:k+1||h.currentIndex})}else this.stop(!0),this.h.goToFrame(m+1)}.bind(this);this.i=setInterval(b,a);setTimeout(b)}};
C.prototype.stop=function(a){!this.B&&this.i&&(clearInterval(this.i),y(this.h,{completed:!!a}),this.i=null)};
var F=function(a){var b=document.createElement("gwd-image");b.setAttribute("source",a);return b},G=function(a){var b=[];if(a){a=a.split(",");for(var c=0;c<a.length;++c)/\S/.test(a[c])&&b.push(F(A(a[c])))}return b},H=function(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];if("img"==e.tagName.toLowerCase()&&"gwd-image"==e.getAttribute("is")||"gwd-image"==e.tagName.toLowerCase())null!=b?e.setAttribute("scaling",b):e.removeAttribute("scaling")}},I=function(a,b){var c=b.length;b=b.splice(0,c);for(var d,
e=0;e<c;e++)d=b[e],"frameshown"==d?x(d,a,{id:a.currentIndex}):x(d,a)},E=function(a,b){return"left"==a||"backwards"==a?-b:b},D=function(a,b){return(a%b+b)%b},J=function(a){Array.prototype.slice.call(a.querySelectorAll("video, gwd-youtube, audio,gwd-video,gwd-audio")).forEach(function(b){b.pause()})},K=function(a){Array.prototype.slice.call(a.querySelectorAll("video, gwd-youtube, audio,gwd-video,gwd-audio")).forEach(function(b){b.play()})};var L=function(a,b,c,d){a="translate3d("+a+"px, "+b+"px, "+c+"px)";d&&(a="rotate3d(0, 1, 0, "+d+"deg) "+a);return a},M=function(a,b,c){a=parseInt(a.getAttribute(b),10);isNaN(a)&&(a=c);return a};var N=function(a){var b=a.frames;var c=M(a,"frame-width",Math.floor(.8*a.clientWidth));var d=a.hasAttribute("show-reflection"),e=M(a,"frame-height",d?Math.floor(4*a.clientHeight/7):Math.floor(6*a.clientHeight/7)),m=M(a,"neighbor-translation-x",Math.floor(c/8));if(a.hasAttribute("neighbor-translation-x")){a:{var f=c,k=!0;if(a.hasAttribute("clamp-frame-size-to-image")){var h=a.getAttribute("clamp-frame-size-to-image");"true"==h?k=!0:"false"==h&&(k=!1)}if(k)if(h=a.hasAttribute("scaling")?a.getAttribute("scaling"):
"contain",(k="contain"==h)||"none"==h)if(0==f||0==e)b=f;else{h=-1;c=b.length;for(var t=0;t<c;t++){var l=b[t];if("img"!=l.tagName.toLowerCase()&&"gwd-image"!=l.tagName.toLowerCase()){b=f;break a}var p=l.assetWidth?l.assetWidth:l.naturalWidth;l=l.assetHeight?l.assetHeight:l.naturalHeight;0<p&&0<l&&(h=Math.max(h,k?p/l<f/e?p/l*e:f:p))}b=-1!=h?Math.min(f,h):f}else b=f;else b=f}c=b}b=M(a,"neighbor-translation-y",-Math.floor(e/10));f=M(a,"neighbor-translation-z",-e);k=M(a,"neighbor-rotation-y",38);h=M(a,
"start-frame",2);t=e;a.f&&(t-=36);e=[];if(p=a.hasAttribute("exit-urls")?a.getAttribute("exit-urls"):"")for(p=p.split(","),l=0;l<p.length;l++)e[l]=p[l].trim();p=a.hasAttribute("autoplay");a=parseInt(a.getAttribute("transition-duration"),10);isNaN(a)&&(a=600);return{autoplay:p,U:e,o:c,V:t,Z:k,$:m,K:b,aa:f,transitionDuration:a,ia:d,ha:h}},O=function(a,b){w(a,"transition","transform "+b+"ms",!0)};var P=function(a,b){function c(){}c.prototype=b.prototype;a.O=b.prototype;a.prototype=new c;a.prototype.constructor=a};var Q=function(){};P(Q,HTMLElement);g=Q.prototype;g.createdCallback=function(){this.frames=[];this.a=null;this.b=0;this.m=1;this.l=new C(this,!0);Object.defineProperty(this,"currentIndex",{enumerable:!0,get:this.W.bind(this)});Object.defineProperty(this,"frameSnapInterval",{enumerable:!0,get:this.Y.bind(this)});Object.defineProperty(this,"frameCount",{enumerable:!0,get:this.X.bind(this)});this.M=this.hasAttribute("pause-front-media");this.N=this.hasAttribute("resume-next-media")};
g.attributeChangedCallback=function(a){switch(a){case "pause-front-media":this.M=this.hasAttribute("pause-front-media");break;case "resume-next-media":this.N=this.hasAttribute("resume-next-media")}};g.getFrame=function(a){if(0!=this.b)return this.frames[a-1]};g.gwdLoad=function(){};g.gwdIsLoaded=function(){return!0};g.goToFrame=function(a,b){this.stopRotation();0!=this.b&&(a>this.b?a=this.b:1>a&&(a=1),this.I(a,b))};g.I=function(a){this.a=a-1};
var R=function(a,b,c,d){if(null!=a.a){var e=D(a.a+E(b,a.m||1),a.m*Math.ceil(a.b/a.m));null!=d&&!d&&("forwards"==b&&e<a.a||"backwards"==b&&e>a.a)||a.goToFrame(e+1,c||"slide")}};g=Q.prototype;g.goBackwards=function(a,b){return R(this,"backwards",a,b)};g.goForwards=function(a,b){return R(this,"forwards",a,b)};g.rotateOnce=function(a,b){this.l.play(a||0,b)};g.stopRotation=function(){this.l.stop()};g.W=function(){return 0<this.b?this.a+1:void 0};g.Y=function(){return this.m};g.X=function(){return this.b};
var S=function(a,b){null!=a.a&&a.a!=b&&(a.M&&J(a.frames[a.a]),a.N&&K(a.frames[b]))};var T=function(){};P(T,Q);g=T.prototype;
g.createdCallback=function(){T.O.createdCallback.call(this);this.C=!1;this.g=null;this.J=-1;this.F=0;var a=document.createElement("gwd-gesture");a.className="gesture";this.s=a;this.T=this.ea.bind(this);this.S=this.fa.bind(this);this.R=this.da.bind(this);this.P=this.ca.bind(this);this.w=x.bind(null,"firstinteraction",this);this.L=this.ba.bind(this);this.G=!1;this.D=[];this.j=I.bind(null,this,this.D);this.v=[];this.H=0;if(this.A=this.hasAttribute("images"))for(;this.firstChild;)this.removeChild(this.firstChild);this.c=
null;this.u=0;this.l=new C(this,!1);this.f=null};
g.attachedCallback=function(){var a=this.s;this.u=this.u||this.clientWidth/2;a.addEventListener("trackstart",this.T,!1);a.addEventListener("track",this.S,!1);a.addEventListener("trackend",this.R,!1);a.addEventListener("tap",this.P,!1);this.addEventListener("transitionend",this.j,!1);this.addEventListener("webkitTransitionEnd",this.j,!1);if("function"==typeof this.gwdLoad&&"function"==typeof this.gwdIsLoaded&&!this.gwdIsLoaded()){var b=(a=r(this))&&"function"==typeof a.gwdIsLoaded;(!a||b&&a.gwdIsLoaded())&&
this.gwdLoad()}};g.detachedCallback=function(){var a=this.s;a.removeEventListener("trackstart",this.T,!1);a.removeEventListener("track",this.S,!1);a.removeEventListener("trackend",this.R,!1);a.removeEventListener("tap",this.P,!1);this.removeEventListener("transitionend",this.j);this.removeEventListener("webkitTransitionEnd",this.j)};g.I=function(a,b){b="none"!=b;var c=this.c.transitionDuration;S(this,a-1);U(this,b?c:0);V(this,a-1)};
g.rotateOnce=function(a,b){this.l.play(a||this.c.transitionDuration*this.b,b)};g.gwdIsLoaded=function(){return this.C};g.gwdLoad=function(){if(!this.C&&!this.g){if(this.A)var a=G(this.getAttribute("images"));else{a=this.childNodes;for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];e.nodeType==Node.ELEMENT_NODE&&b.push(e)}a=b}this.frames=a;W(this)}};
var W=function(a){for(;a.firstChild;)a.removeChild(a.firstChild);a.f=null;a.g&&a.g.removeEventListener("pageload",a.L,!1);for(var b=a.frames,c=document.createElement("gwd-page"),d,e=0;e<b.length;++e)d=b[e],w(d,"user-select","none"),d.classList.add("frame"),c.appendChild(d);z(c,c.gwdLoad.bind(c));a.g=c;c.className=a.hasAttribute("show-reflection")?"container reflection":"container";c.addEventListener("pageload",a.L,!1);H(a.frames,a.getAttribute("scaling"));a.appendChild(c);a.appendChild(a.s)};
T.prototype.ba=function(a){if(this.g===a.target){this.C=!0;this.b=this.frames.length;this.v=[];this.H=this.b;X(this);if(this.b){a=this.c.ha-1;if(0>a||a>=this.b)a=0;U(this,0);V(this,a);this.c.autoplay&&setTimeout(this.rotateOnce.bind(this),0)}Y(this);x("allframesloaded",this);x("ready",this)}};
T.prototype.attributeChangedCallback=function(a){T.O.attributeChangedCallback.call(this,a);switch(a){case "images":this.A=!0;this.b=0;this.a=null;this.frames=G(this.getAttribute(a));W(this);break;case "has-navigation":case "navigation-highlight":case "navigation-thumbnails":Y(this);break;case "scaling":H(this.frames,this.getAttribute("scaling"));break;case "style":case "class":break;default:this.c=N(this)}};
var X=function(a){a.c=N(a);for(var b=0,c,d=0;d<a.frames.length;d++)c=a.frames[d],c.style.left=b+"px",c.style.width=a.c.o+"px",c.style.height=a.c.V+"px",b+=a.c.o};T.prototype.ea=function(){null!=this.a&&(this.stopRotation(),this.F=this.a,U(this,0))};T.prototype.fa=function(a){if(this.b){this.w&&(this.w(),this.w=null);a=-a.dx/this.c.o;var b=Math.round(a);Z(this,this.F+b,a-b)}};
T.prototype.da=function(){if(null!=this.a){U(this,this.c.transitionDuration);var a=this.a;V(this,a);this.F!=a&&(0==a?x("reachleftend",this):a==this.b-1&&x("reachrightend",this))}};
T.prototype.ca=function(a){if(this.b){var b=null;var c=this.s;var d=this.g,e=a.clientX,m=a.clientY,f=c.style["pointer-events"];c.style["pointer-events"]="none";e=d.ownerDocument.elementFromPoint(e,m);c.style["pointer-events"]=f;if(c=e&&n(d,e)?e:null){d=a.clientX;a=a.clientY;f=!1;"gwd-taparea"===c.tagName.toLowerCase()&&(f=c.ownerDocument.createEvent("Event"),f.initEvent("action",!0,!0),f.clientX=d,f.clientY=a,f=!c.dispatchEvent(f));if(f)return;for(a=0;a<this.b;a++)if(n(this.frames[a],c)){b=a;break}null!=
b&&(a=this.c.U[b])&&!x("frameexit",this,{url:a}).detail.handled&&window.open(a)}null==b&&(b=null!=this.a?this.a:0);x("frametap",this,{element:this.frames[b],id:b+1})}};
var U=function(a,b){a.G=0<b;a.g&&O(a.g,b);for(var c=0;c<a.b;++c)O(a.frames[c],b)},V=function(a,b){a.frames[b]&&(a.a=b,Z(a,b,0,a.b),a.D.push("frameshown"),a.v[b]||(a.v[b]=!0,--a.H||a.D.push("allframesviewed")));a.G||a.j()},Z=function(a,b,c,d){for(var e=a.c,m,f=d||1,k=-f;k<=f;++k)if((d=a.frames[k+b])&&0<=c*k){0>k?m=1-Math.abs(c):0<k?m=Math.abs(c)-1:(S(a,b),a.a=b,m=c);var h=Math.abs(m);d.style.setProperty("transform",L(e.$*m,e.K*h,e.aa*h,e.Z*m))}a.J!=a.a&&null!=a.a&&(a.J=a.a,x("frameactivated",a,{id:a.currentIndex}));
a.g.style.setProperty("transform",L(a.u-(b+c+.5)*e.o,-e.K,0,void 0))},Y=function(a){var b=a.hasAttribute("has-navigation"),c=!!a.f;b&&!c?(b=a.id||a.getAttribute("data-gwd-grp-id"),a.f=document.createElement("gwd-gallerynavigation"),a.f.setAttribute("for",b),a.classList.add("has-navigation"),a.appendChild(a.f)):!b&&c&&(a.classList.remove("has-navigation"),a.removeChild(a.f),a.f=null);a.f&&(u(a,"navigation-highlight",a.f,"highlight"),u(a,"navigation-thumbnails",a.f,"use-thumbnails"));X(a)};
document.registerElement("gwd-carouselgallery",{prototype:T.prototype});}).call(this);

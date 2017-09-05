var configApp={headerId:"#header",tocId:"#toc",tocIconId:"#tocIcon",sliderId:"#slider",slidesId:"#slides",blogId:"#blog",postId:"#post",disqusThreadId:"#disqus_thread",footerId:"#footer",fPages:".fPages",fContacts:".fContacts",fCopyright:".fCopyright",errorId:"#error"},configContent={},Backend={},Utils={},Animation={},Content={},GithubApi={},GoogleApi={},DisqusApi={},escapeKey=27;String.prototype.endsWith=function(t){"use strict";return-1!==this.indexOf(t,this.length-t.length)},Utils.getHash=function(){"use strict";var t=window.location.hash,n=t.substring(t.indexOf("#")+1);return n},Utils.showErrorMsg=function(t){"use strict";$(configApp.errorId).html()},Utils.startsWith=function(t,n){"use strict";return void 0!==t&&0===t.indexOf(n,0)?!0:!1},Utils.titleToLink=function(t){"use strict";return"/"+t.replace(/\s+/g,"-")},Animation.smoothScrolling=function(){"use strict";$(configApp.tocId+' a[href^="#"]').on("click",function(t){t.preventDefault();var n=this.hash,o=$(n);$("html, body").stop().animate({scrollTop:o.offset().top-50},900,"swing",function(){})})},Animation.scrollTo=function(t){"use strict";$("html, body").animate({scrollTop:$(t).offset().top-50},900)},Animation.menu=function(){"use strict";$("nav > ul > li > a").click(function(){$(".menuIcon").toggleClass("menuIconOpen"),$("#overlay").toggleClass("open")}),$(".menuIcon").click(function(){$(this).toggleClass("menuIconOpen"),$("#overlay").toggleClass("open")}),$(document).keyup(function(t){t.keyCode===escapeKey&&($(".menuIcon").removeClass("menuIconOpen"),$("#overlay").removeClass("open"))})},Animation.toc=function(){"use strict";function t(){$("#post :header").each(function(){var t=$(this),n=($('#toc a[href="#'+$(t).find("span").attr("id")+'"]'),t.offset().top-60<=$(window).scrollTop());n&&($("#toc a").removeClass("selected"),$('#toc a[href="#'+$(t).find("span").attr("id")+'"]').addClass("selected"))})}$(configApp.tocIconId).click(function(){$(configApp.tocId).toggleClass("open"),$(configApp.tocIconId).toggleClass("open")}),$("#container").click(function(){$(configApp.tocId).removeClass("open"),$(configApp.tocIconId).removeClass("open")}),$(document).keyup(function(t){t.keyCode===escapeKey&&($(configApp.tocId).removeClass("open"),$(configApp.tocIconId).removeClass("open"))}),t(),$(window).on("scroll",function(){t()})},Content.markdown=function(t,n){"use strict";var o={highlight:function(t){return hljs.highlightAuto(t).value}};marked(t,o,function(t,o){if(t)throw t;n(o)})},Content.runToc=function(t){"use strict";t="undefined"!=typeof t?t:configApp.postId;var n=$(configApp.tocId+" > ul");$(n).empty(),$(t+" :header").each(function(t){$(this).prepend('<span id="toc'+t+'"></span>');var o=$(this).prop("tagName").toLowerCase(),e=$(this).text(),i='<li class="toc-'+o+'"><a href="#toc'+t+'">'+e+"</a></li>";$(n).append(i)}),$(configApp.tocId+" > ul").append(n),$(configApp.tocId).show(),$(configApp.tocIconId).show()},Content.fillSlider=function(){"use strict";$.each(configContent.posts,function(t,n){var o="";o=n.thumb?'<img src="'+n.thumb+'" />':'<img src="'+configContent.global.thumb+'" />';var e="<p>"+n.title+"</p>",i="<p>"+n.date+"</p>",c='<li><a href="#'+Utils.titleToLink(n.title)+'">'+o+e+i+"</a></li>";$(c).appendTo(configApp.slidesId)})},Content.updateBrowserTitle=function(t){"use strict";document.title=t},Content.setHeaderImg=function(t){"use strict";t.img?$(configApp.headerId).html('<img src="'+t.img+'"/>'):$(configApp.headerId).empty()},Content.reloadPage=function(t){"use strict";$(configApp.contentIconId).show(),Content.updateBrowserTitle(configContent.global.title+" "+t.title),Backend.loadContent(t.url,function(n){Content.markdown(n,function(n){$(configApp.postId).html(n),$("pre").addClass("hljs"),Content.setHeaderImg(t),Content.runToc(),Animation.smoothScrolling(),DisqusApi.disqusReload(t.disqusEnable,t.disqusIdentifier,t.disqusLang)})})},Content.routes=function(){"use strict";var t={};$.each(configContent.posts,function(n,o){t[Utils.titleToLink(o.title)]=function(){$(configApp.postId).empty(),$(configApp.sliderId).fadeOut(500,function(){$(configApp.blogId).fadeIn(500,function(){Content.reloadPage(o)})})}}),$.each(configContent.pages,function(n,o){t[Utils.titleToLink(o.title)]=function(){$(configApp.postId).empty(),$(configApp.sliderId).fadeOut(500,function(){$(configApp.blogId).fadeIn(500,function(){Content.reloadPage(o)})})}}),t[""]=function(){$(configApp.postId).empty(),$(configApp.tocId).hide(),$(configApp.tocIconId).hide(),Content.updateBrowserTitle(configContent.global.title),$(configApp.blogId).fadeOut(500,function(){$(configApp.sliderId).fadeIn(500,function(){Content.setHeaderImg(configContent.global)})})},routie(t)},Content.fillMenu=function(){"use strict";var t="";$.each(configContent.pages,function(n,o){t+='<li> <a href="#'+Utils.titleToLink(o.title)+'" >'+o.title+"</a> </li>"}),$("nav > ul").append(t)},Content.contactInit=function(){"use strict";$.each(configContent.contacts,function(t,n){if(n.url){var o='<img src="'+n.img+'"/>',e='<li><a href="'+n.url+'">'+o+"</a></li>";$(configApp.fContacts+" > ul").append(e)}})},Content.footerInit=function(){"use strict";$(configApp.fCopyright+"> p").html(configContent.footer.copyright+"<br/>"+configContent.footer.poweredBy);var t="<a href=#>Home</a> / ";$.each(configContent.pages,function(n,o){t+="<a href=#/"+this.title+">"+this.title+"</a> / "}),t=t.substring(0,t.length-3),$(configApp.fPages+"> span").html(t)},Backend.loadJson=function(t,n){"use strict";$.getJSON(t,function(t){n(t)})},Backend.loadContent=function(t,n){"use strict";GithubApi.isGithubApiLink(t)?GithubApi.loadReadme(t,function(t){n(t)}):$("<div></div>").load(t,function(t,o,e){if("error"===o){var i="Sorry but there was an error: ";Utils.showErrorMsg(i+e.status+" "+e.statusText)}"success"===o&&n(t)})},GithubApi.isGithubApiLink=function(t){"use strict";return Utils.startsWith(t,"https://api.github.com/repos")?!0:!1},GithubApi.loadReadme=function(t,n){"use strict";$.ajax({url:t,dataType:"json",type:"GET",async:!0,statusCode:{404:function(t){},200:function(t){var o=window.atob(t.content);n(o)}},error:function(t,n,o){Utils.showErrorMsg(t+":"+n+"::"+o)}})},GoogleApi.analytics=function(){"use strict";!function(t,n,o,e,i,c){t.GoogleAnalyticsObject=e,t[e]||(t[e]=function(){(t[e].q=t[e].q||[]).push(arguments)}),t[e].l=+new Date,i=n.createElement(o),c=n.getElementsByTagName(o)[0],i.src="//www.google-analytics.com/analytics.js",c.parentNode.insertBefore(i,c)}(window,document,"script","ga"),ga("create",configContent.global.googleAnalyticsId),ga("send","pageview","/"+window.location.hash)},DisqusApi.disqusReload=function(t,n,o){"use strict";void 0===o&&(o="en"),t?($(configApp.disqusThreadId).show(),window.DISQUS&&DISQUS.reset({reload:!0,config:function(){this.page.identifier=n,this.page.url=location.origin+n,this.page.title=document.title,this.language=o}})):$(configApp.disqusThreadId).hide()},DisqusApi.init=function(){"use strict";var t=configContent.global.disqusShortname;!function(){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="//"+t+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(n)}()},$(document).ready(function(){"use strict";Backend.loadJson("content.json",function(t){configContent=t,Content.routes(),Content.fillSlider(),Content.fillMenu(),Content.contactInit(),Content.footerInit(),Animation.smoothScrolling(),Animation.menu(),Animation.toc(),configContent.global.googleAnalyticsId&&(console.log("Loading Google Analytics"),GoogleApi.analytics()),configContent.global.disqusShortname&&(console.log("Loading Disqus"),DisqusApi.init())})});
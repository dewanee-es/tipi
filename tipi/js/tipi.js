/*

       \/
       /\
      /  \
     /    \     TIPI cms
    /  /\  \
   /__/  \__\
 
*/

/********* Objects *********/

var configApp = {
  headerId: '#header',
  tocId: '#toc',
  tocIconId: '#tocIcon',
  sliderId: '#slider',
  slidesId: '#slides',
  menuId: '#menu',

  blogId: '#blog',
  postId: '#content',
  disqusThreadId: '#disqus_thread',

  // Footer
  footerId: '#footer',
  fPages: '#pages',
  fContacts: '#social',
  fCopyright: '#copyright',
  fPoweredBy: '#poweredby',
  
  // Misc
  errorId: '#error',
  
  // Snippets
  snippets: []
};
var configContent = {
  global: {
	title: 'Untitled',
	description: '',
	author: '',
    welcome: 'index',
	theme: 'default',
	extension: 'md',
	logo: '',
	appDir: '.',
	contentDir: 'content/'
  },
  metadata: {
    begin: "---",
	end: "---"
  },
  footer: {
    copyright: '',	// Dinamically generated on config load
	poweredBy: 'Powered by <a href="http://github.com/dewanee-es/tipi">Tipi</a>'
  },
  contacts: {},
  pages: {},
  posts: {},
  theme: {
    template: 'index',
	style: '',
  	iconClass: 'fa fa-'	// Font Awesome
  }
};
var Backend = {};
var Utils = {};
var Animation = {};
var Content = {};
var GithubApi = {};
var GoogleApi = {};
var DisqusApi = {};
var Loader = {};

var escapeKey = 27;

/******************** Utilities **************************/

Utils.getHash = function() {
  'use strict';
  var url = window.location.hash;
  var pos = url.indexOf('#');
  
  if(pos != -1) {
	var hash = url.substring(pos + 1);
	return hash;
  } else {
    return false;
  }
};

Utils.getUrl = function(page) {
	var url;
	if(page.charAt(page.length - 1) == '/') {
		var pieces = page.split('/');
		var sub = pieces[pieces.length - 2];
		url = page + sub + '.' + configContent.global.extension;
	} else {
		url = page + '.' + configContent.global.extension;
	}
	return encodeURI(url);
}

Utils.showErrorMsg = function(msg, description) {
  'use strict';
  console.error(msg + ': ' + description);
  $(configApp.errorId).html('<strong>' + msg + '</strong><br/>' + description);
  $(configApp.errorId).show();
};

Utils.hideErrorMsg = function(msg) {
  'use strict';
  $(configApp.errorId).hide();
};

Utils.startsWith = function(str, val) {
  'use strict';
  if (str !== undefined && str.indexOf(val, 0) === 0) {
    return true;
  } else {
    return false;
  }
};

Utils.titleToLink = function(str) {
  'use strict';
  return '/' + encodeURIComponent(str.replace(/\s+/g, '-'));
};

/******************** App Animation **************************/

Animation.menu = function() {
  'use strict';
  $(configApp.menuId + ' > ul > li > a').click(function() {
    $('.menuIcon').toggleClass('menuIconOpen');
    $('#overlay').toggleClass('open');
  });
  $('.menuIcon').click(function() {
    $(this).toggleClass('menuIconOpen');
    $('#overlay').toggleClass('open');
  });
  $(document).keyup(function(e) {
    if (e.keyCode === escapeKey) {
      $('.menuIcon').removeClass('menuIconOpen');
      $('#overlay').removeClass('open');
    }
  });
};

Animation.smoothScrolling = function() {
  'use strict';
  $(configApp.tocId + ' a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 50
    }, 900, 'swing', function() {
      // commenting this will prevent the url to be changed
      //window.location.hash = target;
    });
  });
};

Animation.toc = function() {
  'use strict';
  $(configApp.tocIconId).click(function() {
    $(configApp.tocId).toggleClass('open');
    $(configApp.tocIconId).toggleClass('open');
  });
  $('#container').click(function() {
    $(configApp.tocId).removeClass('open');
    $(configApp.tocIconId).removeClass('open');
  });
  $(document).keyup(function(e) {
    if (e.keyCode === escapeKey) {
      $(configApp.tocId).removeClass('open');
      $(configApp.tocIconId).removeClass('open');
    }
  });

  function updateNavigation() {
    $('#post :header').each(function() {
      var t = $(this);
      var activeSection = $('#toc a[href="#' + $(t).find('span').attr('id') + '"]');
      var k1 = t.offset().top - 60 <= $(window).scrollTop();
      //var k2 = t.offset().top + t.height() - 100 > $(window).scrollTop();
      if (k1) {
        $('#toc a').removeClass('selected');
        $('#toc a[href="#' + $(t).find('span').attr('id') + '"]').addClass('selected');
      }
    });
  }
  updateNavigation();
  $(window).on('scroll', function() {
    updateNavigation();
  });
};

/******************** Content Manipulation **************************/

Content.config = function(data) {
	// Dynamic copyright
	configContent.footer.copyright = '<a href="#">' + data.global.title + '</a> &copy; ' + (new Date()).getFullYear() + ' &bull; All rights reserved.';
	
	// Content dir
	if(data.global.contentDir && data.global.contentDir.charAt(data.global.contentDir.length - 1) != '/') {
		data.global.contentDir += '/';
	}
	
	// Welcome page
	var welcome = data.global.welcome || configContent.global.welcome;
    data.pages = data.pages || configContent.pages;
	if (!data.pages[welcome]) {
		data.pages[welcome] = {};
	}

    $.extend(true, configContent, data);
	$.each(configContent.pages, function(key, val) {
	    if(typeof val == 'string') {
			val = { title: val };
			configContent.pages[key] = val;
		}
		if(!val.url) {
			val.url = Utils.getUrl(key);
		}
		if(!val.title) {
			val.title = key.charAt(0).toUpperCase() + key.slice(1);
		}
		if(configContent.global.welcome == key) {
			val.home = true;
		}
	});
	
	// Metadata
	configContent.metadata.begin = configContent.metadata.begin.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	configContent.metadata.end = configContent.metadata.end.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	
	return true;
};

Content.contactInit = function() {
  'use strict';
  $.each(configContent.contacts, function(k, v) {
    if (v.url) {
      var imgEl = '<img src="' + v.img + '"/>';
      var anchorEl = '<li><a href="' + v.url + '">' + imgEl + '</a></li>';
      $(configApp.fContacts + ' > ul').append(anchorEl);
    }
  });
};

Content.include = function(url) {
	var id = 'include_' + Math.floor(Date.now() * Math.random()).toString(36);
	$.get(url, function(data) {
		$('#' + id).replaceWith(data);
	});
	return '<div id="' + id + '"></div>';
};

Content.fillMenu = function() {
  'use strict';
  var a = '';
  $.each(configContent.pages, function(key, val) {
    var fragment = (key == configContent.global.welcome) ? '' : Utils.titleToLink(key);
    a += '<li><a href="#' + fragment + '" >';
    if(val.icon) a+= '<i class="' + configContent.theme.iconClass + val.icon + '"></i> ';
    a += val.title + '</a></li>';
  });
  $(configApp.menuId + ' > ul').append(a);
};

Content.fillSlider = function() {
  'use strict';
  $.each(configContent.posts, function(key, val) {
    // fill slides
    var img = '';
    if (val.thumb) {
      img = '<img src="' + val.thumb + '" />';
    } else {
      img = '<img src="' + configContent.global.thumb + '" />';
    }
    var p = '<p>' + val.title + '</p>';
    var p2 = '<p>' + val.date + '</p>';
    var li = '<li><a href="#' + Utils.titleToLink(val.title) + '">' + img + p + p2 + '</a></li>';
    $(li).appendTo(configApp.slidesId);
  });
};

Content.footerInit = function() {
  'use strict';
  $(configApp.fCopyright).html(configContent.footer.copyright);
  $(configApp.fPoweredBy).html(configContent.footer.poweredBy);
  var pageNames = '';
  $.each(configContent.pages, function(key, val) {
    var fragment = (key == configContent.global.welcome) ? '' : Utils.titleToLink(key);
    pageNames += '<a href="#' + fragment + '">' + val.title + '</a>' + ' / ';
  });
  pageNames = pageNames.substring(0, pageNames.length - 3);
  $(configApp.fPages + '> span').html(pageNames);
};

Content.markdown = function(text, callback) {
  'use strict';
  var md = window.markdownit({
	  highlight: function (str, lang) {
		  if (lang && hljs.getLanguage(lang)) {
		      try {
		    	  return hljs.highlight(lang, str).value;
		      } catch (__) {}
		  }

		  return ''; // use external default escaping
	  }
  });
  var defaultLinkOpenRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
	var href = tokens[idx].attrGet('href');
	if(href.indexOf('://') == -1) {
		var hash = Utils.getHash();
		if(hash === false || hash.length == 0) {
			hash = '/';
		} else {
			hash = hash.substr(0, hash.lastIndexOf('/') + 1);
		}
		if(href.endsWith('.md')) {
			href = href.substr(0, href.length - 3);
		}
		href = '#' + hash + href;
		tokens[idx].attrSet('href', href);
	}
	return defaultLinkOpenRender(tokens, idx, options, env, self);
  };
  var defaultImageRender = md.renderer.rules.image;
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
	  var src = tokens[idx].attrGet('src');
	  if(src.indexOf('://') == -1) {
		  src = configContent.global.contentDir + src;
		  tokens[idx].attrSet('src', src);
	  }
	  return defaultImageRender(tokens, idx, options, env, self);
  }
  var output = md.render(text);
  callback(output);
};

Content.metadata = function(data, metadata) {
  var re = new RegExp('^' + configContent.metadata.begin + '([\\s\\S]+?)' + configContent.metadata.end + '[\r\n]');
  var match = re.exec(data);
  if(match) {
    data = data.substring(match[0].length);
    var rawmetadata = YAML.eval(match[1]);
    var key, keys = Object.keys(rawmetadata);
    var n = keys.length;
    while (n--) {	// Convert keys to lowercase
      key = keys[n];
      metadata[key.toLowerCase()] = rawmetadata[key];
    }
  }
  return data;
};

Content.ready = function() {
};

Content.reloadPage = function(val) {
  'use strict';
  Content.updateBrowserTitle((val.home ? '' : val.title + ' | ') + configContent.global.title);
  $('h1').html(val.title);
  Backend.loadContent(configContent.global.contentDir + val.url, function(data) {
    var metadata = {};
	data = Content.metadata(data, metadata);
    if(metadata.render) {
	  data = Content.render(data, {meta: metadata});
    }
    Content.markdown(data, function(compiledMarkdown) {
      compiledMarkdown = Content.snippets(compiledMarkdown);
      $(configApp.postId).html(compiledMarkdown);
	  $('body').removeClass().addClass('post-template ' + (val.home ? 'home-template' : 'page-template'));
      $('pre').addClass('hljs');
	  $('table').addClass('table table-bordered');
      Content.setHeader(val);
      Content.runToc();
	  Content.ready();
      Animation.smoothScrolling();
      DisqusApi.disqusReload(val.disqusEnable, val.disqusIdentifier, val.disqusLang);
    });
  });

};

Content.render = function(template, data) {
	// Template7
	/*var compiledTemplate = Template7.compile(template);
	return compiledTemplate(data);*/
	// Twig
	/*var template = twig({
		data: template
	});
	return template.render(data);*/
	return Mark.up(template, data, {delimiter: ':', includeFunction: Content.include});
};

Content.routes = function() {
  'use strict';

  var urls = {};
  /*
  $.each(configContent.posts, function(key, val) {
    // Routing listener
    urls[Utils.titleToLink(val.title)] = function() {
      $(configApp.sliderId).fadeOut(500, function() {
        $(configApp.blogId).fadeIn(500, function() {
          Content.reloadPage(val);
        });
      });
    };
  });

  $.each(configContent.pages, function(key, val) {
    urls[Utils.titleToLink(key)] = function() {
      $(configApp.sliderId).fadeOut(500, function() {
        $(configApp.blogId).fadeIn(500, function() {
          Content.reloadPage(val);
        });
      });
    };
  });
  */

  urls[''] = function() {
    $(configApp.postId).empty();
    $(configApp.tocId).hide();
    $(configApp.tocIconId).hide();
	$(configApp.menuId + ' > ul > li.active').removeClass('active');
	$(configApp.menuId + ' > ul > li > a[href="#"]').parent().addClass('active');
    Content.reloadPage(configContent.pages[configContent.global.welcome]);
    /*
    Content.updateBrowserTitle(configContent.global.title);
    $(configApp.blogId).fadeOut(500, function() {
      $(configApp.sliderId).fadeIn(500, function() {
        Content.setHeader(configContent.global);
      });
    });
	*/
  };
  
  urls['/*'] = function(url) {
	var val;
	if(configContent.pages[url]) {
	  val = configContent.pages[url];
	} else {
	  val = {
	    url: Utils.getUrl(url),
		title: url.charAt(0).toUpperCase() + url.slice(1)
      };
	}
    $(configApp.postId).empty();
    $(configApp.tocId).hide();
    $(configApp.tocIconId).hide();
	$(configApp.menuId + ' > ul > li.active').removeClass('active');
	var item = $(configApp.menuId + ' > ul > li > a[href="#/' + url + '"]');
	
	if(item.length == 0) {
	  var urls = url.split('/');
	  while(urls.length > 1 && item.length == 0) {
	    urls.pop();
  	    var parentUrl = urls.join('/');
		item = $(configApp.menuId + ' > ul > li > a[href="#/' + parentUrl + '/"]');
	  }
	}
	
	item.parent().addClass('active');
    Content.reloadPage(val);
  }
  routie(urls);
};

Content.runToc = function(container) {
  'use strict';
  container = typeof container !== 'undefined' ? container : configApp.postId;
  var list = $(configApp.tocId + ' > ul');
  var itemNo = 0;
  $(list).empty();
  // search for first h1 header in the page
  $('h1').first().each(function() {
    // add span to the header
    $(this).prepend('<span id="tocMain"></span>');
    var s = $(this).text();
    var k = '<li class="toc-h1"><a href="#tocMain">' + s + '</a></li>';
    $(list).append(k);
	itemNo++;
  });
  // searching for headers
  $(container + ' :header').each(function(i) {
    var tagName = $(this).prop('tagName').toLowerCase();
	
	if(tagName != 'h1' || i != 0) {		// Omit the first h1 header
		// add span to each header
		$(this).prepend('<span id="toc' + i + '"></span>');
		var s = $(this).text();
		var k = '<li class="toc-' + tagName + '"><a href="#toc' + i + '">' + s + '</a></li>';
		$(list).append(k);
		itemNo++;
	}
  });
  
  if(itemNo > 1) {
	$(configApp.tocId + ' > ul').append(list);
	$(configApp.tocId).show();
	$(configApp.tocIconId).show();
  }
};

Content.setHeader = function(val) {
  'use strict';
  if (val.img) {
    //$(configApp.headerId).css('background-image', 'url(' + val.img + ')');
    if (val.headline) {
      $(configApp.headerId).html('<div id="headline" style="background-image: url(' + val.img + ')"><h1>' + val.headline + '</h1></div>');
    } else {
      $(configApp.headerId).html('<div id="banner" style="background-image: url(' + val.img + ')"></div>');
    }
  } else {
    //$(configApp.headerId).css('background-image', '');
	$(configApp.headerId).empty();  
  }
};

Content.snippets = function(html) {
	'use strict';
	var html2 = '';
	var pos = 0;
	var match;
	var re = /\((\w+): ([^\)\n]+)\)/g;
	
	while((match = re.exec(html)) !== null) {
		html2 += html.substring(pos, match.index);
		if(configApp.snippets[match[1]] === undefined) {
			$.ajax({
				url: '_app/js/snippets/' + match[1] + '.js',
				dataType: 'script',
				error: function() {
					configApp.snippets[match[1]] = false;
				},
				async: false
			});
		}
		if(configApp.snippets[match[1]] !== false) {
			var snippet = configApp.snippets[match[1]](match[2]);
			html2 += snippet;
		} else {
			html2 += match[0];
		}
		pos = match.index + match[0].length;
	}
	html2 += html.substring(pos);
	return html2;
};

Content.theme = function(callback) {
  'use strict';
  var themeTemplate = configContent.global.appDir + '/themes/' + configContent.global.theme + '/' + configContent.theme.template + '.html';
  $.get(themeTemplate, null, null, 'html').always(function(data, status, xhr) {
      if (status === 'error') {
        var msg = 'Error loading theme ' + configContent.global.theme;
        Utils.showErrorMsg(msg, themeTemplate + ': ' + data.statusText);
      }
      if (status === 'success') {
	    var context = {
			base_url: window.location.href.substring(0, window.location.href.length - window.location.hash.length),
			theme_url: configContent.global.appDir + '/themes/' + configContent.global.theme,
			site_title: configContent.global.title,
			site_description: configContent.global.description,
			site_author: configContent.global.author,
			site_logo: configContent.global.logo
		};
		
		for (var attribute in configContent.theme) {
		  context['theme_' + attribute] = configContent.theme[attribute];
		}
	    
		data = Content.render(data, context);
		$('body').html(data);
        callback();
      }	  
  });
};

Content.updateBrowserTitle = function(title) {
  'use strict';
  document.title = title;
};

/******************* Backend ********************/

Backend.loadContent = function(url, callback) {
  'use strict';
  if (GithubApi.isGithubApiLink(url)) {
    GithubApi.loadReadme(url, function(data) {
      callback(data);
    });
  } else {
    $('<div></div>').load(url, function(data, status, xhr) {
      if (status === 'error') {
	    $('h1').html('Page not found');
        Utils.showErrorMsg('Page ' + url + ' not found', 'Sorry but there was an error (' + xhr.status + ': ' + xhr.statusText + ')');
      }
      if (status === 'success') {
	    Utils.hideErrorMsg();
        callback(data);
      }
    });
  }
};

Backend.loadJson = function(path, callback) {
  'use strict';
  $.getJSON(path, function(data) {
    callback(data);
  });
};

/******************* Github API ****************/

GithubApi.isGithubApiLink = function(url) {
  'use strict';
  if (Utils.startsWith(url, 'https://api.github.com/repos')) {
    return true;
  } else {
    return false;
  }
};

GithubApi.loadReadme = function(path, callback) {
  'use strict';
  $.ajax({
    url: path,
    dataType: 'json',
    type: 'GET',
    async: true,
    statusCode: {
      404: function(response) {

      },
      200: function(response) {
        // Decoding base64
        var d = window.atob(response.content);
        callback(d);
      }
    },
    error: function(jqXHR, status, errorThrown) {
      Utils.showErrorMsg(jqXHR, status + ':' + errorThrown);
    }
  });
};

/******************* Google API ****************/

/* jshint ignore:start */
GoogleApi.analytics = function() {
  'use strict';
  (function(b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l;
    b[l] || (b[l] =
      function() {
        (b[l].q = b[l].q || []).push(arguments)
      });
    b[l].l = +new Date;
    e = o.createElement(i);
    r = o.getElementsByTagName(i)[0];
    e.src = '//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e, r)
  }(window, document, 'script', 'ga'));
  ga('create', configContent.global.googleAnalyticsId);
  ga('send', 'pageview', '/' + window.location.hash);
};
/* jshint ignore:end */

/******************* Disqus API ****************/

DisqusApi.disqusReload = function(enableDisqus, disqusIdentifier, language) {
  'use strict';
  if (language === undefined) {
    language = 'en';
  }

  if (enableDisqus) {
    $(configApp.disqusThreadId).show();
    if (window.DISQUS) {
      DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = disqusIdentifier;
          this.page.url = location.origin + disqusIdentifier;
          this.page.title = document.title;
          this.language = language;
        }
      });
    }
  } else {
    $(configApp.disqusThreadId).hide();
  }
};

/* jshint ignore:start */
DisqusApi.init = function() {
  'use strict';

  var disqus_shortname = configContent.global.disqusShortname;
  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function() {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
};
/* jshint ignore:end */

/******************* Loader ****************/
Loader.loadCss = function(path) {
	var linkTag = document.createElement('script'); 
	linkTag.rel = 'stylesheet';
	linkTag.type = 'text/css';
	linkTag.src = path;
	var headTag = document.getElementsByTagName('head')[0];
	headTag.appendChild(linkTag);
};

Loader.loadJavascript = function(path, callback) {
	var scriptTag = document.createElement('script'); 
	scriptTag.type = 'text/javascript';
	
	if (callback) {
	  if (scriptTag.readyState) {
		scriptTag.onreadystatechange = function() {
		  if (scriptTag.readyState == "loaded" || scriptTag.readyState == "complete") {
			scriptTag.onreadystatechange = null;
			callback();
		  }
		};
	  } else {
		scriptTag.onload = function() {
		  callback();
		};
	  }
	}
	
	scriptTag.src = path;
	var headTag = document.getElementsByTagName('head')[0];
	headTag.appendChild(scriptTag);
};
  
Loader.loadJson = function(path, callback) {
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.open('GET', path, false);
	xhr.send();
		
	if (xhr.status == 0 || xhr.status == 200) {
	  callback(JSON.parse(xhr.responseText));
	  return true;
	}
};

/******************* Initialization ****************/
Backend.init = function(appDir, configJson) {
  configJson.global = configJson.global || {};
  configJson.global.appDir = appDir;
  Loader.loadJavascript(appDir + '/js/vendor/jquery.min.js', function() {
	if(!Content.config(configJson)) {
	  return;
	}
	
	Content.theme(function() {
	  Content.routes();
	  Content.fillSlider();
	  Content.fillMenu();
	  Content.contactInit();
	  Content.footerInit();
	  Animation.smoothScrolling();
	  Animation.menu();
	  Animation.toc();

	  if (configContent.global.googleAnalyticsId) {
	    console.log('Loading Google Analytics');
		GoogleApi.analytics();
	  }
	  if (configContent.global.disqusShortname) {
		console.log('Loading Disqus');
		DisqusApi.init();
	  }
			
	  var hash = Utils.getHash();

	  if (hash === false) {
		$(configApp.menuId + ' > ul > li > a[href="#"]').parent().addClass('active');
		routie('');
	  } else {
		$(configApp.menuId + ' > ul > li > a[href="#' + hash + '"]').parent().addClass('active');
	  }
	});
  });
  Loader.loadJavascript(appDir + '/js/vendor/highlight.pack.js');
  Loader.loadJavascript(appDir + '/js/vendor/markup.min.js', function() {
	  Loader.loadJavascript(appDir + '/js/vendor/markup.extras.min.js');
  });  
  Loader.loadJavascript(appDir + '/js/vendor/routie.min.js');
  Loader.loadJavascript(appDir + '/js/vendor/yaml.min.js');
  Loader.loadJavascript(appDir + '/markdown-it/markdown-it.min.js');
  Loader.loadCss(appDir + '/css/highlight.min.css');
};

(function() {
	var metas = document.getElementsByTagName('meta');
	var filename;
	
	if(metas.length > 0 && metas['config']) {
		filename = metas['config'].content;
	} else {
		filename = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
		filename = filename.substr(0, filename.lastIndexOf("."));
		if (!filename || filename == 'index') {
			filename = 'config.json';
		} else {
			filename += '.json';
		}
	}
	
	try {
		Loader.loadJson(filename, function(configJson) {
			var appDir = configContent.global.appDir;
			if(configJson.global && configJson.global.appDir) {
				appDir = configJson.global.appDir;
			}
			Backend.init(appDir, configJson);
		});
	} catch (e) {
		document.write('<strong>Error loading config: ' + filename + '</strong><br/>');
		document.write(e.message);
	}
})();
/*

       \/
       /\
      /  \
     /    \     Tipi CMS
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
  breadcrumbId: '#breadcrumb',
  menuId: '#menu',

  blogId: '#blog',
  postId: '#content',
  disqusThreadId: '#disqus_thread',

  // Footer
  footerId: '#footer',
  pagesId: '#pages',
  socialId: '#social',
  copyrightId: '#copyright',
  poweredById: '#poweredby',
  
  // Misc
  errorId: '#error',
  
  // Snippets
  snippets: [],
  
  // Storage
  storagePrefix: 'tipi-'
};
var configContent = {
  global: {
	title: 'Untitled',
	description: '',
	author: '',
    welcome: 'Home',
	theme: false,
	extension: 'md',
	logo: '',
	appDir: '.',
	contentDir: 'content/',
	defaultImg: false,
	thumb: 'img/thumb.jpg',
	breadcrumbHome: '#/',
	baseUrl: false,
	id:	0	// Page id, calculated (hash from baseUrl)
  },
  metadata: {
    begin: "---",
	end: "---"
  },
  footer: {
    copyright: '<a href="#">{{ site_title }}</a> &copy; {{ date.year }} &bull; All rights reserved.',
	poweredBy: 'Powered by <a href="http://github.com/dewanee-es/tipi">Tipi</a>'
  },
  social: {},
  pages: {},
  posts: {},
  theme: {
    template: 'index',
	style: '',
  	iconClass: 'fa fa-'	// Font Awesome
  },
  addons: {	// See Bakend.addons
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
var Template = {};

var escapeKey = 27;

/******************** Utilities **************************/

Utils.addClass = function(value, classname) {
	if(value) {
		return value + ' ' + classname;
	} else {
		return classname;
	}
}

Utils.basename = function(url) {
	var pos = url.lastIndexOf('.');
	if(pos != -1) {		
		return url.substring(0, pos);
	} else {
		return url;
	}
}

Utils.date = {
	date: function() { return new Date().getDate(); },
	day: function() { return new Date().getDay(); },
	year: function() { return new Date().getFullYear(); },
	hours: function() { return new Date().getHours(); },
	milliseconds: function() { return new Date().getMilliseconds(); },
	minutes: function() { return new Date().getMinutes(); },
	month: function() { return new Date().getMonth(); },
	seconds: function() { return new Date().getSeconds(); },
}

Utils.getFragment = function(page) {
	return page.home ? '' : '/' + page.slug;
}

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

Utils.getPath = function(page, relative) {
	var pos = page.lastIndexOf('/');
	return configContent.global.contentDir + page.substring(0, pos) + relative;
}

Utils.getTitle = function(slug) {
	if(slug.charAt(slug.length - 1) == '/') {
		slug = slug.slice(0, -1);
	}
	var pieces = slug.split('/');
	var title = pieces[pieces.length - 1];
	return (title.charAt(0).toUpperCase() + title.slice(1)).replace(/-/g, ' ');
}

Utils.getUrl = function(slug) {
	var url;
	slug = Utils.slugify(decodeURIComponent(slug.replace(/\+/, '%20')), 'lowercase,allowed');
	if(slug.charAt(slug.length - 1) == '/') {
		var pieces = slug.split('/');
		var sub = pieces[pieces.length - 2];
		url = slug + sub + '.' + configContent.global.extension;
	} else {
		url = slug + '.' + configContent.global.extension;
	}
	return url;
}

Utils.showErrorMsg = function(msg, description) {
  'use strict';
  console.error(msg + ': ' + description);
  $(configApp.errorId).html('<strong>' + msg + '</strong><br/>' + description);
  $(configApp.errorId).show();
};

Utils.slugify = function(text, mode) {
	var modes = mode.split(',');
	text = text.trim();
	for(var i = 0; i < modes.length; i++) {
		var f = Utils.slugify[modes[i].trim()];
		if(f) {
			text = f(text);
		}
	}
	return Utils.slugify.clean(text);
};

Utils.slugify.allowed = function(text) {
	return text.replace(/[\/\\?%*:|"<>]+/, '');
};

Utils.slugify.clean = function(text) {
	return text.replace(/-+/, '-').replace(/_+/, '_').replace(/^[-_\s]+/, '').replace(/[-_\s]+$/, '');
};

Utils.slugify.dot_to_dash = function(text) {
	return text.replace(/[\.\/\\?%*:|"<>]+/, '-');
};

Utils.slugify.dot_to_underscore = function(text) {
	return text.replace(/[\.\/\\?%*:|"<>]+/, '_');
}

Utils.slugify.encode = function(text) {
	return encodeURIComponent(text);
};

Utils.slugify.lowercase = function(text) {
	return text.toLowerCase();
};

Utils.slugify.space_to_dash = function(text) {
	return text.replace(/\s+/, '-');
};

Utils.slugify.space_to_underscore = function(text) {
	return text.replace(/\s+/, '_');
};

Utils.slugify.transliterate = function(text) {
	var result = '';
	for(var i = 0; i < text.length; i++) {
		var ch = text.charAt(i);
		var tch = Utils.slugify.transliterate.charMap[ch];
		result += (tch ? tch : ch);
	}
	return result;
};

Utils.slugify.transliterate.charMap = {
    // latin
	'À': 'A',
	'Á': 'A',
	'Â': 'A',
	'Ã': 'A',
	'Ä': 'Ae',
	'Å': 'A',
	'Æ': 'AE',
	'Ç': 'C',
	'È': 'E',
	'É': 'E',
	'Ê': 'E',
	'Ë': 'E',
	'Ì': 'I',
	'Í': 'I',
	'Î': 'I',
	'Ï': 'I',
	'Ð': 'D',
	'Ñ': 'N',
	'Ò': 'O',
	'Ó': 'O',
	'Ô': 'O',
	'Õ': 'O',
	'Ö': 'Oe',
	'Ő': 'O',
	'Ø': 'O',
	'Ù': 'U',
	'Ú': 'U',
	'Û': 'U',
	'Ü': 'Ue',
	'Ű': 'U',
	'Ý': 'Y',
	'Þ': 'TH',
	'ß': 'ss',
	'à': 'a',
	'á': 'a',
	'â': 'a',
	'ã': 'a',
	'ä': 'ae',
	'å': 'a',
	'æ': 'ae',
	'ç': 'c',
	'è': 'e',
	'é': 'e',
	'ê': 'e',
	'ë': 'e',
	'ì': 'i',
	'í': 'i',
	'î': 'i',
	'ï': 'i',
	'ð': 'd',
	'ñ': 'n',
	'ò': 'o',
	'ó': 'o',
	'ô': 'o',
	'õ': 'o',
	'ö': 'oe',
	'ő': 'o',
	'ø': 'o',
	'ù': 'u',
	'ú': 'u',
	'û': 'u',
	'ü': 'ue',
	'ű': 'u',
	'ý': 'y',
	'þ': 'th',
	'ÿ': 'y',
	'ẞ': 'SS'
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

Utils.visit = function(url) {
	var key = configApp.storagePrefix + configContent.global.id
	var item = localStorage.getItem(key);
	var data;
	if(item) {
		data = JSON.parse(item);
	} else {
		data = {
			url: configContent.global.baseUrl,
			visited: {}
		};
	}
	data.visited[url] = true;
	localStorage.setItem(key, JSON.stringify(data));
}

Utils.isVisited = function(url) {
	var key = configApp.storagePrefix + configContent.global.id
	var item = localStorage.getItem(key);
	var data;
	if(item) {
		data = JSON.parse(item);
		return data.visited[url];
	} else {
		return false;
	}
}

Utils.hash = function(text) {
	var hash = 0, i, chr;
	if (text.length === 0) return hash;
	for (i = 0; i < text.length; i++) {
		chr   = text.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

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

Content.config = function(data, metas) {
	
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
    
    // Pages and posts
    configContent.pages = Content.initPages(configContent.pages);
    configContent.posts = Content.initPages(configContent.posts);
	
	// Metadata
	configContent.metadata.begin = configContent.metadata.begin.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	configContent.metadata.end = configContent.metadata.end.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	
	// Page Id
	configContent.global.id = Utils.hash(configContent.global.baseUrl);
	
	// HTML Metas
	$.each(metas, function (index, meta) {
		if(meta.name && meta.content) {
			configContent.global[meta.name] = meta.content;
		}
	});
	
	return true;
};

Content.socialInit = function() {
  'use strict';
  var socialList = $(configApp.socialId + ' > ul');
  if(socialList.length == 0) {
	  socialList = $('<ul></ul>');
	  $(configApp.socialId).append(socialList);
  }
  $.each(configContent.social, function(k, v) {
    if (v.url) {
      var imgEl = '<img src="' + (v.icon ? configContent.global.appDir + '/img/social/' + v.icon + '.svg' : v.img) + '"/>';
      var anchorEl = '<li><a href="' + v.url + '">' + imgEl + '</a></li>';
      socialList.append(anchorEl);
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

Content.initPage = function(page) {
	if(!page.title) {
		if(page.slug) {
			page.title = Utils.getTitle(page.slug);
		} else {
			if(!Content.initPage.pageSeq) {
				Content.initPage.pageSeq = 1;
			}
			page.title = 'Page ' + (Content.initPage.pageSeq++);
		}
	}

    page.slug = page.slug || Utils.slugify(page.title, 'space_to_dash,encode');
	page.url = page.url || Utils.getUrl(page.slug);
	page.tag = page.tag || '';
	page.img = page.img || (configContent.global.defaultImg
		? Utils.basename(page.url) + '.' +
			(typeof configContent.global.defaultImg == 'string'
			? configContent.global.defaultImg
			: 'jpg')
		: '');
    page.thumb = page.thumb || page.img;
    page.disqusEnable = page.disqusEnable || false;
    page.disqusIdentifier = page.disqusIdentifier || '';
    page.disqusLang = page.disqusLang || '';
    page.date = page.date || '';
    page.home = (configContent.global.welcome == page.title);
    
    return page;
}

Content.initPages = function(pages) {
	var pageMap = {};
	
	if(Array.isArray(pages)) {
		for(var i = 0; i < pages.length; i++) {
			var val = pages[i];
			if(typeof val == 'string') {
				val = Content.initPage({ title: val});
			} else {
				val = Content.initPage(val);
			}
			pageMap[val.slug] = val;
		}
	} else {	
		$.each(pages, function(title, val) {
		    if(typeof val == 'string') {
		    	val = Content.initPage({ title: title, url: val});
		    } else {
		    	val['title'] = title;
		    	val = Content.initPage(val);
		    }
			pageMap[val.slug] = val;
		});
	}
	
	return pageMap;
}

Content.fillMenu = function() {
  'use strict';
  var a = '';
  $.each(configContent.pages, function(key, val) {
    var fragment = Utils.getFragment(val);
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
    var p = '<p class="slide-title">' + val.title + '</p>';
    var p2 = '<p class="slide-date">' + val.date + '</p>';
    var li = '<li><a href="#' + Utils.getFragment(val) + '">' + img + p + p2 + '</a></li>';
    $(li).appendTo(configApp.slidesId);
  });
};

Content.footerInit = function() {
  'use strict';
  $(configApp.copyrightId).html(Content.template('#copyright', configContent.footer.copyright));
  $(configApp.poweredById).html(Content.template('#poweredBy', configContent.footer.poweredBy));
  var pageNames = '';
  $.each(configContent.pages, function(key, val) {
    var fragment = Utils.getFragment(val);
    pageNames += '<a href="#' + fragment + '">' + val.title + '</a>' + ' / ';
  });
  pageNames = pageNames.substring(0, pageNames.length - 3);
  $(configApp.pagesId + '> span').html(pageNames);
};

Content.getPage = function(slug) {
	var key = Utils.slugify(slug, 'space_to_dash,encode');	// Force slug
	return configContent.pages[key]
		|| configContent.posts[key]
		|| Content.initPage({ slug: slug });
};

Content.layout = function(templatePath, templateExtension, templateName, success, error) {
	
	var path = templatePath + '/' + templateName + '.' + templateExtension;

	$.get(path, null, null, 'html').always(function(data, status, xhr) {
	      if (status === 'error') {
	    	  error(path, data);
	      } else if (status === 'success') {			
			var content = Content.template(templateName, data);

			$('body').html(content);
	        success();
	      }	  
	  });
}

Content.loaded = function(callback) {	// Callbacks for content load (called after every page load)
	if(!Content.loaded.callbacks) {
		Content.loaded.callbacks = [];
	}
	
	if(callback) {
		Content.loaded.callbacks.push(callback);
	} else {
		for(var i = 0; i < Content.loaded.callbacks.length; i++) {
			Content.loaded.callbacks[i]();
		}
	}
};

Content.markdown = function(text, page, callback) {
  'use strict';
  var md = new Powerdown({
  });
  var defaultLinkOpenRender = md.renderer.defaultRender('link_open');
  md.renderer.assign('link_open', function(tokens, idx, options, env, self) {
	var href = tokens[idx].attrGet('href');
	if(href.charAt(0) != '#') {	// External link or relative internal link
		if(href.indexOf(':') == -1) {	// Relative link
			if(href.indexOf('.') == -1 || href.endsWith(configContent.global.extension)) {
				var hash = Utils.getHash();
				if(hash === false || hash.length == 0) {
					hash = '/';
				} else {
					hash = hash.substr(0, hash.lastIndexOf('/') + 1);
				}
				if(href.endsWith(configContent.global.extension)) {
					href = href.substr(0, href.length - configContent.global.extension.length - 1);
				}
				hash = hash + href;
				href = '#' + hash;
				if(Utils.isVisited(hash)) {
					tokens[idx].attrSet('class', Utils.addClass(tokens[idx].attrGet('class'), 'visited'));
				}
			} else {	// Resource
				href = Utils.getPath(page.url, href);
			}
			tokens[idx].attrSet('href', href);
		} else {	// External link
			tokens[idx].attrSet('target', '_blank');
		}
	} else {	// Internal link
		if(Utils.isVisited(href.substring(1))) {
			tokens[idx].attrSet('class', Utils.addClass(tokens[idx].attrGet('class'), 'visited'));
		}
	}
	return defaultLinkOpenRender(tokens, idx, options, env, self);
  });
  var defaultImageRender = md.renderer.defaultRender('image');
  md.renderer.assign('image', function (tokens, idx, options, env, self) {
	  var src = tokens[idx].attrGet('src');
	  if(src.indexOf(':') == -1) {
		  src = Utils.getPath(page.url, src);
		  tokens[idx].attrSet('src', src);
	  }
	  return defaultImageRender(tokens, idx, options, env, self);
  });
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

Content.ready = function(callback) {	// Callbacks for content ready (called once after load theme)
	if(!Content.ready.callbacks) {
		Content.ready.callbacks = [];
	}
	
	if(callback) {
		Content.ready.callbacks.push(callback);
	} else {
		for(var i = 0; i < Content.ready.callbacks.length; i++) {
			Content.ready.callbacks[i]();
		}
	}
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
    Content.markdown(data, val, function(compiledMarkdown) {
      compiledMarkdown = Content.snippets(compiledMarkdown);
      $(configApp.postId).html(compiledMarkdown);
	  $('body').removeClass().addClass('post-template ' + (val.home ? 'home-template' : 'page-template'));
      $('pre').addClass('hljs');
	  $('table').addClass('table table-bordered');
      Content.setHeader(val);
      Content.runToc();
	  Content.runBreadcrumb(val);
	  Content.loaded();
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
	//return Mark.up(template, data, {delimiter: ':', includeFunction: Content.include});
	return template;
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
    Content.reloadPage(Content.getPage(configContent.global.welcome));
	Utils.visit('/');
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
	var val = Content.getPage(url);
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
	Utils.visit('/' + url);
  }
  routie(urls);
};

Content.runBreadcrumb = function(page, container) {
  container = typeof container !== 'undefined' ? container : configApp.breadcrumbId;
  var breadcrumbHome = configContent.global.breadcrumbHome;
  var list = $(container);
  $(list).empty();
  
  if(page.home) {
	  if(breadcrumbHome) {
		$(list).append('<li class="active">' + configContent.global.title + '</li>');
	  }
  } else {
	  if(breadcrumbHome) {
		$(list).append('<li><a href="' + breadcrumbHome + '">' + configContent.global.title + '</a></li>');
	  }
	  
	  var slug = page.slug;
	  if(slug.charAt(slug.length - 1) == '/') {
		  slug = slug.slice(0, -1);
	  }
	  var parts = slug.split('/');
	  var fragment = '#';
	  
	  for(var i = 0; i < parts.length; i++) {
		  fragment += '/' + parts[i];
		  if(i == parts.length - 1) {
			  $(list).append('<li class="active">' + page.title + '</li>');
		  } else {
			  $(list).append('<li><a href="' + fragment + '/">' + Utils.getTitle(parts[i]) + '</a></li>');
		  }
	  }
  }
};

Content.runToc = function(container) {
  'use strict';
  container = typeof container !== 'undefined' ? container : configApp.postId;
  var list = $('<ul></ul>');
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
	$(configApp.tocId).find('ul').first().empty().append(list);
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
				url: configContent.global.appDir + '/js/markdown/snippets/' + match[1] + '.js',
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

Content.template = function(templateName, template) {
	var context = {
		base_url: window.location.href.substring(0, window.location.href.length - window.location.hash.length),
		theme_url: configContent.global.appDir + '/themes/' + configContent.global.theme,
		site_title: configContent.global.title,
		site_description: configContent.global.description,
		site_author: configContent.global.author,
		site_logo: configContent.global.logo,
		date: Utils.date
	};
	
	for (var attribute in configContent.theme) {
	  context['theme_' + attribute] = configContent.theme[attribute];
	}

	return Mustache.render(template, context);
}

Content.theme = function(callback) {
  'use strict';
  var theme = configContent.global.theme;
  
  if(theme) {
	  Content.layout(configContent.global.appDir + '/themes/' + theme, 'html', configContent.theme.template, callback, function(path, data) {
        var msg = 'Error loading theme ' + theme;
        Utils.showErrorMsg(msg, path + ': ' + data.statusText);
	  });
  } else {
	  callback();
  }
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
Loader.loader = function (tag) {	// https://davidwalsh.name/javascript-loader
	return function (path) {
		return new Promise(function (resolve, reject) {
			var element = document.createElement(tag);
			var parent = 'body';
			var attr = 'src';
			
			element.onload = function() {
				resolve(path);
			};
			element.onerror = function() {
				reject(path);
			};
			
			switch(tag) {
				case 'script':
					element.async = true;
					break;
				case 'link':
					element.type = 'text/css';
					element.rel = 'stylesheet';
					attr = 'href';
					parent = 'head';
	        }
			
			element[attr] = path;
	        document[parent].appendChild(element);
		});
	}
};

Loader.loadCss = Loader.loader('link');

Loader.loadJavascript = Loader.loader('script');

Loader.loadImage = Loader.loader('img');
  
Loader.loadJson = function (path) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.overrideMimeType("application/json");
		xhr.open('GET', path);
		
		xhr.onload = function() {
			if (xhr.status == 200) {
				resolve(JSON.parse(xhr.response));
			} else {
		        reject(Error(xhr.statusText));
			}
		};

	    xhr.onerror = function() {
	    	reject(Error("Network Error"));
	    };
		
	    xhr.send();
	});
};

Loader.loadAll = function(assets) {
	return Promise.all(assets);
};

/******************* Template ****************/
Template.fromInnerHtml = function(name, selector) {
	Template.fromString(name, $(selector).html());
};
		
Template.fromOuterHtml = function(name, selector) {
	Template.fromString(name, $(selector)[0].outerHTML);
};
		
Template.fromString = function(name, string) {
	Template[name] = {
		template: string.replace(/\t|\r|\n/gi,''),
		render: function(data) {
			return this.template.replace(/\${([^{}]*)}/g,
				function (variable, key) {
					var value = data[key];
					return typeof value === 'string' || typeof value === 'number' ? value : '';	// : variable;
				}
			);
		}
	}
};

/******************* Addons ****************/
Backend.addons = {
	bootstrap: function (appDir, assets) {
		assets.push(Loader.loadCss(appDir + '/addons/bootstrap/css/bootstrap.min.css'));
		assets.push(Loader.loadJavascript(appDir + '/addons/bootstrap/js/bootstrap.min.js'));
	},
	fontAwesome: function (appDir, assets) {
		assets.push(Loader.loadCss(appDir + '/addons/font-awesome/css/font-awesome.min.css'));
	},
	highlight: function (appDir, assets, stylesheet) {
		assets.push(Loader.loadJavascript(appDir + '/addons/highlight/highlight.min.js'));
		if(typeof stylesheet == 'string') {
			assets.push(Loader.loadCss(appDir + '/addons/highlight/styles/' + stylesheet + '.css'));
		}
	},
	pace: function (appDir, assets) {
		assets.push(Loader.loadJavascript(appDir + '/addons/pace/pace.min.js'));
		assets.push(Loader.loadCss(appDir + '/addons/pace/pace.css'));
	},
	slider: function (appDir, assets) {
		assets.push(Loader.loadCss(appDir + '/addons/slick/slick.css'));
		assets.push(Loader.loadCss(appDir + '/addons/slick/slick-theme.css'));
		assets.push(Loader.loadJavascript(appDir + '/addons/slick/slick.min.js'));
	}
}
/******************* Initialization ****************/
Backend.init = function(appDir, configJson, metas) {
  configJson.global = configJson.global || {};
  configJson.global.appDir = appDir;
  configJson.addons = Object.assign({}, configContent.addons, configJson.addons);
  
  var assets = [             
	Loader.loadJavascript(appDir + '/js/jquery/jquery.min.js'),
	Loader.loadJavascript(appDir + '/js/mustache/mustache.min.js'),
	Loader.loadJavascript(appDir + '/js/routie/routie.min.js'),
	Loader.loadJavascript(appDir + '/js/yaml/yaml.min.js'),
	Loader.loadJavascript(appDir + '/js/markdown/markdown-it.js'),
	Loader.loadJavascript(appDir + '/js/markdown/powerdown.js')
  ];
  
  for(var addon in configJson.addons) {
	  if(configJson.addons[addon] && Backend.addons[addon]) {
		  Backend.addons[addon](appDir, assets, configJson.addons[addon]);
	  }
  }
  
  Loader.loadAll(assets).then(function() {
	if(!Content.config(configJson, metas)) {
	  return;
	}
	
	Content.theme(function() {
	  Content.routes();
	  Content.fillSlider();
	  Content.fillMenu();
	  Content.socialInit();
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
	  
	  Content.ready();	// Callbacks after init
	});
  });
};

(function() {
	var metas = document.getElementsByTagName('meta');
	var href = window.location.href;	
	var filename;
	
	if(window.location.hash.length > 0 || href.charAt(href.length - 1) == '#') {
		href = href.substr(0, href.length - window.location.hash.length - 1);
	}
	
	configContent.global.baseUrl = href;
	
	if(metas.length > 0 && metas['config']) {
		filename = metas['config'].content;
	} else {
		filename = href.substr(href.lastIndexOf("/") + 1);
		filename = filename.substr(0, filename.lastIndexOf("."));
		if (!filename || filename == 'index') {
			filename = 'config.json';
		} else {
			filename += '.json';
		}
	}
	
	try {
		Loader.loadJson(filename).then(function (configJson) {
			var appDir = configContent.global.appDir;
			if(configJson.global && configJson.global.appDir) {
				appDir = configJson.global.appDir;
			}
			Backend.init(appDir, configJson, metas);
		});
	} catch (e) {
		document.write('<strong>Error loading config: ' + filename + '</strong><br/>');
		document.write(e.message);
	}
})();
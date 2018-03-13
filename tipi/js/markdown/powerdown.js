function Powerdown(options) {
	var mdOptions = Object.assign({}, Powerdown.defaultOptions, options);
	this.options = mdOptions;
	this.markdown = window.markdownit(mdOptions);
	
	var containerTypes = Powerdown.defaultOptions.container.types;
	var containerRenderer = Powerdown.defaultOptions.container.renderer;
	
	if(mdOptions && mdOptions.container) {
	  containerTypes = mdOptions.container.types || containerTypes;
	  containerRenderer = mdOptions.container.renderer || containerRenderer;
	}
	
	window.markdownitContainer(this.markdown, 'container', {
		validate: function(params) {
			return Powerdown.containerProcess(params, containerTypes) !== null;
		},

		render: function (tokens, idx, _options, env, self) {
      var container = Powerdown.containerProcess(tokens[idx].info, containerTypes);
			if (tokens[idx].nesting === 1) {
			  container.open = true;
			} else {
			  container.open = false;
			}
			return containerRenderer(container);
		}
	});

	window.markdownitFootnote(this.markdown);
	
	this.renderer = new Powerdown.Renderer(this.markdown.renderer);
}

Powerdown.containerProcess = function(text, types) {
  var s = text.trim().split(/[:!]+($| (.+)?)/, 2);
  var res = { type: null, title: null };
  if(s[1]) {
      res.title = s[1].trim();
  } else {
      res.title = s[0].trim();
  }
  s[0] = s[0].toLowerCase();
  res.type = types[s[0]] || types['*'] || s[0];
	return res;
};

Powerdown.containerRenderer = function(container) {
  var tag;
  if(container.open) {
    tag = '<div class="' + container.type + '">';
    if(container.title) {
      tag += '<strong>' + container.title + '</strong>';
    }
  } else {
    tag = '</div>';
  }
  return tag;
}

Powerdown.defaultOptions = {
  breaks:       true,         // Convert '\n' in paragraphs into <br>
  container: {
    types:      {},
    renderer:   Powerdown.containerRenderer
  },
  highlight:    function(str, lang) { // Highlighter function
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    
    return ''; // use external default escaping
  },
	html:			    true,					// Enable HTML tags in source
  linkify:      true,         // Autoconvert URL-like text to links
  typographer:  true,         // Enable some language-neutral replacement + quotes beautification
	xhtmlOut:		  true,					// Use '/' to close single tags (<br />). CommonMark compatibility.
}

Powerdown.prototype.render = function(text) {
	return this.markdown.render(text);
}

Powerdown.Renderer = function(renderer) {
	this.renderer = renderer;
	
	for(var element in Powerdown.Renderer.renders) {
		var defaultRender = this.defaultRender(element);
		this.assign(element, Powerdown.Renderer.renders[element](defaultRender));
	}
}

Powerdown.Renderer.renders = {
	fence: function(defaultRenderer) {
		return function (tokens, idx, options, env, slf) {
			var token = tokens[idx],
		      	info = token.info ? token.info.trim() : '',
		      	langName = '';
	
		    if (info) {
		    	var params = info.split(/\s+/g);
		    	langName = params[0]
		    	
		    	if(Powerdown.Renderer.fences[langName]) {
		    		return Powerdown.Renderer.fences[langName](params, token.content);
		    	}
		    }
	
		    return defaultRenderer(tokens, idx, options, env, slf);
		}
	}
}

Powerdown.Renderer.fences = {
	code2flow: function (params, content) {
		// View https://code2flow.com/app
		return '<div class="code2flow" id="code2flow_' + Math.floor(Date.now() * Math.random()).toString(36) + '"></div>';
		// TODO: Async		
		/*$.post('https://code2flow.com/svg/', {	// TODO: Attach
			text: content,
			options: '{"fillView":true,"pageSize":{"width":8.5,"height":11},"trueLabel":"True","falseLabel":"False","selectedTheme":"colored","renderShadows":true,"nodeDistance":0.8,"rankDistance":0.25,"compact":false,"direction":"bottom","optimizeCommon":true,"decorateEdgeLabels":true}'
		}, function(data) {
			return data;
		});*/
	},
	plantuml: function (params, content) {
		if(content.charAt(0) != '@') {
			content = "@startuml\n" + content + "\n@enduml";
		}
		// TODO: plantuml API
		return "<img class='plantuml' src='https://g.gravizo.com/svg?\n" + content.replace(/\n/g, ';') + "\n'/>";
	}
}

Powerdown.Renderer.prototype.defaultRender = function(element) {
	return this.renderer.rules[element] || function(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};
}

Powerdown.Renderer.prototype.assign = function(element, callback) {
	this.renderer.rules[element] = callback;
}

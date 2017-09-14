function Powerdown(options) {
	options = options || {};
	options.highlight = options.highlight || Powerdown.highlight;
	this.markdown = window.markdownit(options);
	this.renderer = new Powerdown.Renderer(this.markdown.renderer);
}

Powerdown.highlight = function(str, lang) {
	if (lang && hljs.getLanguage(lang)) {
		try {
			return hljs.highlight(lang, str).value;
		} catch (__) {}
	}
	
	return ''; // use external default escaping
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
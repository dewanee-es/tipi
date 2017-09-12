function Powerdown(options) {
	options = options || {};
	this.markdown = window.markdownit(options);
	this.renderer = new Powerdown.Renderer(this.markdown.renderer);
}

Powerdown.prototype.render = function(text) {
	return this.markdown.render(text);
}

Powerdown.Renderer = function(renderer) {
	this.renderer = renderer;
}

/*	_attachOrRender: function(element, args) {
if(args.length == 1 && args[0] instanceof Function) {
	this._attach(element, args[0]);
} else {
	this._render(element, args);
}
},
_attach: function(element, callback) {
this._renderers[element] = callback;
},
_render: function(element, args) {
if(this._renderers[element]) {
	
}
},
_renderers: {},
image: function() {
this._attachOrRender('image', arguments);
},
link: function() {
this._attachOrRender('link', arguments);
}*/

Powerdown.Renderer.prototype.defaultRender = function(element) {
	return this.renderer.rules[element] || function(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};
}

Powerdown.Renderer.prototype.assign = function(element, callback) {
	this.renderer.rules[element] = callback;
}
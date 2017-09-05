configApp.snippets.youtube = function(id) {
	if(id.indexOf('<a ') === 0) {
		id = id.substring(id.indexOf('href="') + 6);
		id = id.substring(0, id.indexOf('"'));
	}
	if(id.indexOf('/') !== -1) {
		id = id.substring(id.lastIndexOf('/'));
	}
	return '<iframe type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + id + '?html5=1" frameborder="0"/>';
}

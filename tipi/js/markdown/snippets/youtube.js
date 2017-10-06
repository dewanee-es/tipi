configApp.snippets.youtube = function(id) {
	if(id.indexOf('/') !== -1) {
		id = id.substring(id.lastIndexOf('/'));
	}
	return '<iframe type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + id + '?html5=1" frameborder="0"/>';
}

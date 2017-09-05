Content.ready = function() {

	// Shuffle: Fisher–Yates
	function shuffle(array) {
	  var m = array.length, t, i;

	  // While there remain elements to shuffle…
	  while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	  }

	  return array;
	}

	// Lists: ol
	$('#content ol,#content ul').each(function() {
		var $this = $(this);
		$this.prepend('<div class="buttons"><button class="btn btn-default btn-xs shuffle"><span class="glyphicon glyphicon-random"></span></button></div>');
	});
	$('#content ol,#content ul').on('click', 'button.shuffle', function() {
		$ol = $(this).parents('ol,ul').first();
		var children = $ol.children('li');
		shuffle(children).detach().appendTo($ol);
	});
	
};

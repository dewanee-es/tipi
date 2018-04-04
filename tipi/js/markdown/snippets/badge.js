snippets.badge = function(text, color) {
  var parts = text.split('|');
  var left, right;
  if(parts.length > 1) {
    left = parts[0].toUpperCase();
    right = parts[1].toUpperCase();
  } else {
    left = false;
    right = parts[0].toUpperCase();
  }
  if(!color) {
    color = 'default';
  }
  switch(color) {
  case 'default':
  case 'dark':
    color = '555';
    break;
  case 'brightgreen':
    color = '4c1';
    break;
  case 'green':
  case 'success':
    color = '97CA00';
    break;
  case 'yellowgreen':
    color = 'a4a61d';
    break;
  case 'yellow':
  case 'warning':
    color = 'dfb317';
    break;
  case 'orange':
    color = 'fe7d37';
    break;
  case 'red':
  case 'danger':
    color = 'e05d44';
    break;
  case 'lightgray':
  case 'secondary':
  case 'light':
    color = '9f9f9f';
    break;
  case 'blue':
  case 'primary':
  case 'info':
    color = '007ec6';
    break;
  }
	return '<span class="tipi-badge" style="letter-spacing: 0.133rem; line-height: 1rem; color: #fff; font-family: DejaVu Sans,Verdana,Geneva,sans-serif; display: inline-block; margin: 0 3rem; background-color: #555; font-size: 1rem;">'
	  + (left ? '<span style="padding: 0.9rem 1.2rem; display: inline-block;">' + left + '</span>' : '')
	  + '<span style="font-weight: bold; padding: 0.9rem 1.2rem; display: inline-block; background-color: #' + color + '">' + right + '</span>'
	  + '</span>';
}

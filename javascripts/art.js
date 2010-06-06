var ArtJs_version = {};

ArtJs_version['Microsoft Internet Explorer'] = 'ie';
ArtJs_version['Netscape'] = 'ff';

var ArtJs_package = ArtJs_version[window.navigator.appName];
var ArtJs_path = window.ArtJs_path || 'javascripts/';

document.write('<script src="' + ArtJs_path + 'art.' + ArtJs_package + '.js" type="text/javascript"></script>');

const LOADER_HTML = require('./loader.html');

export class Loader {
	constructor() {
		$( "body" ).prepend(LOADER_HTML);
		this.showLoading();
	}
	showLoading() {
	  $('.loading').show();
	  this.removeLoading();
	}
	removeLoading() {
	  $('.loading').delay(400).fadeOut('slow');
	}
} 

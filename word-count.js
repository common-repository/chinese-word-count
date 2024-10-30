// Word count
function strchlen(str){
  var counter,i;
  counter=0;
  for(i=0;i<str.length;i++){
    if(str.charCodeAt(i)>255){
      counter++;
    }
  }
  return counter;
}

function strenlen(str){
  var counter,i;
  counter=0;
  for(i=0;i<str.length;i++){
    while(str.charAt(i)==' '||str.charCodeAt(i)>255||str.charAt(i)=='\n') i++;
    if(str.charAt(i+1)==' '||str.charAt(i+1)=='\n'||str.charCodeAt(i+1)>255||i==str.length-1) counter++;
  }
  return counter;
}

/* global wordCountL10n */
var wpWordCount;
(function($,undefined) {
	wpWordCount = {

		settings : {
			strip : /<[a-zA-Z\/][^<>]*>/g, // strip HTML tags
			clean : /[0-9.(),;:!?%#$¿'"_+=\\/-]+/g, // regexp to remove punctuation, etc.
			w : /\S\s+/g, // word-counting regexp
			c : /\S/g // char-counting regexp for asian languages
		},

		block : 0,

		wc : function(tx, type) {
			var t = this, w = $('.word-count'), tc = 0;

			if ( type === undefined )
				type = wordCountL10n.type;
			if ( type !== 'w' && type !== 'c' )
				type = 'w';

			if ( t.block )
				return;

			t.block = 1;

			setTimeout( function() {
				if ( tx ) {
					tx = tx.replace( t.settings.strip, ' ' ).replace( /&nbsp;|&#160;/gi, ' ' );
					tx = tx.replace( t.settings.clean, '' );
                    tc = strchlen(tx) + strenlen(tx);
				}
				w.html(tc.toString());

				setTimeout( function() { t.block = 0; }, 2000 );
			}, 1 );
		}
	};

	$(document).bind( 'wpcountwords', function(e, txt) {
		wpWordCount.wc(txt, 'c');
	});
}(jQuery));

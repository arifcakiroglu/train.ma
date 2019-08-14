// Accessibility tab

module.exports = function(){

	const keys = [9,38,40,39,13];

	var allowAccessibility = function(event) {
	    document.body.classList[keys.includes(event.keyCode) ? 'add' : 'remove']( 'user-is-tabbing' );
	}

	"keydown mousedown".split(" ").forEach(function(e){
      window.addEventListener(e, allowAccessibility, false);
    });
}

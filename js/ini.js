"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
	$("#input").click(function() {
	   $('#fileinput').trigger('click');   
	});
	$("#fileinput").change(calculate);
});
window.onload = function() {
		if (window.localStorage && localStorage.fileout && localStorage.filein) {
			out.className = 'unhidden';
			texttoparse.innerHTML = localStorage.filein;
			finaloutput.innerHTML = localStorage.fileout;
		}
};
function calculate(evt) {
	var resout = [];
	var resin = [];
	var rowin = "<% _.each(items, function(name) { %>"     +
				"                    <%= name %>" +
				"              <% }); %>";
	var rowout = "<% _.each(items, function(name) { %>"     +
				"                    <td><%= name %></td>" +
				"              <% }); %>";

	var f = evt.target.files[0];
		
	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
      
			var tokens = lexer(contents);
			var pretty = tokensToString(tokens);
      
			out.className = 'unhidden';
			
			
			resin.push(contents);
			resout.push(pretty);
			
			resin.push(_.template(rowin, {items : resin}));
			resout.push("<tr>"+_.template(rowout, {items : resout})+"</tr>");
			
			resout.push('</table>');
			
			texttoparse.innerHTML = resin.join('');
			finaloutput.innerHTML = resout.join('');
			
			if (window.localStorage){
				localStorage.filein  = resin.join('');;
				localStorage.fileout  = resout.join('');
			}
		}
		r.readAsText(f);
	}else { 
		alert("Failed to load file");
	}
}

var temp = '<li> <span class = "<%= token.type %>"> <%= match %> </span>\n';

function tokensToString(tokens) {
   var r = '';
   for(var i=0; i < tokens.length; i++) {
     var t = tokens[i]
     var s = JSON.stringify(t, undefined, 2);
     s = _.template(temp, {token: t, match: s});
     r += s;
   }
   return '<ol>\n'+r+'</ol>';
}

function lexer(input) {
  var blanks         = /^\s+/;
  var iniheader      = /^\[([^\]\r\n]+)\]/;
  var comments       = /^[;#](.*)/;
  var nameEqualValue = /^([^=;\r\n]+)=([^;\r\n]*)/;
  var any            = /^(.|\n)+/;

  var out = [];
  var m = null;

  while (input != '') {
    if (m = blanks.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type : 'blanks', match: m });
    }
    else if (m = iniheader.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'header', match: m });
    }
    else if (m = comments.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'comments', match: m });
    }
    else if (m = nameEqualValue.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'nameEqualValue', match: m });
    }
    else if (m = any.exec(input)) {
      out.push({ type: 'error', match: m });
      input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}


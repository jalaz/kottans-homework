var map = {
	"&" : "&amp;",
	"'" : "&#39;",
	"\"" : "&quot;",
	"<" : "&lt;",
	">" : "&gt;"
}

console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(parts, ...vars) {
    return parts.reduce((agr, cur, index) => 
    	agr + cur + (index < vars.length ? escape(vars[index]) : "")
    , "");
}

function escape(html){
	var escapeRegex = new RegExp(Object.keys(map).join('|'), 'g');
	return html.replace(escapeRegex, match => map[match]);
}

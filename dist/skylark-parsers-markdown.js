/**
 * skylark-parsers-markdown - The skylark markdown utility library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,t){var n=t.define,r=t.require,i="function"==typeof n&&n.amd,s=!i&&"undefined"!=typeof exports;if(!i&&!n){var o={};n=t.define=function(e,t,n){"function"==typeof n?(o[e]={factory:n,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var n=t.split("/"),r=e.split("/");n.pop();for(var i=0;i<r.length;i++)"."!=r[i]&&(".."==r[i]?n.pop():n.push(r[i]));return n.join("/")}(t,e)}),resolved:!1,exports:null},r(e)):o[e]={factory:null,resolved:!0,exports:n}},r=t.require=function(e){if(!o.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var n=o[e];if(!n.resolved){var i=[];n.deps.forEach(function(e){i.push(r(e))}),n.exports=n.factory.apply(t,i)||null,n.resolved=!0}return n.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,t){e("skylark-parsers-markdown/markdown",["skylark-langx/skylark"],function(e){return e.attach("markups.markdown",{})}),e("skylark-parsers-markdown/primitives/marked",[],function(){var e={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:a,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:a,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:a,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};function t(t){this.tokens=[],this.tokens.links={},this.options=t||h.defaults,this.rules=e.normal,this.options.gfm&&(this.options.tables?this.rules=e.tables:this.rules=e.gfm)}e.bullet=/(?:[*+-]|\d+\.)/,e.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,e.item=l(e.item,"gm")(/bull/g,e.bullet)(),e.list=l(e.list)(/bull/g,e.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+e.def.source+")")(),e.blockquote=l(e.blockquote)("def",e.def)(),e._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",e.html=l(e.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e._tag)(),e.paragraph=l(e.paragraph)("hr",e.hr)("heading",e.heading)("lheading",e.lheading)("blockquote",e.blockquote)("tag","<"+e._tag)("def",e.def)(),e.normal=u({},e),e.gfm=u({},e.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),e.gfm.paragraph=l(e.paragraph)("(?!","(?!"+e.gfm.fences.source.replace("\\1","\\2")+"|"+e.list.source.replace("\\1","\\3")+"|")(),e.tables=u({},e.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=e,t.lex=function(e,n){var r=new t(n);return r.lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(t,n,r){for(var i,s,o,l,a,u,h,p,c,t=t.replace(/^ +$/gm,"");t;)if((o=this.rules.newline.exec(t))&&(t=t.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(t))t=t.substring(o[0].length),o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?o:o.replace(/\n+$/,"")});else if(o=this.rules.fences.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"code",lang:o[2],text:o[3]});else if(o=this.rules.heading.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if(n&&(o=this.rules.nptable.exec(t))){for(t=t.substring(o[0].length),u={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/\n$/,"").split("\n")},p=0;p<u.align.length;p++)/^ *-+: *$/.test(u.align[p])?u.align[p]="right":/^ *:-+: *$/.test(u.align[p])?u.align[p]="center":/^ *:-+ *$/.test(u.align[p])?u.align[p]="left":u.align[p]=null;for(p=0;p<u.cells.length;p++)u.cells[p]=u.cells[p].split(/ *\| */);this.tokens.push(u)}else if(o=this.rules.lheading.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2]?1:2,text:o[1]});else if(o=this.rules.hr.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,n,!0),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(t)){for(t=t.substring(o[0].length),l=o[2],this.tokens.push({type:"list_start",ordered:l.length>1}),o=o[0].match(this.rules.item),i=!1,c=o.length,p=0;p<c;p++)u=o[p],h=u.length,~(u=u.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(h-=u.length,u=this.options.pedantic?u.replace(/^ {1,4}/gm,""):u.replace(new RegExp("^ {1,"+h+"}","gm"),"")),this.options.smartLists&&p!==c-1&&(a=e.bullet.exec(o[p+1])[0],l===a||l.length>1&&a.length>1||(t=o.slice(p+1).join("\n")+t,p=c-1)),s=i||/\n\n(?!\s*$)/.test(u),p!==c-1&&(i="\n"===u.charAt(u.length-1),s||(s=i)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(u,!1,r),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(t))t=t.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===o[1]||"script"===o[1]||"style"===o[1],text:o[0]});else if(!r&&n&&(o=this.rules.def.exec(t)))t=t.substring(o[0].length),this.tokens.links[o[1].toLowerCase()]={href:o[2],title:o[3]};else if(n&&(o=this.rules.table.exec(t))){for(t=t.substring(o[0].length),u={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/(?: *\| *)?\n$/,"").split("\n")},p=0;p<u.align.length;p++)/^ *-+: *$/.test(u.align[p])?u.align[p]="right":/^ *:-+: *$/.test(u.align[p])?u.align[p]="center":/^ *:-+ *$/.test(u.align[p])?u.align[p]="left":u.align[p]=null;for(p=0;p<u.cells.length;p++)u.cells[p]=u.cells[p].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(u)}else if(n&&(o=this.rules.paragraph.exec(t)))t=t.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(t))t=t.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var n={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:a,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:a,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};function r(e,t){if(this.options=t||h.defaults,this.links=e,this.rules=n.normal,this.renderer=this.options.renderer||new i,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=n.breaks:this.rules=n.gfm:this.options.pedantic&&(this.rules=n.pedantic)}function i(e){this.options=e||{}}function s(e){this.tokens=[],this.token=null,this.options=e||h.defaults,this.options.renderer=this.options.renderer||new i,this.renderer=this.options.renderer,this.renderer.options=this.options}function o(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function l(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=(i=i.source||i).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)}}function a(){}function u(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function h(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null);var i,l,a=(n=u({},h.defaults,n||{})).highlight,p=0;try{i=t.lex(e,n)}catch(e){return r(e)}l=i.length;var c=function(e){if(e)return n.highlight=a,r(e);var t;try{t=s.parse(i,n)}catch(t){e=t}return n.highlight=a,e?r(e):r(null,t)};if(!a||a.length<3)return c();if(delete n.highlight,!l)return c();for(;p<i.length;p++)!function(e){"code"!==e.type?--l||c():a(e.text,e.lang,function(t,n){return t?c(t):null==n||n===e.text?--l||c():(e.text=n,e.escaped=!0,void(--l||c()))})}(i[p])}else try{return n&&(n=u({},h.defaults,n)),s.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||h.defaults).silent)return"<p>An error occured:</p><pre>"+o(e.message+"",!0)+"</pre>";throw e}}return n._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,n._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,n.link=l(n.link)("inside",n._inside)("href",n._href)(),n.reflink=l(n.reflink)("inside",n._inside)(),n.normal=u({},n),n.pedantic=u({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),n.gfm=u({},n.normal,{escape:l(n.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(n.text)("]|","~]|")("|","|https?://|")()}),n.breaks=u({},n.gfm,{br:l(n.br)("{2,}","*")(),text:l(n.gfm.text)("{2,}","*")()}),r.rules=n,r.output=function(e,t,n){var i=new r(t,n);return i.output(e)},r.prototype.output=function(e){for(var t,n,r,i,s="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),s+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=":"===i[1].charAt(6)?this.mangle(i[1].substring(7)):this.mangle(i[1]),r=this.mangle("mailto:")+n):(n=o(i[1]),r=n),s+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),s+=this.options.sanitize?o(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,s+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){s+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,s+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),s+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),s+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),s+=this.renderer.codespan(o(i[2],!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),s+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),s+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),s+=o(this.smartypants(i[0]));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=o(i[1]),r=n,s+=this.renderer.link(r,null,n);return s},r.prototype.outputLink=function(e,t){var n=o(t.href),r=t.title?o(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,o(e[1]))},r.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},r.prototype.mangle=function(e){for(var t,n="",r=e.length,i=0;i<r;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},i.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+o(t,!0)+'">'+(n?e:o(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:o(e,!0))+"\n</code></pre>"},i.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},i.prototype.html=function(e){return e},i.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},i.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},i.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},i.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},i.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},i.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},i.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},i.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},i.prototype.strong=function(e){return"<strong>"+e+"</strong>"},i.prototype.em=function(e){return"<em>"+e+"</em>"},i.prototype.codespan=function(e){return"<code>"+e+"</code>"},i.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},i.prototype.del=function(e){return"<del>"+e+"</del>"},i.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent((i=e,i.replace(/&([#\w]+);/g,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""}))).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0===r.indexOf("javascript:"))return""}var i,s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},i.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},s.parse=function(e,t,n){var r=new s(t,n);return r.parse(e)},s.prototype.parse=function(e){this.inline=new r(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,i="",s="";for(n="",e=0;e<this.token.header.length;e++)({header:!0,align:this.token.align[e]}),n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});s+=this.renderer.tablerow(n)}return this.renderer.table(i,s);case"blockquote_start":for(var s="";"blockquote_end"!==this.next().type;)s+=this.tok();return this.renderer.blockquote(s);case"list_start":for(var s="",o=this.token.ordered;"list_end"!==this.next().type;)s+=this.tok();return this.renderer.list(s,o);case"list_item_start":for(var s="";"list_item_end"!==this.next().type;)s+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(s);case"loose_item_start":for(var s="";"list_item_end"!==this.next().type;)s+=this.tok();return this.renderer.listitem(s);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},a.exec=a,h.options=h.setOptions=function(e){return u(h.defaults,e),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new i,xhtml:!1},h.Parser=s,h.parser=s.parse,h.Renderer=i,h.Lexer=t,h.lexer=t.lex,h.InlineLexer=r,h.inlineLexer=r.output,h.parse=h,h}),e("skylark-parsers-markdown/Parser",["skylark-langx/langx","./markdown","./primitives/marked"],function(e,t,n){var r=n.Parser;return e.mixin(r,n),r}),e("skylark-parsers-markdown/primitives/turndown",[],function(){"use strict";function e(e,t){return Array(t+1).join(e)}var n=["address","article","aside","audio","blockquote","body","canvas","center","dd","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frameset","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","isindex","li","main","menu","nav","noframes","noscript","ol","output","p","pre","section","table","tbody","td","tfoot","th","thead","tr","ul"];function r(e){return-1!==n.indexOf(e.nodeName.toLowerCase())}var i=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];function s(e){return-1!==i.indexOf(e.nodeName.toLowerCase())}var o=i.join();var l={};function a(e){for(var t in this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[],e.rules)this.array.push(e.rules[t])}function u(e,t,n){for(var r=0;r<e.length;r++){var i=e[r];if(h(i,t,n))return i}}function h(e,t,n){var r=e.filter;if("string"==typeof r){if(r===t.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(t.nodeName.toLowerCase())>-1)return!0}else{if("function"!=typeof r)throw new TypeError("`filter` needs to be a string, array, or function");if(r.call(e,t,n))return!0}}function p(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function c(e,t,n){return e&&e.parentNode===t||n(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}l.paragraph={filter:"p",replacement:function(e){return"\n\n"+e+"\n\n"}},l.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+"\n"}},l.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(t,n,r){var i=Number(n.nodeName.charAt(1));if("setext"===r.headingStyle&&i<3){var s=e(1===i?"=":"-",t.length);return"\n\n"+t+"\n"+s+"\n\n"}return"\n\n"+e("#",i)+" "+t+"\n\n"}},l.blockquote={filter:"blockquote",replacement:function(e){return"\n\n"+(e=(e=e.replace(/^\n+|\n+$/g,"")).replace(/^/gm,"> "))+"\n\n"}},l.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;return"LI"===n.nodeName&&n.lastElementChild===t?"\n"+e:"\n\n"+e+"\n\n"}},l.listItem={filter:"li",replacement:function(e,t,n){e=e.replace(/^\n+/,"").replace(/\n+$/,"\n").replace(/\n/gm,"\n    ");var r=n.bulletListMarker+"   ",i=t.parentNode;if("OL"===i.nodeName){var s=i.getAttribute("start"),o=Array.prototype.indexOf.call(i.children,t);r=(s?Number(s)+o:o+1)+".  "}return r+e+(t.nextSibling&&!/\n$/.test(e)?"\n":"")}},l.indentedCodeBlock={filter:function(e,t){return"indented"===t.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,t,n){return"\n\n    "+t.firstChild.textContent.replace(/\n/g,"\n    ")+"\n\n"}},l.fencedCodeBlock={filter:function(e,t){return"fenced"===t.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,t,n){var r=t.firstChild.className||"",i=(r.match(/language-(\S+)/)||[null,""])[1];return"\n\n"+n.fence+i+"\n"+t.firstChild.textContent+"\n"+n.fence+"\n\n"}},l.horizontalRule={filter:"hr",replacement:function(e,t,n){return"\n\n"+n.hr+"\n\n"}},l.inlineLink={filter:function(e,t){return"inlined"===t.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,t){var n=t.getAttribute("href"),r=t.title?' "'+t.title+'"':"";return"["+e+"]("+n+r+")"}},l.referenceLink={filter:function(e,t){return"referenced"===t.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,t,n){var r,i,s=t.getAttribute("href"),o=t.title?' "'+t.title+'"':"";switch(n.linkReferenceStyle){case"collapsed":r="["+e+"][]",i="["+e+"]: "+s+o;break;case"shortcut":r="["+e+"]",i="["+e+"]: "+s+o;break;default:var l=this.references.length+1;r="["+e+"]["+l+"]",i="["+l+"]: "+s+o}return this.references.push(i),r},references:[],append:function(e){var t="";return this.references.length&&(t="\n\n"+this.references.join("\n")+"\n\n",this.references=[]),t}},l.emphasis={filter:["em","i"],replacement:function(e,t,n){return e.trim()?n.emDelimiter+e+n.emDelimiter:""}},l.strong={filter:["strong","b"],replacement:function(e,t,n){return e.trim()?n.strongDelimiter+e+n.strongDelimiter:""}},l.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n="PRE"===e.parentNode.nodeName&&!t;return"CODE"===e.nodeName&&!n},replacement:function(e){if(!e.trim())return"";var t="`",n="",r="",i=e.match(/`+/gm);if(i)for(/^`/.test(e)&&(n=" "),/`$/.test(e)&&(r=" ");-1!==i.indexOf(t);)t+="`";return t+n+e+r+t}},l.image={filter:"img",replacement:function(e,t){var n=t.alt||"",r=t.getAttribute("src")||"",i=t.title||"",s=i?' "'+i+'"':"";return r?"!["+n+"]("+r+s+")":""}},a.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){return e.isBlank?this.blankRule:(t=u(this.array,e,this.options))?t:(t=u(this._keep,e,this.options))?t:(t=u(this._remove,e,this.options))?t:this.defaultRule;var t},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};var f="undefined"!=typeof window?window:{};var d,g,m,k=function(){var e=f.DOMParser,t=!1;try{(new e).parseFromString("","text/html")&&(t=!0)}catch(e){}return t}()?f.DOMParser:(d=function(){},g=t("jsdom").JSDOM,d.prototype.parseFromString=function(e){return new g(e).window.document},d);function y(e){var t;if("string"==typeof e){var n=(m=m||new k).parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=n.getElementById("turndown-root")}else t=e.cloneNode(!0);return function(e){var t=e.element,n=e.isBlock,r=e.isVoid,i=e.isPre||function(e){return"PRE"===e.nodeName};if(!t.firstChild||i(t))return;var s=null,o=!1,l=null,a=c(l,t,i);for(;a!==t;){if(3===a.nodeType||4===a.nodeType){var u=a.data.replace(/[ \r\n\t]+/g," ");if(s&&!/ $/.test(s.data)||o||" "!==u[0]||(u=u.substr(1)),!u){a=p(a);continue}a.data=u,s=a}else{if(1!==a.nodeType){a=p(a);continue}n(a)||"BR"===a.nodeName?(s&&(s.data=s.data.replace(/ $/,"")),s=null,o=!1):r(a)&&(s=null,o=!0)}var h=c(l,a,i);l=a,a=h}s&&(s.data=s.data.replace(/ $/,""),s.data||p(s))}({element:t,isBlock:r,isVoid:s}),t}function b(e){return e.isBlock=r(e),e.isCode="code"===e.nodeName.toLowerCase()||e.parentNode.isCode,e.isBlank=function(e){return-1===["A","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"].indexOf(e.nodeName)&&/^\s*$/i.test(e.textContent)&&!s(e)&&!function(e){return e.querySelector&&e.querySelector(o)}(e)}(e),e.flankingWhitespace=function(e){var t="",n="";if(!e.isBlock){var r=/^[ \r\n\t]/.test(e.textContent),i=/[ \r\n\t]$/.test(e.textContent);r&&!x("left",e)&&(t=" "),i&&!x("right",e)&&(n=" ")}return{leading:t,trailing:n}}(e),e}function x(e,t){var n,i,s;return"left"===e?(n=t.previousSibling,i=/ $/):(n=t.nextSibling,i=/^ /),n&&(3===n.nodeType?s=i.test(n.nodeValue):1!==n.nodeType||r(n)||(s=i.test(n.textContent))),s}var v=Array.prototype.reduce,w=/^\n*/,_=/\n*$/,S=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function $(e){if(!(this instanceof $))return new $(e);var t={rules:l,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",blankReplacement:function(e,t){return t.isBlock?"\n\n":""},keepReplacement:function(e,t){return t.isBlock?"\n\n"+t.outerHTML+"\n\n":t.outerHTML},defaultReplacement:function(e,t){return t.isBlock?"\n\n"+e+"\n\n":e}};this.options=function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}({},t,e),this.rules=new a(this.options)}function C(e){var t=this;return v.call(e.childNodes,function(e,n){var r="";return 3===(n=new b(n)).nodeType?r=n.isCode?n.nodeValue:t.escape(n.nodeValue):1===n.nodeType&&(r=function(e){var t=this.rules.forNode(e),n=C.call(this,e),r=e.flankingWhitespace;(r.leading||r.trailing)&&(n=n.trim());return r.leading+t.replacement(n,e,this.options)+r.trailing}.call(t,n)),L(e,r)},"")}function L(e,t){var n,r,i,s=(n=t,r=[e.match(_)[0],n.match(w)[0]].sort(),(i=r[r.length-1]).length<2?i:"\n\n");return e=e.replace(_,""),t=t.replace(w,""),e+s+t}return $.prototype={turndown:function(e){if(!function(e){return null!=e&&("string"==typeof e||e.nodeType&&(1===e.nodeType||9===e.nodeType||11===e.nodeType))}(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(""===e)return"";var t=C.call(this,new y(e));return function(e){var t=this;return this.rules.forEach(function(n){"function"==typeof n.append&&(e=L(e,n.append(t.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else{if("function"!=typeof e)throw new TypeError("plugin must be a Function or an Array of Functions");e(this)}return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return S.reduce(function(e,t){return e.replace(t[0],t[1])},e)}},$}),e("skylark-parsers-markdown/Turndown",["skylark-langx/langx","./markdown","./primitives/turndown"],function(e,t,n){return t.Turndown=n}),e("skylark-parsers-markdown/main",["./markdown","./Parser","./Turndown"],function(e){return e}),e("skylark-parsers-markdown",["skylark-parsers-markdown/main"],function(e){return e})}(n,r),!i){var l=r("skylark-langx/skylark");s?module.exports=l:t.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-parsers-markdown.js.map

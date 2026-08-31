import{m as Qt}from"./chunk-RCXAM2GK-BdYNcUiQ.js";import{y as te}from"./chunk-VTHDQ7BV-DJ4z8bNZ.js";import{m as p,p as b,a as B,n as ee,q as se,i as ie,t as re,o as ae,r as ne,g as oe,s as le,ao as ce,h as K,Q as he,b as Et,ak as de}from"./mermaid.esm.min-BIbZdgiH.js";import{T as ue}from"./chunk-EICP7K5X-CmBfbcF0.js";var Ct=(function(){var t=p(function(P,o,n,g){for(n=n||{},g=P.length;g--;n[P[g]]=o);return n},"o"),e=[1,2],s=[1,3],a=[1,4],r=[2,4],l=[1,9],c=[1,11],u=[1,16],y=[1,17],S=[1,18],m=[1,19],E=[1,33],D=[1,20],N=[1,21],R=[1,22],v=[1,23],I=[1,24],d=[1,26],L=[1,27],w=[1,28],$=[1,29],G=[1,30],F=[1,31],M=[1,32],it=[1,35],rt=[1,36],at=[1,37],nt=[1,38],H=[1,34],f=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ot=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],Lt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],mt={trace:p(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:p(function(P,o,n,g,T,i,k){var h=i.length-1;switch(T){case 3:return g.setRootDoc(i[h]),i[h];case 4:this.$=[];break;case 5:i[h]!="nl"&&(i[h-1].push(i[h]),this.$=i[h-1]);break;case 6:case 7:this.$=i[h];break;case 8:this.$="nl";break;case 12:this.$=i[h];break;case 13:let ht=i[h-1];ht.description=g.trimColon(i[h]),this.$=ht;break;case 14:this.$={stmt:"relation",state1:i[h-2],state2:i[h]};break;case 15:let dt=g.trimColon(i[h]);this.$={stmt:"relation",state1:i[h-3],state2:i[h-1],description:dt};break;case 19:this.$={stmt:"state",id:i[h-3],type:"default",description:"",doc:i[h-1]};break;case 20:var Y=i[h],V=i[h-2].trim();if(i[h].match(":")){var ct=i[h].split(":");Y=ct[0],V=[V,ct[1]]}this.$={stmt:"state",id:Y,type:"default",description:V};break;case 21:this.$={stmt:"state",id:i[h-3],type:"default",description:i[h-5],doc:i[h-1]};break;case 22:this.$={stmt:"state",id:i[h],type:"fork"};break;case 23:this.$={stmt:"state",id:i[h],type:"join"};break;case 24:this.$={stmt:"state",id:i[h],type:"choice"};break;case 25:this.$={stmt:"state",id:g.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[h-1].trim(),note:{position:i[h-2].trim(),text:i[h].trim()}};break;case 29:this.$=i[h].trim(),g.setAccTitle(this.$);break;case 30:case 31:this.$=i[h].trim(),g.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[h-3],url:i[h-2],tooltip:i[h-1]};break;case 33:this.$={stmt:"click",id:i[h-3],url:i[h-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[h-1].trim(),classes:i[h].trim()};break;case 36:this.$={stmt:"style",id:i[h-1].trim(),styleClass:i[h].trim()};break;case 37:this.$={stmt:"applyClass",id:i[h-1].trim(),styleClass:i[h].trim()};break;case 38:g.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:g.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:g.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:g.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[h].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[h-2].trim(),classes:[i[h].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[h-2].trim(),classes:[i[h].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:s,6:a},{1:[3]},{3:5,4:e,5:s,6:a},{3:6,4:e,5:s,6:a},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:l,5:c,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:y,19:S,22:m,24:E,25:D,26:N,27:R,28:v,29:I,32:25,33:d,35:L,37:w,38:$,41:G,45:F,48:M,51:it,52:rt,53:at,54:nt,57:H},t(f,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:u,17:y,19:S,22:m,24:E,25:D,26:N,27:R,28:v,29:I,32:25,33:d,35:L,37:w,38:$,41:G,45:F,48:M,51:it,52:rt,53:at,54:nt,57:H},t(f,[2,7]),t(f,[2,8]),t(f,[2,9]),t(f,[2,10]),t(f,[2,11]),t(f,[2,12],{14:[1,40],15:[1,41]}),t(f,[2,16]),{18:[1,42]},t(f,[2,18],{20:[1,43]}),{23:[1,44]},t(f,[2,22]),t(f,[2,23]),t(f,[2,24]),t(f,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(f,[2,28]),{34:[1,49]},{36:[1,50]},t(f,[2,31]),{13:51,24:E,57:H},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(ot,[2,44],{58:[1,56]}),t(ot,[2,45],{58:[1,57]}),t(f,[2,38]),t(f,[2,39]),t(f,[2,40]),t(f,[2,41]),t(f,[2,6]),t(f,[2,13]),{13:58,24:E,57:H},t(f,[2,17]),t(Lt,r,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(f,[2,29]),t(f,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(f,[2,14],{14:[1,71]}),{4:l,5:c,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:y,19:S,21:[1,72],22:m,24:E,25:D,26:N,27:R,28:v,29:I,32:25,33:d,35:L,37:w,38:$,41:G,45:F,48:M,51:it,52:rt,53:at,54:nt,57:H},t(f,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(f,[2,34]),t(f,[2,35]),t(f,[2,36]),t(f,[2,37]),t(ot,[2,46]),t(ot,[2,47]),t(f,[2,15]),t(f,[2,19]),t(Lt,r,{7:78}),t(f,[2,26]),t(f,[2,27]),{5:[1,79]},{5:[1,80]},{4:l,5:c,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:y,19:S,21:[1,81],22:m,24:E,25:D,26:N,27:R,28:v,29:I,32:25,33:d,35:L,37:w,38:$,41:G,45:F,48:M,51:it,52:rt,53:at,54:nt,57:H},t(f,[2,32]),t(f,[2,33]),t(f,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:p(function(P,o){if(o.recoverable)this.trace(P);else{var n=new Error(P);throw n.hash=o,n}},"parseError"),parse:p(function(P){var o=this,n=[0],g=[],T=[null],i=[],k=this.table,h="",Y=0,V=0,ct=0,ht=2,dt=1,Jt=i.slice.call(arguments,1),_=Object.create(this.lexer),W={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(W.yy[St]=this.yy[St]);_.setInput(P,W.yy),W.yy.lexer=_,W.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Tt=_.yylloc;i.push(Tt);var qt=_.options&&_.options.ranges;typeof W.yy.parseError=="function"?this.parseError=W.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Zt(A){n.length=n.length-2*A,T.length=T.length-A,i.length=i.length-A}p(Zt,"popStack");function At(){var A;return A=g.pop()||_.lex()||dt,typeof A!="number"&&(A instanceof Array&&(g=A,A=g.pop()),A=o.symbols_[A]||A),A}p(At,"lex");for(var C,bt,U,O,Be,kt,J={},ut,j,It,pt;;){if(U=n[n.length-1],this.defaultActions[U]?O=this.defaultActions[U]:((C===null||typeof C>"u")&&(C=At()),O=k[U]&&k[U][C]),typeof O>"u"||!O.length||!O[0]){var _t="";pt=[];for(ut in k[U])this.terminals_[ut]&&ut>ht&&pt.push("'"+this.terminals_[ut]+"'");_.showPosition?_t="Parse error on line "+(Y+1)+`:
`+_.showPosition()+`
Expecting `+pt.join(", ")+", got '"+(this.terminals_[C]||C)+"'":_t="Parse error on line "+(Y+1)+": Unexpected "+(C==dt?"end of input":"'"+(this.terminals_[C]||C)+"'"),this.parseError(_t,{text:_.match,token:this.terminals_[C]||C,line:_.yylineno,loc:Tt,expected:pt})}if(O[0]instanceof Array&&O.length>1)throw new Error("Parse Error: multiple actions possible at state: "+U+", token: "+C);switch(O[0]){case 1:n.push(C),T.push(_.yytext),i.push(_.yylloc),n.push(O[1]),C=null,bt?(C=bt,bt=null):(V=_.yyleng,h=_.yytext,Y=_.yylineno,Tt=_.yylloc,ct>0);break;case 2:if(j=this.productions_[O[1]][1],J.$=T[T.length-j],J._$={first_line:i[i.length-(j||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(j||1)].first_column,last_column:i[i.length-1].last_column},qt&&(J._$.range=[i[i.length-(j||1)].range[0],i[i.length-1].range[1]]),kt=this.performAction.apply(J,[h,V,Y,W.yy,O[1],T,i].concat(Jt)),typeof kt<"u")return kt;j&&(n=n.slice(0,-1*j*2),T=T.slice(0,-1*j),i=i.slice(0,-1*j)),n.push(this.productions_[O[1]][0]),T.push(J.$),i.push(J._$),It=k[n[n.length-2]][n[n.length-1]],n.push(It);break;case 3:return!0}}return!0},"parse")},Vt=(function(){var P={EOF:1,parseError:p(function(o,n){if(this.yy.parser)this.yy.parser.parseError(o,n);else throw new Error(o)},"parseError"),setInput:p(function(o,n){return this.yy=n||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:p(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var n=o.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:p(function(o){var n=o.length,g=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var T=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),g.length-1&&(this.yylineno-=g.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:g?(g.length===T.length?this.yylloc.first_column:0)+T[T.length-g.length].length-g[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},"unput"),more:p(function(){return this._more=!0,this},"more"),reject:p(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:p(function(o){this.unput(this.match.slice(o))},"less"),pastInput:p(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:p(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:p(function(){var o=this.pastInput(),n=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+n+"^"},"showPosition"),test_match:p(function(o,n){var g,T,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),T=o[0].match(/(?:\r\n?|\n).*/g),T&&(this.yylineno+=T.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:T?T[T.length-1].length-T[T.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],g=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),g)return g;if(this._backtrack){for(var k in i)this[k]=i[k];return!1}return!1},"test_match"),next:p(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,n,g,T;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),k=0;k<i.length;k++)if(g=this._input.match(this.rules[i[k]]),g&&(!n||g[0].length>n[0].length)){if(n=g,T=k,this.options.backtrack_lexer){if(o=this.test_match(g,i[k]),o!==!1)return o;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(o=this.test_match(n,i[T]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:p(function(){var o=this.next();return o||this.lex()},"lex"),begin:p(function(o){this.conditionStack.push(o)},"begin"),popState:p(function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:p(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:p(function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},"topState"),pushState:p(function(o){this.begin(o)},"pushState"),stateStackSize:p(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:p(function(o,n,g,T){function i(){let k=n.yytext.indexOf("%%");if(k===0)return!1;if(k>0){let h=n.yytext.slice(0,k),Y=n.yytext.slice(k);Y&&o.lexer.unput(Y),n.yytext=h}return!0}switch(p(i,"processId"),g){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;case 17:return this.popState(),"acc_title_value";case 18:return this.begin("acc_descr"),35;case 19:return this.popState(),"acc_descr_value";case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 25:return this.popState(),this.pushState("CLASSDEFID"),42;case 26:return this.popState(),43;case 27:return this.pushState("CLASS"),48;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;case 29:return this.popState(),50;case 30:return this.pushState("STYLE"),45;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 32:return this.popState(),47;case 33:return this.pushState("SCALE"),17;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;case 39:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;case 40:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 41:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;case 42:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";case 49:return i()?(this.popState(),"ID"):void 0;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:throw new Error('Error: State name must be a single word. Found: "'+n.yytext.trim()+'"');case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;case 56:return this.popState(),21;case 57:break;case 58:return this.begin("NOTE"),29;case 59:return this.popState(),this.pushState("NOTE_ID"),59;case 60:return this.popState(),this.pushState("NOTE_ID"),60;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 63:break;case 64:return"NOTE_TEXT";case 65:return i()?(this.popState(),"ID"):void 0;case 66:return i()?(this.popState(),this.pushState("NOTE_TEXT"),24):void 0;case 67:return this.popState(),n.yytext=n.yytext.substr(2).trim(),31;case 68:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),31;case 69:return 6;case 70:return 6;case 71:return 16;case 72:return 57;case 73:return i()?24:void 0;case 74:return n.yytext=n.yytext.trim(),14;case 75:return 15;case 76:return 28;case 77:return 58;case 78:return 5;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}};return P})();mt.lexer=Vt;function lt(){this.yy={}}return p(lt,"Parser"),lt.prototype=mt,mt.Parser=lt,new lt})();Ct.parser=Ct;var Me=Ct,Z="state",q="root",xt="relation",pe="classDef",ye="style",fe="applyClass",et="default",Pt="divider",Yt="fill:none",Gt="fill: #333",jt="markdown",Mt="normal",$t="rect",Dt="rectWithTitle",ge="stateStart",me="stateEnd",wt="divider",Ot="roundedWithTitle",Se="note",Te="noteGroup",st="statediagram",be="state",ke=`${st}-${be}`,zt="transition",_e="note",Ee="note-edge",$e=`${zt} ${Ee}`,De=`${st}-${_e}`,Ce="cluster",xe=`${st}-${Ce}`,ve="cluster-alt",Le=`${st}-${ve}`,Wt="parent",Ut="note",Ae="state",vt="----",Ie=`${vt}${Ut}`,Nt=`${vt}${Wt}`,Kt=p((t,e="TB")=>{if(!t.doc)return e;let s=e;for(let a of t.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir"),we=p(function(t,e){return e.db.getClasses()},"getClasses"),Oe=p(async function(t,e,s,a){b.info("REF0:"),b.info("Drawing state diagram (v2)",e);let{securityLevel:r,state:l,layout:c}=B();a.db.extract(a.db.getRootDocV2());let u=a.db.getData(),y=Qt(e,r);u.type=a.type,u.layoutAlgorithm=c,u.nodeSpacing=(l==null?void 0:l.nodeSpacing)||50,u.rankSpacing=(l==null?void 0:l.rankSpacing)||50,B().look==="neo"?u.markers=["barbNeo"]:u.markers=["barb"],u.diagramId=e,await ee(u,y);let S=8;try{(typeof a.db.getLinks=="function"?a.db.getLinks():new Map).forEach((m,E)=>{var w;let D=typeof E=="string"?E:typeof(E==null?void 0:E.id)=="string"?E.id:"",N=u.nodes.find($=>$.id===D);if(!D){b.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(E));return}let R=(w=y.node())==null?void 0:w.querySelectorAll("g.node, g.rough-node"),v;if(R==null||R.forEach($=>{var F;let G=(F=$.textContent)==null?void 0:F.trim();($.id===(N==null?void 0:N.domId)||G===D)&&(v=$)}),!v){b.warn("⚠️ Could not find node matching text:",D);return}let I=v.parentNode;if(!I){b.warn("⚠️ Node has no parent, cannot wrap:",D);return}let d=document.createElementNS("http://www.w3.org/2000/svg","a"),L=m.url.replace(/^"+|"+$/g,"");if(d.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",L),d.setAttribute("target","_blank"),m.tooltip){let $=m.tooltip.replace(/^"+|"+$/g,"");d.setAttribute("title",$),v.setAttribute("title",$)}I.replaceChild(d,v),d.appendChild(v),b.info("🔗 Wrapped node in <a> tag for:",D,m.url)})}catch(m){b.error("❌ Error injecting clickable links:",m)}se.insertTitle(y,"statediagramTitleText",(l==null?void 0:l.titleTopMargin)??25,a.db.getDiagramTitle()),te(y,S,st,(l==null?void 0:l.useMaxWidth)??!0)},"draw"),ze={getClasses:we,draw:Oe,getDir:Kt},ft=new Map,z=0;function gt(t="",e=0,s="",a=vt){let r=s!==null&&s.length>0?`${a}${s}`:"";return`${Ae}-${t}${r}-${e}`}p(gt,"stateDomId");var Ne=p((t,e,s,a,r,l,c,u)=>{b.trace("items",e),e.forEach(y=>{switch(y.stmt){case Z:tt(t,y,s,a,r,l,c,u);break;case et:tt(t,y,s,a,r,l,c,u);break;case xt:{tt(t,y.state1,s,a,r,l,c,u),tt(t,y.state2,s,a,r,l,c,u);let S=c==="neo",m={id:"edge"+z,start:y.state1.id,end:y.state2.id,arrowhead:"normal",arrowTypeEnd:S?"arrow_barb_neo":"arrow_barb",style:Yt,labelStyle:"",label:K.sanitizeText(y.description??"",B()),arrowheadStyle:Gt,labelpos:"c",labelType:jt,thickness:Mt,classes:zt,look:c};r.push(m),z++}break}})},"setupDoc"),Rt=p((t,e="TB")=>{let s=e;if(t.doc)for(let a of t.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir");function Q(t,e,s){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(r=>{let l=s.get(r);l&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...l.styles])}));let a=t.find(r=>r.id===e.id);a?Object.assign(a,e):t.push(e)}p(Q,"insertOrUpdateNode");function Xt(t){var e;return((e=t==null?void 0:t.classes)==null?void 0:e.join(" "))??""}p(Xt,"getClassesFromDbInfo");function Ht(t){return(t==null?void 0:t.styles)??[]}p(Ht,"getStylesFromDbInfo");var tt=p((t,e,s,a,r,l,c,u)=>{var N,R,v;let y=e.id,S=s.get(y),m=Xt(S),E=Ht(S),D=B();if(b.info("dataFetcher parsedItem",e,S,E),y!=="root"){let I=$t;e.start===!0?I=ge:e.start===!1&&(I=me),e.type!==et&&(I=e.type),ft.get(y)||ft.set(y,{id:y,shape:I,description:K.sanitizeText(y,D),cssClasses:`${m} ${ke}`,cssStyles:E});let d=ft.get(y);e.description&&(Array.isArray(d.description)?(d.shape=Dt,d.description.push(e.description)):(N=d.description)!=null&&N.length&&d.description.length>0?(d.shape=Dt,d.description===y?d.description=[e.description]:d.description=[d.description,e.description]):(d.shape=$t,d.description=e.description),d.description=K.sanitizeTextOrArray(d.description,D)),((R=d.description)==null?void 0:R.length)===1&&d.shape===Dt&&(d.type==="group"?d.shape=Ot:d.shape=$t),!d.type&&e.doc&&(b.info("Setting cluster for XCX",y,Rt(e)),d.type="group",d.isGroup=!0,d.dir=Rt(e),d.shape=e.type===Pt?wt:Ot,d.cssClasses=`${d.cssClasses} ${xe} ${l?Le:""}`);let L={labelStyle:"",shape:d.shape,label:d.description,cssClasses:d.cssClasses,cssCompiledStyles:[],cssStyles:d.cssStyles,id:y,dir:d.dir,domId:gt(y,z),type:d.type,isGroup:d.type==="group",padding:8,rx:10,ry:10,look:c,labelType:"markdown"};if(L.shape===wt&&(L.label=""),t&&t.id!=="root"&&(b.trace("Setting node ",y," to be child of its parent ",t.id),L.parentId=t.id),L.centerLabel=!0,e.note){let w={labelStyle:"",shape:Se,label:e.note.text,labelType:"markdown",cssClasses:De,cssStyles:[],cssCompiledStyles:[],id:y+Ie+"-"+z,domId:gt(y,z,Ut),type:d.type,isGroup:d.type==="group",padding:(v=D.flowchart)==null?void 0:v.padding,look:c,position:e.note.position},$=y+Nt,G={labelStyle:"",shape:Te,label:e.note.text,cssClasses:d.cssClasses,cssStyles:[],id:y+Nt,domId:gt(y,z,Wt),type:"group",isGroup:!0,padding:16,look:c,position:e.note.position};z++,G.id=$,w.parentId=$,Q(a,G,u),Q(a,w,u),Q(a,L,u);let F=y,M=w.id;e.note.position==="left of"&&(F=w.id,M=y),r.push({id:F+"-"+M,start:F,end:M,arrowhead:"none",arrowTypeEnd:"",style:Yt,labelStyle:"",classes:$e,arrowheadStyle:Gt,labelpos:"c",labelType:jt,thickness:Mt,look:c})}else Q(a,L,u)}e.doc&&(b.trace("Adding nodes children "),Ne(e,e.doc,s,a,r,!l,c,u))},"dataFetcher"),Re=p(()=>{ft.clear(),z=0},"reset"),x={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Ft=p(()=>new Map,"newClassesList"),Bt=p(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),yt=p(t=>JSON.parse(JSON.stringify(t)),"clone"),X,We=(X=class{constructor(e){this.version=e,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Ft(),this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=ie,this.setAccTitle=re,this.getAccDescription=ae,this.setAccDescription=ne,this.setDiagramTitle=oe,this.getDiagramTitle=le,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}extract(e){this.clear(!0);for(let r of Array.isArray(e)?e:e.doc)switch(r.stmt){case Z:this.addState(r.id.trim(),r.type,r.doc,r.description,r.note);break;case xt:this.addRelation(r.state1,r.state2,r.description);break;case pe:this.addStyleClass(r.id.trim(),r.classes);break;case ye:this.handleStyleDef(r);break;case fe:this.setCssClass(r.id.trim(),r.styleClass);break;case"click":this.addLink(r.id,r.url,r.tooltip);break}let s=this.getStates(),a=B();Re(),tt(void 0,this.getRootDocV2(),s,this.nodes,this.edges,!0,a.look,this.classes);for(let r of this.nodes)if(Array.isArray(r.label)){if(r.description=r.label.slice(1),r.isGroup&&r.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${r.id}]`);r.label=r.label[0]}}handleStyleDef(e){let s=e.id.trim().split(","),a=e.styleClass.split(",");for(let r of s){let l=this.getState(r);if(!l){let c=r.trim();this.addState(c),l=this.getState(c)}l&&(l.styles=a.map(c=>{var u;return(u=c.replace(/;/g,""))==null?void 0:u.trim()}))}}setRootDoc(e){b.info("Setting root doc",e),this.rootDoc=e,this.version===1?this.extract(e):this.extract(this.getRootDocV2())}docTranslator(e,s,a){if(s.stmt===xt){this.docTranslator(e,s.state1,!0),this.docTranslator(e,s.state2,!1);return}if(s.stmt===Z&&(s.id===x.START_NODE?(s.id=e.id+(a?"_start":"_end"),s.start=a):s.id=s.id.trim()),s.stmt!==q&&s.stmt!==Z||!s.doc)return;let r=[],l=[];for(let c of s.doc)if(c.type===Pt){let u=yt(c);u.doc=yt(l),r.push(u),l=[]}else l.push(c);if(r.length>0&&l.length>0){let c={stmt:Z,id:ce(),type:"divider",doc:yt(l)};r.push(yt(c)),s.doc=r}s.doc.forEach(c=>this.docTranslator(s,c,!0))}getRootDocV2(){return this.docTranslator({id:q,stmt:q},{id:q,stmt:q,doc:this.rootDoc},!0),{id:q,doc:this.rootDoc}}addState(e,s=et,a=void 0,r=void 0,l=void 0,c=void 0,u=void 0,y=void 0){let S=e==null?void 0:e.trim();if(!this.currentDocument.states.has(S))b.info("Adding state ",S,r),this.currentDocument.states.set(S,{stmt:Z,id:S,descriptions:[],type:s,doc:a,note:l,classes:[],styles:[],textStyles:[]});else{let m=this.currentDocument.states.get(S);if(!m)throw new Error(`State not found: ${S}`);m.doc||(m.doc=a),m.type||(m.type=s)}if(r&&(b.info("Setting state description",S,r),(Array.isArray(r)?r:[r]).forEach(m=>this.addDescription(S,m.trim()))),l){let m=this.currentDocument.states.get(S);if(!m)throw new Error(`State not found: ${S}`);m.note=l,m.note.text=K.sanitizeText(m.note.text,B())}c&&(b.info("Setting state classes",S,c),(Array.isArray(c)?c:[c]).forEach(m=>this.setCssClass(S,m.trim()))),u&&(b.info("Setting state styles",S,u),(Array.isArray(u)?u:[u]).forEach(m=>this.setStyle(S,m.trim()))),y&&(b.info("Setting state styles",S,u),(Array.isArray(y)?y:[y]).forEach(m=>this.setTextStyle(S,m.trim())))}clear(e){this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Ft(),e||(this.links=new Map,he())}getState(e){return this.currentDocument.states.get(e)}getStates(){return this.currentDocument.states}logDocuments(){b.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(e,s,a){this.links.set(e,{url:s,tooltip:a}),b.warn("Adding link",e,s,a)}getLinks(){return this.links}startIdIfNeeded(e=""){return e===x.START_NODE?(this.startEndCount++,`${x.START_TYPE}${this.startEndCount}`):e}startTypeIfNeeded(e="",s=et){return e===x.START_NODE?x.START_TYPE:s}endIdIfNeeded(e=""){return e===x.END_NODE?(this.startEndCount++,`${x.END_TYPE}${this.startEndCount}`):e}endTypeIfNeeded(e="",s=et){return e===x.END_NODE?x.END_TYPE:s}addRelationObjs(e,s,a=""){let r=this.startIdIfNeeded(e.id.trim()),l=this.startTypeIfNeeded(e.id.trim(),e.type),c=this.startIdIfNeeded(s.id.trim()),u=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(r,l,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.addState(c,u,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:r,id2:c,relationTitle:K.sanitizeText(a,B())})}addRelation(e,s,a){if(typeof e=="object"&&typeof s=="object")this.addRelationObjs(e,s,a);else if(typeof e=="string"&&typeof s=="string"){let r=this.startIdIfNeeded(e.trim()),l=this.startTypeIfNeeded(e),c=this.endIdIfNeeded(s.trim()),u=this.endTypeIfNeeded(s);this.addState(r,l),this.addState(c,u),this.currentDocument.relations.push({id1:r,id2:c,relationTitle:a?K.sanitizeText(a,B()):void 0})}}addDescription(e,s){var l;let a=this.currentDocument.states.get(e),r=s.startsWith(":")?s.replace(":","").trim():s;(l=a==null?void 0:a.descriptions)==null||l.push(K.sanitizeText(r,B()))}cleanupLabel(e){return e.startsWith(":")?e.slice(2).trim():e.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(e,s=""){this.classes.has(e)||this.classes.set(e,{id:e,styles:[],textStyles:[]});let a=this.classes.get(e);s&&a&&s.split(x.STYLECLASS_SEP).forEach(r=>{let l=r.replace(/([^;]*);/,"$1").trim();if(RegExp(x.COLOR_KEYWORD).exec(r)){let c=l.replace(x.FILL_KEYWORD,x.BG_FILL).replace(x.COLOR_KEYWORD,x.FILL_KEYWORD);a.textStyles.push(c)}a.styles.push(l)})}getClasses(){return this.classes}setupToolTips(e){let s=ue();Et(e).select("svg").selectAll("g.node, g.rough-node").on("mouseover",a=>{var u;let r=Et(a.currentTarget),l=r.attr("title");if(l===null)return;let c=(u=a.currentTarget)==null?void 0:u.getBoundingClientRect();s.transition().duration(200).style("opacity",".9"),s.style("left",window.scrollX+c.left+(c.right-c.left)/2+"px").style("top",window.scrollY+c.bottom+"px"),s.html(de.sanitize(l)),r.classed("hover",!0)}).on("mouseout",a=>{s.transition().duration(500).style("opacity",0),Et(a.currentTarget).classed("hover",!1)})}setCssClass(e,s){e.split(",").forEach(a=>{var l;let r=this.getState(a);if(!r){let c=a.trim();this.addState(c),r=this.getState(c)}(l=r==null?void 0:r.classes)==null||l.push(s)})}setStyle(e,s){var a,r;(r=(a=this.getState(e))==null?void 0:a.styles)==null||r.push(s)}setTextStyle(e,s){var a,r;(r=(a=this.getState(e))==null?void 0:a.textStyles)==null||r.push(s)}bindFunctions(e){this.funs.forEach(s=>{s(e)})}getDirectionStatement(){return this.rootDoc.find(e=>e.stmt==="dir")}getDirection(){var e;return((e=this.getDirectionStatement())==null?void 0:e.value)??"TB"}setDirection(e){let s=this.getDirectionStatement();s?s.value=e:this.rootDoc.unshift({stmt:"dir",value:e})}trimColon(e){return e.startsWith(":")?e.slice(1).trim():e.trim()}getData(){let e=B();return{nodes:this.nodes,edges:this.edges,other:{},config:e,direction:Kt(this.getRootDocV2())}}getConfig(){return B().state}},p(X,"StateDB"),X.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},X),Fe=p(t=>`
defs [id$="-barbEnd"] {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: ${t.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: ${t.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${t.mainBkg};
  stroke: ${t.useGradient?"url("+t.svgId+"-gradient)":t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${t.radius}px;
  ry: ${t.radius}px;
  filter: ${t.dropShadow?t.dropShadow.replace("url(#drop-shadow)",`url(${t.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),Ue=Fe;export{We as D,Me as U,Ue as b,ze as t};

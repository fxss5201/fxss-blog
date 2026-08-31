import{c as E}from"./chunk-JQRUD6KW-lFX8xNOC.js";import{l as F}from"./cynefin-OW5HDTMX-6OCTWOGG-CbV4cORr.js";import{r as z,o as R,s as D,g as P,i as B,t as W,m as c,a3 as G,Q as V,L as w,K as b,w as Z,p as C,a8 as K,Z as Q}from"./mermaid.esm.min-BIbZdgiH.js";import"./app-Cc9vNRsi.js";var m={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},y=32,L={axes:[],curves:[],options:m},x=structuredClone(L),_=Z.radar,j=c(()=>w({..._,...b().radar}),"getConfig"),M=c(()=>x.axes,"getAxes"),H=c(()=>x.curves,"getCurves"),U=c(()=>x.options,"getOptions"),q=c(a=>{x.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=c(a=>{x.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:N(t.entries)}))},"setCurves"),N=c(a=>{if(a[0].axis==null)return a.map(e=>e.value);let t=M();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{let r=a.find(i=>{var s;return((s=i.axis)==null?void 0:s.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),X=c(a=>{var e,r,i,s,o;let t=a.reduce((l,n)=>(l[n.name]=n,l),{});x.options={showLegend:((e=t.showLegend)==null?void 0:e.value)??m.showLegend,ticks:((r=t.ticks)==null?void 0:r.value)??m.ticks,max:((i=t.max)==null?void 0:i.value)??m.max,min:((s=t.min)==null?void 0:s.value)??m.min,graticule:((o=t.graticule)==null?void 0:o.value)??m.graticule},x.options.ticks>y&&(C.warn(`Radar diagram ticks (${x.options.ticks}) exceeds maximum allowed (${y}). Using ${y} instead.`),x.options.ticks=y)},"setOptions"),Y=c(()=>{V(),x=structuredClone(L)},"clear"),f={getAxes:M,getCurves:H,getOptions:U,setAxes:q,setCurves:J,setOptions:X,getConfig:j,clear:Y,setAccTitle:W,getAccTitle:B,setDiagramTitle:P,getDiagramTitle:D,getAccDescription:R,setAccDescription:z},tt=c(a=>{E(a,f);let{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),et={parse:c(async a=>{let t=await F("radar",a);C.debug(t),tt(t)},"parse")},at=c((a,t,e,r)=>{let i=r.db,s=i.getAxes(),o=i.getCurves(),l=i.getOptions(),n=i.getConfig(),d=i.getDiagramTitle(),p=G(t),g=rt(p,n),u=l.max??Math.max(...o.map(v=>Math.max(...v.entries))),h=l.min,$=Math.min(n.width,n.height)/2;it(g,s,$,l.ticks,l.graticule),st(g,s,$,n),k(g,s,o,h,u,l.graticule,n),O(g,o,l.showLegend,n),g.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-n.height/2-n.marginTop)},"draw"),rt=c((a,t)=>{let e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return Q(a,r,e,t.useMaxWidth??!0),a.attr("viewBox",`0 0 ${e} ${r}`).attr("overflow","visible"),a.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),it=c((a,t,e,r,i)=>{if(i==="circle")for(let s=0;s<r;s++){let o=e*(s+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(i==="polygon"){let s=t.length;for(let o=0;o<r;o++){let l=e*(o+1)/r,n=t.map((d,p)=>{let g=2*p*Math.PI/s-Math.PI/2,u=l*Math.cos(g),h=l*Math.sin(g);return`${u},${h}`}).join(" ");a.append("polygon").attr("points",n).attr("class","radarGraticule")}}},"drawGraticule"),st=c((a,t,e,r)=>{let i=t.length;for(let s=0;s<i;s++){let o=t[s].label,l=2*s*Math.PI/i-Math.PI/2,n=Math.cos(l),d=Math.sin(l);a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*n).attr("y2",e*r.axisScaleFactor*d).attr("class","radarAxisLine");let p=n>.01?"start":n<-.01?"end":"middle",g=d>.01?"hanging":d<-.01?"auto":"central",u=4;a.append("text").text(o).attr("x",e*r.axisLabelFactor*n+u*n).attr("y",e*r.axisLabelFactor*d+u*d).attr("text-anchor",p).attr("dominant-baseline",g).attr("class","radarAxisLabel")}},"drawAxes");function k(a,t,e,r,i,s,o){let l=t.length,n=Math.min(o.width,o.height)/2;e.forEach((d,p)=>{if(d.entries.length!==l)return;let g=d.entries.map((u,h)=>{let $=2*Math.PI*h/l-Math.PI/2,v=T(u,r,i,n),S=v*Math.cos($),I=v*Math.sin($);return{x:S,y:I}});s==="circle"?a.append("path").attr("d",A(g,o.curveTension)).attr("class",`radarCurve-${p}`):s==="polygon"&&a.append("polygon").attr("points",g.map(u=>`${u.x},${u.y}`).join(" ")).attr("class",`radarCurve-${p}`)})}c(k,"drawCurves");function T(a,t,e,r){let i=Math.min(Math.max(a,t),e);return r*(i-t)/(e-t)}c(T,"relativeRadius");function A(a,t){let e=a.length,r=`M${a[0].x},${a[0].y}`;for(let i=0;i<e;i++){let s=a[(i-1+e)%e],o=a[i],l=a[(i+1)%e],n=a[(i+2)%e],d={x:o.x+(l.x-s.x)*t,y:o.y+(l.y-s.y)*t},p={x:l.x-(n.x-o.x)*t,y:l.y-(n.y-o.y)*t};r+=` C${d.x},${d.y} ${p.x},${p.y} ${l.x},${l.y}`}return`${r} Z`}c(A,"closedRoundCurve");function O(a,t,e,r){if(!e)return;let i=(r.width/2+r.marginRight)*3/4,s=-(r.height/2+r.marginTop)*3/4,o=20;t.forEach((l,n)=>{let d=a.append("g").attr("transform",`translate(${i}, ${s+n*o})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${n}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(l.label)})}c(O,"drawLegend");var lt={draw:at},nt=c((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){let i=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return e},"genIndexStyles"),ot=c(a=>{let t=K(),e=b(),r=w(t,e.themeVariables),i=w(r.radar,a);return{themeVariables:r,radarOptions:i}},"buildRadarStyleOptions"),ct=c(({radar:a}={})=>{let{themeVariables:t,radarOptions:e}=ot(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${nt(t,e)}
	`},"styles"),xt={parser:et,db:f,renderer:lt,styles:ct};export{xt as diagram};

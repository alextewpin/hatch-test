(this["webpackJsonphatch-test"]=this["webpackJsonphatch-test"]||[]).push([[0],{17:function(e,t,n){e.exports={container:"CitiesPage_container__1_j_j",paper:"CitiesPage_paper__GloCE",tableContainer:"CitiesPage_tableContainer__BQUe_",table:"CitiesPage_table__HYwZN",tableHead:"CitiesPage_tableHead__2IEXS",tableHeadCell:"CitiesPage_tableHeadCell__29HyA",tableCell:"CitiesPage_tableCell__mR7D9",header:"CitiesPage_header__3yerV",input:"CitiesPage_input__1u7xX"}},45:function(e,t,n){e.exports={table:"Table_table__3M_gK",header:"Table_header__3Dohy",row:"Table_row__2v_3H"}},71:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(0),c=n(9),i=n.n(c),o=n(110),l=n(53),s=n(19),u=n(13),d=n(108),h=n(104),j=n(113),b=n(106),m=n(103),O=n(74),p=n(107),f=n(114),g=n(115),v=n(105),x=n(45),_=n.n(x),C=Math.max(window.screen.width,window.screen.height),w=function(e){for(var t=e.className,n=e.headerHeight,c=e.rowHeight,i=e.header,o=e.rows,l=e.getRowKey,s=e.renderRow,d=Object(r.useState)(0),h=Object(u.a)(d,2),j=h[0],b=h[1],m=Math.min(o.length,Math.max(0,Math.floor(j/c))),O=Math.ceil(C/c),p=n+c*o.length+16,f=[],g=m;g<Math.min(m+O,o.length);g++){var v=o[g];f.push(Object(a.jsx)("div",{color:String(g),className:_.a.row,style:{top:c*g+n,height:c},children:s(v)},l(v)))}return Object(a.jsx)("div",{className:"".concat(_.a.table," ").concat(t||""),onScroll:function(e){return b(e.target.scrollTop)},children:Object(a.jsxs)("div",{style:{height:p},children:[Object(a.jsx)("div",{className:_.a.header,children:i}),f]})})},M=n(17),N=n.n(M),P={variant:"outlined",size:"small",className:N.a.input},y=new Intl.Collator("en"),H={name:function(e,t){return y.compare(e.name,t.name)},distance:function(e,t){return e.distance-t.distance},population:function(e,t){return(e.population||0)-(t.population||0)}},I=new Intl.NumberFormat("en"),S=function(e,t){var n=Object(u.a)(e,2),a=n[0],r=n[1],c=Object(u.a)(t,2),i=c[0],o=c[1],l=a*Math.PI/180,s=i*Math.PI/180,d=(i-a)*Math.PI/180,h=(o-r)*Math.PI/180,j=Math.sin(d/2)*Math.sin(d/2)+Math.cos(l)*Math.cos(s)*Math.sin(h/2)*Math.sin(h/2);return 6371*(2*Math.atan2(Math.sqrt(j),Math.sqrt(1-j)))},E=function(e){var t=e.cities,n=e.provinces,c=Object(r.useState)(""),i=Object(u.a)(c,2),o=i[0],x=i[1],_=Object(r.useState)(0),C=Object(u.a)(_,2),M=C[0],y=C[1],E=Object(r.useState)(0),k=Object(u.a)(E,2),A=k[0],L=k[1],F=Object(r.useState)(null),R=Object(u.a)(F,2),T=R[0],D=R[1],K=Object(r.useMemo)((function(){return T?t.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{distance:S(T,e.latLng)})})):t}),[t,T]),q=Object(r.useState)({column:0,direction:"asc"}),B=Object(u.a)(q,2),J=B[0],X=B[1],z=Object(r.useMemo)((function(){var e={};return n.forEach((function(t){e[t.id]=t})),e}),[n]);Object(r.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){return D([e.coords.latitude,e.coords.longitude])}),void 0,{enableHighAccuracy:!0,timeout:15e3,maximumAge:0})}),[]);var G=[{title:"Name",width:"30%",comparator:"name",renderCell:function(e){return e.name},input:Object(a.jsx)(d.a,Object(s.a)(Object(s.a)({},P),{},{value:o,onChange:function(e){return x(e.target.value.toLowerCase())},InputProps:{startAdornment:Object(a.jsx)(h.a,{position:"start",color:"red",children:Object(a.jsx)(v.a,{})})}}))},{title:"Province",width:"30%",renderCell:function(e){return e.provinceId?z[e.provinceId].name:null},input:Object(a.jsxs)(d.a,Object(s.a)(Object(s.a)({},P),{},{value:M,select:!0,onChange:function(e){return y(Number(e.target.value))},children:[Object(a.jsx)(j.a,{value:0,children:"All"}),n.map((function(e){return Object(a.jsx)(j.a,{value:e.id,children:e.name},e.id)}))]}))},{title:"Population",width:"20%",align:"right",comparator:"population",renderCell:function(e){return null===e.population?null:I.format(e.population)}},{title:T?"Distance":"Coordinates",width:"20%",align:"right",comparator:T?"distance":void 0,renderCell:function(e){return T?"".concat(Math.floor(e.distance)," km"):"".concat(e.latLng[0].toFixed(3),", ").concat(e.latLng[1].toFixed(3))},input:T?Object(a.jsxs)(d.a,Object(s.a)(Object(s.a)({},P),{},{value:A,select:!0,onChange:function(e){return L(Number(e.target.value))},children:[Object(a.jsx)(j.a,{value:0,children:"Any"}),[30,100,250,500,1e3].map((function(e){return Object(a.jsxs)(j.a,{value:e,children:[e," km"]},e)}))]})):null}],Q=Object(r.useMemo)((function(){return M?K.filter((function(e){return e.provinceId===M})):K}),[K,M]),U=Object(r.useMemo)((function(){return o?Q.filter((function(e){return e.name.toLowerCase().includes(o)})):Q}),[Q,o]),V=Object(r.useMemo)((function(){return A?U.filter((function(e){return e.distance<=A})):U}),[U,A]),Y=G[J.column].comparator,Z=Object(r.useMemo)((function(){if(!Y)return V;var e=Object(l.a)(V),t="asc"===J.direction?1:-1;return e.sort((function(e,n){return H[Y](e,n)*t})),e}),[V,Y,J]);return Object(a.jsx)(b.a,{className:N.a.container,children:Object(a.jsxs)(m.a,{className:N.a.paper,children:[Object(a.jsx)("div",{className:N.a.header,children:Object(a.jsx)(O.a,{variant:"h5",children:"\ud83c\uddf3\ud83c\uddf1 Netherlands Cities"})}),Object(a.jsx)("div",{className:N.a.tableContainer,children:Object(a.jsx)(w,{className:N.a.table,headerHeight:105,rowHeight:50,header:Object(a.jsx)(p.a,{component:"div",className:N.a.tableHead,children:G.map((function(e,t){var n=e.title,r=e.input,c=e.align,i=e.width,o=e.comparator;return Object(a.jsxs)(f.a,{component:"div",className:N.a.tableHeadCell,align:c,style:{width:i},children:[o?Object(a.jsx)(g.a,{active:J.column===t,direction:J.column===t?J.direction:"asc",onClick:function(){X({column:t,direction:J.column===t&&"asc"===J.direction?"desc":"asc"})},children:n}):n,r]},n)}))}),rows:Z,getRowKey:function(e){return e.id},renderRow:function(e){return Object(a.jsx)(a.Fragment,{children:G.map((function(t){var n=t.title,r=t.renderCell,c=t.align,i=t.width;return Object(a.jsx)("div",{style:{width:i,justifyContent:"right"===c?"flex-end":void 0},className:N.a.tableCell,children:r(e)},n)}))})}})})]})})},k=n(109),A=function(e){var t=e.error;return Object(a.jsx)(b.a,{children:Object(a.jsx)(k.a,{py:2,children:Object(a.jsxs)(O.a,{children:["Error: ",t.message]})})})},L=new Intl.Collator("en"),F=fetch("".concat("/hatch-test","/data.json")).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).then((function(e){var t=1,n=[],a=[],r={};return e.forEach((function(e,c){var i=e.city,o=e.lat,l=e.lng,s=e.admin_name,u=e.population;s&&!r[s]&&(r[s]=t,a.push({id:t,name:s}),t+=1),n.push({id:c+1,name:i,provinceId:s&&r[s]||null,population:u?Number(u):null,latLng:[Number(o),Number(l)],distance:-1})})),a.sort((function(e,t){return L.compare(e.name,t.name)})),{cities:n,provinces:a}})),R=function(){var e=Object(r.useState)(null),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)(null),o=Object(u.a)(i,2),l=o[0],s=o[1],d=Object(r.useState)(null),h=Object(u.a)(d,2),j=h[0],b=h[1];return Object(r.useEffect)((function(){F.then((function(e){var t=e.cities,n=e.provinces;c(t),s(n)})).catch(b)}),[]),j?Object(a.jsx)(A,{error:j}):n&&l?Object(a.jsx)(E,{cities:n,provinces:l}):null},T=function(){return Object(a.jsx)(o.b,{injectFirst:!0,children:Object(a.jsx)(R,{})})};n(71);i.a.render(Object(a.jsx)(T,{}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.f12302e6.chunk.js.map
import{c as P,d as E,r as x,s as J,l as G,_ as K,u as V,a as Q,b as k,e as m,o as r,f as d,w as t,g as n,h as A,t as w,i as e,B as X,n as T,j as I,k as M,m as Y,p as ee,q as ae,v as te,F as le}from"./index.7865ba48.js";var R=P(R,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"currentColor",width:16,height:16},[{elem:"circle",attrs:{cx:"16",cy:"16",r:"10"}},{elem:"path",attrs:{d:"M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"}}]),S=P(S,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:16,height:16},[{elem:"path",attrs:{d:"M8,1L5.7,5.6L0.6,6.3l3.7,3.6L3.5,15L8,12.6l4.6,2.4l-0.9-5.1l3.7-3.6l-5.1-0.7L8,1z"}}]),Z=P(Z,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"currentColor",width:20,height:20},[{elem:"path",attrs:{d:"M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-12.93-9C5.1,10.93,10.7,7,16,7s10.9,3.93,12.93,9C26.9,21.07,21.3,25,16,25Z"}},{elem:"path",attrs:{d:"M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"}}]),j=P(j,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"currentColor",width:20,height:20},[{elem:"path",attrs:{d:"M5.24,22.51l1.43-1.42A14.06,14.06,0,0,1,3.07,16C5.1,10.93,10.7,7,16,7a12.38,12.38,0,0,1,4,.72l1.55-1.56A14.72,14.72,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16,16,0,0,0,5.24,22.51Z"}},{elem:"path",attrs:{d:"M12 15.73a4 4 0 013.7-3.7l1.81-1.82a6 6 0 00-7.33 7.33zM30.94 15.66A16.4 16.4 0 0025.2 8.22L30 3.41 28.59 2 2 28.59 3.41 30l5.1-5.1A15.29 15.29 0 0016 27 16.69 16.69 0 0030.94 16.34 1 1 0 0030.94 15.66zM20 16a4 4 0 01-6 3.44L19.44 14A4 4 0 0120 16zm-4 9a13.05 13.05 0 01-6-1.58l2.54-2.54a6 6 0 008.35-8.35l2.87-2.87A14.54 14.54 0 0128.93 16C26.9 21.07 21.3 25 16 25z"}}]);const ne="http://acnhapi.com",se=ne+"/v1/fish",oe=E("fish",()=>{const s=x([]),a=x(!1);async function L(h=!1){if(h||s.value.length===0){const f=await J.get(se),p=Object.keys(f.body),i=[];for(let u=0;u<p.length;u++){const g=p[u];i.push({key:g,hidden:!1,...f.body[g]})}s.value=G.exports.shuffle(i)}}function o(h,f=!0){const p=s.value.find(i=>i.key===h);p&&(p.hidden=f),f?a.value=!0:a.value=s.value.some(i=>i.hidden)}return{fish:s,someHidden:a,loadFish:L,hideFish:o}}),ie="/hello-carbon-vue3/assets/fish.c55fa332.svg";const ce={__name:"FishRow",props:{fish:{type:Object,required:!0}},setup(s){const a=s,{t:L}=V(),o=Q(),h=k(()=>{const c="name-"+o.languageObject.api;return a.fish.name[c]||a.fish.key}),f=k(()=>o.currencyFormat.format(a.fish.price)),p=k(()=>o.currencyFormat.format(a.fish["price-cj"])),i={Common:1,Uncommon:2,Rare:3,"Ultra-rare":4},u=k(()=>{var c;return i[(c=a.fish.availability)==null?void 0:c.rarity]||-1}),g=k(()=>{var C;const c=((C=a.fish.availability)==null?void 0:C.location)||"Pond";return c.startsWith("Pond")?"pond":c.startsWith("River")?"river":c.startsWith("Sea")?"sea":c.startsWith("Pier")?"pier":""});return(c,C)=>{const v=m("cv-data-table-cell"),z=m("cv-data-table-row");return r(),d(z,{value:s.fish.key,"aria-label-for-batch-checkbox":e(L)("select-row",{name:e(h)})},{default:t(()=>[n(v,null,{default:t(()=>[A(w(e(h)),1)]),_:1}),n(v,null,{default:t(()=>[n(X,{class:"fish__icon",src:s.fish.icon_uri,"src-placeholder":e(ie),alt:e(h)},null,8,["src","src-placeholder","alt"])]),_:1}),n(v,null,{default:t(()=>[A(w(e(f)),1)]),_:1}),n(v,null,{default:t(()=>[A(w(e(p)),1)]),_:1}),n(v,null,{default:t(()=>{var B,y;return[n(e(R),{alt:(B=s.fish.availability)==null?void 0:B.location,title:(y=s.fish.availability)==null?void 0:y.location,class:T(`fish__location-${e(g)}`)},null,8,["alt","title","class"])]}),_:1}),n(v,null,{default:t(()=>[I("div",{class:T(`fish__rarity-${e(u)}`)},[e(u)>=1?(r(),d(e(S),{key:0})):M("",!0),e(u)>=2?(r(),d(e(S),{key:1})):M("",!0),e(u)>=3?(r(),d(e(S),{key:2})):M("",!0),e(u)>=4?(r(),d(e(S),{key:3})):M("",!0)],2)]),_:1})]),_:1},8,["value","aria-label-for-batch-checkbox"])}}},re=K(ce,[["__scopeId","data-v-e267a180"]]),ue={__name:"FishView",setup(s){const{t:a}=V(),L=j,o=oe(),h=x(!1),f=x({numberOfItems:0,pageSizes:[7,11,23,31]}),p=k(()=>({...f.value,pageSizesLabel:a("items"),backwardText:a("previous-page"),forwardText:a("next-page"),pageNumberLabel:a("page-number")}));Y(()=>{h.value=!0;try{o.loadFish().finally(()=>{f.value.numberOfItems=o.fish.length,h.value=!1})}catch{console.error("error loading fish from API")}});const i=x("");function u(l){i.value=l==null?void 0:l.trim()}const g=x(!1),c=k(()=>{let l=g.value?o.fish:o.fish.filter(b=>!b.hidden);return i.value&&(l=l.filter(b=>b.key.includes(i.value))),l});function C(){g.value=!g.value}const v=x({start:1,length:7}),z=k(()=>{const l=v.value;return c.value.slice(l.start-1,l.start+l.length-1)});function B(l){v.value=l}const y=x([]);function N(){console.log("hide selected");for(let l=0;l<y.value.length;l++){const b=y.value[l];console.log("hide",b),o.hideFish(b)}y.value=[]}return(l,b)=>{const O=m("cv-data-table-skeleton"),H=m("cv-button"),U=m("cv-data-table-action"),F=m("cv-data-table-heading"),W=m("cv-data-table"),$=m("cv-column"),q=m("cv-row"),D=m("cv-grid");return r(),d(D,null,{default:t(()=>[n(q,null,{default:t(()=>[n($,null,{default:t(()=>[h.value?(r(),d(O,{key:0,columns:[e(a)("name"),e(a)("price"),"CJ",e(a)("location"),e(a)("rarity")],rows:7,title:e(a)("fish"),helperText:e(a)("fish-info")},null,8,["columns","title","helperText"])):(r(),d(W,{key:1,"rows-selected":y.value,"onUpdate:rows-selected":b[0]||(b[0]=_=>y.value=_),pagination:e(p),zebra:!0,title:e(a)("fish"),helperText:e(a)("fish-info"),batchCancelLabel:e(a)("cancel"),actionBarAriaLabel:e(a)("actions"),collapseAllAriaLabel:e(a)("collapse-all"),expandAllAriaLabel:e(a)("expand-all"),selectAllAriaLabel:e(a)("select-all"),searchLabel:e(a)("search"),searchPlaceholder:e(a)("search"),searchClearLabel:e(a)("search-clear"),onPagination:B,onSearch:u},ee({"items-selected":t(({scope:_})=>[A(w(e(a)("selected-num",{count:_.count})),1)]),"of-n-pages":t(({scope:_})=>[A(w(e(a)("pages-num",{count:_.pages})),1)]),"range-text":t(({scope:_})=>[A(w(e(a)("range-text",_)),1)]),"batch-actions":t(()=>[n(H,{icon:e(L),onClick:N},{default:t(()=>[A(w(e(a)("hide")),1)]),_:1},8,["icon"])]),headings:t(()=>[n(F,{heading:e(a)("name"),name:"name",sortable:""},null,8,["heading"]),n(F,{heading:""}),n(F,{heading:e(a)("price"),name:"price",sortable:""},null,8,["heading"]),n(F,{heading:"CJ"}),n(F,{heading:e(a)("location")},null,8,["heading"]),n(F,{heading:e(a)("rarity")},null,8,["heading"])]),data:t(()=>[(r(!0),ae(le,null,te(e(z),_=>(r(),d(re,{fish:_,key:_.key},null,8,["fish"]))),128))]),_:2},[e(o).someHidden?{name:"actions",fn:t(()=>[n(U,{"aria-label":e(a)("show"),alt:e(a)("show"),onClick:C},{default:t(()=>[g.value?(r(),d(e(L),{key:0,class:"bx--toolbar-action__icon"},{default:t(()=>[I("title",null,w(e(a)("hide")),1)]),_:1})):(r(),d(e(Z),{key:1,class:"bx--toolbar-action__icon"},{default:t(()=>[I("title",null,w(e(a)("show")),1)]),_:1}))]),_:1},8,["aria-label","alt"])]),key:"0"}:void 0]),1032,["rows-selected","pagination","title","helperText","batchCancelLabel","actionBarAriaLabel","collapseAllAriaLabel","expandAllAriaLabel","selectAllAriaLabel","searchLabel","searchPlaceholder","searchClearLabel"]))]),_:1})]),_:1})]),_:1})}}};export{ue as default};

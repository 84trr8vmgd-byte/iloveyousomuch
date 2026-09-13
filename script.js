const C = window.CONTENT;
const app = document.querySelector('#app');
const view = document.body.dataset.view;
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pic = (src, cls='', alt='') => `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}">`;
const back = (url='index.html') => `<a class="back" href="${url}">← zurück</a>`;
const heading = (title,sub='') => `<header><p class="eyebrow">a little world, just for you</p><h1>${title}</h1>${sub?`<p class="subtitle">${sub}</p>`:''}</header>`;
function object(type) {
 if(type==='letters') return `<span class="object envelope"><span class="env-back"></span><span class="note"></span><span class="fold left-fold"></span><span class="fold right-fold"></span><span class="fold bottom-fold"></span><span class="flap"></span>${pic(C.seal,'seal')}</span>`;
 if(['webtoon','sketchbook'].includes(type)) return `<span class="object book ${type}"><span class="pages"></span><span class="inner-page"></span><span class="cover">${pic(C.covers[type])}</span></span>`;
 if(type==='giftcard') return `<span class="object gift"><span class="gift-face">${pic(C.covers.giftcard)}</span><span class="spark">✦</span></span>`;
 if(type==='treats') return `<span class="object candy"><span class="wrapper wl"></span><span class="sweet">♡</span><span class="wrapper wr"></span></span>`;
 return `<span class="object record"><span class="disc"></span><span class="sleeve">${pic(C.covers.vinyl)}</span></span>`;
}
const names={letters:'Letters',webtoon:'Webtoon',giftcard:'Giftcard',sketchbook:'Tiny sketchbook',treats:'Little treats',vinyl:'Our soundtrack'};
function link(type,label=names[type],href=`${type}.html`) {return `<a href="${href}" class="keepsake ${type}-link" data-open="${type}" aria-label="${esc(label)} öffnen">${object(type)}<span class="label">${esc(label)}</span></a>`;}
if(view==='home') app.innerHTML=heading('For you, always.','Six little things. A whole lot of love.')+`<section class="collection" aria-label="Deine Sammlung">${Object.keys(names).map(t=>link(t)).join('')}</section>`;
if(view==='letters') app.innerHTML=back()+heading('Letters','For every version of your day.')+`<section class="letter-grid">${C.letters.map((l,i)=>link('letters',l.title,`letter.html?id=${i}`)).join('')}</section>`;
if(view==='letter') {
 const id=Number(new URLSearchParams(location.search).get('id')||0);const l=C.letters[id];
 app.innerHTML=back('letters.html')+(l?`<article class="letter-paper"><p class="eyebrow">a letter for you</p><h1>${esc(l.title)}</h1><div class="letter-text">${esc(l.text)}</div>${l.image?pic(l.image,'letter-image','Dein Brief'):''}<span class="signature">♡</span></article>`:heading('Brief nicht gefunden'));
}
if(view==='webtoon') app.innerHTML=back()+heading('Webtoon')+`<section class="comic" aria-label="Comic">${C.comic.map((src,i)=>pic(src,'',`Comic-Panel ${i+1}`)).join('')}</section>`;
if(view==='giftcard') app.innerHTML=back()+heading('Something just for you.')+`<div class="gift-stage">${pic(C.covers.giftcard,'floating-gift','Dein Gutschein')}</div>`;
if(view==='vinyl') app.innerHTML=back()+heading('On repeat.')+`<div class="vinyl-stage"><div class="vinyl-disc disc spinning"></div><div class="vinyl-sleeve">${pic(C.covers.vinyl,'','Plattencover')}</div></div><button class="motion-toggle" id="record-toggle" aria-pressed="false">Drehung pausieren</button>`;
if(view==='sketchbook') {
 let page=0,busy=false;
 app.innerHTML=back()+heading('Tiny sketchbook')+`<div class="spread" aria-label="Skizzenbuch"><div id="left-page" class="sketch-page"></div><div id="right-page" class="sketch-page"></div><div class="turning-page" aria-hidden="true"></div></div><nav class="page-controls" aria-label="Buchseiten"><button id="prev">← Zurück</button><span id="page-count" aria-live="polite"></span><button id="next">Weiter →</button></nav>`;
 const pages=C.sketchPages;
 const markup=n=>(pages[n]||[]).map((src,i)=>pic(src,'',`Zeichnung ${i+1} auf Seite ${n+1}`)).join('');
 function render(){document.querySelector('#left-page').innerHTML=markup(page);document.querySelector('#right-page').innerHTML=markup(page+1);document.querySelector('#page-count').textContent=`${page+1}–${Math.min(page+2,pages.length)} / ${pages.length}`;document.querySelector('#prev').disabled=busy||page===0;document.querySelector('#next').disabled=busy||page+2>=pages.length;}
 async function turn(dir){if(busy||page+dir*2<0||page+dir*2>=pages.length)return;busy=true;render();const sheet=document.querySelector('.turning-page');sheet.innerHTML=markup(dir>0?page+1:page);sheet.className=`turning-page sketch-page ${dir>0?'forward':'backward'}`;sheet.style.display='grid';await Promise.allSettled(sheet.getAnimations().map(a=>a.finished));page+=dir*2;sheet.style.display='none';busy=false;render();}
 document.querySelector('#prev').onclick=()=>turn(-1);document.querySelector('#next').onclick=()=>turn(1);render();
}
if(view==='treats') app.innerHTML=back()+heading('Little treats','Pick a sweet little surprise.')+`<button class="motion-toggle" id="float-toggle" aria-pressed="false">Schweben pausieren</button><section class="treat-cloud" aria-label="Kleine Überraschungen">${C.treats.map((t,i)=>`<div class="treat-orbit" style="--i:${i};--delay:-${i*2}s"><button class="treat-flip" aria-label="${esc(t.title)} aufdecken" aria-pressed="false"><span class="treat-front">${object('treats')}</span><span class="treat-back">${pic(t.image,'',t.title)}</span></button></div>`).join('')}</section>`;
let opening=false;
document.querySelectorAll('[data-open]').forEach(el=>el.addEventListener('click',async e=>{
 if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
 e.preventDefault();if(opening)return;opening=true;el.classList.add('opening');document.body.classList.add('opening-scene');
 await Promise.allSettled(el.getAnimations({subtree:true}).filter(a=>a.effect.getTiming().iterations!==Infinity).map(a=>a.finished));
 document.body.classList.add('leaving');await Promise.allSettled(document.querySelector('.curtain').getAnimations().map(a=>a.finished));location.href=el.href;
}));
window.addEventListener('pageshow',()=>{opening=false;document.body.classList.remove('leaving','opening-scene');document.querySelectorAll('.opening').forEach(e=>e.classList.remove('opening'));});
document.querySelectorAll('.treat-flip').forEach(b=>b.onclick=()=>{const flipped=b.classList.toggle('flipped');b.setAttribute('aria-pressed',flipped);});
function motionToggle(id,target,off,on){const b=document.querySelector(id);if(b)b.onclick=()=>{const paused=document.querySelector(target).classList.toggle('paused');b.setAttribute('aria-pressed',paused);b.textContent=paused?on:off;};}
motionToggle('#record-toggle','.vinyl-disc','Drehung pausieren','Drehung starten');motionToggle('#float-toggle','.treat-cloud','Schweben pausieren','Schweben starten');
document.title=(names[view]|| (view==='letter'?'Dein Brief':'Just for you'))+' · For you';

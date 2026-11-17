const procedures=[
['Klasická masáž — chrbát a šija','30 / 60 min','20 / 40 €','massage'],
['Klasická masáž — celé telo','30 / 60 min','20 / 40 €','massage'],
['Klasická masáž — horné končatiny','30 min','20 €','massage'],
['Klasická masáž — dolné končatiny','30 min','20 €','massage'],
['Masáž tváre','30 min','20 €','massage'],
['Antistresová masáž','60 min','40 €','massage'],
['Mäkké techniky','30 min','20 €','therapy'],
['Manuálna terapia s masážou','60 min','45 €','therapy'],
['Komplexná manuálna terapia','70 min','55 €','therapy'],
['Reflexná masáž chodidiel','60 min','40 €','massage','S uvoľnením dolných končatín'],
['Manuálne uvoľnenie lymfatických ciest','45 min','35 €','therapy','Zvýhodnená cena z 40 € + 15 min tvár a krk'],
['Bankovanie','30 min','20 €','therapy'],
['Bankovanie s masážou','60 min','40 €','therapy'],
['Masáž lávovými kameňmi','30 / 60 min','20 / 40 €','massage'],
['Maderoterapia — celé telo','60 min','35 €','body','Zvýhodnená cena z 40 €'],
['Maderoterapia — nohy','30 min','20 €','body'],
['Zábal na telo','25 min','30 €','body','+ 15 min uvoľnenie lymfatických ciest']
];
const tbody=document.querySelector('#prices');
function renderPrices(filter='all'){
 const rows=procedures.filter(p=>filter==='all'||p[3]===filter);
 tbody.replaceChildren(...rows.map(p=>{
  const tr=document.createElement('tr');
  const name=document.createElement('td'); name.textContent=p[0];
  if(p[4]){const small=document.createElement('small');small.textContent=p[4];name.append(small);}
  const duration=document.createElement('td');duration.textContent=p[1];
  const price=document.createElement('td');price.textContent=p[2];
  const action=document.createElement('td');const button=document.createElement('button');
  button.className='round-arrow';button.textContent='↗';button.setAttribute('aria-label',`Rezervovať: ${p[0]}`);button.addEventListener('click',()=>openBooking(p[0]));action.append(button);tr.append(name,duration,price,action);return tr;
 }));
 document.querySelector('#price-status').textContent=`Počet zobrazených procedúr: ${rows.length}`;
}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));renderPrices(btn.dataset.filter);}));
const dialog=document.querySelector('#booking');const serviceLabel=document.querySelector('#selected-service');
function openBooking(service){serviceLabel.hidden=!service;serviceLabel.textContent=service?`Vybraná procedúra: ${service}`:'';dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking()));
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>openBooking(b.dataset.service)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
const menu=document.querySelector('.menu-toggle');const mobileNav=document.querySelector('#mobile-nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Zavrieť navigáciu':'Otvoriť navigáciu');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Otvoriť navigáciu');mobileNav.hidden=true;}));
renderPrices();

document.querySelector("#online-booking").href="https://www.patriciusmasaze.sk/kontakt/";

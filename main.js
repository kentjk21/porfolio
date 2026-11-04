const $=s=>document.querySelector(s);
$('#hi').textContent=DATA.greeting;$('#name').textContent=DATA.name;$('#bio').textContent=DATA.bio;$('#cmsg').textContent=DATA.contactMsg;
$('#foot').textContent='© '+new Date().getFullYear()+' '+DATA.name+' — designed & coded with ♥';
$('#stats').innerHTML=DATA.stats.map(s=>`<div class="glass stat"><b data-n="${s.n}" data-s="${s.s}">0</b><small>${s.l}</small></div>`).join('');
const cats=Object.keys(DATA.skills);
$('#tabs').innerHTML=cats.map((c,i)=>`<button class="tab${i?'':' on'}" data-c="${c}">${c}</button>`).join('');
function showSkills(c){$('#skills-grid').innerHTML=DATA.skills[c].map(([n,v])=>`<div class="glass sk"><div><span>${n}</span><span class="mono">${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></div>`).join('');
 requestAnimationFrame(()=>setTimeout(()=>document.querySelectorAll('.bar i').forEach(i=>i.style.width=i.dataset.w+'%'),30))}
showSkills(cats[0]);
$('#tabs').onclick=e=>{const b=e.target.closest('.tab');if(!b)return;document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));b.classList.add('on');showSkills(b.dataset.c)};
$('#tl').innerHTML=DATA.jobs.map(j=>`<div class="job glass rv"><div class="meta mono">${j.when}</div><h3>${j.role} · ${j.co}</h3><ul>${j.pts.map(p=>`<li>${p}</li>`).join('')}</ul></div>`).join('');
$('#proj').innerHTML=DATA.projects.map((p,i)=>`<div class="glass card rv"><span class="mono" style="color:var(--b)">0${i+1}</span><h3>${p.t}</h3><p>${p.d}</p><div class="chips">${p.tags.map(t=>`<span class="mono">${t}</span>`).join('')}</div></div>`).join('');
$('#links').innerHTML=DATA.links.map(l=>`<a class="btn${l.p?' p':''}" href="${l.u}" target="_blank" rel="noopener">${l.l}</a>`).join('');
const CERTS={"Lean & Quality":["Lean Six Sigma Green Belt Training","Certified Lean Six Sigma Yellow Belt","Continuous Improvement Fundamentals"],"Data & Analytics":["Analytics Manager Pathway (DAP)","Operational Analytics Microspecialization (DAP)","Data Visualization Microspecialization (DAP)","Urban Planning Microspecialization (DAP)","Data Science Fundamentals"],"Safety":["Safety Officer II","HIRADC for Safety Officer 3","Job Hazard Analysis & Safe Job Procedures","Fleet Safety Management","Chemical Safety","Accident Investigation & Reporting"],"Project Management":["Project Management Fundamentals (Jun 2022)","Teamwork","Microsoft Excel"]};
$('#certgrid').innerHTML=Object.entries(CERTS).map(([k,v],i)=>`<div class="glass card rv"><span class="mono" style="color:var(--c)">0${i+1}</span><h3>${k}</h3><div class="chips">${v.map(t=>`<span class="mono">${t}</span>`).join('')}</div></div>`).join('');
/* typing */
let ri=0,ci=0,del=false;const ty=$('#type');
(function tick(){const w=DATA.roles[ri];ty.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(tick,1400)}
 if(del&&ci===0){del=false;ri=(ri+1)%DATA.roles.length}
 ci+=del?-1:1;setTimeout(tick,del?35:70)})();
/* counters + reveal */
function count(el){const n=+el.dataset.n,s=el.dataset.s;let t0=null;(function f(t){t0=t0||t;const k=Math.min((t-t0)/1500,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(performance.now())}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* card tilt + spotlight */
document.querySelectorAll('.card').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');c.style.transform=`rotateX(${(.5-y/r.height)*10}deg) rotateY(${(x/r.width-.5)*10}deg) translateZ(6px)`};c.onmouseleave=()=>c.style.transform=''});
/* scroll progress + active nav */
const links=[...document.querySelectorAll('#menu a')],secs=links.map(a=>document.querySelector(a.hash));
addEventListener('scroll',()=>{const h=document.documentElement;$('#prog').style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%';
 let cur=-1;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach((a,i)=>a.classList.toggle('on',i===cur))},{passive:true});
/* theme */
$('#theme').onclick=()=>{const r=document.documentElement,light=getComputedStyle(r).getPropertyValue('--bg').trim()==='#f3f5ff';r.dataset.theme=light?'dark':'light'};
/* particle network */
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,P=[],m={x:-999,y:-999};
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(110,W*H/14000|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
rs();addEventListener('resize',rs);
addEventListener('mousemove',e=>{m.x=e.clientX;m.y=e.clientY;const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
function draw(){cx.clearRect(0,0,W,H);const col=getComputedStyle(document.documentElement).getPropertyValue('--a').trim()||'#00e5ff';cx.fillStyle=col;cx.strokeStyle=col;
 for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<130){p.x+=dx/d*1.2;p.y+=dy/d*1.2}
  cx.globalAlpha=.7;cx.beginPath();cx.arc(p.x,p.y,1.5,0,7);cx.fill()}
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<120){cx.globalAlpha=(1-d/120)*.25;cx.beginPath();cx.moveTo(P[i].x,P[i].y);cx.lineTo(P[j].x,P[j].y);cx.stroke()}}
 requestAnimationFrame(draw)}
draw();

const menuButton=document.querySelector(".menu-toggle");
const navigation=document.querySelector(".primary-navigation");
if(menuButton&&navigation){
 const closeMenu=()=>{menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");navigation.classList.remove("is-open");};
 menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")!=="true";menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");navigation.classList.toggle("is-open",open);});
 navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
 window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu();});
}
const intro=document.querySelector("#typed-intro"), reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(intro){const message="HELLO, I'M FELIX.";if(reducedMotion){intro.textContent=message;document.querySelector(".type-cursor")?.remove();}else{intro.textContent="";let i=0;const type=()=>{if(i<message.length){intro.textContent+=message.charAt(i++);window.setTimeout(type,78);}else document.querySelector(".type-cursor")?.remove();};type();}}
const saveData=navigator.connection?.saveData===true;
document.querySelectorAll(".hero-film,.tribe-board-film").forEach(video=>{
 if(reducedMotion||saveData){video.pause();return;}
 if(!("IntersectionObserver"in window))return;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const play=video.play();if(play?.catch)play.catch(()=>{});}else video.pause();}),{threshold:.08});
 observer.observe(video);
});
const revealItems=document.querySelectorAll(".venture-card,.case-track,.scoreboard,.service-card,.about-copy");
if(!reducedMotion&&"IntersectionObserver"in window){revealItems.forEach(item=>item.classList.add("reveal"));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item));}

const demoCounter=document.querySelector(".demo-progress");
if(demoCounter&&!reducedMotion&&"IntersectionObserver"in window){
 const counter=demoCounter.querySelector("[data-count]");let started=false;
 const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting&&!started){started=true;demoCounter.classList.add("is-visible");const duration=1500,start=performance.now();
   const tick=now=>{const p=Math.min((now-start)/duration,1);counter.textContent=String(Math.round(40*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick);};
   requestAnimationFrame(tick);countObserver.disconnect();
  }
 }),{threshold:.35});countObserver.observe(demoCounter);
}else if(demoCounter){demoCounter.classList.add("is-visible");const counter=demoCounter.querySelector("[data-count]");if(counter)counter.textContent="40";}

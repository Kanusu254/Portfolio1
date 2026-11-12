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


const scoreboards=document.querySelectorAll(".scoreboard");
function finalScore(counter){
 const value=Number(counter.dataset.count);
 const prefix=counter.dataset.prefix||"";
 const suffix=counter.dataset.suffix||"";
 const formatted=value.toLocaleString("en-KE");
 counter.textContent=prefix+formatted+suffix;
}
if("IntersectionObserver"in window&&!reducedMotion){
 scoreboards.forEach(board=>{
  let started=false;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting||started)return;
   started=true;
   board.querySelectorAll("[data-count]").forEach(counter=>{
    const target=Number(counter.dataset.count),prefix=counter.dataset.prefix||"",suffix=counter.dataset.suffix||"";
    const duration=1750,start=performance.now();
    const render=now=>{
     const progress=Math.min((now-start)/duration,1);
     const value=Math.round(target*(1-Math.pow(1-progress,3)));
     counter.textContent=prefix+value.toLocaleString("en-KE")+suffix;
     if(progress<1)requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
   });
   observer.unobserve(board);
  }),{threshold:.25});
  observer.observe(board);
 });
}else{
 scoreboards.forEach(board=>board.querySelectorAll("[data-count]").forEach(finalScore));
}

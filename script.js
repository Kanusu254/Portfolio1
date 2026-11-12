const menuButton=document.querySelector(".menu-toggle");
const navigation=document.querySelector(".primary-navigation");
if(menuButton&&navigation){
 const closeMenu=()=>{menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");navigation.classList.remove("is-open");};
 menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")!=="true";menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");navigation.classList.toggle("is-open",open);});
 navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
 window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu();});
}
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData=navigator.connection?.saveData===true;
const hero=document.querySelector(".hero");
const intro=document.querySelector("#typed-intro");
const discipline=document.querySelector(".hero-discipline");
const heading=document.querySelector(".hero h1");
const description=document.querySelector(".hero-description");
const actions=document.querySelector(".hero-actions");
const consoleGraphic=document.querySelector("#ideas-console");
const cursor=document.querySelector(".type-cursor");
const wait=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
function typeText(element,text,speed){
 return new Promise(resolve=>{
  let index=0;element.textContent="";
  const tick=()=>{if(index<text.length){element.textContent+=text.charAt(index++);window.setTimeout(tick,speed);}else resolve();};
  tick();
 });
}
async function playHeroSequence(){
 if(!hero||!intro||!heading||!description)return;
 if(reducedMotion){
  intro.textContent="HELLO, I'M FELIX.";
  heading.querySelectorAll("[data-type-text]").forEach(node=>node.textContent=node.dataset.typeText);
  description.textContent=description.dataset.typeText;
  [discipline,heading,description,actions,consoleGraphic].forEach(node=>node?.classList.add("is-visible"));
  cursor?.remove();
  return;
 }
 await wait(650);
 await typeText(intro,"HELLO, I'M FELIX.",68);
 cursor?.remove();
 discipline?.classList.add("is-visible");
 await wait(180);
 for(const part of heading.querySelectorAll("[data-type-text]"))await typeText(part,part.dataset.typeText,27);
 heading.classList.add("is-visible");
 await wait(120);
 description.classList.add("is-visible");
 await typeText(description,description.dataset.typeText,11);
 actions?.classList.add("is-visible");
 await wait(380);
 consoleGraphic?.classList.add("is-visible");
}
playHeroSequence();
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
 counter.textContent=prefix+value.toLocaleString("en-KE")+suffix;
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
    const render=now=>{const progress=Math.min((now-start)/duration,1);counter.textContent=prefix+Math.round(target*(1-Math.pow(1-progress,3))).toLocaleString("en-KE")+suffix;if(progress<1)requestAnimationFrame(render);};
    requestAnimationFrame(render);
   });
   observer.unobserve(board);
  }),{threshold:.25});
  observer.observe(board);
 });
}else{
 scoreboards.forEach(board=>board.querySelectorAll("[data-count]").forEach(finalScore));
}

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Expand, Minimize, Orbit } from "lucide-react";
import { Link } from "./link";
import { dsa, mapUrl } from "@/content/atlas";

export function GalaxySky() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el=canvas.current;
    if(!el) return;
    const ctx=el.getContext("2d");
    if(!ctx) return;
    function paint(){
      if(!el||!ctx)return;
      const w=el.clientWidth,h=el.clientHeight;
      if(!w||!h)return;
      const ratio=Math.min(window.devicePixelRatio||1,1.5);
      el.width=w*ratio; el.height=h*ratio; ctx.scale(ratio,ratio);
      let seed=4721;
      function rand(){ seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296; }
      for(let i=0;i<Math.min(1050,w*h/540);i++){
        const x=rand()*w,y=rand()*h,r=.25+rand()**3*1.15;
        ctx.fillStyle="rgba(208,222,255,"+(.18+rand()*.66)+")";
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
        if(r>1.3){ctx.fillRect(x-3,y-.3,6,.6);ctx.fillRect(x-.3,y-3,.6,6)}
      }
      // A tilted logarithmic spiral of luminous dust, projected onto the map plane.
      ctx.translate(w*.52,h*.51);ctx.rotate(-.33);ctx.scale(1,.42);
      const radius=Math.min(w*.53,h*.96);
      for(let i=0;i<6600;i++){
        const t=Math.sqrt(rand()), r=t*radius;
        const angle=t*6.4+(i%3)*Math.PI*2/3+(rand()-.5)*(.6+t)+rand()*.24;
        const x=r*Math.cos(angle),y=r*Math.sin(angle);
        ctx.fillStyle=i%3===0?"rgba(198,160,250,.22)":"rgba(113,167,245,.25)";
        ctx.fillRect(x,y,.45+rand()*1.5,.75+rand()*2.5);
      }
    }
    const observer=new ResizeObserver(paint);observer.observe(el);paint();
    return ()=>observer.disconnect();
  },[]);
  return <canvas className="galaxy-sky" ref={canvas} aria-hidden="true"/>;
}

const orbitColors=["#6bd9e5","#bd9aff"];
type Point=[number,number];
function curve(a:Point,b:Point,vertical:boolean){
  const [x,y]=a,[endX,endY]=b;
  if(vertical){const mid=(y+endY)/2;return `M${x},${y} C${x},${mid} ${endX},${mid} ${endX},${endY}`}
  const mid=(x+endX)/2;
  return `M${x},${y} C${mid},${y} ${mid},${endY} ${endX},${endY}`;
}
function location([x,y]:Point,color:string):CSSProperties {
  return {left:x+"%",top:y+"%","--orbit-color":color} as CSSProperties;
}
export function GalaxyOverview(){
  const scene=useRef<HTMLDivElement>(null);
  const [vertical,setVertical]=useState(false);
  useEffect(()=>{
    if(!scene.current)return;
    const observer=new ResizeObserver(([e])=>setVertical(e.contentRect.width<680));
    observer.observe(scene.current);return ()=>observer.disconnect();
  },[]);
  const root:Point=[50,50];
  const hubs:Point[]=vertical?[[50,29],[50,71]]:[[30,50],[70,50]];
  function satellite(side:number,i:number):Point{
    if(vertical)return [i%2===0?23:77,side===0?(i<2?7:20):(i<2?81:94)];
    return [side===0?(i===0||i===3?17:10):(i===0||i===3?83:90),[13,37,63,87][i]];
  }
  return <div className="orbital-scene" ref={scene}>
    <GalaxySky/>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="orbital-lines" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="42" ry="33" className="orbit-guide"/>
      <ellipse cx="50" cy="50" rx="33" ry="23" className="orbit-guide"/>
      {dsa.children.map((family,side)=><g key={family.title} stroke={orbitColors[side]}>
        <path d={curve(root,hubs[side],vertical)}/>{family.children.map((structure,i)=><path key={structure.title} d={curve(hubs[side],satellite(side,i),vertical)}/>)}
      </g>)}
    </svg>
    <div className="galaxy-core" style={location(root,"#f5cf98")}><i className="sun"/><strong>DSA</strong></div>
    {dsa.children.map((family,side)=><div key={family.title}>
      <Link className={"orbital-hub solar-node system-"+side} style={location(hubs[side],orbitColors[side])} href={mapUrl("dsa",[family.title])}><i className="planet"/><b>{family.title}</b></Link>
      {family.children.map((structure,i)=><Link className="orbital-moon solar-node" key={structure.title} href={mapUrl("dsa",[family.title,structure.title])} style={location(satellite(side,i),orbitColors[side])}><i/><b>{structure.title}</b></Link>)}
    </div>)}
  </div>
}
export function GalaxyFocus({active,toggle}:{active:boolean;toggle:()=>void}){
  return <button className="galaxy-focus" onClick={toggle} aria-pressed={active}>{active?<Minimize size={15}/>:<Expand size={15}/>}<span>{active?"Exit focus":"Focus map"}</span></button>
}

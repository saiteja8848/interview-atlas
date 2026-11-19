import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Expand, Minimize, Orbit } from "lucide-react";
import { Link } from "./link";
import { design, dsa, mapUrl } from "@/content/atlas";

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

const orbitColors=["#6bd9e5","#bd9aff","#f5bf80","#a5d8ad"];
export type OrbitItem={title:string;href:string};
export function OrbitScene({title,items}:{title:string;items:OrbitItem[]}){
  const [page,setPage]=useState(0);
  const visible=items.slice(page*4,page*4+4);
  return <div className="orbital-scene orbit-scene">
    <GalaxySky/>
    <div className="orbit-center"><i className="sun"/><strong>{title}</strong></div>
    <div className="orbit-track" aria-label={title+" branches"}>
      {visible.map((item,i)=><Link className="orbit-planet" key={item.href} style={{"--orbit-color":orbitColors[i],"animationDelay":(-32*i/visible.length)+"s"} as CSSProperties} href={item.href}><i/><b>{item.title}</b></Link>)}
    </div>
    {items.length>4&&<nav className="orbit-pages" aria-label="Orbit pages"><button disabled={page===0} onClick={()=>setPage(page-1)}>Previous</button><span>{page+1} / {Math.ceil(items.length/4)}</span><button disabled={(page+1)*4>=items.length} onClick={()=>setPage(page+1)}>Next</button></nav>}
  </div>
}
export function GalaxyOverview({system=false}:{system?:boolean}){
  const root=system?design:dsa;
  const subject=system?"system-design":"dsa";
  return <OrbitScene title={root.title} items={root.children.map(child=>({title:child.title,href:mapUrl(subject,[child.title])}))}/>;
}





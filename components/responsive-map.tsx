import { GalaxyOverview, GalaxySky } from "./galaxy";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Binary, Boxes, ChevronLeft, ChevronRight, Database, GitBranch, Layers3, Maximize, Minus, Plus, Waypoints, Workflow } from "lucide-react";
import { Link } from "./link";
import { mapUrl, type AtlasNode } from "@/content/atlas";

const colors = ["#68d8c4", "#88b6ff", "#e8ae72", "#b39af5"];
const icons = [Layers3, Boxes, GitBranch, Workflow];
const pageSize = 4;
type Wire = { path: string; color: string };

function count(node: AtlasNode) {
  const kind = node.children[0]?.kind.toLowerCase();
  return kind ? node.children.length + " " + (kind==="family" && node.children.length!==1?"families":kind+(node.children.length===1?"":"s")) : node.kind;
}

export function ResponsiveMap({ item, subject, path, outline }: {
  item: AtlasNode; subject: string; path: string[]; outline: boolean;
}) {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [wires, setWires] = useState<Wire[]>([]);
  const plane = useRef<HTMLDivElement>(null);

  const overview=(subject==="dsa"||subject==="system-design") && path.length===0;
  const start = page * pageSize;
  const visible = item.children.slice(start, start + pageSize);
  const url = (...names: string[]) => mapUrl(subject, [...path, ...names]);
  const RootIcon = subject === "system-design" ? Database : Binary;

  useLayoutEffect(() => {
    const canvas = plane.current;
    if (!canvas) return;
    function draw() {
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const scale = bounds.width / canvas.offsetWidth;
      if (!scale) return;
      const rect = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { x:(r.left-bounds.left)/scale, y:(r.top-bounds.top)/scale, w:r.width/scale, h:r.height/scale };
      };
      const root = rect(canvas.querySelector(".mind-root")!);
      const compact = getComputedStyle(canvas).getPropertyValue("--vertical").trim() === "1";
      const paths: Wire[] = [];
      function connect(from: ReturnType<typeof rect>, to: ReturnType<typeof rect>, color: string) {
        const y = to.y + to.h / 2;
        if (compact) {
          const x = from.x + 15, top = from.y + from.h, bend = Math.min(15,(y-top)/2);
          paths.push({color,path:`M ${x} ${top} V ${y-bend} Q ${x} ${y} ${x+bend} ${y} H ${to.x}`});
        } else {
          const x = from.x + from.w, top = from.y + from.h / 2, mid = (x + to.x) / 2;
          paths.push({color,path:`M ${x} ${top} C ${mid} ${top}, ${mid} ${y}, ${to.x} ${y}`});
        }
      }
      canvas.querySelectorAll(".mind-limb").forEach((limb,i) => {
        const branch = rect(limb.querySelector(".mind-branch")!);
        const color = colors[(start+i)%colors.length];
        connect(root,branch,color);
        limb.querySelectorAll(".mind-leaf").forEach(leaf => connect(branch,rect(leaf),color));
      });
      setWires(paths);
    }
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    canvas.querySelectorAll(".mind-root,.mind-branch,.mind-leaf").forEach(el=>observer.observe(el));
    return () => observer.disconnect();
  }, [item, start, outline, zoom]);

  return <section className="graph mind-map galaxy-map" aria-label={item.title+" mind map"}>
    <header className="graph-bar"><span><Waypoints size={17}/>{outline?"Map outline":subject==="system-design"?"System Design galaxy":subject==="dsa"?"DSA galaxy":"Topic map"}</span><small><i/>{count(item)}</small></header>
    {outline ? <div className="outline">{item.children.map(child=><Link key={child.title} href={url(child.title)}><b>{child.title}</b><small>{count(child)}</small><ChevronRight size={14}/></Link>)}</div> :
      overview ? <GalaxyOverview system={subject==="system-design"}/> : <div className="mind-viewport"><GalaxySky/><div style={{width:zoom+"%"}}><div className="mind-plane" ref={plane} style={{zoom:zoom/100}}>
        <svg className="mind-wires" aria-hidden="true">{wires.map((w,i)=><path key={i} d={w.path} stroke={w.color}/>)}</svg>
        <div className="root-node mind-root"><div className="root-glyph"><RootIcon size={20}/></div><small>{item.kind}</small><strong>{item.title}</strong></div>
        <div className="mind-limbs">{visible.map((child,i)=>{
          const Icon=icons[(start+i)%icons.length];
          return <div className="mind-limb" key={child.title} style={{"--node-color":colors[(start+i)%colors.length]} as CSSProperties}>
            <Link className="branch-node mind-branch" href={url(child.title)}><span className="port left"/><span className="branch-icon"><Icon size={17}/></span><span><b>{child.title}</b><small>{count(child)}</small></span><ChevronRight size={14} className="chev"/></Link>
            <div className="mind-leaves">{child.children.slice(0,2).map(leaf=><Link className="leaf-node mind-leaf" key={leaf.title} href={url(child.title,leaf.title)}><i/>{leaf.title}</Link>)}</div>
          </div>;
        })}</div>
      </div></div></div>}
    {!outline&&!overview&&<footer className="graph-footer"><div className="map-pages">{item.children.length>pageSize&&<><button aria-label="Previous branches" disabled={!page} onClick={()=>setPage(page-1)}><ChevronLeft size={16}/></button><small aria-live="polite">{start+1}–{start+visible.length} of {item.children.length}</small><button aria-label="Next branches" disabled={start+pageSize>=item.children.length} onClick={()=>setPage(page+1)}><ChevronRight size={16}/></button></>}</div><div className="zoom"><button aria-label="Zoom out" disabled={zoom<=75} onClick={()=>setZoom(zoom-25)}><Minus size={15}/></button><small>{zoom}%</small><button aria-label="Zoom in" disabled={zoom>=175} onClick={()=>setZoom(zoom+25)}><Plus size={15}/></button><button aria-label="Fit map" onClick={()=>setZoom(100)}><Maximize size={15}/></button></div></footer>}
  </section>;
}




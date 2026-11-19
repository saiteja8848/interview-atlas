import {OrbitScene} from "./galaxy";
import {Link} from "./link";
import "@/app/atlas.css";
import "@/app/study-map.css";
import "@/app/galaxy.css";

export function HomeGalaxy({software=false}:{software?:boolean}){
  const title=software?"Software Engineering":"Computer Science Engineering";
  const items=software?[{title:"DSA",href:"/dsa"},{title:"System Design",href:"/system-design"}]:[{title:"Software Engineering",href:"/software-engineering"}];
  return <main className="atlas atlas-galaxy galaxy-focused home-galaxy"><div className="atlas-main"><div className="atlas-content">
    <div className="eyebrow"><span/> KNOWLEDGE ATLAS</div>
    <h1>{title}</h1>
    {software&&<Link className="orbit-back" href="/">← Computer Science Engineering</Link>}
    <section className="graph galaxy-map" aria-label={title+" galaxy"}>
      <header className="graph-bar"><span>Explore the galaxy</span></header>
      <OrbitScene title={title} items={items}/>
    </section>
  </div></div></main>;
}

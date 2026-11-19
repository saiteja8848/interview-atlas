

function treePoints(values: (string|number|null)[]) {
  const nodes:{value:string|number;x:number;y:number;parent:number}[]=[];
  if(values[0]==null)return nodes;
  nodes.push({value:values[0],x:50,y:0,parent:-1});
  let next=1;
  for(let parent=0;parent<nodes.length&&next<values.length;parent++){
    const p=nodes[parent];
    for(const direction of [-1,1]){
      const value=values[next++];
      if(value!=null)nodes.push({value,x:p.x+direction*25/2**p.y,y:p.y+1,parent});
    }
  }
  return nodes;
}

export function ExampleDiagram({value,topic}:{value:string;topic:string}){
  const tree=value.match(/^(?:tree|root)\s*[:=]\s*(\[[^\]]+\])/i) ||
    (/trees?|binary search tree/i.test(topic)&&value.match(/^(\[[^\]]+\])$/));
  if(tree){
    try{
      const values=JSON.parse(tree[1]);
      if(!Array.isArray(values)||values.length>18)return null;
      const nodes=treePoints(values);
      const depth=Math.max(...nodes.map(n=>n.y));
      if(!nodes.length||depth>4)return null;
      return <figure className="tree-example" aria-label={"Tree for "+tree[1]}><svg viewBox={`0 0 320 ${48+depth*42}`} role="img" aria-label="Tree edges connect each parent with its children">
        {nodes.slice(1).map((n,i)=><line key={i} x1={nodes[n.parent].x*3.2} y1={24+nodes[n.parent].y*42} x2={n.x*3.2} y2={24+n.y*42}/>)}
        {nodes.map((n,i)=><g key={i} transform={`translate(${n.x*3.2} ${24+n.y*42})`}><circle r="13"/><text textAnchor="middle" dominantBaseline="central">{n.value}</text></g>)}
      </svg></figure>;
    }catch{return null}
  }
  const list=value.match(/^(?:head\s*=\s*)?(-?\d+(?:\s*(?:→|->)\s*-?\d+){1,12})(?:\s*,.*)?$/);
  if(list)return <div className="linked-example" aria-label="Linked nodes">{list[1].split(/\s*(?:→|->)\s*/).map((v,i)=><span key={i}>{i>0&&<i>→</i>}<code>{v}</code></span>)}</div>;
  const named=value.match(/^(\w+)\s*=\s*(\[[-\d,.\s]+\])(?:,\s*(.*))?$/);
  if(named){
    try{
      const entries:number[]=JSON.parse(named[2]);
      if(entries.length>18||!entries.length)return null;
      return <div className="indexed-example"><small>{named[1]}</small><div>{entries.map((v,i)=><span key={i}><code>{v}</code><sub>{i}</sub></span>)}</div>{named[3]&&<code>{named[3]}</code>}</div>;
    }catch{return null}
  }
  return null;
}


import React,{useEffect,useMemo,useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

type Point={x:number;y:number};
type HistoryItem={at:string;event:string;delta:number};
const clamp=(n:number,min=0,max=100)=>Math.min(max,Math.max(min,n));
const phrases=["I noticed you.","That was a little fast.","You can stay. Just… over there.","Okay. One step closer.","I think I know this cursor.","You are learning how to approach me."];

function Field({cursor,trust,reduced}:{cursor:Point;trust:number;reduced:boolean}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;let raf=0;let time=0;const render=()=>{const dpr=Math.min(devicePixelRatio,2);const box=canvas.getBoundingClientRect();canvas.width=box.width*dpr;canvas.height=box.height*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,box.width,box.height);const count=reduced?22:54;for(let i=0;i<count;i++){const a=i/count*Math.PI*2+time*(.00008+(i%5)*.00001);const radius=70+(i%9)*29+trust*.7;const x=box.width*.58+Math.cos(a)*radius;const y=box.height*.47+Math.sin(a*1.21)*radius*.57;const distance=Math.hypot(cursor.x-x,cursor.y-y);ctx.beginPath();ctx.arc(x,y,distance<90?1.8:1,0,Math.PI*2);ctx.fillStyle=distance<90?"#ffd966":i%3===0?"#f4a7c1":"#84d5c7";ctx.globalAlpha=.18+(i%7)/16;ctx.fill()}ctx.globalAlpha=1;time+=16;raf=requestAnimationFrame(render)};render();return()=>cancelAnimationFrame(raf)},[cursor,trust,reduced]);return <canvas className="field" ref={ref} aria-hidden="true"/>}

function App(){
 const [trust,setTrust]=useState(()=>Number(localStorage.getItem("shy-trust")||18));
 const [cursor,setCursor]=useState<Point>({x:0,y:0});
 const [velocity,setVelocity]=useState(0);
 const [history,setHistory]=useState<HistoryItem[]>([]);
 const [reduced,setReduced]=useState(matchMedia("(prefers-reduced-motion: reduce)").matches);
 const [sound,setSound]=useState(false);
 const [visits,setVisits]=useState(()=>Number(localStorage.getItem("shy-visits")||0)+1);
 const last=useRef({x:0,y:0,t:performance.now()});const calm=useRef(0);const audio=useRef<AudioContext|null>(null);
 const stage=useMemo(()=>trust<22?0:trust<45?1:trust<72?2:3,[trust]);
 const record=(event:string,delta:number)=>setHistory(items=>[{at:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),event,delta},...items].slice(0,5));
 const tone=(frequency:number)=>{if(!sound)return;audio.current??=new AudioContext();const c=audio.current,o=c.createOscillator(),g=c.createGain();o.frequency.value=frequency;o.type="sine";g.gain.setValueAtTime(.035,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.5);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.5)};
 useEffect(()=>{localStorage.setItem("shy-visits",String(visits))},[visits]);
 useEffect(()=>{localStorage.setItem("shy-trust",String(Math.round(trust)))},[trust]);
 useEffect(()=>{const interval=setInterval(()=>{if(velocity<.18){calm.current++;if(calm.current%3===0)setTrust(t=>clamp(t+.7))}else calm.current=0},900);return()=>clearInterval(interval)},[velocity]);
 const move=(e:React.PointerEvent)=>{const now=performance.now(),dt=Math.max(16,now-last.current.t),speed=Math.hypot(e.clientX-last.current.x,e.clientY-last.current.y)/dt;last.current={x:e.clientX,y:e.clientY,t:now};setCursor({x:e.clientX,y:e.clientY});setVelocity(speed);if(speed>1.25)setTrust(t=>clamp(t-.34));};
 const approach=()=>{const delta=velocity<.35?8:velocity<.8?2:-7;setTrust(t=>clamp(t+delta));record(delta>0?"patient approach":"startled",delta);tone(delta>0?440:180)};
 const reset=()=>{setTrust(18);setHistory([]);localStorage.removeItem("shy-trust")};
 return <main onPointerMove={move} className={`app stage-${stage} ${reduced?"reduced":""}`}>
   <Field cursor={cursor} trust={trust} reduced={reduced}/><div className="grain"/>
   <header><a className="brand" href="#top"><i/>SHY SYSTEMS LAB <span>EXP / 01</span></a><div className="status"><b>{Math.round(trust)}%</b><span>TRUST INDEX</span></div></header>
   <section className="hero" id="top">
    <div className="eyebrow"><span>BEHAVIORAL INTERFACE</span><span>VISIT {String(visits).padStart(2,"0")}</span></div>
    <h1>The website<br/>that gets <em>shyer.</em></h1>
    <p>This interface reads the speed and patience of your cursor. Rush toward it and it retreats. Move gently and it slowly decides you are safe.</p>
    <div className="meter" aria-label={`Trust level ${Math.round(trust)} percent`}><span style={{width:`${trust}%`}}/><i style={{left:`${trust}%`}}/></div>
   </section>
   <section className="encounter" aria-live="polite">
    <div className="creature" style={{"--fear":`${(100-trust)/100}`} as React.CSSProperties} onPointerEnter={approach} tabIndex={0} onFocus={approach}>
      <div className="halo"/><div className="buddy" aria-hidden="true"><i className="ear ear-left"/><i className="ear ear-right"/><div className="buddy-body"><i className="tuft"/><div className="face"><i className="eye"/><i className="eye"/><b className="nose"/><span className="mouth"/><b className="cheeks"/></div><i className="arm arm-left"/><i className="arm arm-right"/></div><i className="foot foot-left"/><i className="foot foot-right"/></div><small>APPROACH SLOWLY</small>
    </div>
    <article><small>LIVE RESPONSE / {String(stage+1).padStart(2,"0")}</small><h2>{phrases[Math.min(phrases.length-1,Math.floor(trust/19))]}</h2><p>{stage===0?"The page is keeping its distance.":stage===1?"It is still cautious, but it has stopped hiding.":stage===2?"New details are appearing. It remembers your patience.":"Trust established. The interface is no longer trying to leave."}</p><button onClick={approach}>EXTEND A HAND <span>↗</span></button></article>
   </section>
   <section className="lab">
    <article className="telemetry"><header><span>BEHAVIOR LOG</span><b>LIVE</b></header>{history.length?history.map((item,i)=><div key={`${item.at}-${i}`}><time>{item.at}</time><span>{item.event}</span><b className={item.delta>0?"gain":"loss"}>{item.delta>0?"+":""}{item.delta}</b></div>):<p>Move toward the creature to begin the observation.</p>}</article>
    <article className="controls"><span>LAB CONTROLS</span><label><input type="checkbox" checked={sound} onChange={e=>setSound(e.target.checked)}/><i/> GENTLE AUDIO</label><label><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/><i/> REDUCED MOTION</label><button onClick={reset}>RESET RELATIONSHIP</button></article>
    <article className="method"><span>HOW IT WORKS</span><h3>Motion becomes temperament.</h3><p>Pointer velocity, dwell time, approach events, focus behavior, and returning visits feed a small client-side state machine. Your trust score stays on this device.</p><div><b>REACT</b><b>TYPESCRIPT</b><b>CANVAS</b><b>WEB AUDIO</b><b>LOCAL STORAGE</b></div></article>
   </section>
   <footer><span>AN EXPERIMENT IN PATIENCE</span><b>{trust>=72?"IT REMEMBERS YOU":"TRY AGAIN, MORE SLOWLY"}</b><a href="https://github.com/jean-tmk/website-that-gets-shyer">SOURCE ↗</a></footer>
 </main>
}
createRoot(document.getElementById("root")!).render(<App/>);

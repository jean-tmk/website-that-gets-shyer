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
 const [note,setNote]=useState("");
 const [kindness,setKindness]=useState<{id:number;x:number;y:number}[]>([]);
 const [secrets,setSecrets]=useState<number[]>([]);
 const [ritual,setRitual]=useState<"still"|"courage"|"hide">("still");
 const [visits,setVisits]=useState(()=>Number(localStorage.getItem("shy-visits")||0)+1);
  const [peekSpot,setPeekSpot]=useState<number|null>(null);
 const [peekFound,setPeekFound]=useState(false);
 const [peekMisses,setPeekMisses]=useState<number[]>([]);
 const [glowbugs,setGlowbugs]=useState<number[]>([]);
 const [lullaby,setLullaby]=useState<number[]>([]);
 const last=useRef({x:0,y:0,t:performance.now()});const calm=useRef(0);const audio=useRef<AudioContext|null>(null);const ambient=useRef<{master:GainNode;warm:OscillatorNode;air:OscillatorNode;lfo:OscillatorNode}|null>(null);const dwell=useRef<number|null>(null);
 const stage=useMemo(()=>trust<22?0:trust<45?1:trust<72?2:3,[trust]);
 const pipImage=["pip-hiding.png","pip-startled.png","pip-curious.png","pip-trusting.png"][stage];
 const record=(event:string,delta:number)=>setHistory(items=>[{at:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),event,delta},...items].slice(0,5));
 const getAudio=async()=>{const AudioCtor=window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;if(!AudioCtor)return null;audio.current??=new AudioCtor();if(audio.current.state==="suspended")await audio.current.resume();return audio.current};
 const playTone=async(frequency:number,force=false,delay=0)=>{if(!sound&&!force)return;const c=await getAudio();if(!c)return;const start=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(frequency,start);o.type="sine";g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(.075,start+.045);g.gain.exponentialRampToValueAtTime(.0001,start+.9);o.connect(g).connect(c.destination);o.start(start);o.stop(start+.94)};
 const startAmbient=async()=>{if(ambient.current)return;const c=await getAudio();if(!c)return;const master=c.createGain(),warm=c.createOscillator(),air=c.createOscillator(),warmGain=c.createGain(),airGain=c.createGain(),lfo=c.createOscillator(),lfoDepth=c.createGain();master.gain.setValueAtTime(.0001,c.currentTime);master.gain.exponentialRampToValueAtTime(.75,c.currentTime+1.5);warm.type="sine";warm.frequency.value=174.61;warmGain.gain.value=.022;air.type="triangle";air.frequency.value=261.63;airGain.gain.value=.009;lfo.type="sine";lfo.frequency.value=.085;lfoDepth.gain.value=.004;lfo.connect(lfoDepth).connect(airGain.gain);warm.connect(warmGain).connect(master);air.connect(airGain).connect(master);master.connect(c.destination);warm.start();air.start();lfo.start();ambient.current={master,warm,air,lfo}};
 const stopAmbient=()=>{const c=audio.current,nodes=ambient.current;if(!c||!nodes)return;nodes.master.gain.cancelScheduledValues(c.currentTime);nodes.master.gain.setValueAtTime(Math.max(.0001,nodes.master.gain.value),c.currentTime);nodes.master.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.65);window.setTimeout(()=>{try{nodes.warm.stop();nodes.air.stop();nodes.lfo.stop();nodes.master.disconnect()}catch{}},700);ambient.current=null};
 const toggleSound=async(checked:boolean)=>{if(!checked){setSound(false);stopAmbient();return}await startAmbient();setSound(true);await Promise.all([playTone(392,true,0),playTone(523.25,true,.16),playTone(659.25,true,.34)])};
 useEffect(()=>{localStorage.setItem("shy-visits",String(visits))},[visits]);
  useEffect(()=>{localStorage.setItem("shy-trust",String(Math.round(trust)))},[trust]);
 useEffect(()=>{if(!sound)return;const timer=window.setInterval(()=>{void playTone(trust>60?493.88:349.23);window.setTimeout(()=>void playTone(trust>60?659.25:440),220)},5400);return()=>window.clearInterval(timer)},[sound,trust]);
 useEffect(()=>()=>{if(dwell.current)window.clearTimeout(dwell.current);stopAmbient();void audio.current?.close()},[]);
 useEffect(()=>{const interval=setInterval(()=>{if(velocity<.18){calm.current++;if(calm.current%3===0)setTrust(t=>clamp(t+.7))}else calm.current=0},900);return()=>clearInterval(interval)},[velocity]);
 const move=(e:React.PointerEvent)=>{const now=performance.now(),dt=Math.max(16,now-last.current.t),speed=Math.hypot(e.clientX-last.current.x,e.clientY-last.current.y)/dt;last.current={x:e.clientX,y:e.clientY,t:now};setCursor({x:e.clientX,y:e.clientY});setVelocity(speed);if(speed>1.25)setTrust(t=>clamp(t-.34));};
 const approach=()=>{const delta=velocity<.35?8:velocity<.8?2:-7;setTrust(t=>clamp(t+delta));record(delta>0?"patient approach":"startled",delta);playTone(delta>0?440:180)};
 const beginDwell=()=>{if(dwell.current)window.clearTimeout(dwell.current);dwell.current=window.setTimeout(()=>{setTrust(t=>clamp(t+6));record("quiet company",6);playTone(493.88)},1200)};
 const endDwell=()=>{if(dwell.current)window.clearTimeout(dwell.current);dwell.current=null};
 const leaveKindness=(e:React.MouseEvent<HTMLElement>)=>{const box=e.currentTarget.getBoundingClientRect();setKindness(items=>[...items.slice(-11),{id:Date.now(),x:(e.clientX-box.left)/box.width*100,y:(e.clientY-box.top)/box.height*100}]);setTrust(t=>clamp(t+3));record("kindness bloom",3);playTone(587.33)};
 const deliverNote=()=>{if(!note.trim())return;setTrust(t=>clamp(t+10));record("kind note left",10);setNote("");void playTone(659.25)};
 const collectSecret=(id:number)=>{if(secrets.includes(id))return;setSecrets(items=>[...items,id]);setTrust(t=>clamp(t+5));record("quiet star found",5);void playTone([523.25,587.33,698.46][id-1]||523.25)};
 const chooseRitual=(next:"still"|"courage"|"hide")=>{setRitual(next);const delta=next==="courage"?9:next==="hide"?4:6;setTrust(t=>clamp(t+delta));record(next==="courage"?"courage sent":next==="hide"?"shared hiding place":"quiet minute",delta);void playTone(next==="courage"?698.46:next==="hide"?349.23:493.88)};
 const startPeek=()=>{setPeekSpot(Math.floor(Math.random()*3));setPeekFound(false);setPeekMisses([]);record("peekaboo started",1)};
 const choosePeek=(spot:number)=>{if(peekSpot===null)return;if(spot===peekSpot){setPeekFound(true);setTrust(t=>clamp(t+7));record("Pip found gently",7);void playTone(659.25)}else{setPeekMisses(items=>items.includes(spot)?items:[...items,spot]);setTrust(t=>clamp(t-1));record("empty hiding place",-1);void playTone(261.63)}};
 const catchGlowbug=(id:number)=>{if(glowbugs.includes(id))return;setGlowbugs(items=>[...items,id]);setTrust(t=>clamp(t+2));record("glowbug guided home",2);void playTone(440+id*44)};
 const addLullaby=(frequency:number)=>{setLullaby(notes=>[...notes.slice(-7),frequency]);void playTone(frequency,true);if(lullaby.length===7){setTrust(t=>clamp(t+5));record("tiny lullaby made",5)}};
 const reset=()=>{setTrust(18);setHistory([]);setPeekSpot(null);setPeekFound(false);setPeekMisses([]);setGlowbugs([]);setLullaby([]);localStorage.removeItem("shy-trust")};
 return <main onPointerMove={move} className={`app stage-${stage} ritual-${ritual} ${reduced?"reduced":""}`}>
   <Field cursor={cursor} trust={trust} reduced={reduced}/><div className="grain"/>
   <header><a className="brand" href="#top"><i/>SHY SYSTEMS LAB <span>EXP / 01</span></a><div className="status"><b>{Math.round(trust)}%</b><span>TRUST INDEX</span></div></header>
   <section className="hero" id="top">
    <div className="eyebrow"><span>BEHAVIORAL INTERFACE</span><span>VISIT {String(visits).padStart(2,"0")}</span></div>
    <h1>The website<br/>that gets <em>shyer.</em></h1>
    <p>This interface reads the speed and patience of your cursor. Rush toward it and it retreats. Move gently and it slowly decides you are safe.</p>
    <div className="premise-demo peeking" aria-label="Hover near Pip to see him get shy"><div className="demo-door"/><img src={`${import.meta.env.BASE_URL}pip/pip-curious.png`} alt="Pip cautiously peeking from beside a doorway"/><span className="demo-calm">MOVE OVER PIP — HE GETS SHY</span><span className="demo-hover">YOU GOT CLOSE — PIP DUCKED AWAY</span></div>
    <div className="meter" aria-label={`Trust level ${Math.round(trust)} percent`}><span style={{width:`${trust}%`}}/><i style={{left:`${trust}%`}}/></div>
   </section>
   <section className="encounter" aria-live="polite" onDoubleClick={leaveKindness}>
    {[1,2,3].map(id=><button key={id} type="button" className={`quiet-star quiet-star-${id} ${secrets.includes(id)?"found":""}`} onClick={()=>collectSecret(id)} aria-label={secrets.includes(id)?`Quiet star ${id} found`:`Find quiet star ${id}`}>✦</button>)}
    {kindness.map((bloom,i)=><i className="kindness-bloom" key={bloom.id} style={{left:`${bloom.x}%`,top:`${bloom.y}%`,"--bloom":i} as React.CSSProperties}>✿</i>)}
    <div className="creature" style={{"--fear":`${(100-trust)/100}`} as React.CSSProperties} onPointerEnter={()=>{approach();beginDwell()}} onPointerLeave={endDwell} tabIndex={0} onFocus={()=>{approach();beginDwell()}} onBlur={endDwell}>
      <div className="halo"/><div className="buddy pip-art" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}pip/${pipImage}`} alt=""/></div><small>{stage<2?"PIP IS HIDING — APPROACH SLOWLY":"PIP IS LISTENING"}</small>
    </div>
    <article><small>LIVE RESPONSE / {String(stage+1).padStart(2,"0")}</small><h2>{phrases[Math.min(phrases.length-1,Math.floor(trust/19))]}</h2><p>{stage===0?"Pip is behind the curtain. Fast movement makes the room close up.":stage===1?"A cautious peek. Stay nearby without chasing.":stage===2?"The room is blooming. Pip remembers your patience.":"Trust established. Pip will stay even when you move."}</p><div className="comfort-rituals"><button onClick={()=>chooseRitual("still")} className={ritual==="still"?"active":""}><i>◌</i><b>SIT QUIETLY</b><span>The room slows down.</span></button><button onClick={()=>chooseRitual("hide")} className={ritual==="hide"?"active":""}><i>⌂</i><b>HIDE TOGETHER</b><span>The curtains make a den.</span></button><button onClick={()=>chooseRitual("courage")} className={ritual==="courage"?"active":""}><i>✦</i><b>SEND COURAGE</b><span>Color returns to the room.</span></button></div><div className="ritual"><label htmlFor="kind-note">LEAVE SOMETHING KIND</label><div><input id="kind-note" value={note} onChange={e=>setNote(e.target.value)} onKeyDown={e=>e.key==="Enter"&&deliverNote()} placeholder="you don't have to come closer…"/><button onClick={deliverNote}>LEAVE NOTE</button></div><small>DOUBLE-CLICK THE ROOM TO GROW A KINDNESS BLOOM · HOVER QUIETLY FOR 1.2 SECONDS</small></div></article>
   </section>
   <section className="playroom">
    <header><small>THINGS TO DO / NO RUSH</small><h2>Play at Pip's pace.</h2><p>Each activity rewards noticing, listening, and trying again—not clicking fastest.</p></header>
    <div className="play-grid">
     <article className="peek-game"><small>01 / PEEKABOO</small><h3>Which curtain?</h3><p>{peekSpot===null?"Invite Pip to hide.":peekFound?"You found him. He stayed this time.":"Choose gently—Pip may move."}</p><div>{[0,1,2].map(spot=><button key={spot} onClick={()=>choosePeek(spot)} className={peekFound&&peekSpot===spot?"found":peekMisses.includes(spot)?"empty":""}><i>▥</i>{peekFound&&peekSpot===spot?<img src={`${import.meta.env.BASE_URL}pip/pip-hiding.png`} alt="Pip"/>:peekMisses.includes(spot)?<span className="empty-room"><b>EMPTY</b><em>Pip isn't here</em></span>:<span>CURTAIN {spot+1}</span>}</button>)}</div><button className="start-game" onClick={startPeek}>{peekSpot===null?"ASK PIP TO HIDE":"HIDE AGAIN"}</button>
     </article>
     <article className="glow-game"><small>02 / GLOWBUGS</small><h3>Guide them home.</h3><p>{glowbugs.length} of 6 glowbugs found. They brighten when you notice them.</p><div>{[0,1,2,3,4,5].map(id=><button key={id} className={glowbugs.includes(id)?"caught":""} onClick={()=>catchGlowbug(id)} aria-label={glowbugs.includes(id)?"Glowbug collected":"Collect glowbug"}>✦</button>)}</div>
     </article>
     <article className="song-game"><small>03 / TINY LULLABY</small><h3>Make a safe sound.</h3><p>Build an eight-note tune for Pip. Every shape makes a gentle note.</p><div>{[[261.63,"○"],[329.63,"△"],[392,"□"],[493.88,"✦"]].map(([freq,mark])=><button key={freq} onClick={()=>addLullaby(Number(freq))}>{mark}</button>)}</div><div className="melody">{lullaby.map((_,i)=><i key={i}/>)}</div>
     </article>
    </div>
   </section>
   <section className={`secret-garden ${secrets.length===3?"unlocked":""}`}><div><small>QUIET STAR MAP / {secrets.length} OF 3</small><h2>{secrets.length===3?"You found the room behind the room.":"Three tiny stars are hiding nearby."}</h2><p>{secrets.length===3?"Pip kept a secret garden for visitors patient enough to notice small things. Move through the flowers and they remember your cursor.":"They are tucked inside the encounter. None of them require speed—only looking."}</p></div><div className="garden-bed" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{"--flower":i} as React.CSSProperties}>✿</i>)}</div></section>
   <section className="lab">
    <article className="telemetry"><header><span>BEHAVIOR LOG</span><b>LIVE</b></header>{history.length?history.map((item,i)=><div key={`${item.at}-${i}`}><time>{item.at}</time><span>{item.event}</span><b className={item.delta>0?"gain":"loss"}>{item.delta>0?"+":""}{item.delta}</b></div>):<p>Move toward the creature to begin the observation.</p>}</article>
    <article className="controls"><span>LAB CONTROLS</span><label><input type="checkbox" checked={sound} onChange={e=>void toggleSound(e.target.checked)}/><i/> {sound?"GENTLE AUDIO — PLAYING":"GENTLE AUDIO"}</label><label><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/><i/> REDUCED MOTION</label><button onClick={reset}>RESET RELATIONSHIP</button></article>
    <article className="method"><span>HOW IT WORKS</span><h3>Motion becomes temperament.</h3><p>Pointer velocity, dwell time, approach events, focus behavior, and returning visits feed a small client-side state machine. Your trust score stays on this device.</p><div><b>REACT</b><b>TYPESCRIPT</b><b>CANVAS</b><b>WEB AUDIO</b><b>LOCAL STORAGE</b></div></article>
   </section>
   <footer><span>AN EXPERIMENT IN PATIENCE</span><b>{trust>=72?"IT REMEMBERS YOU":"TRY AGAIN, MORE SLOWLY"}</b><a href="https://github.com/jean-tmk/website-that-gets-shyer">SOURCE ↗</a></footer>
 </main>
}
createRoot(document.getElementById("root")!).render(<App/>);

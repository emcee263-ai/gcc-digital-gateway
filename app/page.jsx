"use client";
import {useRouter} from "next/navigation";
import {ArrowRight,ClipboardList,Droplets,Newspaper,ShieldCheck,CloudSnow} from "lucide-react";

export default function Home(){
  let r=useRouter();
  return <main className="landing-page">
    <nav className="landing-nav">
      <div className="landing-brand"><img src="/gcc-crest.png" alt="Gweru City Council crest"/><div><b>GCC DIGITAL GATEWAY</b><span>GWERU CITY COUNCIL</span></div></div>
      <button className="btn dark" onClick={()=>r.push("/login")}>Sign in <ArrowRight size={15}/></button>
    </nav>
    <section className="content landing-content">
      <div className="hero hero-cool">
        <div><div className="eyebrow">Gweru City Council • Digital Services</div><h1>One City.<br/>One Digital Gateway.</h1><p>Access municipal services, information, bills and service requests through one connected digital platform.</p><button className="btn white" onClick={()=>r.push("/login")}>Access Services <ArrowRight size={15}/></button></div>
        <div className="hero-side climate-card"><CloudSnow size={28}/><h3>Built for Gweru</h3><p className="small">A calm, cool civic interface inspired by Gweru's crisp winter atmosphere, balanced with the colours of the Council crest.</p></div>
      </div>
      <h2 className="section">Everything you need, in one place.</h2>
      <div className="grid3">{[[ClipboardList,"Service Requests","Report and track municipal issues."],[Droplets,"Billing","View bills, balances and statements."],[Newspaper,"Council Notices","Access verified Council information."]].map(([I,t,d])=><div className="card" key={t}><I className="feature-icon"/><h3>{t}</h3><p className="muted">{d}</p></div>)}</div>
      <div className="civic-note"><ShieldCheck size={20}/><div><b>Official Council information</b><span>One trusted gateway for residents and Council service teams.</span></div></div>
    </section>
  </main>
}

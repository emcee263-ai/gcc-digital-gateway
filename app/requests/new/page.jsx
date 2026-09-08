"use client";
import { Suspense, useState } from "react";
import { useApp } from "@/components/AppProvider";
import Guard from "@/components/Guard";
import Shell from "@/components/Shell";
import { Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function NewRequestForm() {
  const { user } = useApp();
  const r = useRouter();
  const sp = useSearchParams();
  const [f, setF] = useState({ category: sp.get("category") || "Water", location: "", description: "" });
  const [busy, setBusy] = useState(false);

  async function go(e) {
    e.preventDefault(); setBusy(true);
    try {
      const z = await fetch("/api/requests", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...f,resident:user.id}) });
      const x = await z.json(); alert("Request submitted: "+x.id); r.push("/requests");
    } catch (error) { console.error(error); alert("Unable to submit request. Please try again."); setBusy(false); }
  }

  return <form className="card form" onSubmit={go}><div className="fields">
    <div className="field"><label>Service category</label><select value={f.category} onChange={e=>setF({...f,category:e.target.value})}>{["Water","Sewer","Roads","Waste","Street lighting","Drainage","Public facilities","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
    <div className="field"><label>Location</label><input required value={f.location} placeholder="Area / address" onChange={e=>setF({...f,location:e.target.value})}/></div>
    <div className="field full"><label>Description</label><textarea required value={f.description} placeholder="Describe the problem..." onChange={e=>setF({...f,description:e.target.value})}/></div>
  </div><div style={{textAlign:"right"}}><button disabled={busy} className="btn primary"><Send size={15}/>{busy?"Submitting...":"Submit request"}</button></div></form>
}

export default function NewRequest(){return <Guard roles={["resident"]}><Shell title="New Service Request"><div className="content"><div className="eyebrow">Report a municipal problem</div><h1 style={{fontFamily:"Space Grotesk"}}>Submit a service request</h1><p className="muted">Your request will receive a reference number and follow the Council workflow.</p><Suspense fallback={<div className="card">Loading request form...</div>}><NewRequestForm/></Suspense></div></Shell></Guard>}

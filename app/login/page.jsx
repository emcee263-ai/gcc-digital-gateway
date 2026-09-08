"use client";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {useApp} from "@/components/AppProvider";

export default function Login(){
  const{login}=useApp(),r=useRouter(),[email,setEmail]=useState("resident@gcc.demo"),[users,setUsers]=useState([]);
  useEffect(()=>{fetch("/api/users").then(x=>x.json()).then(setUsers)},[]);
  function go(e){e.preventDefault();let u=users.find(x=>x.email===email);if(!u)return alert("Choose a demo account.");login(u);r.push(u.role==="resident"?"/dashboard":"/admin")}
  return <main className="login"><form className="loginbox" onSubmit={go}>
    <div className="login-logo"><img src="/gcc-crest.png" alt="Gweru City Council crest"/></div>
    <div className="loginbrand">GCC DIGITAL GATEWAY <span>GWERU CITY COUNCIL</span></div>
    <h1>Welcome back</h1><p className="muted">Sign in to your digital municipal services.</p>
    <div className="field" style={{marginTop:22}}><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/></div>
    <div className="field"><label>Password</label><input type="password" value="demo" readOnly/></div>
    <button className="btn primary" style={{width:"100%",justifyContent:"center"}}>Sign in</button>
    <div className="demo"><b>Demo accounts</b><br/>resident@gcc.demo — Resident<br/>clerk@gcc.demo — Service Clerk<br/>finance@gcc.demo — Finance<br/>admin@gcc.demo — Administrator<br/>Any password works in this prototype.</div>
  </form></main>
}

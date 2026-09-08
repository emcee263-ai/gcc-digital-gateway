"use client";
import {useState} from "react";
import {Bell,Menu,LayoutDashboard,ClipboardList,Wallet,Newspaper,Search,UserRound,BarChart3,Users,Building2,LogOut} from "lucide-react";
import {usePathname,useRouter} from "next/navigation";
import {useApp} from "./AppProvider";

export default function Shell({children,title}){
  const[open,setOpen]=useState(false),{user,logout}=useApp(),path=usePathname(),r=useRouter();
  const resident=[["/dashboard","Dashboard",LayoutDashboard],["/services","Services",Search],["/requests","My Requests",ClipboardList],["/billing","Billing",Wallet],["/notices","Notices",Newspaper],["/city-information","City Information",Building2],["/profile","Profile",UserRound]];
  const admin=[["/admin","Overview",LayoutDashboard],["/admin/requests","Requests",ClipboardList],["/admin/residents","Residents",Users],["/admin/billing","Billing",Wallet],["/admin/notices","Notices",Newspaper],["/admin/analytics","Analytics",BarChart3]];
  const items=user?.role==="resident"?resident:admin;
  return <>
    <aside className={"sidebar "+(open?"open":"")}>
      <div className="brand-block">
        <div className="brand-logo-wrap"><img src="/gcc-crest.png" alt="Gweru City Council crest" className="brand-logo"/></div>
        <div className="brand">GCC DIGITAL GATEWAY<small>GWERU CITY COUNCIL</small></div>
      </div>
      <nav className="nav">{items.map(([h,l,I])=><button className={path===h?"active":""} key={h} onClick={()=>{r.push(h);setOpen(false)}}><I size={18}/>{l}</button>)}</nav>
      <div className="sidebar-footer"><button className="logout-btn" onClick={logout}><LogOut size={18}/>Sign out</button></div>
    </aside>
    <main className="main">
      <header className="top">
        <button className="icon mobile" onClick={()=>setOpen(!open)}><Menu size={18}/></button>
        <div className="title">{title}</div>
        <div className="actions"><button className="icon" aria-label="Notifications"><Bell size={17}/></button><div className="avatar">{user?.name?.split(" ").map(x=>x[0]).join("").slice(0,2)}</div></div>
      </header>
      {children}
    </main>
  </>;
}

 "use client";
import {createContext,useContext,useEffect,useState} from "react";
const C=createContext({});
export function AppProvider({children}){const[user,setUser]=useState(null),[requests,setRequests]=useState([]),[notices,setNotices]=useState([]);
useEffect(()=>{let u=localStorage.getItem("gcc_user");if(u)setUser(JSON.parse(u));Promise.all([fetch("/api/requests").then(r=>r.json()),fetch("/api/notices").then(r=>r.json())]).then(([r,n])=>{setRequests(r);setNotices(n)})},[]);
const login=u=>{localStorage.setItem("gcc_user",JSON.stringify(u));setUser(u)},logout=()=>{localStorage.removeItem("gcc_user");setUser(null)};
return <C.Provider value={{user,login,logout,requests,setRequests,notices,setNotices}}>{children}</C.Provider>}export const useApp=()=>useContext(C);
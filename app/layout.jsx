import "./globals.css";import {AppProvider} from "@/components/AppProvider";
export const metadata={title:"GCC Digital Gateway",description:"Gweru City Council digital services prototype"};
export default function RootLayout({children}){return <html lang="en"><body><AppProvider>{children}</AppProvider></body></html>}
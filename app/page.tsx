"use client";

import { NavBar } from "@/components/NavBar";
import {Footer} from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <NavBar/>
      <div className="flex-1 flex flex-col items-center justify-center font-sans">
        <p>Main Page</p>
      </div>
      <Footer/>
    </div>
    
  );
}

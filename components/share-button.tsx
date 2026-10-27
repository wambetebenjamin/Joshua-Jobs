'use client';import { Share2 } from 'lucide-react';
export default function ShareButton(){return <button className="button button-outline" onClick={()=>{if(navigator.share)navigator.share({title:document.title,url:location.href});else navigator.clipboard.writeText(location.href)}}><Share2 size={16}/> Share this job</button>}

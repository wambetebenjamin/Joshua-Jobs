'use client';
import { useEffect,useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
export default function PrivacyAnalytics(){const [enabled,setEnabled]=useState(false);useEffect(()=>{const sync=()=>setEnabled(localStorage.getItem('joshua-jobs-cookie-consent')==='accepted');sync();window.addEventListener('joshua-cookie-consent',sync);return()=>window.removeEventListener('joshua-cookie-consent',sync)},[]);return enabled?<><Analytics/><SpeedInsights/></>:null}

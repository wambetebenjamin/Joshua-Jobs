import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import PrivacyAnalytics from '@/components/privacy-analytics';
import './globals.css';
import SiteLayout from '@/components/layout';
export const metadata:Metadata={title:{default:'Joshua Jobs | Work that fits your county',template:'%s | Joshua Jobs'},description:'Find work near you. Search verified opportunities by county across Kenya, or post a job with Joshua Jobs.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://joshuajobs.co.ke')};
export const viewport:Viewport={width:'device-width',initialScale:1,maximumScale:5,userScalable:true};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-KE"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&family=Inter:wght@600;700;800&display=swap" rel="stylesheet"/></head><body>{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY&&<Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive"/>}<SiteLayout>{children}</SiteLayout><PrivacyAnalytics/></body></html>}

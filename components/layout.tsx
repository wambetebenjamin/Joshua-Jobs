import { Header, Footer, Whatsapp, CookieConsent, LoadingScreen, LenisInit } from './site';
export default function SiteLayout({children}:{children:React.ReactNode}){return <><LenisInit/><LoadingScreen/><Header/><main>{children}</main><Footer/><Whatsapp/><CookieConsent/></>}

import { z } from 'zod';
export async function verifyCaptcha(token:string|undefined, fallbackToken?:string){
 if(!process.env.RECAPTCHA_SECRET_KEY){if(process.env.NODE_ENV!=='production')return {ok:true as const,score:1};return {ok:false as const,error:'CAPTCHA is not configured.'}}
 if(!token)return {ok:false as const,error:'Please complete the security check.'};
 async function verify(response:string){const body=new URLSearchParams({secret:process.env.RECAPTCHA_SECRET_KEY!,response});const r=await fetch('https://www.google.com/recaptcha/api/siteverify',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body,cache:'no-store'});return r.json() as Promise<{success:boolean;score?:number;action?:string}>}
 try{const result=await verify(token);if(result.success&&(result.score??0)>=.5)return {ok:true as const,score:result.score??1};if(fallbackToken){const v2=await verify(fallbackToken);if(v2.success)return {ok:true as const,score:1}}return {ok:false as const,error:result.success?'CAPTCHA_FALLBACK_REQUIRED':'Security check failed.'}}catch{return {ok:false as const,error:'Security check could not be verified.'}}
}
export async function saveRecord(key:string,value:unknown){const url=process.env.KV_REST_API_URL;const token=process.env.KV_REST_API_TOKEN;if(!url||!token)return false;const res=await fetch(`${url.replace(/\/$/,'')}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});return res.ok}
export const emailSchema=z.email();
export function jsonError(error:string,status=400){return Response.json({error},{status})}

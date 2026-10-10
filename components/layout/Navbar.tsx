"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/config/navigation";
import type { NavItem } from "@/types/navigation";

function panelId(href: string) { return "mega-" + href.replace(/[^a-z0-9]+/gi, "-"); }
const descriptions: Record<string,string> = {
  Product:"Understand the workflow, core controls and current platform capabilities.",
  Solutions:"See how reconciliation and exception handling map to different teams.",
  Features:"Explore the specific jobs PesaGuard can support today.",
  Integrations:"Check supported connections and the boundaries of each adapter.",
  Docs:"Find the implementation details needed to evaluate or build an integration."
};

export function Navbar() {
  const pathname=usePathname();
  const [openPanel,setOpenPanel]=useState<string|null>(null);
  const [drawerOpen,setDrawerOpen]=useState(false);
  const [mobileOpenGroup,setMobileOpenGroup]=useState<string|null>("Product");
  const [elevated,setElevated]=useState(false);
  useEffect(()=>{const onScroll=()=>setElevated(window.scrollY>8);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  useEffect(()=>{if(!openPanel)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpenPanel(null);};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);},[openPanel]);
  useEffect(()=>{setOpenPanel(null);setDrawerOpen(false);},[pathname]);
  const isCurrent=(href:string)=>pathname===href||pathname.startsWith(href+"/");
  return <header className="site-header" data-elevated={elevated}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="container header-inner">
      <Link aria-label="PesaGuard home" className="brand" href="/"><Image alt="" aria-hidden="true" className="brand-logo" height={34} src="/logo/brand-mark.svg" width={34}/><span className="brand-wordmark"><span>Pesa</span><span>Guard</span></span><span className="brand-sub">M-Pesa reconciliation</span></Link>
      <nav aria-label="Main navigation" className="primary-nav hide-mobile"><ul className="nav-list">{navigation.primary.map((item:NavItem)=>{
        const open=openPanel===item.label;
        const headline=item.label==="Docs"?"Build with clear contracts.":item.label==="Integrations"?"Know what connects.":item.label==="Solutions"?"Built around real workflows.":item.label==="Features"?"One job at a time.":"A clearer payment operation.";
        return <li className="nav-item" data-open={open?"true":"false"} data-current={isCurrent(item.href)?"true":"false"} key={item.href}>
          <span className="nav-nested"><Link aria-current={isCurrent(item.href)?"page":undefined} className="nav-link" href={item.href}>{item.label}</Link>{item.groups&&item.groups.length?<button aria-controls={panelId(item.href)} aria-expanded={open} aria-label={(open?"Close":"Open")+" "+item.label+" menu"} className="nav-trigger" onClick={()=>setOpenPanel(open?null:item.label)} type="button"><ChevronDown size={14} aria-hidden="true"/></button>:null}</span>
          {item.groups&&item.groups.length?<div className="mega" id={panelId(item.href)} data-open={open?"true":"false"}>
            <div className="mega-head"><div><span className="mega-eyebrow">EXPLORE PESAGUARD / {item.label.toUpperCase()}</span><h2>{headline}</h2><p>{descriptions[item.label]||"Explore the PesaGuard platform."}</p></div><Link className="mega-overview" href={item.href} onClick={()=>setOpenPanel(null)}>View {item.label.toLowerCase()} <ArrowRight size={14} aria-hidden="true"/></Link></div>
            <div className={"mega-grid"+(item.groups.length>2?" mega-wide":"")}>{item.groups.map(group=><div className="mega-column" key={group.title}><p className="mega-title">{group.title}</p>{group.links.map(link=><Link className="mega-link" href={link.href} key={link.href+link.label} onClick={()=>setOpenPanel(null)}><span className="mega-link-copy"><strong>{link.label}</strong>{link.description?<span>{link.description}</span>:null}</span><ArrowRight className="mega-link-arrow" size={14} aria-hidden="true"/>{link.availability==="not-started"?<span className="mega-state">Planned</span>:null}</Link>)}</div>)}</div>
            {item.foot?<div className="mega-foot"><div><span className="mega-foot-label">NEED A STARTING POINT?</span><p>{item.foot.description||item.foot.label}</p></div><Link className="mega-foot-link" href={item.foot.href} onClick={()=>setOpenPanel(null)}>{item.foot.label} <ArrowRight size={14} aria-hidden="true"/></Link></div>:null}
          </div>:null}
        </li>;
      })}</ul></nav>
      <div className="header-actions"><Link className="header-status" href="/status"><span aria-hidden="true" className="status-dot status-dot-muted"/>Status</Link><span className="hide-mobile"><Button href="/contact/sales" size="sm">Talk to us</Button></span><button aria-controls="mobile-navigation" aria-expanded={drawerOpen} aria-label={drawerOpen?"Close menu":"Open menu"} className="nav-toggle show-mobile" onClick={()=>setDrawerOpen(!drawerOpen)} type="button">{drawerOpen?<X size={19} aria-hidden="true"/>:<Menu size={19} aria-hidden="true"/>}</button></div>
    </div>
    {drawerOpen?<div className="mobile-nav show-mobile" id="mobile-navigation"><div className="container mobile-nav-inner"><div className="mobile-nav-intro"><span>EXPLORE PESAGUARD</span><p>Payment reconciliation, with clear boundaries.</p></div>
      {navigation.primary.map(item=>{const expanded=mobileOpenGroup===item.label;return <section className="mobile-group" key={item.href}><div className="mobile-group-head"><Link className="mobile-group-overview" href={item.href} onClick={()=>setDrawerOpen(false)}>{item.label}</Link>{item.groups&&item.groups.length?<button aria-controls={"mobile-"+panelId(item.href)} aria-expanded={expanded} aria-label={(expanded?"Collapse":"Expand")+" "+item.label} className="mobile-group-toggle" onClick={()=>setMobileOpenGroup(expanded?null:item.label)} type="button"><ChevronDown size={16}/></button>:null}</div>
        {item.groups&&item.groups.length&&expanded?<div className="mobile-group-links" id={"mobile-"+panelId(item.href)}>{item.groups.flatMap(group=>group.links.map(link=><Link className="mobile-link" href={link.href} key={item.href+link.href+link.label} onClick={()=>setDrawerOpen(false)}><span>{link.label}{link.availability==="not-started"?<small>Planned</small>:null}</span><ArrowRight size={13} aria-hidden="true"/></Link>))}</div>:null}</section>;})}
      <div className="mobile-quick-links"><Link href="/status" onClick={()=>setDrawerOpen(false)}>Service status</Link><Link href="/documentation" onClick={()=>setDrawerOpen(false)}>Documentation</Link><Link href="/security" onClick={()=>setDrawerOpen(false)}>Security</Link></div><div className="mobile-actions"><Button block href="/contact/sales">Talk to us</Button></div>
    </div></div>:null}
  </header>;
}

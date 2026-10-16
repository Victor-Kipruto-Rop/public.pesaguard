"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/config/navigation";
import { tenantAppRoutes } from "@/config/app";
import type { NavItem } from "@/types/navigation";

function panelId(href: string) { return "mega-" + href.replace(/[^a-z0-9]+/gi, "-"); }

export function Navbar() {
  const pathname=usePathname();
  const [openPanel,setOpenPanel]=useState<string|null>(null);
  const [drawerOpen,setDrawerOpen]=useState(false);
  const [elevated,setElevated]=useState(false);
  const headerRef=useRef<HTMLElement>(null);
  const openTriggerRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{const onScroll=()=>setElevated(window.scrollY>8);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  useEffect(()=>{
    if(!openPanel)return;
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){
        setOpenPanel(null);
        openTriggerRef.current?.focus();
      }
    };
    const onPointerDown=(event:PointerEvent)=>{
      if(event.target instanceof Node&&!headerRef.current?.contains(event.target))setOpenPanel(null);
    };
    window.addEventListener("keydown",onKey);
    document.addEventListener("pointerdown",onPointerDown);
    return()=>{
      window.removeEventListener("keydown",onKey);
      document.removeEventListener("pointerdown",onPointerDown);
    };
  },[openPanel]);
  useEffect(()=>{setOpenPanel(null);setDrawerOpen(false);},[pathname]);
  const isCurrent=(href:string)=>pathname===href||pathname.startsWith(href+"/");
  return <header className="site-header" data-elevated={elevated} data-menu-open={openPanel!==null} ref={headerRef}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="container header-inner">
      <Link aria-label="PesaGuard home" className="brand" href="/"><Image alt="" aria-hidden="true" className="brand-logo" height={34} src="/logo/brand-mark.svg" width={34}/><span className="brand-wordmark"><span>Pesa</span><span>Guard</span></span><span className="brand-sub">M-Pesa reconciliation</span></Link>
      <nav aria-label="Main navigation" className="primary-nav hide-mobile"><ul className="nav-list">{navigation.primary.map((item:NavItem)=>{
        const open=openPanel===item.label;
        return <li className="nav-item" data-open={open?"true":"false"} data-current={isCurrent(item.href)?"true":"false"} key={item.href}>
          <span className="nav-nested"><Link aria-current={isCurrent(item.href)?"page":undefined} className="nav-link" href={item.href}>{item.label}</Link>{item.groups&&item.groups.length?<button aria-controls={panelId(item.href)} aria-expanded={open} aria-haspopup="true" aria-label={(open?"Close":"Open")+" "+item.label+" menu"} className="nav-trigger" id={`${panelId(item.href)}-trigger`} onClick={event=>{openTriggerRef.current=event.currentTarget;setOpenPanel(open?null:item.label);}} type="button"><ChevronDown size={14} aria-hidden="true"/></button>:null}</span>
          {item.groups?.length ? (
            <div aria-labelledby={`${panelId(item.href)}-trigger`} className="mega" id={panelId(item.href)} data-open={open?"true":"false"} role="region">
              <div className={"mega-grid"+(item.groups.length>2?" mega-wide":"")}>
                {item.groups.map((group, index) => {
                  const headingId = `${panelId(item.href)}-group-${index}`;
                  return (
                    <section aria-labelledby={headingId} className="mega-column" key={group.title}>
                      <h2 className="mega-title" id={headingId}>{group.title}</h2>
                      <ul className="mega-links">
                        {group.links.map(link => (
                          <li key={link.href+link.label}>
                            <Link className="mega-link" href={link.href} onClick={()=>setOpenPanel(null)}>
                              <strong>{link.label}</strong>
                              {link.availability==="not-started"?<span className="mega-state">Planned</span>:null}
                              <ArrowRight className="mega-link-arrow" size={14} aria-hidden="true"/>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </div>
          ) : null}
        </li>;
      })}</ul></nav>
      <div className="header-actions">
        <span className="hide-mobile header-app-actions">
          <Button href={tenantAppRoutes.signIn} size="sm" variant="quiet">Sign in</Button>
          <Button href={tenantAppRoutes.getStarted} size="sm">Get started</Button>
        </span>
        <button aria-controls="mobile-navigation" aria-expanded={drawerOpen} aria-label={drawerOpen?"Close menu":"Open menu"} className="nav-toggle show-mobile" onClick={()=>setDrawerOpen(!drawerOpen)} type="button">{drawerOpen?<X size={19} aria-hidden="true"/>:<Menu size={19} aria-hidden="true"/>}</button>
      </div>
    </div>
    {drawerOpen?<div className="mobile-nav show-mobile" id="mobile-navigation"><div className="container mobile-nav-inner"><div className="mobile-nav-intro"><span>EXPLORE PESAGUARD</span><p>Payment reconciliation, with clear boundaries.</p></div>
      <nav aria-label="Mobile main navigation" className="mobile-nav-sections">
        {navigation.primary.map(item=><section aria-labelledby={"mobile-"+panelId(item.href)+"-title"} className="mobile-group" key={item.href}>
          <div className="mobile-group-head"><Link aria-current={isCurrent(item.href)?"page":undefined} className="mobile-group-overview" href={item.href} onClick={()=>setDrawerOpen(false)} id={"mobile-"+panelId(item.href)+"-title"}>{item.label}</Link></div>
          {item.groups?.map(group=><div className="mobile-group-links" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(link=><Link aria-current={isCurrent(link.href)?"page":undefined} className="mobile-link" href={link.href} key={link.href+link.label} onClick={()=>setDrawerOpen(false)}><span>{link.label}{link.availability==="not-started"?<small>Planned</small>:null}</span><ArrowRight size={13} aria-hidden="true"/></Link>)}
          </div>)}
        </section>)}
      </nav>
      <div className="mobile-quick-links"><Link href="/status" onClick={()=>setDrawerOpen(false)}>Service status</Link></div>
      <div className="mobile-actions">
        <Button block href={tenantAppRoutes.signIn} variant="quiet">Sign in to PesaGuard</Button>
        <Button block href={tenantAppRoutes.getStarted}>Get started</Button>
        <Button block href="/contact/sales" variant="lime">Talk to our team</Button>
      </div>
    </div></div>:null}
  </header>;
}

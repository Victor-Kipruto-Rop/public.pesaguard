import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { CookiePreferencesButton } from "@/components/layout/CookieConsent";
import { Button } from "@/components/ui/Button";
import { tenantAppRoutes } from "@/config/app";

/** Site footer with grouped product navigation and developer quick links. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link aria-label="PesaGuard home" className="brand" href="/">
            <Image alt="" aria-hidden="true" className="brand-logo" height={32} src="/logo/brand-mark.svg" width={32} />
            <span className="brand-wordmark"><span>Pesa</span><span>Guard</span></span>
          </Link>
          <p className="footer-note">{siteConfig.tagline}</p>
          <p className="footer-maturity">{siteConfig.maturity}</p>
          <div className="footer-brand-actions"><Button href={tenantAppRoutes.getStarted} size="sm">Open tenant dashboard</Button><Button href="/contact/sales" size="sm" variant="lime">Talk to our team</Button></div>
        </div>

        <div className="footer-links">
          {navigation.footer.map((group) => (
            <nav aria-label={`${group.title} links`} className="footer-column" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} PesaGuard <span aria-hidden="true">·</span> {siteConfig.region}
        </span>
        <span className="footer-motto">Every Transaction.Accounted For</span>
        <span className="footer-legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <CookiePreferencesButton />
          <a href={siteConfig.repository} rel="noreferrer" target="_blank">Source repository</a>
        </span>
      </div>
    </footer>
  );
}
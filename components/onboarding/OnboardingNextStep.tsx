"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleHelp, ClipboardCheck, MailCheck, ShieldCheck, Users, Workflow } from "lucide-react";

type Stage = "verify-email" | "status" | "setup" | "complete" | "invite";
type Draft = { fullName?: string; email?: string; phone?: string; organization?: string; organizationType?: string; country?: string; transactionVolume?: string; paymentSource?: string; businessRecord?: string };
const dashboardUrl = process.env.NEXT_PUBLIC_TENANT_APP_URL ?? "https://app.pesaguard.co.ke";

export function OnboardingNextStep({ stage }: { stage: Stage }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>({});
  const [email, setEmail] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");
  const [recordSource, setRecordSource] = useState("CSV / spreadsheet");
  const [checks, setChecks] = useState<string[]>(["review"]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("pesaguard.onboarding.preview");
      if (saved) {
        const parsed = JSON.parse(saved) as Draft;
        setDraft(parsed);
        setEmail(parsed.email ?? "");
        setRecordSource(parsed.businessRecord ?? "CSV / spreadsheet");
      }
    } catch { /* Keep the page useful even when browser storage is unavailable. */ }
  }, []);
  function go(path: string) { router.push(path); }
  function toggleCheck(value: string) { setChecks((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }
  function finishSetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      sessionStorage.setItem("pesaguard.onboarding.previewSetup", JSON.stringify({
        invite_emails: inviteEmails.split(/[\n,;]/).map((item) => item.trim()).filter(Boolean),
        record_source: recordSource, checklist: checks,
      }));
    } catch { /* This is preview-only state. */ }
    go("/onboarding/complete?preview=1");
  }
  const content = {
    "verify-email": {
      icon: <MailCheck size={25} />, eyebrow: "STEP 2 · EMAIL VERIFICATION", title: "Verify the address that owns your workspace.", description: "Email verification is a required identity checkpoint. This frontend preview does not send email or verify the address; your connected backend will issue and validate a single-use, expiring verification link.",
    },
    status: {
      icon: <ClipboardCheck size={25} />, eyebrow: "ONBOARDING STATUS", title: "Keep every activation step visible.", description: "A real status page should display the state returned by the Core API. This preview uses no live request ID and cannot confirm verification, review, approval or tenant provisioning.",
    },
    setup: {
      icon: <Workflow size={25} />, eyebrow: "STEP 3 · WORKSPACE SETUP", title: "Prepare your workspace for the first reconciliation.", description: "Choose the record source, prepare team invitations and review the setup checklist. No invitation or payment connection is sent from this frontend preview.",
    },
    complete: {
      icon: <CheckCircle2 size={25} />, eyebrow: "ONBOARDING JOURNEY", title: "Your frontend journey is ready for backend integration.", description: "This screen demonstrates the intended handoff. It does not mean your email is verified, your organization is approved, or a tenant has been created.",
    },
    invite: {
      icon: <Users size={25} />, eyebrow: "TEAM INVITATION", title: "Join your organization securely.", description: "An invitation must be validated by the Core API before membership is granted. This screen is the frontend shell for that flow; it cannot accept an invite in preview mode.",
    },
  }[stage];

  return <div className="onboarding-page">
    <header className="onboarding-header"><Brand /><nav><Link href="/product">Product</Link><Link href="/security">Security</Link><Link className="onboarding-login" href="/login">Sign in <ArrowRight size={14}/></Link></nav></header>
    <div className="onboarding-shell onboarding-shell-single">
      <aside className="onboarding-aside">
        <div className="aside-label"><ShieldCheck size={14}/> P E S A G U A R D · ONBOARDING</div>
        <h1>Every step.<br/><span>Clearly accounted for.</span></h1>
        <p>From account request to a secure workspace, the connected API remains the source of truth for identity, tenant membership and access.</p>
        <div className="aside-benefits">
          <div><span><Check size={15}/></span><p><strong>Identity first</strong><small>Verification and session creation must happen on the server.</small></p></div>
          <div><span><Check size={15}/></span><p><strong>Tenant isolation</strong><small>Only server-authorized tenant memberships may access tenant data.</small></p></div>
          <div><span><Check size={15}/></span><p><strong>Sandbox before production</strong><small>Production access requires a separate approval process.</small></p></div>
        </div>
        <div className="aside-security"><ShieldCheck size={17}/><span>Preview mode · No live account actions</span></div>
      </aside>
      <section className="onboarding-main">
        <div className="preview-notice"><span className="preview-notice-dot"/><div><strong>Frontend preview only</strong><small>Backend API, email delivery and tenant provisioning are not connected.</small></div></div>
        <div className="stage-icon">{content.icon}</div>
        <p className="onboarding-eyebrow">{content.eyebrow}</p>
        <h2 className="stage-title">{content.title}</h2>
        <p className="step-description stage-description">{content.description}</p>

        {stage === "verify-email" && <div className="stage-panel">
          <div className="stage-panel-label">ACCOUNT EMAIL</div><strong>{email || "your-work-email@example.com"}</strong>
          <p>When the backend is connected, this page will show delivery status, validate the link token, handle expired links and allow a rate-limited resend.</p>
          <label className="stage-input-label">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@organization.co.ke"/></label>
          <button className="button-next stage-wide-button" type="button" onClick={() => setNotice("Preview only: no email was sent. Connect the verification endpoint before enabling resend.")}>Resend verification email <ArrowRight size={15}/></button>
          <button className="button-back stage-wide-button" type="button" onClick={() => go("/onboarding/status?preview=1")}>Preview the next screen <ArrowRight size={15}/></button>
        </div>}

        {stage === "status" && <div className="stage-panel">
          <div className="status-flag"><span className="status-flag-dot"/><div><strong>Waiting for backend connection</strong><small>No live onboarding request exists in this preview.</small></div></div>
          <ol className="status-list">
            <li className="is-done"><Check size={15}/><span><strong>Details reviewed in browser</strong><small>Preview step only; not submitted to PesaGuard.</small></span></li>
            <li><span className="status-number">2</span><span><strong>Email verification</strong><small>Backend must validate the email token.</small></span></li>
            <li><span className="status-number">3</span><span><strong>Tenant review and provisioning</strong><small>Approval and workspace creation must be confirmed by the API.</small></span></li>
            <li><span className="status-number">4</span><span><strong>Secure dashboard handoff</strong><small>Continue only after an authenticated session is established.</small></span></li>
          </ol>
          <button className="button-next stage-wide-button" type="button" onClick={() => go("/onboarding/setup?preview=1")}>Preview workspace setup <ArrowRight size={15}/></button>
        </div>}

        {stage === "setup" && <form className="stage-panel stage-form" onSubmit={finishSetup}>
          <div className="stage-panel-label">ORGANIZATION</div><strong>{draft.organization || "Your organization"}</strong><p>{draft.organizationType || "Organization type"} · {draft.country || "Country not selected"}</p>
          <label className="stage-input-label">Where are your internal records stored?<select value={recordSource} onChange={(event) => setRecordSource(event.target.value)}><option>CSV / spreadsheet</option><option>Internal database / ledger</option><option>POS / ERP / accounting system</option><option>Not yet decided</option></select></label>
          <label className="stage-input-label">Invite teammates (optional)<textarea value={inviteEmails} onChange={(event) => setInviteEmails(event.target.value)} placeholder="finance@organization.co.ke, operations@organization.co.ke" rows={3}/><small>Separate addresses with commas or new lines. Invitations will not be sent in preview mode.</small></label>
          <div className="stage-panel-label">READINESS CHECKLIST</div>
          {[
            ["review","Confirm who owns reconciliation exceptions"],
            ["records","Identify the authoritative internal transaction record"],
            ["daraja","Confirm your Safaricom Daraja environment and callback owner"],
            ["roles","Decide who needs administrator, finance and read-only access"],
          ].map(([key,label]) => <label className="checklist-row" key={key}><input type="checkbox" checked={checks.includes(key)} onChange={() => toggleCheck(key)}/><span>{label}</span></label>)}
          <div className="setup-callout"><CircleHelp size={18}/><p><strong>Do not paste integration secrets here.</strong><span>Daraja credentials, signing secrets, PINs and API keys should be collected only by a protected, authenticated backend workflow.</span></p></div>
          <button className="button-next stage-wide-button" type="submit">Preview completion <ArrowRight size={15}/></button>
        </form>}

        {stage === "complete" && <div className="stage-panel">
          <div className="result-icon"><CheckCircle2 size={26}/></div>
          <div className="status-flag"><span className="status-flag-dot"/><div><strong>Frontend flow completed</strong><small>No account, tenant, invitation or integration has been created.</small></div></div>
          <h3>Backend connection checklist</h3>
          <ul className="handoff-list"><li>Registration + email verification endpoints</li><li>Tenant review, approval and provisioning status</li><li>Secure session / SSO handoff to the tenant app</li><li>Workspace setup, invitation and audit APIs</li></ul>
          <a className="button-next stage-wide-button" href={dashboardUrl}>Open tenant application <ArrowRight size={15}/></a>
          <p className="stage-small-note">Dashboard access still requires valid authentication. This link does not create a session or bypass access controls.</p>
        </div>}

        {stage === "invite" && <div className="stage-panel">
          <div className="status-flag"><span className="status-flag-dot"/><div><strong>Invitation not validated</strong><small>Connect the invite-token verification API to continue.</small></div></div>
          <label className="stage-input-label">Invitation email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@organization.co.ke"/></label>
          <button className="button-next stage-wide-button" type="button" onClick={() => setNotice("Preview only: invite acceptance is disabled until token validation is connected.")}>Preview invitation status <ArrowRight size={15}/></button>
          <Link className="onboarding-secondary-link" href="/login">Already have an account? Sign in</Link>
        </div>}
        {notice && <p className="onboarding-error" role="status">{notice}</p>}
        <Link className="onboarding-secondary-link" href={stage === "verify-email" ? "/get-started" : "/onboarding/status?preview=1"}><ArrowLeft size={14} style={{display:"inline",verticalAlign:"middle"}}/> {stage === "verify-email" ? "Back to registration" : "Back to onboarding status"}</Link>
      </section>
    </div>
    <footer className="onboarding-footer"><span>© {new Date().getFullYear()} PesaGuard</span><span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact/sales">Support</Link></span></footer>
  </div>;
}
function Brand() { return <Link className="onboarding-brand" href="/"><span className="brand-symbol"><ShieldCheck size={21}/></span><span>PesaGuard<small>FINANCIAL OPERATIONS</small></span></Link>; }

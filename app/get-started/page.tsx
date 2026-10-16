"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, CircleHelp, ShieldCheck, Sparkles } from "lucide-react";
import "./onboarding.css";

const API_BASE = (process.env.NEXT_PUBLIC_PESAGUARD_API_URL ?? "https://api.pesaguard.co.ke").replace(/\/$/, "");
const steps = ["Your account", "Organization", "Payment setup", "Review"];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  organization: string;
  organizationType: string;
  country: string;
  transactionVolume: string;
  paymentSource: string;
  businessRecord: string;
  consent: boolean;
};

const initialForm: FormState = {
  fullName: "", email: "", phone: "", password: "", organization: "",
  organizationType: "SACCO", country: "Kenya", transactionVolume: "1,000–10,000 per month",
  paymentSource: "M-Pesa (Safaricom Daraja)", businessRecord: "CSV / spreadsheet", consent: false,
};

export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [status, setStatus] = useState<"form" | "submitted">("form");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function next() {
    setError("");
    setStep((current) => Math.min(3, current + 1));
  }

  function back() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch(`${API_BASE}/api/v1/public/onboarding-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          applicant: { full_name: form.fullName.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), password: form.password },
          organization: { name: form.organization.trim(), type: form.organizationType, country: form.country },
          setup: { payment_source: form.paymentSource, expected_monthly_volume: form.transactionVolume, internal_record_source: form.businessRecord },
          consent: form.consent,
          requested_environment: "sandbox",
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = typeof payload.message === "string" ? payload.message : typeof payload.error === "string" ? payload.error : "";
        throw new Error(message || (response.status === 404
          ? "Tenant onboarding is not enabled on the API yet. Your details have not been submitted. Please contact the PesaGuard team."
          : "We could not submit your request. Your details have not been saved; please try again."));
      }
      if (!payload.request_id || !payload.status) {
        throw new Error("The onboarding service returned an incomplete response. No dashboard access was granted.");
      }
      setRequestId(String(payload.request_id));
      setStatus("submitted");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The onboarding service could not be reached. Your details have not been saved.");
    } finally {
      setBusy(false);
    }
  }

  if (status === "submitted") {
    return (
      <main className="onboarding-page">
        <div className="onboarding-frame onboarding-result">
          <Brand />
          <div className="result-icon"><CheckCircle2 size={28} /></div>
          <p className="onboarding-eyebrow">REQUEST RECEIVED</p>
          <h1>Your workspace request is in the queue.</h1>
          <p className="onboarding-lede">We have received your request. Verify your email and wait for the access decision. PesaGuard will not open a dashboard until the identity and tenant status are confirmed by the service.</p>
          <div className="request-reference"><span>Request reference</span><strong>{requestId}</strong></div>
          <ol className="status-list">
            <li className="is-done"><Check size={15} /><span><strong>Request submitted</strong><small>Your organization details were accepted by the onboarding service.</small></span></li>
            <li><span className="status-number">2</span><span><strong>Email verification</strong><small>Use the secure verification link sent to your inbox.</small></span></li>
            <li><span className="status-number">3</span><span><strong>Workspace review</strong><small>Eligibility and tenant provisioning are confirmed server-side.</small></span></li>
            <li><span className="status-number">4</span><span><strong>Open your dashboard</strong><small>You'll be redirected to app.pesaguard.co.ke only when access is ready.</small></span></li>
          </ol>
          <p className="onboarding-help">If you don't receive a message, check spam or contact <a href="mailto:hello@pesaguard.co.ke">hello@pesaguard.co.ke</a>.</p>
          <Link className="onboarding-secondary-link" href="/">Return to PesaGuard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <header className="onboarding-header"><Brand /><nav><Link href="/product">Product</Link><Link href="/security">Security</Link><span>Already have access?</span><Link className="onboarding-login" href="/login">Sign in <ChevronRight size={14} /></Link></nav></header>
      <div className="onboarding-shell">
        <aside className="onboarding-aside">
          <div className="aside-label"><Sparkles size={14} /> TENANT ONBOARDING</div>
          <h1>Start with clarity.<br /><span>Scale with confidence.</span></h1>
          <p>Create a sandbox workspace request for your team. We'll guide you through the required setup before any production access is considered.</p>
          <div className="aside-benefits">
            <div><span><Check size={15} /></span><p><strong>Sandbox-first access</strong><small>Evaluate your workflow before requesting production access.</small></p></div>
            <div><span><Check size={15} /></span><p><strong>Your data, your controls</strong><small>Tenant access and roles are confirmed by the Core API.</small></p></div>
            <div><span><Check size={15} /></span><p><strong>Human-reviewed activation</strong><small>No production access is granted just by completing this form.</small></p></div>
          </div>
          <div className="aside-security"><ShieldCheck size={17} /><span>Secure onboarding · Kenya</span></div>
        </aside>
        <section className="onboarding-main">
          <div className="onboarding-progress">
            <div><span className="progress-caption">STEP {step + 1} OF 4</span><span className="progress-percent">{Math.round(((step + 1) / 4) * 100)}%</span></div>
            <div className="progress-track"><span style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
            <div className="step-labels">{steps.map((label, index) => <span key={label} className={index === step ? "active" : index < step ? "complete" : ""}>{index < step ? <Check size={12} /> : <i>{index + 1}</i>}{label}</span>)}</div>
          </div>
          <form onSubmit={step === 3 ? submit : (event) => { event.preventDefault(); next(); }}>
            {step === 0 && <section className="form-step"><p className="onboarding-eyebrow">YOUR ACCOUNT</p><h2>Who will own this workspace?</h2><p className="step-description">Use a work address monitored by the person responsible for the tenant.</p>
              <label>Full name<input required autoComplete="name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Amina Wanjiku" /></label>
              <label>Work email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@organization.co.ke" /></label>
              <label>Business phone<input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 7XX XXX XXX" /></label>
              <label>Create a password<input required type="password" autoComplete="new-password" minLength={12} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 12 characters" /><small>Use a unique password with at least 12 characters.</small></label>
            </section>}
            {step === 1 && <section className="form-step"><p className="onboarding-eyebrow">ORGANIZATION PROFILE</p><h2>Tell us about your organization.</h2><p className="step-description">These details help us configure the right workspace and review the request.</p>
              <label>Organization name<input required value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Registered or trading name" /></label>
              <label>Organization type<select value={form.organizationType} onChange={(e) => update("organizationType", e.target.value)}><option>SACCO</option><option>Merchant / retailer</option><option>E-commerce</option><option>Fintech</option><option>Financial institution</option><option>Other organization</option></select></label>
              <label>Country<select value={form.country} onChange={(e) => update("country", e.target.value)}><option>Kenya</option><option>Uganda</option><option>Tanzania</option><option>Rwanda</option><option>Other</option></select></label>
              <label>Expected monthly transaction volume<select value={form.transactionVolume} onChange={(e) => update("transactionVolume", e.target.value)}><option>Under 1,000 per month</option><option>1,000–10,000 per month</option><option>10,001–100,000 per month</option><option>Over 100,000 per month</option><option>Not sure yet</option></select></label>
            </section>}
            {step === 2 && <section className="form-step"><p className="onboarding-eyebrow">PAYMENT & DATA SETUP</p><h2>What do you need to reconcile?</h2><p className="step-description">The current active payment scope is M-Pesa through Safaricom Daraja. Other payment rails are not offered as live connectors.</p>
              <label>Payment source<select value={form.paymentSource} onChange={(e) => update("paymentSource", e.target.value)}><option>M-Pesa (Safaricom Daraja)</option><option>Other source — discuss with the team</option></select></label>
              <label>Where are your expected business records?<select value={form.businessRecord} onChange={(e) => update("businessRecord", e.target.value)}><option>CSV / spreadsheet</option><option>Internal database / ledger</option><option>POS / ERP / accounting system</option><option>Not yet decided</option></select></label>
              <div className="setup-callout"><CircleHelp size={18} /><p><strong>You'll configure credentials later.</strong><span>Do not enter Daraja passwords, consumer secrets, API keys, PINs or payment data here. Integration details belong in the authenticated setup flow.</span></p></div>
              <div className="sandbox-banner"><span className="sandbox-dot" /><div><strong>Sandbox requested</strong><small>Production access requires a separate review after setup and testing.</small></div></div>
            </section>}
            {step === 3 && <section className="form-step"><p className="onboarding-eyebrow">REVIEW & SUBMIT</p><h2>Review your workspace request.</h2><p className="step-description">Confirm the details below. A request is not the same as an activated tenant.</p>
              <div className="review-section"><div><span>Account</span><button type="button" onClick={() => setStep(0)}>Edit</button></div><strong>{form.fullName}</strong><p>{form.email} · {form.phone}</p></div>
              <div className="review-section"><div><span>Organization</span><button type="button" onClick={() => setStep(1)}>Edit</button></div><strong>{form.organization}</strong><p>{form.organizationType} · {form.country} · {form.transactionVolume}</p></div>
              <div className="review-section"><div><span>Setup</span><button type="button" onClick={() => setStep(2)}>Edit</button></div><strong>{form.paymentSource}</strong><p>Business records: {form.businessRecord}</p></div>
              <label className="onboarding-consent"><input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I confirm I am authorized to submit these details and agree to the <Link href="/terms" target="_blank">Terms</Link> and <Link href="/privacy" target="_blank">Privacy Notice</Link>.</span></label>
              <p className="security-note"><ShieldCheck size={15} /> Your password is sent only to the Core API over HTTPS and is never stored by this page.</p>
            </section>}
            {error && <div className="onboarding-error" role="alert">{error}</div>}
            <div className="form-actions">{step > 0 && <button type="button" className="button-back" onClick={back}><ArrowLeft size={15} /> Back</button>}{step < 3 ? <button className="button-next" type="submit">Continue <ArrowRight size={16} /></button> : <button className="button-next" type="submit" disabled={busy}>{busy ? "Submitting securely…" : "Submit workspace request"} <ArrowRight size={16} /></button>}</div>
            <p className="form-footnote">By continuing, you understand access is granted only after server-side identity verification and tenant eligibility checks.</p>
          </form>
        </section>
      </div>
      <footer className="onboarding-footer"><span>© 2026 PesaGuard</span><span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Support</Link></span></footer>
    </main>
  );
}

function Brand() {
  return <Link className="onboarding-brand" href="/"><span className="brand-symbol"><ShieldCheck size={21} /></span><span>PesaGuard<small>FINANCIAL OPERATIONS</small></span></Link>;
}

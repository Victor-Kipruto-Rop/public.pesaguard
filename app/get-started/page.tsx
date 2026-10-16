"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, ShieldCheck, Sparkles } from "lucide-react";
import "./onboarding.css";

const steps = ["Your account", "Organization", "Payment setup", "Review"];
type FormState = {
  fullName: string; email: string; phone: string; password: string; organization: string;
  organizationType: string; country: string; transactionVolume: string; paymentSource: string;
  businessRecord: string; consent: boolean;
};
const initialForm: FormState = {
  fullName: "", email: "", phone: "", password: "", organization: "", organizationType: "SACCO",
  country: "Kenya", transactionVolume: "1,000–10,000 per month",
  paymentSource: "M-Pesa (Safaricom Daraja)", businessRecord: "CSV / spreadsheet", consent: false,
};

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (step < 3) { setStep((current) => current + 1); return; }
    if (!form.consent) { setError("Please confirm your authority to submit these details and accept the Terms and Privacy Notice."); return; }
    try {
      // Frontend preview only: never persist passwords or claim that an account was created.
      const safeDraft = { fullName: form.fullName, email: form.email.trim().toLowerCase(), phone: form.phone, organization: form.organization, organizationType: form.organizationType, country: form.country, transactionVolume: form.transactionVolume, paymentSource: form.paymentSource, businessRecord: form.businessRecord };
      sessionStorage.setItem("pesaguard.onboarding.preview", JSON.stringify(safeDraft));
      router.push("/onboarding/verify-email?preview=1&email=" + encodeURIComponent(form.email.trim().toLowerCase()));
    } catch {
      setError("Your browser could not keep this temporary preview. Please enable session storage and try again.");
    }
  }
  function back() { setError(""); setStep((current) => Math.max(0, current - 1)); }

  return <div className="onboarding-page">
    <header className="onboarding-header"><Brand /><nav><Link href="/product">Product</Link><Link href="/security">Security</Link><span>Already have access?</span><Link className="onboarding-login" href="/login">Sign in <ChevronRight size={14} /></Link></nav></header>
    <div className="onboarding-shell">
      <aside className="onboarding-aside">
        <div className="aside-label"><Sparkles size={14} /> TENANT ONBOARDING</div>
        <h1>Start with clarity.<br /><span>Scale with confidence.</span></h1>
        <p>Build your workspace request in a few guided steps. This frontend is currently in preview mode; no account or tenant is created until the backend is connected.</p>
        <div className="aside-benefits">
          <div><span><Check size={15} /></span><p><strong>Sandbox-first setup</strong><small>Begin with a sandbox request before production access is considered.</small></p></div>
          <div><span><Check size={15} /></span><p><strong>Clear organization context</strong><small>Capture the team and reconciliation workflow you need.</small></p></div>
          <div><span><Check size={15} /></span><p><strong>Secure by design</strong><small>Credentials and authorization must be validated by the backend.</small></p></div>
        </div>
        <div className="aside-security"><ShieldCheck size={17} /><span>Frontend preview · No live account creation</span></div>
      </aside>
      <section className="onboarding-main">
        <div className="preview-notice"><span className="preview-notice-dot" /><div><strong>Frontend preview</strong><small>Interactive screens are ready; backend submission is not connected.</small></div></div>
        <div className="onboarding-progress">
          <div><span className="progress-caption">STEP {step + 1} OF 4</span><span className="progress-percent">{Math.round(((step + 1) / 4) * 100)}%</span></div>
          <div className="progress-track"><span style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
          <div className="step-labels">{steps.map((label, index) => <span key={label} className={index === step ? "active" : index < step ? "complete" : ""}>{index < step ? <Check size={12} /> : <i>{index + 1}</i>}{label}</span>)}</div>
        </div>
        <form onSubmit={advance}>
          {step === 0 && <section className="form-step"><p className="onboarding-eyebrow">YOUR ACCOUNT</p><h2>Who will own this workspace?</h2><p className="step-description">Use a monitored work address for the person responsible for the tenant.</p>
            <label>Full name<input required autoComplete="name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Amina Wanjiku" /></label>
            <label>Work email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@organization.co.ke" /></label>
            <label>Business phone<input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 7XX XXX XXX" /></label>
            <label>Create a password<input required type="password" autoComplete="new-password" minLength={12} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 12 characters" /><small>Minimum 12 characters. Never reuse a password from another service.</small></label>
          </section>}
          {step === 1 && <section className="form-step"><p className="onboarding-eyebrow">ORGANIZATION PROFILE</p><h2>Tell us about your organization.</h2><p className="step-description">These details help the connected backend create the correct tenant profile.</p>
            <label>Organization name<input required value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Registered or trading name" /></label>
            <label>Organization type<select value={form.organizationType} onChange={(e) => update("organizationType", e.target.value)}><option>SACCO</option><option>Merchant / retailer</option><option>E-commerce</option><option>Fintech</option><option>Financial institution</option><option>Other organization</option></select></label>
            <label>Country<select value={form.country} onChange={(e) => update("country", e.target.value)}><option>Kenya</option><option>Uganda</option><option>Tanzania</option><option>Rwanda</option><option>Other</option></select></label>
            <label>Expected monthly transaction volume<select value={form.transactionVolume} onChange={(e) => update("transactionVolume", e.target.value)}><option>Under 1,000 per month</option><option>1,000–10,000 per month</option><option>10,001–100,000 per month</option><option>Over 100,000 per month</option><option>Not sure yet</option></select></label>
          </section>}
          {step === 2 && <section className="form-step"><p className="onboarding-eyebrow">PAYMENT & DATA SETUP</p><h2>What do you need to reconcile?</h2><p className="step-description">The current payment scope is M-Pesa through Safaricom Daraja. Other payment rails are not presented as live connectors.</p>
            <label>Payment source<select value={form.paymentSource} onChange={(e) => update("paymentSource", e.target.value)}><option>M-Pesa (Safaricom Daraja)</option><option>Other source — discuss with the team</option></select></label>
            <label>Where are your business records?<select value={form.businessRecord} onChange={(e) => update("businessRecord", e.target.value)}><option>CSV / spreadsheet</option><option>Internal database / ledger</option><option>POS / ERP / accounting system</option><option>Not yet decided</option></select></label>
            <div className="setup-callout"><CircleHelp size={18} /><p><strong>Integration credentials come later.</strong><span>Do not enter Daraja passwords, consumer secrets, API keys, PINs or payment data in this form. Those belong in a secured, authenticated setup flow.</span></p></div>
            <div className="sandbox-banner"><span className="sandbox-dot" /><div><strong>Sandbox-first workflow</strong><small>Production access should be a separate backend-controlled approval.</small></div></div>
          </section>}
          {step === 3 && <section className="form-step"><p className="onboarding-eyebrow">REVIEW & CONTINUE</p><h2>Review your workspace details.</h2><p className="step-description">This is a local frontend preview, not a submitted request.</p>
            <div className="review-section"><div><span>Account</span><button type="button" onClick={() => setStep(0)}>Edit</button></div><strong>{form.fullName || "—"}</strong><p>{form.email || "—"} · {form.phone || "—"}</p></div>
            <div className="review-section"><div><span>Organization</span><button type="button" onClick={() => setStep(1)}>Edit</button></div><strong>{form.organization || "—"}</strong><p>{form.organizationType} · {form.country} · {form.transactionVolume}</p></div>
            <div className="review-section"><div><span>Setup</span><button type="button" onClick={() => setStep(2)}>Edit</button></div><strong>{form.paymentSource}</strong><p>Business records: {form.businessRecord}</p></div>
            <label className="onboarding-consent"><input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I confirm I am authorized to submit these details and agree to the <Link href="/terms" target="_blank">Terms</Link> and <Link href="/privacy" target="_blank">Privacy Notice</Link>.</span></label>
            <p className="security-note"><ShieldCheck size={15} /> Password is never written to browser storage. The backend must handle password hashing and verification.</p>
          </section>}
          {error && <div className="onboarding-error" role="alert">{error}</div>}
          <div className="form-actions">{step > 0 && <button type="button" className="button-back" onClick={back}><ArrowLeft size={15} /> Back</button>}{step < 3 ? <button className="button-next" type="submit">Continue <ArrowRight size={16} /></button> : <button className="button-next" type="submit">Preview next steps <ArrowRight size={16} /></button>}</div>
          <p className="form-footnote">This preview does not create an account, send email, reserve an organization name, or grant access.</p>
        </form>
      </section>
    </div>
    <footer className="onboarding-footer"><span>© {new Date().getFullYear()} PesaGuard</span><span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact/sales">Support</Link></span></footer>
  </div>;
}
function Brand() { return <Link className="onboarding-brand" href="/"><span className="brand-symbol"><ShieldCheck size={21} /></span><span>PesaGuard<small>FINANCIAL OPERATIONS</small></span></Link>; }

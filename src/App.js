import { useState } from “react”;

const COLORS = {
bg: “#0A0C10”,
sidebar: “#0D1117”,
card: “#161B22”,
cardHover: “#1C2128”,
border: “#21262D”,
accent: “#00D4AA”,
accentDim: “#00D4AA22”,
accentHover: “#00BFA5”,
text: “#E6EDF3”,
textMuted: “#7D8590”,
textDim: “#484F58”,
danger: “#F85149”,
warning: “#D29922”,
info: “#58A6FF”,
success: “#3FB950”,
purple: “#BC8CFF”,
};

const NAV_ITEMS = [
{ id: “dashboard”, label: “Dashboard”, icon: “⬡” },
{ id: “patients”, label: “Patients”, icon: “👤” },
{ id: “calendar”, label: “Calendar”, icon: “📅” },
{ id: “leads”, label: “Leads”, icon: “🎯” },
{ id: “booking”, label: “Online Booking”, icon: “🔗” },
{ id: “subscriptions”, label: “Subscriptions”, icon: “♾” },
{ id: “reminders”, label: “Reminders”, icon: “🔔” },
{ id: “reports”, label: “Reports”, icon: “📊” },
{ id: “metaads”, label: “Meta Ads”, icon: “📣” },
{ id: “team”, label: “Team”, icon: “👥” },
{ id: “locations”, label: “Locations”, icon: “📍” },
];

const PATIENTS = [
{ id: 1, name: “Maria Ionescu”, phone: “0721 123 456”, status: “active”, type: “new”, subscription: “Premium”, sessions: 8, next: “Lun 10:00”, condition: “Lombalgie” },
{ id: 2, name: “Ion Popescu”, phone: “0731 234 567”, status: “active”, type: “old”, subscription: “Standard”, sessions: 24, next: “Mar 14:00”, condition: “Spondiloza” },
{ id: 3, name: “Elena Dumitrescu”, phone: “0741 345 678”, status: “inactive”, type: “inactive”, subscription: null, sessions: 3, next: “—”, condition: “Cervicalgie” },
{ id: 4, name: “Andrei Constantin”, phone: “0751 456 789”, status: “active”, type: “subscription”, subscription: “VIP”, sessions: 45, next: “Mie 09:00”, condition: “Post-op genunchi” },
{ id: 5, name: “Raluca Marin”, phone: “0761 567 890”, status: “active”, type: “new”, subscription: “Standard”, sessions: 2, next: “Joi 11:00”, condition: “Contractura musculara” },
{ id: 6, name: “Cristian Gheorghe”, phone: “0771 678 901”, status: “active”, type: “old”, subscription: “Premium”, sessions: 18, next: “Vin 15:00”, condition: “Hernie discala” },
{ id: 7, name: “Ana Stoica”, phone: “0781 789 012”, status: “inactive”, type: “inactive”, subscription: null, sessions: 1, next: “—”, condition: “Fractura col femural” },
{ id: 8, name: “Mihai Popa”, phone: “0791 890 123”, status: “active”, type: “subscription”, subscription: “VIP”, sessions: 62, next: “Lun 16:00”, condition: “AVC recuperare” },
];

const LEADS = [
{ id: 1, name: “Teodora Vlad”, source: “Meta Ads”, date: “24 Apr”, status: “new”, message: “Am dureri de spate de 2 saptamani” },
{ id: 2, name: “Bogdan Radu”, source: “Website”, date: “23 Apr”, status: “contacted”, message: “Recuperare post-operatorie” },
{ id: 3, name: “Simona Nica”, source: “Referral”, date: “22 Apr”, status: “qualified”, message: “Kinetoterapie copii 8 ani” },
{ id: 4, name: “Florin Dima”, source: “Meta Ads”, date: “21 Apr”, status: “new”, message: “Cervicalgie cronica” },
{ id: 5, name: “Larisa Coman”, source: “Google”, date: “20 Apr”, status: “lost”, message: “Spondiloza cervicala” },
];

const TODAY_APPTS = [
{ time: “09:00”, patient: “Andrei Constantin”, type: “Kinetoterapie”, duration: “50 min”, therapist: “Dr. Radu”, status: “confirmed” },
{ time: “10:00”, patient: “Maria Ionescu”, type: “Masaj terapeutic”, duration: “30 min”, therapist: “Dr. Ana”, status: “confirmed” },
{ time: “11:00”, patient: “Raluca Marin”, type: “Electroterapie”, duration: “45 min”, therapist: “Dr. Radu”, status: “pending” },
{ time: “13:00”, patient: “Ion Popescu”, type: “Kinetoterapie”, duration: “50 min”, therapist: “Dr. Maria”, status: “confirmed” },
{ time: “14:00”, patient: “Mihai Popa”, type: “Hidroterapie”, duration: “60 min”, therapist: “Dr. Ana”, status: “confirmed” },
{ time: “15:00”, patient: “Cristian Gheorghe”, type: “Kinetoterapie”, duration: “50 min”, therapist: “Dr. Maria”, status: “pending” },
];

// ─── COMPONENTS ───────────────────────────────────────────────

function Badge({ children, color = “accent” }) {
const map = {
accent: { bg: COLORS.accentDim, text: COLORS.accent },
danger: { bg: “#F8514922”, text: COLORS.danger },
warning: { bg: “#D2992222”, text: COLORS.warning },
info: { bg: “#58A6FF22”, text: COLORS.info },
success: { bg: “#3FB95022”, text: COLORS.success },
purple: { bg: “#BC8CFF22”, text: COLORS.purple },
muted: { bg: “#7D859022”, text: COLORS.textMuted },
};
const c = map[color] || map.muted;
return (
<span style={{
background: c.bg, color: c.text,
padding: “2px 10px”, borderRadius: 20, fontSize: 11, fontWeight: 600,
letterSpacing: “0.04em”, textTransform: “uppercase”,
}}>{children}</span>
);
}

function StatCard({ label, value, delta, color = COLORS.accent, icon }) {
return (
<div style={{
background: COLORS.card, border: 1px solid ${COLORS.border},
borderRadius: 12, padding: “20px 24px”,
transition: “border-color 0.2s”,
}}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start” }}>
<div>
<div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 500, marginBottom: 8, textTransform: “uppercase”, letterSpacing: “0.08em” }}>{label}</div>
<div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{value}</div>
{delta && <div style={{ color: color, fontSize: 12, marginTop: 6, fontWeight: 500 }}>{delta}</div>}
</div>
<div style={{ fontSize: 24, opacity: 0.6 }}>{icon}</div>
</div>
</div>
);
}

// ─── PAGES ────────────────────────────────────────────────────

function Dashboard() {
return (
<div>
<div style={{ marginBottom: 28 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Dashboard</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Duminică, 26 Aprilie 2026</p>
</div>


  {/* Stats */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
    <StatCard label="Pacienți Activi" value="147" delta="↑ 12 luna aceasta" color={COLORS.success} icon="👤" />
    <StatCard label="Programări Azi" value="6" delta="2 în așteptare" color={COLORS.warning} icon="📅" />
    <StatCard label="Leads Noi" value="9" delta="↑ 3 față de ieri" color={COLORS.info} icon="🎯" />
    <StatCard label="Venit Lunar" value="18.4k RON" delta="↑ 8% vs luna trecuta" color={COLORS.accent} icon="💰" />
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    {/* Today's appointments */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ color: COLORS.text, margin: 0, fontSize: 14, fontWeight: 600 }}>Programări Azi</h3>
        <Badge color="info">6 total</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TODAY_APPTS.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", borderRadius: 8,
            background: COLORS.bg, border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, minWidth: 40 }}>{a.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 500 }}>{a.patient}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{a.type} · {a.duration} · {a.therapist}</div>
            </div>
            <Badge color={a.status === "confirmed" ? "success" : "warning"}>{a.status === "confirmed" ? "Confirmat" : "Pending"}</Badge>
          </div>
        ))}
      </div>
    </div>

    {/* Pipeline kanban mini */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Pipeline Pacienți</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { label: "Lead", count: 9, color: COLORS.info, items: ["Teodora V.", "Bogdan R.", "Florin D."] },
          { label: "Evaluat", count: 4, color: COLORS.warning, items: ["Simona N.", "Larisa C."] },
          { label: "Activ", count: 147, color: COLORS.success, items: ["Andrei C.", "Maria I.", "Mihai P."] },
        ].map((col) => (
          <div key={col.label} style={{ background: COLORS.bg, borderRadius: 8, padding: 12, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.label}</span>
              <span style={{ color: col.color, fontSize: 12, fontWeight: 700 }}>{col.count}</span>
            </div>
            {col.items.map((item, i) => (
              <div key={i} style={{ background: COLORS.card, borderRadius: 6, padding: "6px 8px", marginBottom: 6, color: COLORS.text, fontSize: 12 }}>{item}</div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h4 style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Leads Recente</h4>
        {LEADS.slice(0, 3).map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 10px", background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.text, fontSize: 12, fontWeight: 500 }}>{l.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{l.source} · {l.date}</div>
            </div>
            <Badge color={l.status === "new" ? "info" : l.status === "contacted" ? "warning" : l.status === "qualified" ? "success" : "muted"}>
              {l.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


);
}

function Patients() {
const [filter, setFilter] = useState(“all”);
const [search, setSearch] = useState(””);

const filtered = PATIENTS.filter(p => {
const matchFilter = filter === “all” || p.type === filter;
const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
return matchFilter && matchSearch;
});

const filterBtns = [
{ id: “all”, label: “Toți” },
{ id: “new”, label: “Noi” },
{ id: “old”, label: “Vechi” },
{ id: “inactive”, label: “Inactivi” },
{ id: “subscription”, label: “Abonament” },
];

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<div>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Pacienți</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>{filtered.length} pacienți afișați</p>
</div>
<button style={{
background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8,
padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer”,
}}>+ Adaugă Pacient</button>
</div>


  <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
    <input
      placeholder="Caută pacient sau diagnostic..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8,
        color: COLORS.text, padding: "8px 14px", fontSize: 13, width: 260, outline: "none",
      }}
    />
    <div style={{ display: "flex", gap: 6 }}>
      {filterBtns.map(b => (
        <button key={b.id} onClick={() => setFilter(b.id)} style={{
          background: filter === b.id ? COLORS.accent : COLORS.card,
          color: filter === b.id ? "#000" : COLORS.textMuted,
          border: `1px solid ${filter === b.id ? COLORS.accent : COLORS.border}`,
          borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
        }}>{b.label}</button>
      ))}
    </div>
  </div>

  <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          {["Pacient", "Telefon", "Diagnostic", "Status", "Abonament", "Ședințe", "Următoarea"].map(h => (
            <th key={h} style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "12px 16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filtered.map((p, i) => (
          <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? "transparent" : `${COLORS.bg}55` }}>
            <td style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.accentDim, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, fontSize: 13, fontWeight: 700 }}>
                  {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 500 }}>{p.name}</span>
              </div>
            </td>
            <td style={{ padding: "12px 16px", color: COLORS.textMuted, fontSize: 13 }}>{p.phone}</td>
            <td style={{ padding: "12px 16px", color: COLORS.text, fontSize: 13 }}>{p.condition}</td>
            <td style={{ padding: "12px 16px" }}>
              <Badge color={p.status === "active" ? "success" : "muted"}>{p.status === "active" ? "Activ" : "Inactiv"}</Badge>
            </td>
            <td style={{ padding: "12px 16px" }}>
              {p.subscription ? <Badge color={p.subscription === "VIP" ? "purple" : p.subscription === "Premium" ? "accent" : "info"}>{p.subscription}</Badge> : <span style={{ color: COLORS.textDim }}>—</span>}
            </td>
            <td style={{ padding: "12px 16px", color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{p.sessions}</td>
            <td style={{ padding: "12px 16px", color: p.next === "—" ? COLORS.textDim : COLORS.accent, fontSize: 12, fontWeight: 500 }}>{p.next}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


);
}

function Calendar() {
const hours = Array.from({ length: 10 }, (_, i) => ${i + 8}:00);
const days = [“Lun 28”, “Mar 29”, “Mie 30”, “Joi 1”, “Vin 2”];

const appts = {
“Lun 28”: { “9:00”: { p: “Andrei C.”, type: “Kinetoter.”, color: COLORS.accent }, “14:00”: { p: “Mihai P.”, type: “Hidroter.”, color: COLORS.purple } },
“Mar 29”: { “10:00”: { p: “Maria I.”, type: “Masaj”, color: COLORS.info }, “13:00”: { p: “Ion P.”, type: “Kinetoter.”, color: COLORS.accent } },
“Mie 30”: { “9:00”: { p: “Andrei C.”, type: “Kinetoter.”, color: COLORS.accent }, “11:00”: { p: “Raluca M.”, type: “Electroter.”, color: COLORS.warning } },
“Joi 1”: { “11:00”: { p: “Raluca M.”, type: “Kinetoter.”, color: COLORS.accent }, “15:00”: { p: “Cristian G.”, type: “Kinetoter.”, color: COLORS.accent } },
“Vin 2”: { “15:00”: { p: “Cristian G.”, type: “Kinetoter.”, color: COLORS.accent } },
};

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<div>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Calendar</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Săptămâna 28 Apr – 2 Mai 2026</p>
</div>
<div style={{ display: “flex”, gap: 8 }}>
<button style={{ background: COLORS.card, border: 1px solid ${COLORS.border}, borderRadius: 8, color: COLORS.text, padding: “8px 14px”, cursor: “pointer”, fontSize: 13 }}>← Prev</button>
<button style={{ background: COLORS.accent, border: “none”, borderRadius: 8, color: “#000”, padding: “8px 14px”, cursor: “pointer”, fontSize: 13, fontWeight: 600 }}>Azi</button>
<button style={{ background: COLORS.card, border: 1px solid ${COLORS.border}, borderRadius: 8, color: COLORS.text, padding: “8px 14px”, cursor: “pointer”, fontSize: 13 }}>Next →</button>
</div>
</div>


  <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
    <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ padding: 12 }} />
      {days.map(d => (
        <div key={d} style={{ padding: "12px", textAlign: "center", color: COLORS.textMuted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", borderLeft: `1px solid ${COLORS.border}` }}>{d}</div>
      ))}
    </div>
    {hours.map(h => (
      <div key={h} style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", borderBottom: `1px solid ${COLORS.border}20` }}>
        <div style={{ padding: "10px 8px", color: COLORS.textDim, fontSize: 11, textAlign: "right", paddingRight: 10 }}>{h}</div>
        {days.map(d => {
          const appt = appts[d]?.[h];
          return (
            <div key={d} style={{ borderLeft: `1px solid ${COLORS.border}20`, padding: 4, minHeight: 44 }}>
              {appt && (
                <div style={{ background: `${appt.color}20`, border: `1px solid ${appt.color}40`, borderRadius: 6, padding: "4px 8px" }}>
                  <div style={{ color: appt.color, fontSize: 11, fontWeight: 600 }}>{appt.p}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 10 }}>{appt.type}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
</div>


);
}

function Leads() {
const statusColor = { new: “info”, contacted: “warning”, qualified: “success”, lost: “muted” };
const sourceColor = { “Meta Ads”: “purple”, Website: “accent”, Referral: “success”, Google: “info” };

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<div>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Leads</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Prospecți și cereri noi</p>
</div>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Lead Nou</button>
</div>


  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
    {[
      { label: "Noi", count: 2, color: COLORS.info },
      { label: "Contactați", count: 1, color: COLORS.warning },
      { label: "Calificați", count: 1, color: COLORS.success },
      { label: "Pierduți", count: 1, color: COLORS.danger },
    ].map(s => (
      <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
        <div style={{ color: s.color, fontSize: 28, fontWeight: 700 }}>{s.count}</div>
      </div>
    ))}
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {LEADS.map(l => (
      <div key={l.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.accentDim, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, fontSize: 14, fontWeight: 700 }}>
          {l.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{l.name}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>{l.message}</div>
        </div>
        <Badge color={sourceColor[l.source] || "muted"}>{l.source}</Badge>
        <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{l.date}</div>
        <Badge color={statusColor[l.status]}>{l.status}</Badge>
        <button style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}40`, color: COLORS.accent, borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Contactează</button>
      </div>
    ))}
  </div>
</div>


);
}

function BookingFlow() {
const [step, setStep] = useState(1);
const steps = [“Serviciu”, “Terapeut”, “Data & Ora”, “Date Personale”, “Confirmare”];

return (
<div>
<div style={{ marginBottom: 28 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Configurare Booking Online</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Flow-ul pacienților pentru programare</p>
</div>


  {/* Step indicator */}
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
    {steps.map((s, i) => (
      <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <div
          onClick={() => setStep(i + 1)}
          style={{
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
            background: step > i + 1 ? COLORS.accent : step === i + 1 ? COLORS.accent : COLORS.card,
            border: `2px solid ${step >= i + 1 ? COLORS.accent : COLORS.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: step >= i + 1 ? "#000" : COLORS.textMuted, fontSize: 12, fontWeight: 700,
            flexShrink: 0,
          }}
        >{step > i + 1 ? "✓" : i + 1}</div>
        <div style={{ marginLeft: 8, marginRight: 16, flex: 1 }}>
          <div style={{ color: step === i + 1 ? COLORS.text : COLORS.textMuted, fontSize: 12, fontWeight: step === i + 1 ? 600 : 400 }}>{s}</div>
          {i < steps.length - 1 && <div style={{ height: 1, background: step > i + 1 ? COLORS.accent : COLORS.border, marginTop: 14 }} />}
        </div>
      </div>
    ))}
  </div>

  {/* Step content */}
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 28, maxWidth: 600 }}>
    {step === 1 && (
      <div>
        <h3 style={{ color: COLORS.text, margin: "0 0 20px" }}>Selectează Serviciul</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Kinetoterapie (50 min) — 150 RON", "Masaj Terapeutic (30 min) — 120 RON", "Electroterapie (45 min) — 100 RON", "Hidroterapie (60 min) — 180 RON", "Evaluare Inițială (60 min) — 200 RON"].map((s, i) => (
            <div key={i} style={{ background: i === 0 ? COLORS.accentDim : COLORS.bg, border: `1px solid ${i === 0 ? COLORS.accent : COLORS.border}`, borderRadius: 8, padding: "12px 16px", cursor: "pointer", color: COLORS.text, fontSize: 13 }}>{s}</div>
          ))}
        </div>
      </div>
    )}
    {step === 2 && (
      <div>
        <h3 style={{ color: COLORS.text, margin: "0 0 20px" }}>Alege Terapeutul</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["Dr. Radu Ionescu", "Dr. Ana Popescu", "Dr. Maria Dumitrescu", "Oricare disponibil"].map((t, i) => (
            <div key={i} style={{ background: i === 0 ? COLORS.accentDim : COLORS.bg, border: `1px solid ${i === 0 ? COLORS.accent : COLORS.border}`, borderRadius: 8, padding: "16px", cursor: "pointer", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: COLORS.accentDim, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, fontWeight: 700 }}>{t.split(" ").slice(-1)[0][0]}</div>
              <div style={{ color: COLORS.text, fontSize: 13 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    )}
    {step === 3 && (
      <div>
        <h3 style={{ color: COLORS.text, margin: "0 0 20px" }}>Alege Data și Ora</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 }}>
          {["Lun 28", "Mar 29", "Mie 30", "Joi 1", "Vin 2"].map((d, i) => (
            <div key={d} style={{ background: i === 2 ? COLORS.accentDim : COLORS.bg, border: `1px solid ${i === 2 ? COLORS.accent : COLORS.border}`, borderRadius: 8, padding: "8px", textAlign: "center", cursor: "pointer", color: i === 2 ? COLORS.accent : COLORS.text, fontSize: 12, fontWeight: 500 }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((t, i) => (
            <div key={t} style={{ background: i === 1 ? COLORS.accentDim : COLORS.bg, border: `1px solid ${i === 1 ? COLORS.accent : COLORS.border}`, borderRadius: 8, padding: "8px", textAlign: "center", cursor: "pointer", color: i === 1 ? COLORS.accent : COLORS.text, fontSize: 13, fontWeight: 500 }}>{t}</div>
          ))}
        </div>
      </div>
    )}
    {step === 4 && (
      <div>
        <h3 style={{ color: COLORS.text, margin: "0 0 20px" }}>Date Personale</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["Nume Complet", "Telefon", "Email", "Mesaj (opțional)"].map((f, i) => (
            <div key={f}>
              <label style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>{f}</label>
              {i === 3
                ? <textarea rows={3} style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, padding: "10px 14px", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }} />
                : <input style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, padding: "10px 14px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              }
            </div>
          ))}
        </div>
      </div>
    )}
    {step === 5 && (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3 style={{ color: COLORS.accent, margin: "0 0 8px", fontSize: 20 }}>Programare Confirmată!</h3>
        <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 24 }}>Miercuri, 30 Apr · 10:00 · Dr. Radu Ionescu · Kinetoterapie</p>
        <div style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}40`, borderRadius: 8, padding: "12px 20px", color: COLORS.accent, fontSize: 13 }}>
          Un SMS de confirmare a fost trimis pe telefon.
        </div>
      </div>
    )}

    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
      {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, padding: "10px 20px", cursor: "pointer", fontSize: 13 }}>← Înapoi</button>}
      {step < 5 && <button onClick={() => setStep(s => s + 1)} style={{ background: COLORS.accent, border: "none", borderRadius: 8, color: "#000", padding: "10px 24px", cursor: "pointer", fontSize: 13, fontWeight: 600, marginLeft: "auto" }}>Continuă →</button>}
    </div>
  </div>
</div>


);
}

function Reminders() {
const reminders = [
{ id: 1, patient: “Maria Ionescu”, type: “Confirmare programare”, channel: “SMS”, time: “Cu 24h înainte”, status: “active” },
{ id: 2, patient: “Andrei Constantin”, type: “Reamintire sesiune”, channel: “WhatsApp”, time: “Cu 2h înainte”, status: “active” },
{ id: 3, patient: “Ion Popescu”, type: “Abonament expiră”, channel: “Email”, time: “Cu 7 zile înainte”, status: “active” },
{ id: 4, patient: “Elena Dumitrescu”, type: “Reactivare pacient”, channel: “SMS”, time: “La 30 zile inactivitate”, status: “paused” },
{ id: 5, patient: “Toți pacienții noi”, type: “Feedback după prima ședință”, channel: “Email”, time: “La 24h după”, status: “active” },
];

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<div>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Reminders Automate</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Notificări automate pentru pacienți</p>
</div>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Reminder Nou</button>
</div>


  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
    {[
      { label: "Trimise Azi", value: "24", color: COLORS.success },
      { label: "Rate Deschidere SMS", value: "92%", color: COLORS.accent },
      { label: "Confirmări Primite", value: "18", color: COLORS.info },
    ].map(s => (
      <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
        <div style={{ color: s.color, fontSize: 28, fontWeight: 700 }}>{s.value}</div>
      </div>
    ))}
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {reminders.map(r => (
      <div key={r.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 20 }}>{r.channel === "SMS" ? "📱" : r.channel === "WhatsApp" ? "💬" : "📧"}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{r.type}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>{r.patient} · {r.time}</div>
        </div>
        <Badge color={r.channel === "SMS" ? "success" : r.channel === "WhatsApp" ? "accent" : "info"}>{r.channel}</Badge>
        <Badge color={r.status === "active" ? "success" : "muted"}>{r.status === "active" ? "Activ" : "Pauzat"}</Badge>
        <button style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.textMuted, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Edit</button>
      </div>
    ))}
  </div>
</div>


);
}

function Reports() {
const months = [“Ian”, “Feb”, “Mar”, “Apr”, “Mai”, “Iun”, “Iul”, “Aug”, “Sep”, “Oct”, “Nov”, “Dec”];
const revenue = [12000, 13500, 11800, 15200, 14800, 16300, 15900, 17200, 16800, 18100, 17600, 18400];
const patients = [98, 105, 102, 115, 112, 120, 118, 128, 125, 135, 132, 147];
const maxRev = Math.max(…revenue);
const maxPat = Math.max(…patients);

return (
<div>
<div style={{ marginBottom: 28 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Rapoarte</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Performanța clinicii — 2026</p>
</div>


  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    {/* Revenue chart */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: COLORS.text, margin: "0 0 20px", fontSize: 14, fontWeight: 600 }}>Venituri Lunare (RON)</h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
        {revenue.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", background: i === 11 ? COLORS.accent : `${COLORS.accent}50`, borderRadius: "4px 4px 0 0", height: `${(v / maxRev) * 120}px`, transition: "height 0.3s" }} />
            <div style={{ color: COLORS.textDim, fontSize: 9 }}>{months[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: COLORS.accent, fontSize: 13, fontWeight: 600 }}>Total 2026: 187,600 RON</div>
    </div>

    {/* Patients chart */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: COLORS.text, margin: "0 0 20px", fontSize: 14, fontWeight: 600 }}>Pacienți Activi / Lună</h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
        {patients.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", background: i === 11 ? COLORS.info : `${COLORS.info}50`, borderRadius: "4px 4px 0 0", height: `${(v / maxPat) * 120}px`, transition: "height 0.3s" }} />
            <div style={{ color: COLORS.textDim, fontSize: 9 }}>{months[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: COLORS.info, fontSize: 13, fontWeight: 600 }}>Creștere: +50% față de Ian</div>
    </div>

    {/* Services breakdown */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Servicii — Top Venituri</h3>
      {[
        { label: "Kinetoterapie", pct: 45, color: COLORS.accent },
        { label: "Masaj Terapeutic", pct: 22, color: COLORS.info },
        { label: "Hidroterapie", pct: 18, color: COLORS.purple },
        { label: "Electroterapie", pct: 15, color: COLORS.warning },
      ].map(s => (
        <div key={s.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: COLORS.text, fontSize: 13 }}>{s.label}</span>
            <span style={{ color: s.color, fontSize: 13, fontWeight: 600 }}>{s.pct}%</span>
          </div>
          <div style={{ height: 6, background: COLORS.bg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 3 }} />
          </div>
        </div>
      ))}
    </div>

    {/* Lead sources */}
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Surse Pacienți Noi</h3>
      {[
        { label: "Meta Ads", count: 38, pct: 42, color: COLORS.purple },
        { label: "Referral", count: 27, pct: 30, color: COLORS.success },
        { label: "Google", count: 15, pct: 17, color: COLORS.info },
        { label: "Website", count: 10, pct: 11, color: COLORS.warning },
      ].map(s => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
          <div style={{ flex: 1, color: COLORS.text, fontSize: 13 }}>{s.label}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{s.count} pacienți</div>
          <div style={{ color: s.color, fontSize: 13, fontWeight: 600, minWidth: 36, textAlign: "right" }}>{s.pct}%</div>
        </div>
      ))}
    </div>
  </div>
</div>


);
}

function MetaAds() {
const campaigns = [
{ name: “Kinetoterapie — Luni”, status: “active”, budget: “50 RON/zi”, spent: “320 RON”, reach: “8,420”, leads: 12, cpl: “26.7 RON” },
{ name: “Recuperare Post-Op”, status: “active”, budget: “80 RON/zi”, spent: “560 RON”, reach: “15,200”, leads: 18, cpl: “31.1 RON” },
{ name: “Masaj Corporate”, status: “paused”, budget: “30 RON/zi”, spent: “90 RON”, reach: “3,100”, leads: 3, cpl: “30.0 RON” },
{ name: “Promo Abonament”, status: “active”, budget: “60 RON/zi”, spent: “420 RON”, reach: “11,800”, leads: 15, cpl: “28.0 RON” },
];

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<div>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Meta Ads</h1>
<p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Campanii Facebook & Instagram</p>
</div>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Campanie Nouă</button>
</div>


  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
    {[
      { label: "Total Cheltuit", value: "1,390 RON", color: COLORS.warning },
      { label: "Total Leads", value: "48", color: COLORS.accent },
      { label: "Cost/Lead Mediu", value: "28.9 RON", color: COLORS.info },
      { label: "Reach Total", value: "38,520", color: COLORS.success },
    ].map(s => (
      <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
        <div style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.value}</div>
      </div>
    ))}
  </div>

  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          {["Campanie", "Status", "Budget", "Cheltuit", "Reach", "Leads", "Cost/Lead"].map(h => (
            <th key={h} style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "12px 16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}20` }}>
            <td style={{ padding: "12px 16px", color: COLORS.text, fontSize: 13, fontWeight: 500 }}>{c.name}</td>
            <td style={{ padding: "12px 16px" }}><Badge color={c.status === "active" ? "success" : "muted"}>{c.status === "active" ? "Activ" : "Pauzat"}</Badge></td>
            <td style={{ padding: "12px 16px", color: COLORS.textMuted, fontSize: 13 }}>{c.budget}</td>
            <td style={{ padding: "12px 16px", color: COLORS.warning, fontSize: 13, fontWeight: 600 }}>{c.spent}</td>
            <td style={{ padding: "12px 16px", color: COLORS.text, fontSize: 13 }}>{c.reach}</td>
            <td style={{ padding: "12px 16px", color: COLORS.accent, fontSize: 13, fontWeight: 700 }}>{c.leads}</td>
            <td style={{ padding: "12px 16px", color: COLORS.info, fontSize: 13, fontWeight: 600 }}>{c.cpl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


);
}

function Team() {
const members = [
{ name: “Dr. Radu Ionescu”, role: “Kinetoterapeut Senior”, status: “active”, sessions: 32, rating: 4.9 },
{ name: “Dr. Ana Popescu”, role: “Maseur Terapeutic”, status: “active”, sessions: 28, rating: 4.8 },
{ name: “Dr. Maria Dumitrescu”, role: “Kinetoterapeut”, status: “active”, sessions: 24, rating: 4.7 },
{ name: “Mihai Stan”, role: “Receptioner”, status: “active”, sessions: 0, rating: null },
];

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Echipa</h1>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Adaugă Membru</button>
</div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 16 }}>
{members.map((m, i) => (
<div key={i} style={{ background: COLORS.card, border: 1px solid ${COLORS.border}, borderRadius: 12, padding: 20, display: “flex”, gap: 16, alignItems: “center” }}>
<div style={{ width: 52, height: 52, borderRadius: “50%”, background: COLORS.accentDim, display: “flex”, alignItems: “center”, justifyContent: “center”, color: COLORS.accent, fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
{m.name.split(” “).map(n => n[0]).join(””).slice(0, 2)}
</div>
<div style={{ flex: 1 }}>
<div style={{ color: COLORS.text, fontSize: 15, fontWeight: 600 }}>{m.name}</div>
<div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>{m.role}</div>
<div style={{ display: “flex”, gap: 10, marginTop: 8 }}>
{m.sessions > 0 && <span style={{ color: COLORS.accent, fontSize: 12 }}>📋 {m.sessions} ședințe/lună</span>}
{m.rating && <span style={{ color: COLORS.warning, fontSize: 12 }}>⭐ {m.rating}</span>}
</div>
</div>
<Badge color="success">Activ</Badge>
</div>
))}
</div>
</div>
);
}

function Locations() {
return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Locații</h1>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Adaugă Locație</button>
</div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 16 }}>
{[
{ name: “Clinica Centrală”, address: “Str. Victoriei 12, București”, staff: 3, patients: 120, status: “active” },
{ name: “Clinica Nord”, address: “Bd. Aviatorilor 45, București”, staff: 2, patients: 27, status: “active” },
].map((l, i) => (
<div key={i} style={{ background: COLORS.card, border: 1px solid ${COLORS.border}, borderRadius: 12, padding: 24 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, marginBottom: 16 }}>
<div>
<div style={{ color: COLORS.text, fontSize: 16, fontWeight: 700 }}>{l.name}</div>
<div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>📍 {l.address}</div>
</div>
<Badge color="success">Activ</Badge>
</div>
<div style={{ display: “flex”, gap: 20 }}>
<div><div style={{ color: COLORS.textMuted, fontSize: 11 }}>Terapeuți</div><div style={{ color: COLORS.accent, fontSize: 18, fontWeight: 700 }}>{l.staff}</div></div>
<div><div style={{ color: COLORS.textMuted, fontSize: 11 }}>Pacienți</div><div style={{ color: COLORS.text, fontSize: 18, fontWeight: 700 }}>{l.patients}</div></div>
</div>
</div>
))}
</div>
</div>
);
}

function Subscriptions() {
const plans = [
{ name: “Standard”, price: “299 RON/lună”, sessions: 8, active: 42, color: COLORS.info },
{ name: “Premium”, price: “499 RON/lună”, sessions: 14, active: 28, color: COLORS.accent },
{ name: “VIP”, price: “799 RON/lună”, sessions: “Nelimitat”, active: 12, color: COLORS.purple },
];

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Abonamente</h1>
<button style={{ background: COLORS.accent, color: “#000”, border: “none”, borderRadius: 8, padding: “9px 18px”, fontWeight: 600, fontSize: 13, cursor: “pointer” }}>+ Plan Nou</button>
</div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr 1fr”, gap: 16, marginBottom: 28 }}>
{plans.map(p => (
<div key={p.name} style={{ background: COLORS.card, border: 2px solid ${p.color}40, borderRadius: 14, padding: 24 }}>
<div style={{ color: p.color, fontSize: 13, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.06em”, marginBottom: 8 }}>{p.name}</div>
<div style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{p.price}</div>
<div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16 }}>{p.sessions} ședințe/lună</div>
<div style={{ color: p.color, fontSize: 28, fontWeight: 700 }}>{p.active}</div>
<div style={{ color: COLORS.textMuted, fontSize: 12 }}>abonați activi</div>
</div>
))}
</div>
</div>
);
}

// ─── MAIN APP ─────────────────────────────────────────────────

export default function HSCApp() {
const [page, setPage] = useState(“dashboard”);

const pageMap = {
dashboard: <Dashboard />,
patients: <Patients />,
calendar: <Calendar />,
leads: <Leads />,
booking: <BookingFlow />,
subscriptions: <Subscriptions />,
reminders: <Reminders />,
reports: <Reports />,
metaads: <MetaAds />,
team: <Team />,
locations: <Locations />,
};

return (
<div style={{ display: “flex”, height: “100vh”, background: COLORS.bg, fontFamily: “‘SF Pro Display’, -apple-system, BlinkMacSystemFont, sans-serif”, overflow: “hidden” }}>
{/* Sidebar */}
<div style={{ width: 220, background: COLORS.sidebar, borderRight: 1px solid ${COLORS.border}, display: “flex”, flexDirection: “column”, flexShrink: 0 }}>
{/* Logo */}
<div style={{ padding: “20px 20px 16px”, borderBottom: 1px solid ${COLORS.border} }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 10 }}>
<div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.accent, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 16 }}>⬡</div>
<div>
<div style={{ color: COLORS.text, fontSize: 14, fontWeight: 700, lineHeight: 1 }}>HSC</div>
<div style={{ color: COLORS.textMuted, fontSize: 10, marginTop: 2 }}>High Standard Control</div>
</div>
</div>
</div>


    {/* Nav */}
    <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
      {NAV_ITEMS.map(item => (
        <button key={item.id} onClick={() => setPage(item.id)} style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
          background: page === item.id ? COLORS.accentDim : "transparent",
          color: page === item.id ? COLORS.accent : COLORS.textMuted,
          fontSize: 13, fontWeight: page === item.id ? 600 : 400,
          marginBottom: 2, textAlign: "left", transition: "all 0.15s",
        }}>
          <span style={{ fontSize: 15 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>

    {/* User */}
    <div style={{ padding: "14px 16px", borderTop: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.accentDim, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, fontSize: 12, fontWeight: 700 }}>OV</div>
      <div>
        <div style={{ color: COLORS.text, fontSize: 12, fontWeight: 500 }}>Ovidiu</div>
        <div style={{ color: COLORS.textMuted, fontSize: 11 }}>Admin</div>
      </div>
    </div>
  </div>

  {/* Main content */}
  <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
    {pageMap[page]}
  </div>
</div>


);
}

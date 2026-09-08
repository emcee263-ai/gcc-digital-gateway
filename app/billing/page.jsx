"use client";

import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/components/AppProvider";
import Shell from "@/components/Shell";
import Guard from "@/components/Guard";
import { CreditCard, Download, FileText, Printer, Receipt, Droplets } from "lucide-react";

const money = (value) => Number(value || 0).toFixed(2);

export default function Billing() {
  const { user } = useApp();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.account) return;
    setLoading(true);
    fetch("/api/bills?account=" + encodeURIComponent(user.account))
      .then((x) => x.json())
      .then(setBills)
      .finally(() => setLoading(false));
  }, [user]);

  const current = bills[0];
  const totalDue = useMemo(() => Number(current?.amountDue ?? current?.amount ?? 0), [current]);

  function printBill() {
    window.print();
  }

  return (
    <Guard roles={["resident"]}>
      <Shell title="Billing & Statements">
        <div className="content billing-page">
          <div className="billing-intro no-print">
            <div>
              <div className="eyebrow">Gweru City Council • Revenue Services</div>
              <h1>Water & municipal bill</h1>
              <p className="muted">A clearer digital version of the familiar Council statement, with your charges, receipts, balances and payment information in one place.</p>
            </div>
            <div className="billing-actions">
              <button className="btn light" onClick={printBill}><Printer size={15}/> Print / Save PDF</button>
              <button className="btn primary" onClick={printBill}><Download size={15}/> Statement</button>
            </div>
          </div>

          {loading ? (
            <div className="card bill-loading">Loading your latest statement…</div>
          ) : current ? (
            <>
              <div className="bill-shell">
                <section className="bill-paper">
                  <header className="bill-header">
                    <div className="bill-brand">
                      <img src="/gcc-crest.png" alt="Gweru City Council crest" className="bill-logo" />
                      <div>
                        <div className="bill-city">CITY OF GWERU</div>
                        <div className="bill-subtitle">WATER, SEWERAGE, REFUSE & MUNICIPAL SERVICES</div>
                        <div className="bill-tag">DIGITAL STATEMENT</div>
                      </div>
                    </div>
                    <div className="bill-doc-meta">
                      <div><span>Statement No.</span><strong>{current.statementNo}</strong></div>
                      <div><span>Account Number</span><strong>{current.accountNumber || current.account}</strong></div>
                    </div>
                  </header>

                  <div className="bill-rule" />

                  <section className="bill-account-grid">
                    <div className="bill-address-box">
                      <div className="bill-label">BILL TO</div>
                      <strong>{current.customerName || user?.name}</strong>
                      <span>{current.address || user?.address}</span>
                      <span>{current.stand || "Residential account"}</span>
                    </div>
                    <div className="bill-fact"><span>Last receipt date</span><strong>{current.lastReceiptDate}</strong></div>
                    <div className="bill-fact"><span>Account date</span><strong>{current.accountDate}</strong></div>
                    <div className="bill-fact"><span>Reading date</span><strong>{current.readingDate}</strong></div>
                    <div className="bill-fact"><span>Meter</span><strong>{current.meter}</strong></div>
                    <div className="bill-fact accent"><span>Pay before / on</span><strong>{current.due}</strong></div>
                  </section>

                  <section className="bill-meter-strip">
                    <div className="meter-icon"><Droplets size={18}/></div>
                    <div><span>Water consumption</span><strong>{current.meteredUsage} m³</strong></div>
                    <div><span>Previous reading</span><strong>{current.previousReading}</strong></div>
                    <div><span>Current reading</span><strong>{current.currentReading}</strong></div>
                    <div><span>Account type</span><strong>Residential</strong></div>
                  </section>

                  <section className="bill-lines">
                    <div className="bill-lines-head"><span>Date</span><span>Ref</span><span>Details</span><span>Amount</span></div>
                    {current.transactions.map((item, index) => (
                      <div className="bill-line" key={item.id || index}>
                        <span>{item.date}</span>
                        <span>{item.ref}</span>
                        <span>{item.details}</span>
                        <span className={item.amount < 0 ? "credit" : ""}>{item.amount < 0 ? "−" : ""}{money(Math.abs(item.amount))}</span>
                      </div>
                    ))}
                  </section>

                  <section className="bill-summary-grid">
                    <div className="bill-aging">
                      <div className="bill-summary-title">BALANCE & AGEING</div>
                      <div className="aging-row"><span>90+ days</span><strong>{money(current.aging["90+"])}</strong></div>
                      <div className="aging-row"><span>60 days</span><strong>{money(current.aging["60"])}</strong></div>
                      <div className="aging-row"><span>30 days</span><strong>{money(current.aging["30"])}</strong></div>
                      <div className="aging-row"><span>Current</span><strong>{money(current.aging.current)}</strong></div>
                    </div>
                    <div className="bill-due-box">
                      <span>AMOUNT DUE</span>
                      <strong>{current.currency} {money(totalDue)}</strong>
                      <small>Pay before or on {current.due}</small>
                    </div>
                  </section>

                  <div className="bill-message">KEEP GWERU CLEAN. DO NOT LITTER.</div>

                  <footer className="bill-footer">
                    <div>
                      <div className="bill-summary-title">PAYMENT TO: THE CITY TREASURER</div>
                      <p>{current.paymentOffice}</p>
                      <p>{current.paymentHours}</p>
                    </div>
                    <div className="bill-contact">
                      <div className="bill-summary-title">ACCOUNT SUPPORT</div>
                      <p>Quote your account number for all enquiries.</p>
                      <p>Interest may be charged on overdue accounts.</p>
                    </div>
                  </footer>
                </section>
              </div>

              <div className="bill-history no-print">
                <div className="section-heading-row">
                  <div><div className="eyebrow">Your account</div><h2 className="section">Billing history</h2></div>
                  <div className="history-note"><Receipt size={16}/> {bills.length} statements</div>
                </div>
                <div className="card tablewrap">
                  <table className="table">
                    <thead><tr><th>Period</th><th>Amount</th><th>Due</th><th>Status</th><th></th></tr></thead>
                    <tbody>{bills.map((x) => (
                      <tr key={x.id}>
                        <td><b>{x.period}</b><div className="muted small">{x.statementNo}</div></td>
                        <td>{x.currency} {money(x.amountDue ?? x.amount)}</td>
                        <td>{x.due}</td>
                        <td><span className={`bill-status ${String(x.status).toLowerCase()}`}>{x.status}</span></td>
                        <td><button className="btn light" onClick={printBill}><FileText size={14}/> Statement</button></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="card empty-state"><CreditCard size={30}/><h3>No billing records found</h3><p className="muted">Your digital billing record will appear here once it is available.</p></div>
          )}
        </div>
      </Shell>
    </Guard>
  );
}

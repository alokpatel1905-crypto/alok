'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SuccessScreenProps { schoolName: string; submissionId: string }

export default function SuccessScreen({ schoolName, submissionId }: SuccessScreenProps) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex items-center justify-center p-6">
      <div className={`max-w-lg w-full transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Success card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center text-white shadow-2xl">
          {/* Animated checkmark */}
          <div className="relative mx-auto mb-6 w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Submitted!</h1>
          <p className="text-green-200 mb-1">Thank you, <strong>{schoolName || 'your school'}</strong>!</p>
          <p className="text-green-300/70 text-sm mb-6">Your Green School Audit has been received. Our team will review your submission.</p>

          {/* Submission ID */}
          <div className="bg-white/10 rounded-2xl px-5 py-4 mb-6 border border-white/10">
            <p className="text-xs text-green-300/70 mb-1 uppercase tracking-widest">Submission ID</p>
            <p className="font-mono text-xl font-bold tracking-wider text-green-200">{submissionId}</p>
            <p className="text-[10px] text-green-400/60 mt-1">Please save this ID for future reference</p>
          </div>

          {/* What happens next */}
          <div className="text-left bg-white/5 rounded-2xl p-4 mb-6 space-y-3">
            <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">What happens next?</p>
            {[
              ['📧', 'Our team will contact you within 5-7 working days'],
              ['🔍', 'An audit visit will be scheduled at your school'],
              ['📊', 'You will receive a detailed sustainability report'],
              ['🏆', 'Eligible schools receive the Green School Certificate'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-start gap-2">
                <span className="text-sm flex-shrink-0">{icon}</span>
                <p className="text-xs text-green-200/80">{text}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 rounded-xl border border-white/30 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >🖨️ Print Summary</button>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 rounded-xl bg-green-400 text-green-900 text-sm font-bold hover:bg-green-300 transition-colors shadow-lg">
                ← Return to Home
              </button>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-green-400/50 text-xs mt-6">Green Mentors · Green School Audit Framework · {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function BpoCtaSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md md:p-16">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">                BRP & RPO Services
              </span>

              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                Build High-Performing Teams with Bricklix BPO Solutions
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                From recruitment process outsourcing to business resource
                partnerships, Bricklix helps companies scale operations,
                streamline hiring, and access top talent efficiently.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/bpo"
                className="rounded-xl bg-white px-8 py-4 text-center font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore 
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/20 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
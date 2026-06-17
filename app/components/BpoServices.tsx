'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  Headphones, UserCheck, TrendingUp, Database, 
  Home, HeartPulse, ShoppingCart, Landmark, 
  FileText, Server, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

export default function BpoServices() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'customer-support',
      title: 'Customer Support',
      icon: <Headphones className="w-6 h-6 text-indigo-400" />,
      description: '24/7 seamless omnichannel support to keep your customers delighted and loyal.',
      features: ['Inbound/outbound calls', 'Email & live chat', 'Complaint resolution', 'Order follow-up']
    },
    {
      id: 'virtual-assistants',
      title: 'Virtual Assistants',
      icon: <UserCheck className="w-6 h-6 text-purple-400" />,
      description: 'High-caliber administrative experts to streamline your day-to-day workflow.',
      features: ['Scheduling & calendar', 'Inbox management', 'CRM updates', 'Research & documents']
    },
    {
      id: 'sales-lead-gen',
      title: 'Sales & Lead Generation',
      icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
      description: 'Aggressive pipeline growth driven by trained offshore sales professionals.',
      features: ['Cold calling', 'Lead qualification', 'Appointment setting', 'Pipeline follow-up']
    },
    {
      id: 'back-office',
      title: 'Back-Office Operations',
      icon: <Database className="w-6 h-6 text-blue-400" />,
      description: 'Error-free data management and repetitive processing scaled instantly.',
      features: ['Data entry', 'Document processing', 'Reporting & records', 'Online research']
    },
    {
      id: 'real-estate',
      title: 'Real Estate Support',
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      description: 'End-to-end coordination keeping agents on the field and deals closing.',
      features: ['Property research', 'CRM & cold calling', 'Listing management', 'Transaction coordination']
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Professional',
      icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
      description: 'HIPAA-compliant, empathetic support handling critical medical administration.',
      features: ['Patient scheduling', 'Intake & verification', 'Insurance follow-up', 'Admin processing']
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Support',
      icon: <ShoppingCart className="w-6 h-6 text-amber-400" />,
      description: 'Keep your digital storefront running flawlessly around the clock.',
      features: ['Product listings', 'Order processing', 'Returns & refunds', 'Inventory & marketplaces']
    },
    {
      id: 'finance-admin',
      title: 'Finance & Admin',
      icon: <Landmark className="w-6 h-6 text-cyan-400" />,
      description: 'Tight, compliant, and transparent back-end financial management.',
      features: ['Invoice processing', 'Bookkeeping', 'Payment tracking', 'Expense reporting']
    },
    {
      id: 'tax-filing',
      title: 'Tax Filing & Returns',
      icon: <FileText className="w-6 h-6 text-violet-400" />,
      description: 'Meticulous documentation and preparation to ensure seamless compliance.',
      features: ['Tax preparation support', 'Filing assistance', 'Returns processing', 'Compliance tracking']
    },
    {
      id: 'it-bpo',
      title: 'IT BPO',
      icon: <Server className="w-6 h-6 text-teal-400" />,
      description: 'Technical problem-solvers keeping your internal and external software live.',
      features: ['Help desk', 'Technical support', 'Application support', 'Tier 1/2 troubleshooting']
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-slate-100 py-24 px-6 overflow-hidden font-sans">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-red-400 border border-red-500/20 mb-6 backdrop-blur-sm">
            ⚡ Flagship Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
            Managed BPO Services
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            Dependable, highly trained, cost-efficient offshore teams that run your daily operations—<span className="text-white font-medium">minus the overhead</span> of hiring, infrastructure, HR, and overhead supervision.
          </p>
        </div>

        {/* Services Bento-Style Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const isHovered = activeHover === service.id;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl border border-slate-800/80 bg-red-500/40 backdrop-blur-md p-8 transition-all duration-300 ease-out hover:border-red-700 hover:bg-red-900/80 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                onMouseEnter={() => setActiveHover(service.id)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {/* Micro Gradient Reveal Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Icon & Action Trigger Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 group-hover:border-slate-700 transition-colors shadow-inner">
                      {service.icon}
                    </div>
                    <div className="text-slate-600 group-hover:text-slate-300 transition-colors duration-300">
                      <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Sub-features pills list */}
                <div className="border-t border-slate-800/60 pt-4 mt-auto">
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 shrink-0 transition-colors" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Banner */}
        <div className="mt-16 rounded-3xl p-8 md:p-12 bg-gradient-to-r from-red-950/40 via-amber-950/20 to-amber-900/40 border border-indigo-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Ready to scale without the headache?</h4>
            <p className="text-slate-400 max-w-xl text-sm md:text-base">Let’s map out a dedicated, cost-efficient offshore structure custom-built for your specific operational workflow.</p>
          </div>
          
          <Link href="/contact" passHref>
  <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold shadow-lg hover:bg-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98] transition-all whitespace-nowrap">
    Build Your 
  </button>
</Link>
        </div>

      </div>
    </section>
  );
}
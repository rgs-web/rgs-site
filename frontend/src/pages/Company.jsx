import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Award, Users, Globe2, Target } from 'lucide-react';
import { COMPANY_COPY, TEAM, PILLARS } from '../data/mock';

const VALUES = [
  { icon: Target, title: 'Mission First', body: 'Every decision starts and ends with the customer’s mission.' },
  { icon: Award, title: 'Elite Talent', body: 'We recruit and retain only the most qualified operators and analysts.' },
  { icon: Globe2, title: 'Global Reach', body: 'Experience delivering results across permissive to denied environments.' },
  { icon: Users, title: 'Enduring Partnership', body: 'We are measured by the lasting capability we leave with our partners.' }
];

const Company = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="relative overflow-hidden">
      {/* Header */}
      <section className="relative pt-[160px] pb-24">
        <div className="rgs-hero-glow" />
        <div className="absolute inset-0 rgs-grid-bg opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">Company</span>
          </div>
          <h1 className="font-serif text-white text-5xl md:text-7xl leading-[1] max-w-4xl">
            A Veteran-Owned firm built on <span className="italic text-[#C8102E]">unparalleled</span> experience.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="relative pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="relative border border-[#1A2C4E] p-8 bg-[#080F22]">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#C8102E]" />
              <div className="text-[11px] tracking-[0.28em] text-[#8B9BB5] uppercase mb-3">At a Glance</div>
              <ul className="space-y-4 text-white text-[15px]">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#C8102E]" />Service Disabled, Veteran-Owned Small Business (SDVOSB)</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#C8102E]" />Mission Support, Cyber, Human Performance</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#C8102E]" />Logistics, Training, Security</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#C8102E]" />Decades of national security experience</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#C8102E]" />Agile. Scalable. Enduring.</li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-serif text-[26px] md:text-[30px] leading-[1.35] text-white">
              {COMPANY_COPY.intro}
            </p>
            <p className="mt-8 text-[#B8C4D9] text-[17px] leading-relaxed">
              {COMPANY_COPY.paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* Team - Leadership */}
      <section className="relative pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C8102E]" />
                <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">Leadership</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Our <span className="italic">management</span> team.
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className="text-[#B8C4D9] text-lg leading-relaxed">
                Unparalleled experience in special operations, intelligence, contracting, and organizational leadership — combined into a single, senior team.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1A2C4E]">
            {TEAM.map((member, i) => {
              const open = openIndex === i;
              return (
                <div key={i} className="border-b border-[#1A2C4E]">
                  <button
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="text-[13px] tracking-[0.2em] text-[#8B9BB5] w-10">0{i + 1}</span>
                      <span className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#C8102E] transition-colors">
                        {member.role}
                      </span>
                    </div>
                    <ChevronDown
                      size={22}
                      className={`text-[#C8102E] transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div className={`grid transition-all duration-500 ${open ? 'grid-rows-[1fr] pb-8' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="md:pl-[64px] max-w-3xl text-[#B8C4D9] text-[16px] leading-relaxed">
                        {member.bio}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 bg-[#080F22] border-y border-[#1A2C4E]">
        <div className="absolute inset-0 rgs-grid-bg opacity-20" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C8102E]" />
                <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">What We Value</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                The principles that <span className="italic">guide the mission.</span>
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className="text-[#B8C4D9] text-lg leading-relaxed">
                From how we recruit, to how we deploy, to how we sustain — our operating principles come from years supporting the nation’s most consequential missions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="group relative p-8 border border-[#1A2C4E] bg-[#0A1428] hover:border-[#C8102E] transition-colors">
                  <div className="w-10 h-10 border border-[#1A2C4E] flex items-center justify-center mb-6 group-hover:border-[#C8102E] transition-colors">
                    <Icon size={18} className="text-[#C8102E]" />
                  </div>
                  <div className="font-serif text-2xl text-white mb-3">{v.title}</div>
                  <div className="text-[#B8C4D9] text-[14px] leading-relaxed">{v.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars strip */}
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div key={p.key} className="relative p-8 border border-[#1A2C4E]">
                <div className="text-[11px] tracking-[0.28em] text-[#8B9BB5] mb-3">0{i + 1}</div>
                <div className="font-serif text-3xl text-white mb-3">{p.title}</div>
                <p className="text-[#B8C4D9] text-[15px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-[#1A2C4E]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative border border-[#1A2C4E] p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 rgs-hero-glow" />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <div className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase mb-3">Partner With Us</div>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                  Ready to <span className="italic">engage</span>?
                </h3>
                <p className="mt-4 text-[#B8C4D9] max-w-xl">
                  Reach out to discuss requirements, capabilities, or teaming opportunities.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link to="/contact" className="rgs-btn">
                  Contact Reliant <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Company;

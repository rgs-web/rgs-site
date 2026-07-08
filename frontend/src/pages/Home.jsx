import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Radar, Cpu, Truck, GraduationCap, Lock, ChevronRight } from 'lucide-react';
import { SERVICES, STATS, PILLARS } from '../data/mock';

const SERVICE_ICONS = {
  'mission-support': Radar,
  cyber: Cpu,
  'human-performance': Shield,
  logistics: Truck,
  training: GraduationCap,
  security: Lock
};

const Home = () => {
  const [activeService, setActiveService] = useState(SERVICES[0].id);
  const [activePillar, setActivePillar] = useState(PILLARS[0].key);

  const current = SERVICES.find((s) => s.id === activeService);
  const currentPillar = PILLARS.find((p) => p.key === activePillar);

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center pt-[72px]">
        <div className="rgs-hero-glow" />
        <div className="absolute inset-0 rgs-grid-bg opacity-40" />

        {/* Angular accent lines */}
        <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 900" preserveAspectRatio="none">
            <line x1="800" y1="0" x2="200" y2="900" stroke="#1A2C4E" strokeWidth="1" />
            <line x1="800" y1="200" x2="400" y2="900" stroke="#C8102E" strokeWidth="1" strokeOpacity="0.35" />
          </svg>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8 rgs-fade">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#C8102E]" />
              <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">Reliant Global Solutions</span>
            </div>

            <h1 className="font-serif text-white text-[52px] md:text-[86px] leading-[0.98] tracking-[-0.02em]">
              Working at the <span className="italic text-[#C8102E]">nexus</span> of intelligence and operations.
            </h1>

            <p className="mt-8 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[#B8C4D9]">
              For elite government clients. Elite defense professionals solving difficult problems with proven solutions — across permissive to denied environments worldwide.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="rgs-btn">
                Engage Our Team <ArrowRight size={16} />
              </Link>
              <Link to="/company" className="rgs-btn-ghost">
                About Reliant
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              {['Elite Defense Professionals', 'Elite Customers', 'Difficult Problems', 'Proven Solutions'].map((t) => (
                <div key={t} className="border-l border-[#1A2C4E] pl-3">
                  <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase leading-snug">{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side visual */}
          <div className="hidden md:flex md:col-span-4 justify-end">
            <div className="relative w-[320px] h-[420px]">
              <div className="absolute inset-0 border border-[#1A2C4E]" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C8102E]" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C8102E]" />
              <div className="absolute inset-6 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-[#8B9BB5]">EST. TRUST</div>
                  <div className="mt-1 text-white text-3xl font-serif">SDVOSB</div>
                </div>
                <div className="rgs-stripes h-16 w-full opacity-70" />
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-[#8B9BB5]">STATUS</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C8102E] rgs-pulse" />
                    <span className="text-white text-sm tracking-wide">Mission Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B9BB5] text-[10px] tracking-[0.3em]">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-[#8B9BB5]/40" />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C8102E]" />
                <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">What We Do</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Solutions for the <span className="italic">most difficult</span> problems.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 flex items-end">
              <p className="text-[#B8C4D9] text-lg leading-relaxed">
                We design and deliver solutions to the most difficult problems facing our U.S. national security and defense partners — with a deep bench of highly qualified operators available on demand.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Tabs */}
            <div className="md:col-span-4 flex flex-col border-l border-[#1A2C4E]">
              {SERVICES.map((s) => {
                const Icon = SERVICE_ICONS[s.id];
                const active = activeService === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveService(s.id)}
                    className={`rgs-tab flex items-center justify-between text-left ${active ? 'active' : ''}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={active ? 'text-[#C8102E]' : 'text-[#8B9BB5]'} />
                      {s.title}
                    </span>
                    {active && <ChevronRight size={16} className="text-[#C8102E]" />}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="md:col-span-8 relative">
              <div key={current.id} className="rgs-fade">
                <div className="text-[11px] tracking-[0.28em] text-[#8B9BB5] uppercase mb-3">Service</div>
                <h3 className="font-serif text-white text-4xl md:text-5xl leading-tight">{current.title}</h3>
                <div className="mt-3 text-[#C8102E] text-lg italic font-serif">{current.tagline}</div>
                <p className="mt-6 text-[#B8C4D9] text-[16px] leading-relaxed max-w-2xl">
                  {current.description}
                </p>
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[#E2E8F0] text-[15px]">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#C8102E] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEYOND THE MISSION - Pillars + stats */}
      <section className="relative py-32 bg-[#080F22] border-y border-[#1A2C4E]">
        <div className="absolute inset-0 rgs-grid-bg opacity-25" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C8102E]" />
                <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">Beyond the Mission</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Agile. Scalable. <span className="italic">Enduring.</span>
              </h2>
              <p className="mt-6 text-[#B8C4D9] leading-relaxed">
                The work we do transcends immediate objectives. Every engagement is designed to build lasting capability for the nation we serve.
              </p>

              <div className="mt-10 flex gap-6 border-b border-[#1A2C4E] pb-4">
                {PILLARS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setActivePillar(p.key)}
                    className={`text-lg font-medium tracking-tight pb-3 -mb-[17px] border-b-2 transition-colors ${
                      activePillar === p.key
                        ? 'text-white border-[#C8102E]'
                        : 'text-[#8B9BB5] border-transparent hover:text-white'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <p key={currentPillar.key} className="mt-6 text-[#B8C4D9] text-[16px] leading-relaxed rgs-fade">
                {currentPillar.body}
              </p>
            </div>

            {/* Angular geometric visual */}
            <div className="md:col-span-7 flex items-center justify-center">
              <div className="relative w-full max-w-[520px] aspect-square">
                <div className="absolute inset-0 border border-[#1A2C4E] rotate-45" />
                <div className="absolute inset-[10%] border border-[#1A2C4E] rotate-45" />
                <div className="absolute inset-[20%] border border-[#C8102E]/40 rotate-45" />
                <div className="absolute inset-[30%] border border-[#1A2C4E] rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#C8102E] rgs-pulse" />
                </div>
                {/* Radar sweeps */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#1A2C4E" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#1A2C4E" strokeWidth="0.5" strokeDasharray="2 3" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#C8102E" strokeWidth="0.5" strokeOpacity="0.5" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="#1A2C4E" strokeWidth="0.5" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="#1A2C4E" strokeWidth="0.5" />
                </svg>
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-[#8B9BB5]">RGS · 001</div>
                <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] text-[#8B9BB5]">MISSION MATRIX</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t border-[#1A2C4E] pt-10">
            {STATS.map((s) => (
              <div key={s.label} className="relative">
                <div className="absolute -top-10 left-0 w-10 h-px bg-[#C8102E]" />
                <div className="rgs-stat-num text-white">{s.value}</div>
                <div className="mt-4 text-white font-medium text-[15px] leading-snug">{s.label}</div>
                <div className="mt-2 text-[#8B9BB5] text-sm leading-relaxed">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERSECTION - Intelligence & Operations */}
      <section className="relative py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#C8102E]" />
              <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">The Nexus</span>
              <div className="w-6 h-px bg-[#C8102E]" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              We operate at the intersection of <span className="italic">intelligence</span> and <span className="italic">operations</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rgs-corner p-10 border border-[#1A2C4E] bg-[#080F22] hover:bg-[#0A1428] transition-colors">
              <div className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase mb-4">01 · Intelligence</div>
              <h3 className="font-serif text-3xl text-white mb-4">Actionable Insight</h3>
              <p className="text-[#B8C4D9] leading-relaxed">
                We enable the intelligence community to deliver actionable intelligence that informs decisions, mitigates threats, and supports critical operations to safeguard the United States and its allies.
              </p>
            </div>
            <div className="rgs-corner p-10 border border-[#1A2C4E] bg-[#080F22] hover:bg-[#0A1428] transition-colors">
              <div className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase mb-4">02 · Operations</div>
              <h3 className="font-serif text-3xl text-white mb-4">Decisive Action</h3>
              <p className="text-[#B8C4D9] leading-relaxed">
                We partner with special operations, defense, and interagency customers to deliver capabilities that defend the United States, deter aggression, and ensure peace and stability globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative border border-[#1A2C4E] p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 rgs-hero-glow" />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <div className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase mb-3">Engage</div>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                  Bring us your <span className="italic">hardest</span> problem.
                </h3>
                <p className="mt-4 text-[#B8C4D9] max-w-xl">
                  Reliant Global Solutions is ready to support your most sensitive missions — anywhere in the world.
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

export default Home;

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { CONTACT_INFO } from '../data/mock';

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Missing fields', description: 'Name, email, and message are required.' });
      return;
    }
    setSubmitting(true);
    // Mock submission - persist to localStorage for demo
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('rgs_contact_submissions') || '[]');
        existing.push({ ...form, submitted_at: new Date().toISOString() });
        localStorage.setItem('rgs_contact_submissions', JSON.stringify(existing));
      } catch {}
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: 'Message received',
        description: 'Thank you — our team will be in touch shortly.'
      });
    }, 900);
  };

  return (
    <main className="relative overflow-hidden">
      <section className="relative pt-[160px] pb-16">
        <div className="rgs-hero-glow" />
        <div className="absolute inset-0 rgs-grid-bg opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase">Contact</span>
          </div>
          <h1 className="font-serif text-white text-5xl md:text-7xl leading-[1] max-w-4xl">
            Let’s discuss the <span className="italic text-[#C8102E]">mission</span>.
          </h1>
          <p className="mt-8 text-[#B8C4D9] text-lg max-w-2xl leading-relaxed">
            Reach out to our team for capability inquiries, partnering opportunities, or urgent requirements. We’ll respond within one business day.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Info */}
          <div className="md:col-span-4 space-y-8">
            <div className="relative border border-[#1A2C4E] p-8 bg-[#080F22]">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#C8102E]" />
              <div className="text-[11px] tracking-[0.28em] text-[#8B9BB5] uppercase mb-6">Direct Channels</div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-[#1A2C4E] flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase mb-1">Email</div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white text-[15px] hover:text-[#C8102E] transition-colors break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-[#1A2C4E] flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase mb-1">Response Time</div>
                    <div className="text-white text-[15px]">Within one business day</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-[#1A2C4E] flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase mb-1">Operating Reach</div>
                    <div className="text-white text-[15px]">CONUS & OCONUS · Global</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#1A2C4E] p-8 bg-[#080F22]">
              <div className="text-[11px] tracking-[0.28em] text-[#C8102E] uppercase mb-4">Certifications</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-1.5 bg-[#C8102E] rgs-pulse" />
                <span className="text-white text-sm tracking-wide">Service Disabled Veteran-Owned Small Business</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#C8102E]" />
                <span className="text-white text-sm tracking-wide">DTCC / ITAR / Commerce Compliant</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8">
            <div className="relative border border-[#1A2C4E] p-8 md:p-12 bg-[#080F22]">
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#C8102E]" />
              {submitted ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <CheckCircle2 size={48} className="text-[#C8102E] mb-6" />
                  <h3 className="font-serif text-3xl text-white mb-3">Message received.</h3>
                  <p className="text-[#B8C4D9] max-w-md">
                    Thank you for reaching out to Reliant Global Solutions. A member of our team will respond within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', company: '', phone: '', message: '' });
                    }}
                    className="mt-8 rgs-btn-ghost"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="text-[11px] tracking-[0.28em] text-[#8B9BB5] uppercase mb-2">Secure Contact Form</div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-10">Tell us about your requirement.</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase">Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        className="rgs-input"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        className="rgs-input"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase">Company / Agency</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={onChange}
                        className="rgs-input"
                        placeholder="Organization"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="rgs-input"
                        placeholder="(000) 000-0000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[11px] tracking-[0.2em] text-[#8B9BB5] uppercase">Message *</label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={onChange}
                        className="rgs-input resize-none"
                        placeholder="Share the requirement, mission context, or teaming inquiry."
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-[12px] text-[#64748B] max-w-md leading-relaxed">
                      Submissions are routed directly to our leadership team. Do not include classified information.
                    </p>
                    <button type="submit" className="rgs-btn" disabled={submitting}>
                      {submitting ? 'Sending…' : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

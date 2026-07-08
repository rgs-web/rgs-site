import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/mock';

const Footer = () => {
  return (
    <footer className="relative border-t border-[#1A2C4E] bg-[#060B18] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://customer-assets.emergentagent.com/job_coreone-builder/artifacts/0gu8ezo7_RGS-rgb-sm.png"
              alt="Reliant Global Solutions"
              className="w-10 h-10 object-contain"
            />
            <div className="leading-tight">
              <div className="text-white font-semibold tracking-[0.18em] text-[13px]">RELIANT</div>
              <div className="text-[#8B9BB5] tracking-[0.28em] text-[10px]">GLOBAL SOLUTIONS</div>
            </div>
          </div>
          <p className="text-[#8B9BB5] text-sm max-w-md leading-relaxed">
            {CONTACT_INFO.tagline}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-[#1A2C4E] text-[11px] tracking-[0.15em] text-[#8B9BB5]">
            <span className="w-1.5 h-1.5 bg-[#C8102E] rgs-pulse" />
            SDVOSB CERTIFIED
          </div>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] mb-4">EXPLORE</div>
          <ul className="space-y-2">
            <li><Link className="text-sm text-white/85 hover:text-[#C8102E] transition-colors" to="/">Home</Link></li>
            <li><Link className="text-sm text-white/85 hover:text-[#C8102E] transition-colors" to="/company">Company</Link></li>
            <li><Link className="text-sm text-white/85 hover:text-[#C8102E] transition-colors" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.2em] text-[#8B9BB5] mb-4">CONNECT</div>
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 text-sm text-white/85 hover:text-[#C8102E] transition-colors mb-3">
            <Mail size={14} /> {CONTACT_INFO.email}
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-white/85 hover:text-[#C8102E] transition-colors">
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-[#1A2C4E]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-[#64748B]">
            © {new Date().getFullYear()} Reliant Global Solutions. All rights reserved.
          </p>
          <p className="text-[11px] tracking-[0.15em] text-[#64748B]">
            SERVICE DISABLED &middot; VETERAN OWNED &middot; MISSION FIRST
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

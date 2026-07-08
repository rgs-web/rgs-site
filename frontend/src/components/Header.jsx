import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/company', label: 'Company' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#060B18]/85 border-b border-[#1A2C4E]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://customer-assets.emergentagent.com/job_coreone-builder/artifacts/0gu8ezo7_RGS-rgb-sm.png"
            alt="Reliant Global Solutions"
            className="w-10 h-10 object-contain"
          />
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-[0.18em] text-[13px]">RELIANT</div>
            <div className="text-[#8B9BB5] tracking-[0.28em] text-[10px]">GLOBAL SOLUTIONS</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => `rgs-nav-link ${isActive ? 'active' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="rgs-btn text-[13px] py-2.5 px-5">
            Contact
          </Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#060B18] border-t border-[#1A2C4E] px-6 py-6 flex flex-col gap-5">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `rgs-nav-link ${isActive ? 'active' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="rgs-btn text-[13px] py-2.5 px-5 w-fit">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

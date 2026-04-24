import { Link } from 'react-router-dom';
import { Code2, Zap, Users, GitBranch, Terminal, ArrowRight, Shield, Globe } from 'lucide-react';
import './LandingPage.css';

const features = [
  {
    icon: <Terminal size={28} />,
    title: 'Live Code Execution',
    desc: 'Run code in 10+ languages directly in the browser with real-time output.',
    color: '#6c63ff',
  },
  {
    icon: <Users size={28} />,
    title: 'Real-time Collaboration',
    desc: 'Pair program with your team — cursors, edits, and live sessions synced instantly.',
    color: '#22d3a0',
  },
  {
    icon: <GitBranch size={28} />,
    title: 'Version Control',
    desc: 'Track every change with built-in file version history and restore points.',
    color: '#ffd166',
  },
  {
    icon: <Zap size={28} />,
    title: 'Smart Editor',
    desc: 'Monaco-powered editor with syntax highlighting, IntelliSense and themes.',
    color: '#ff9f40',
  },
  {
    icon: <Shield size={28} />,
    title: 'Secure by Design',
    desc: 'JWT authentication, role-based access, and developer vetting via admin approval.',
    color: '#4fc3f7',
  },
  {
    icon: <Globe size={28} />,
    title: 'Public & Private Projects',
    desc: 'Share your work publicly or keep projects private with granular visibility.',
    color: '#ff5c5c',
  },
];

const languages = ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby', 'C#'];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="badge badge-primary"><Zap size={12} /> Powered by Spring Microservices</span>
          </div>
          <h1 className="hero-title">
            Code Together,<br />
            <span className="gradient-text">Ship Faster</span>
          </h1>
          <p className="hero-subtitle">
            A modern, real-time collaborative coding platform for developers.
            Write, run, and share code — all in one powerful workspace.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-lg">
              Explore Projects
            </Link>
          </div>

          {/* Language pills */}
          <div className="hero-langs">
            {languages.map((lang) => (
              <span key={lang} className="lang-pill">{lang}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to collaborate</h2>
            <p>A complete platform built with a microservices architecture for reliability and scale.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card card">
                <div className="feature-icon" style={{ background: f.color + '22', color: f.color }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to start coding together?</h2>
            <p>Join CodeSync — the platform where great software is built collaboratively.</p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Free Account <ArrowRight size={18} />
              </Link>
              <Link to="/apply" className="btn btn-secondary btn-lg">
                Apply as Developer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <Code2 size={20} />
              <span>CodeSync</span>
            </div>
            <p className="footer-copy">© 2026 CodeSync. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/login">Sign In</Link>
              <Link to="/apply">Apply as Dev</Link>
              <Link to="/admin/login">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

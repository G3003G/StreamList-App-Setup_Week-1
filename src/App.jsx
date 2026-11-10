import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Clapperboard, CircleHelp, Film, House, ListPlus, ShoppingCart, Sparkles } from 'lucide-react';

const navigation = [
  { label: 'StreamList', to: '/', icon: House, end: true },
  { label: 'Movies', to: '/movies', icon: Film },
  { label: 'Cart', to: '/cart', icon: ShoppingCart },
  { label: 'About', to: '/about', icon: CircleHelp },
];

function Header() {
  return (
    <header className="topbar">
      <NavLink className="brand" to="/" aria-label="StreamList home">
        <span className="brand-mark"><Clapperboard size={21} strokeWidth={2.3} /></span>
        <span>Stream<span className="brand-accent">List</span></span>
      </NavLink>
      <nav className="navigation" aria-label="Main navigation">
        {navigation.map(({ label, to, icon: Icon, end }) => (
          <NavLink key={label} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Icon size={17} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="profile-chip"><span className="profile-dot">H</span><span>My space</span></div>
    </header>
  );
}

function StreamListPage() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setMessage('Type a movie or show title first.');
      return;
    }
    console.log('StreamList input:', trimmedTitle);
    setItems((current) => [...current, { id: crypto.randomUUID(), title: trimmedTitle }]);
    setTitle('');
    setMessage(`“${trimmedTitle}” was sent to the console and added to this preview.`);
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> YOUR NEXT WATCH, ORGANIZED</div>
          <h1>Keep your next<br /><span>great watch</span> close.</h1>
          <p>Build a personal list of movies and shows you’re excited to stream. Add a title and keep your watch ideas in one place.</p>
          <div className="hero-note"><span className="note-dot" /> A little list goes a long way.</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="poster poster-back"><span>TONIGHT</span><b>THE<br />UNKNOWN</b><i>01</i></div>
          <div className="poster poster-front"><div className="poster-sun" /><span>EZTECH ORIGINAL</span><b>AFTER<br />THE<br />LIGHTS</b><i>STREAMLIST PICK</i></div>
          <div className="floating-tag"><span className="tag-star">✦</span><span>Saved for later</span></div>
        </div>
      </section>

      <section className="workspace">
        <div className="section-heading">
          <div><span className="section-kicker">YOUR PERSONAL WATCHLIST</span><h2>Start your StreamList</h2></div>
          <span className="count-pill">{items.length} {items.length === 1 ? 'title' : 'titles'}</span>
        </div>
        <form className="add-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="watch-title">Movie or show title</label>
          <ListPlus className="input-icon" size={19} />
          <input id="watch-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a movie or show you want to watch..." />
          <button type="submit">Add to list <span aria-hidden="true">＋</span></button>
        </form>
        {message && <p className="status-message" role="status">{message}</p>}
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><Clapperboard size={25} /></div>
            <h3>Your watchlist starts here</h3>
            <p>Add your first title above. Your entry will also appear in the browser console.</p>
          </div>
        ) : (
          <ul className="watch-list" aria-label="Your watchlist">
            {items.map((item, index) => <li key={item.id}><span className="item-number">{String(index + 1).padStart(2, '0')}</span><span className="item-title">{item.title}</span><span className="saved-label">SAVED</span></li>)}
          </ul>
        )}
      </section>
      <footer className="page-footer"><span>EZTechMovie</span><span>Make room for what you want to watch.</span></footer>
    </main>
  );
}

function EmptyPage({ title, subtitle, icon: Icon }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon"><Icon size={26} /></div>
        <span className="section-kicker">COMING IN A FUTURE PROJECT WEEK</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="placeholder-rule" />
        <span className="placeholder-foot">This page is intentionally empty for Week 1.</span>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<StreamListPage />} />
        <Route path="/movies" element={<EmptyPage title="Movies" subtitle="Movie browsing will be added in Week 4." icon={Film} />} />
        <Route path="/cart" element={<EmptyPage title="Cart" subtitle="Cart functionality will be added in Week 4." icon={ShoppingCart} />} />
        <Route path="/about" element={<EmptyPage title="About StreamList" subtitle="The About page will be added in Week 5." icon={CircleHelp} />} />
        <Route path="*" element={<EmptyPage title="Page not found" subtitle="Choose a page from the navigation above." icon={House} />} />
      </Routes>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, ChevronDown, Gift,
  Heart, Mail, Menu, Music2, Pause, Play, RotateCcw, Sparkles, Star,
  Volume2, VolumeX, X, Camera
} from 'lucide-react';
import './App.css';

const ASSET = '/assets/';
const memories = [
  { file: 'snemad.jpg', caption: 'A little moment, forever' },
  { file: 'snemad2.jpg', caption: 'My favourite kind of chaos' },
  { file: 'snemad3.jpg', caption: 'Just us being us' },
  { file: 'snemad4.jpg', caption: 'A memory I keep close' },
  { file: 'snemad5.jpg', caption: 'Smiles that say everything' },
  { file: 'snemad6.jpg', caption: 'One for the scrapbook' },
  { file: 'snemad7.jpg', caption: 'The best little memories' },
  { file: 'snemad8.jpg', caption: 'Always worth remembering' },
  { file: 'snemad9.jpg', caption: 'A day made brighter' },
  { file: 'snemad10.jpg', caption: 'More memories to come' },
];

const DEFAULT_LETTER = `My dear Madhuu,

Happy Birthday to my favourite human and my sweet My Putteyyy! 💗

I hope this new year of your life brings you the kind of happiness that stays, the kind of laughter that makes your cheeks hurt, and lots of little moments that turn into beautiful memories.

Thank you for being you — for the laughs, the silly talks, the comfort, and all the small things that make our friendship special. I hope you never forget how precious you are and how much goodness you deserve.

Keep being your lovely, funny, wonderful self. Dream big, take care of your heart, and remember that I will always be cheering for you.

Happy Birthday, Madhuu. Here's to more stories, more photos, and more memories together!

With lots of love,
Your bestie 🎀`;

function Confetti({ active, onDone }) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(onDone, 3300);
    return () => window.clearTimeout(timer);
  }, [active, onDone]);
  if (!active) return null;
  return <div className="confetti" aria-hidden="true">
    {Array.from({ length: 38 }, (_, i) => <span key={i} style={{
      '--x': `${(i * 37) % 100}%`,
      '--c': ['#e9a5bf', '#d8c8f4', '#d6b976', '#fff'][i % 4],
      '--s': `${8 + (i % 4) * 4}px`,
      '--d': `${2.2 + (i % 7) * .18}s`,
      '--delay': `${(i % 9) * .08}s`,
    }}>{i % 3 === 0 ? '♥' : i % 3 === 1 ? '✦' : '●'}</span>)}
  </div>;
}

function PhotoImage({ memory, onClick, index }) {
  const [failed, setFailed] = useState(false);
  return <button className="polaroid" onClick={onClick} aria-label={`Open memory ${index + 1}: ${memory.caption}`}>
    <span className="photo-frame">
      {!failed ? <img src={ASSET + memory.file} alt={`Memory ${index + 1}: ${memory.caption}`} loading="lazy" onError={() => setFailed(true)} /> :
        <span className="photo-placeholder"><Camera size={27} strokeWidth={1.4} /><span>Your photo goes here</span><small>{memory.file}</small></span>}
    </span>
    <span className="caption">{memory.caption}</span>
  </button>;
}

function Lightbox({ index, setIndex, onClose }) {
  const [failed, setFailed] = useState(false);
  const current = memories[index];
  useEffect(() => setFailed(false), [index]);
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex((index + memories.length - 1) % memories.length);
      if (event.key === 'ArrowRight') setIndex((index + 1) % memories.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, onClose, setIndex]);
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
    <button className="lightbox-close" aria-label="Close photo viewer" onClick={onClose}><X /></button>
    <div className="lightbox-panel" onClick={e => e.stopPropagation()}>
      <button className="lightbox-arrow" aria-label="Previous photo" onClick={() => setIndex((index + 9) % 10)}><ArrowLeft size={20} /></button>
      <div className="lightbox-photo">
        {!failed ? <img src={ASSET + current.file} alt={`Memory ${index + 1}: ${current.caption}`} onError={() => setFailed(true)} /> :
          <div className="photo-placeholder"><Camera size={34} /><p>Add your photo here</p><small>{current.file}</small></div>}
        <div className="lightbox-caption">{current.caption}</div>
      </div>
      <button className="lightbox-arrow" aria-label="Next photo" onClick={() => setIndex((index + 1) % 10)}><ArrowRight size={20} /></button>
    </div>
  </div>;
}

function MusicPlayer({ started }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [missing, setMissing] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
        setMissing(false);
      } catch {
        setMissing(true);
        setPlaying(false);
      }
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (started && audio && !missing) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [started, missing]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);
  return <>
    <audio ref={audioRef} src={`${ASSET}song.mp3`} loop preload="none"
      onError={() => { setMissing(true); setPlaying(false); }}
      onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
    <div className="music-player" aria-label="Background music controls">
      <button className="music-main" onClick={togglePlay} aria-label={playing ? 'Pause background music' : 'Play background music'}>
        <span className="music-disc">{playing ? <Pause size={16} /> : <Play size={16} />}</span>
        <span className="music-label">{missing ? 'Add your song' : playing ? 'Now playing' : 'Our little song'}</span>
        <span className={`music-bars ${playing ? 'playing' : ''}`} aria-hidden="true"><i /><i /><i /></span>
      </button>
      <button className="mute-btn" onClick={() => setMuted(v => !v)} aria-label={muted ? 'Unmute music' : 'Mute music'}>
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  </>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [editing, setEditing] = useState(false);
  const [letter, setLetter] = useState(DEFAULT_LETTER);
  const [draft, setDraft] = useState(DEFAULT_LETTER);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('madhuBirthdayLetter');
      if (saved) setLetter(saved);
    } catch { /* LocalStorage can be unavailable in private browsing. */ }
    const onScroll = () => setShowTop(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const launchSurprise = () => {
    setOpened(true);
    setConfetti(true);
    window.setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const saveLetter = () => {
    setLetter(draft);
    try { window.localStorage.setItem('madhuBirthdayLetter', draft); } catch { /* Keep the edit for this session. */ }
    setEditing(false);
  };
  const resetLetter = () => {
    setDraft(DEFAULT_LETTER);
    setLetter(DEFAULT_LETTER);
    try { window.localStorage.removeItem('madhuBirthdayLetter'); } catch { /* Optional storage. */ }
    setEditing(false);
  };
  const openGift = () => {
    setGiftOpened(true);
    setConfetti(true);
  };

  return <div className="app-shell">
    {!opened ? <main className="welcome-screen">
      <span className="floaty" style={{ top: '13%', left: '12%' }}><Star size={21} /></span>
      <span className="floaty" style={{ top: '24%', right: '13%', animationDelay: '1s' }}><Heart size={19} /></span>
      <span className="floaty" style={{ bottom: '15%', left: '18%', animationDelay: '.5s' }}><Sparkles size={22} /></span>
      <div className="welcome-card">
        <div className="eyebrow">A little something, just for you</div>
        <h1>Hey <span className="script">Madhuu!</span> 🎀</h1>
        <p>I made something special for you…</p>
        <div className="envelope-art" aria-hidden="true">
          <span className="sparkle one">✦</span><span className="sparkle two">✧</span><span className="sparkle three">✦</span>
          <div className="envelope" />
        </div>
        <p>Made with love, little memories, and lots of friendship.</p>
        <button className="primary-btn" onClick={launchSurprise}>Open Your Surprise <Mail size={17} /></button>
      </div>
    </main> : <div className="main-site">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}>Madhuu ♡</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}>Home</a>
          <a href="#memories" onClick={e => { e.preventDefault(); scrollTo('memories'); }}>Memories</a>
          <a href="#letter" onClick={e => { e.preventDefault(); scrollTo('letter'); }}>Letter</a>
          <a href="#final" onClick={e => { e.preventDefault(); scrollTo('final'); }}>Final Surprise</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <span className="floaty heart-a">♡</span><span className="floaty heart-b">✦</span>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Today is your kind of magic ✨</div>
            <h1>Happy Birthday,<span>Madhuu!</span></h1>
            <p className="script" style={{ fontSize: '2.25rem', margin: '0 0 15px' }}>My Putteyyy, today is all about you! 💗</p>
            <p className="lead">Some connections are rare, and ours is one of them. A special birthday surprise created with love, memories, and friendship — just for you.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollTo('memories')}>Explore Our Memories <Sparkles size={17} /></button>
              <button className="secondary-btn" onClick={() => scrollTo('letter')}>A little letter <Mail size={16} /></button>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative birthday cake illustration">
            <div className="orbit" />
            <span className="decor-heart heart-a">♡</span><span className="decor-heart heart-b">✧</span>
            <div className="cake-card"><div className="cake" role="img" aria-label="Birthday cake">🎂</div><span className="tiny-label">made with love</span></div>
          </div>
        </div>
      </section>

      <section className="section memories-section" id="memories">
        <div className="section-inner">
          <div className="section-heading">
            <div className="eyebrow">Little pieces of forever</div>
            <h2>Our Little Memories <span className="script">♡</span></h2>
            <p>Ten tiny spaces for the moments that mean a lot. Tap any photo to see it a little closer.</p>
          </div>
          <div className="memory-grid">
            {memories.map((memory, index) => <PhotoImage key={memory.file} memory={memory} index={index} onClick={() => setLightboxIndex(index)} />)}
          </div>
          <p className="gallery-note">♡ The best memories are still waiting to happen. ♡</p>
        </div>
      </section>

      <section className="section letter-section" id="letter">
        <div className="section-inner">
          <div className="section-heading">
            <div className="eyebrow">From my heart to yours</div>
            <h2>A Little Letter for You <span className="script">💗</span></h2>
            <p>A few words for one very special friend.</p>
          </div>
          <div className="letter-layout">
            <div className="letter-illustration" aria-hidden="true">
              <div className={`letter-envelope ${letterOpened ? 'open' : ''}`}><div className="letter-paper" /></div>
            </div>
            <div className="letter-content">
              <h3>Dear Madhuu,</h3>
              {!letterOpened ? <>
                <p className="letter-text">There's a little note waiting just for you, My Putteyyy. Open it whenever you're ready. 💌</p>
                <div className="letter-tools"><button className="primary-btn" onClick={() => setLetterOpened(true)}>Open My Letter <Mail size={17} /></button></div>
              </> : editing ? <>
                <label htmlFor="letter-editor" className="eyebrow">Edit your birthday letter</label>
                <textarea id="letter-editor" className="letter-editor" value={draft} onChange={e => setDraft(e.target.value)} />
                <div className="letter-tools">
                  <button className="primary-btn" onClick={saveLetter}><Check size={16} /> Save</button>
                  <button className="secondary-btn" onClick={() => { setDraft(letter); setEditing(false); }}>Cancel</button>
                  <button className="text-btn" onClick={resetLetter}><RotateCcw size={15} /> Reset to Original</button>
                </div>
              </> : <>
                <p className="letter-text">{letter}</p>
                <div className="letter-tools">
                  <button className="secondary-btn" onClick={() => { setDraft(letter); setEditing(true); }}>Edit Letter</button>
                  <button className="text-btn" onClick={resetLetter}><RotateCcw size={15} /> Reset to Original</button>
                </div>
              </>}
            </div>
          </div>
        </div>
      </section>

      <section className="section gift-section" id="final">
        <div className="section-inner gift-wrap">
          <div className="gift-art" aria-hidden="true">
            <div className="gift-glow" />
            <div className={`gift-box ${giftOpened ? 'open' : ''}`}>{giftOpened ? '🎉' : '🎁'}</div>
            {giftOpened && <><span className="floaty" style={{ top: '10%', left: '15%' }}>♡</span><span className="floaty" style={{ top: '20%', right: '10%' }}>✦</span><span className="floaty" style={{ bottom: '15%', left: '25%' }}>✨</span></>}
          </div>
          <div className="gift-copy">
            <div className="eyebrow">Just one more thing…</div>
            <h2>One Last Surprise, Madhuu! <span className="script">🎀</span></h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>There's one more little wish tucked away for your special day.</p>
            {!giftOpened ? <button className="primary-btn" onClick={openGift}>Open Your Final Gift <Gift size={17} /></button> :
              <div className="final-message" role="status">
                Happy Birthday, My Putteyyy! 💗 No matter how busy life gets, I hope you always have reasons to smile, dream big, and feel loved. Thank you for being such a special part of my life. Wishing you endless happiness, beautiful memories, and the happiest year ahead! ✨
              </div>}
          </div>
        </div>
      </section>
      <footer className="footer">Made with love for Madhuu, My Putteyyy <Heart size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> · A little scrapbook of us</footer>
    </div>}

    {opened && <MusicPlayer started={opened} />}
    {opened && showTop && <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><ArrowUp size={19} /></button>}
    {lightboxIndex !== null && <Lightbox index={lightboxIndex} setIndex={setLightboxIndex} onClose={() => setLightboxIndex(null)} />}
    <Confetti active={confetti} onDone={() => setConfetti(false)} />
  </div>;
}

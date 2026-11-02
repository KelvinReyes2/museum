import { useCallback, useEffect, useRef, useState } from "react";
import { AUDIO, CONFIG, OUTSIDE, ROOMS } from "./data.js";
import { Viewer, Walker } from "./People.jsx";

/* ───────────────────────── Background music: chorus loop ───────────────────────── */
function useChorusLoop() {
  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  const loopCheck = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.currentTime >= AUDIO.chorusEnd - 0.08) a.currentTime = AUDIO.chorusStart;
  }, []);

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (!a || a.paused) return;
    loopCheck();
    rafRef.current = requestAnimationFrame(tick);
  }, [loopCheck]);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    const seek = () => {
      a.currentTime = AUDIO.chorusStart;
    };
    if (a.currentTime < AUDIO.chorusStart || a.currentTime >= AUDIO.chorusEnd) {
      if (a.readyState >= 1) seek();
      else a.addEventListener("loadedmetadata", seek, { once: true });
    }
    a.volume = AUDIO.volume;
    try {
      await a.play();
      setPlaying(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    } catch (err) {
      console.warn("Could not play audio. Is public/audio/paraluman.mp3 there?", err);
      setPlaying(false);
    }
  }, [tick]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // timeupdate keeps looping even when the tab is in the background (rAF pauses there)
  const audioProps = {
    ref: audioRef,
    src: AUDIO.src,
    preload: "auto",
    onTimeUpdate: loopCheck,
    onEnded: () => {
      if (audioRef.current) {
        audioRef.current.currentTime = AUDIO.chorusStart;
        audioRef.current.play().catch(() => {});
      }
    },
  };

  return { audioProps, playing, play, toggle };
}

/* ───────────────────────── Helpers ───────────────────────── */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function timeTogether(startDate) {
  const start = new Date(startDate + "T00:00:00");
  const now = new Date();
  if (isNaN(start) || now < start) return { months: 0, days: 0, total: 0 };
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  const anchor = new Date(start);
  anchor.setMonth(anchor.getMonth() + months);
  const days = Math.floor((now - anchor) / 86400000);
  const total = Math.floor((now - start) / 86400000);
  return { months, days, total };
}

/* ───────────────────────── Sound button ───────────────────────── */
function SoundButton({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-full border border-gold/50 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ivory backdrop-blur transition hover:bg-black/80"
    >
      <span className={`eq flex h-4 items-end gap-[2px] text-gold ${playing ? "" : "paused"}`}>
        <span />
        <span />
        <span />
      </span>
      {playing ? "Paraluman" : "Play music"}
    </button>
  );
}

/* ───────────────────────── Entrance ───────────────────────── */
function Facade() {
  const columns = Array.from({ length: 6 });
  return (
    <div className="relative mx-auto w-[min(94vw,780px)] select-none">
      <div
        className="mx-auto h-20 w-[98%] bg-gradient-to-b from-stone-100 to-stone-300 md:h-28"
        style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
      />
      <div className="relative z-10 flex h-8 items-center justify-center border-b-4 border-stone-400 bg-stone-200 text-[9px] font-medium uppercase tracking-[0.5em] text-stone-600 md:h-10 md:text-xs">
        Museum of Us · Est. with love
      </div>

      <div className="relative h-52 overflow-hidden bg-[#2b1810] md:h-64">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,196,110,.65),rgba(255,160,70,.15)_55%,transparent_75%)]" />
        {/* hanging banner */}
        <div
          className="absolute left-1/2 top-0 z-10 flex h-36 w-24 -translate-x-1/2 flex-col items-center justify-center bg-gradient-to-b from-[#7a1f33] to-[#4d1222] px-2 text-center shadow-xl md:h-44 md:w-[100px]"
          style={{ clipPath: "polygon(0 0,100% 0,100% 100%,50% 90%,0 100%)" }}
        >
          <span className="text-[8px] uppercase tracking-[0.2em] text-gold">Now showing</span>
          <span className="mt-1 font-display text-2xl italic leading-none text-ivory md:text-3xl">Us</span>
          <span className="mt-2 text-[8px] uppercase tracking-[0.2em] text-gold/80">Free admission</span>
        </div>
        {/* columns */}
        <div className="absolute inset-0 z-20 flex justify-between px-1 md:px-3">
          {columns.map((_, i) => (
            <div key={i} className="relative h-full w-5 md:w-9">
              <div className="absolute inset-x-[-3px] top-0 h-3 bg-stone-200 md:h-4" />
              <div
                className="absolute inset-x-0 bottom-0 top-3 shadow-[inset_-6px_0_8px_rgba(0,0,0,.25)] md:top-4"
                style={{ background: "repeating-linear-gradient(90deg,#d6cfbf 0 3px,#f1ebdc 3px 7px)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* steps + crowd */}
      <div className="relative z-10">
        <div className="mx-auto h-3 w-[102%] -translate-x-[1%] bg-stone-300" />
        <div className="mx-auto h-3 w-[105%] -translate-x-[2.4%] bg-stone-400" />
        <div className="mx-auto h-3 w-[108%] -translate-x-[3.7%] bg-stone-500" />
      </div>
    </div>
  );
}

function Hero({ onEnter }) {
  return (
    <header className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[linear-gradient(to_bottom,#0f0b22,#32183c_55%,#b8613f_100%)] px-4 pb-0 pt-20">
      <div className="stars pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute right-[10%] top-[8%] h-14 w-14 rounded-full bg-[#fff1cf] shadow-[0_0_60px_20px_rgba(255,240,200,.35)]" />
      <p className="relative z-10 text-[11px] uppercase tracking-[0.5em] text-gold">Permanent Collection</p>
      <h1 className="relative z-10 mt-3 text-center font-display text-5xl font-bold leading-[1.05] text-ivory md:text-7xl">
        {CONFIG.title}
      </h1>
      <p className="relative z-10 mt-3 font-serif text-xl italic text-ivory/80 md:text-2xl">{CONFIG.subtitle}</p>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <button
          onClick={onEnter}
          className="group rounded-full border border-gold bg-gold/10 px-8 py-3 text-sm uppercase tracking-[0.3em] text-ivory backdrop-blur transition hover:bg-gold hover:text-black"
        >
          Enter the Gallery <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
        </button>
        <p className="text-[11px] uppercase tracking-[0.25em] text-ivory/50">Best experienced with sound</p>
      </div>

      <div className="relative z-10 mt-auto w-full pt-10">
        <Facade />
        <div className="relative h-[130px] overflow-hidden bg-gradient-to-b from-[#2a1a22] to-[#120b12]">
          {OUTSIDE.standing.map((p, i) => (
            <div key={i} className="absolute bottom-3" style={{ left: p.x, zIndex: 30 }}>
              <Viewer {...p} height={112} delay={i * 0.7} />
            </div>
          ))}
          {OUTSIDE.walkers.map((w, i) => (
            <div
              key={i}
              className="absolute bottom-1 z-30"
              style={{
                animation: `${w.dir === "R" ? "strollR" : "strollL"} ${w.dur}s linear infinite`,
                animationDelay: `${w.delay}s`,
              }}
            >
              <Walker {...w} height={108} flip={w.dir === "L"} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ───────────────────────── Gallery pieces ───────────────────────── */
function Frame({ art, onOpen }) {
  const portrait = art.ratio === "portrait";
  return (
    <button
      onClick={() => onOpen(art)}
      aria-label={`View ${art.title} up close`}
      className={`group relative z-10 block cursor-zoom-in outline-none transition duration-500 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-amber-300/60 ${
        portrait ? "w-[min(72vw,290px)]" : "w-[min(90vw,500px)]"
      }`}
    >
      <div className="frame-gold p-[10px] shadow-[0_34px_50px_-14px_rgba(0,0,0,.75),0_0_0_1px_rgba(0,0,0,.45)] md:p-[14px]">
        <div className="bg-[#f4efe2] p-3 shadow-[inset_0_0_14px_rgba(0,0,0,.4)] md:p-4">
          <div className={`relative overflow-hidden ${portrait ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
            <img
              src={art.src}
              alt={art.title}
              draggable="false"
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="glass absolute inset-0" />
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,.25)]" />
          </div>
        </div>
      </div>
    </button>
  );
}

function Placard({ art }) {
  return (
    <div className="relative z-10 mt-6 w-[min(72vw,270px)] border border-stone-400/60 bg-[#efe8d6] px-4 py-3 text-stone-800 shadow-[0_8px_18px_rgba(0,0,0,.45)]">
      <h3 className="font-display text-base italic leading-tight">{art.title}</h3>
      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-stone-500">Us, {art.year}</p>
      <p className="mt-1 text-[11px] text-stone-600">{art.medium}</p>
      <p className="mt-2 font-serif text-[13px] leading-snug text-stone-700">{art.note}</p>
    </div>
  );
}

function Bay({ bay, floor, onOpen }) {
  return (
    <div className="relative flex flex-1 flex-col items-center pb-[190px] pt-24 md:border-l md:border-white/5 md:first:border-l-0">
      {/* track light + beam */}
      <div className="pointer-events-none absolute left-1/2 top-6 z-0 h-[78%] w-[110%] -translate-x-1/2">
        <div className="spot absolute inset-0 top-3" />
      </div>
      <div className="absolute left-1/2 top-6 z-10 h-2 w-14 -translate-x-1/2 rounded-full bg-neutral-900 shadow-[0_6px_16px_4px_rgba(255,214,140,.7)]" />

      <Frame art={bay.art} onOpen={onOpen} />
      <Placard art={bay.art} />

      {/* floor */}
      <div className={`absolute inset-x-0 bottom-0 z-0 h-[130px] md:hidden ${floor}`} />

      {/* visitors admiring the art */}
      {bay.visitors.map((v, i) => {
        const { x, b, ...look } = v;
        return (
          <div key={i} className="absolute" style={{ left: x, bottom: b, zIndex: 40 - b }}>
            <Viewer {...look} height={168 - b} delay={i * 0.9} />
          </div>
        );
      })}
    </div>
  );
}

function Room({ room, onOpen }) {
  return (
    <section className="relative" aria-label={room.name}>
      <Reveal className="px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-gold">{room.name}</p>
        <h2 className="mt-3 font-display text-4xl text-ivory md:text-6xl">{room.title}</h2>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />
        <p className="mx-auto max-w-xl font-serif text-xl italic leading-relaxed text-ivory/75">{room.statement}</p>
      </Reveal>

      <div className={`relative overflow-hidden ${room.theme === "green" ? "wall-green" : "wall-navy"}`}>
        <div className={`absolute inset-x-0 bottom-0 z-0 hidden h-[130px] md:block ${room.floor}`} />
        <div className="crown absolute inset-x-0 top-0 z-20 h-6" />
        <div className="relative mx-auto flex max-w-[1250px] flex-col md:flex-row md:items-stretch">
          {room.bays.map((bay, i) => (
            <Bay key={i} bay={bay} floor={room.floor} onOpen={onOpen} />
          ))}
        </div>

        {/* strolling visitors */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-[170px] overflow-hidden">
          {room.walkers.map((w, i) => {
            const { dir, dur, delay, b, ...look } = w;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  bottom: b,
                  animation: `${dir === "R" ? "strollR" : "strollL"} ${dur}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <Walker {...look} height={150 - b * 0.6} flip={dir === "L"} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Lightbox ───────────────────────── */
function Lightbox({ art, onClose }) {
  useEffect(() => {
    if (!art) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [art, onClose]);

  if (!art) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
      onClick={onClose}
      className="fade-in fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4"
    >
      <div onClick={(e) => e.stopPropagation()} className="frame-gold p-3 shadow-2xl md:p-4">
        <div className="bg-[#f4efe2] p-3 md:p-5">
          <img src={art.src} alt={art.title} className="block max-h-[68vh] max-w-[84vw] object-contain" />
        </div>
      </div>
      <div className="mt-5 max-w-md text-center">
        <h3 className="font-display text-2xl italic">{art.title}</h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-gold">
          Us, {art.year} · {art.medium}
        </p>
        <p className="mt-3 font-serif text-lg italic text-ivory/80">{art.note}</p>
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full border border-white/30 px-3 py-1 text-xl text-white/80 hover:bg-white/10"
      >
        ×
      </button>
    </div>
  );
}

/* ───────────────────────── Gift shop / letter ───────────────────────── */
function GiftShop() {
  const { months, days, total } = timeTogether(CONFIG.startDate);
  const [hearts, setHearts] = useState([]);
  const [count, setCount] = useState(0);

  const leaveHeart = (e) => {
    const id = Math.random();
    const rect = e.currentTarget.getBoundingClientRect();
    setHearts((h) => [...h, { id, x: Math.random() * rect.width }]);
    setCount((c) => c + 1);
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 1800);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0d0a10] to-[#1b0f18] px-5 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Exit · Gift Shop</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">A Note Just For You</h2>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />

        <div className="relative border border-gold/30 bg-[#f1e9d4] px-7 py-9 text-stone-800 shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)]">
          <p className="font-serif text-xl italic leading-relaxed md:text-2xl">{CONFIG.letter}</p>
          <p className="mt-6 font-display text-lg italic text-[#7a1f33]">{CONFIG.signature}</p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 text-center">
          {[
            [months, months === 1 ? "Month" : "Months"],
            [days, days === 1 ? "Day" : "Extra Days"],
            [total, "Days in Total"],
          ].map(([n, label]) => (
            <div key={label} className="border border-gold/25 bg-white/[0.03] py-5">
              <div className="font-display text-4xl text-gold md:text-5xl">{n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/60">{label}</div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 inline-block">
          <button
            onClick={leaveHeart}
            className="rounded-full border border-[#e07a8c] px-7 py-3 text-xs uppercase tracking-[0.3em] text-[#f6b3bf] transition hover:bg-[#e07a8c] hover:text-black"
          >
            ♥ Leave a heart {count > 0 && `· ${count}`}
          </button>
          {hearts.map((h) => (
            <span key={h.id} className="heart-float text-2xl text-[#ff7b92]" style={{ left: h.x, bottom: 20 }}>
              ♥
            </span>
          ))}
        </div>
      </Reveal>
      <p className="mt-20 text-center text-[10px] uppercase tracking-[0.3em] text-ivory/35">
        © {new Date().getFullYear()} {CONFIG.title} · Open every day, forever
      </p>
    </section>
  );
}

/* ───────────────────────── App ───────────────────────── */
export default function App() {
  const { audioProps, playing, play, toggle } = useChorusLoop();
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  const enter = () => {
    play();
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <audio {...audioProps} />
      <SoundButton playing={playing} onToggle={toggle} />
      <Hero onEnter={enter} />

      <main id="gallery">
        <Reveal className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Happy Monthsary!</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Portraits that makes me happy</h2>
          <p className="mt-6 font-serif text-xl italic leading-relaxed text-ivory/75">
            Welcome to my museum, lovey

I built this whole place just for you, and I really hope it makes you smile the way you make me smile every single day. hihihi.

Please take your time walking through each room, and don’t skip the little notes beside the paintings. I wrote every one of them with you in mind, and a piece of my heart is tucked into each.

Every frame, every spotlight and every tiny visitor here exists for one reason: you. It’s all for you, my love.

Happy monthsary, love
          </p>
        </Reveal>

        {ROOMS.map((room) => (
          <Room key={room.id} room={room} onOpen={setOpen} />
        ))}
        <GiftShop />
      </main>

      <Lightbox art={open} onClose={close} />
    </div>
  );
}

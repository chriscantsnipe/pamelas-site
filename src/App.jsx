import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const reasons = [
  "you listen to my dumb stories like they actually matter",
  "you make me laugh when i'm trying to be serious and it's so annoying",
  "you're cute even when you're mad which makes it impossible to argue w you",
  "you're literally the only person i actually wanna tell random stuff to",
  "you make me wanna be better without even trying",
  "you make me feel at home and that's not easy to do",
  "you put up with my bs and somehow still like me which is crazy",
  "you check on me even when i act like i'm fine",
  "you remember little things and that actually means a lot",
  "you make every day better just by being there fr",
  "you're so caring it's actually unreal sometimes",
  "you never make me feel like a burden and that hits different",
];

const popups = [
  "reminder: you're beautiful 💜",
  "just thought you should know i miss you",
  "fun fact: i still get excited when i see ur name pop up",
  "another fun fact: you're a pain in my ass sometimes",
  "but you're my favorite pain in my ass so it's fine",
  "breaking news: i still like you",
  "imagine being this cute. couldn't be me.",
  "you're literally so annoying and i love you so much",
  "not me making a whole website at 1am 😭",
  "this is ur daily reminder that ur stuck with me",
  "you're so pretty it's actually kinda rude",
  "i think about you way more than i'd ever admit out loud lol",
  "anyways ur my fav person don't tell anyone",
  "i hope ur smiling rn bc that's the whole point of this",
];

const ratherList = [
  "let you burn my nic",
  "give up my side of the bed. and you know how serious that is.",
  "share my beatbox",
  "let you steal my fries every single time",
  "lose every argument even when i'm clearly right",
  "all of the above. without complaining. almost.",
];

const loveResults = [
  { top: "100% in love.", sub: "i don't make the rules sorry." },
  { top: "diagnosis: obsessed.", sub: "no cure available." },
  { top: "yep. you're cooked.", sub: "fully and completely cooked." },
  { top: "results: down bad.", sub: "severely and permanently." },
  { top: "confirmed: in love.", sub: "there's no going back from this." },
];

// ─── FLOATING CATS ───────────────────────────────────────────────────────────

const CAT_FRAMES = ["=^.^=", "=^-^=", "=^o^=", "=^‿^="];

function FloatingCats() {
  const [cats, setCats] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 90,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      frame: Math.floor(Math.random() * CAT_FRAMES.length),
      size: Math.random() * 8 + 11,
      opacity: Math.random() * 0.25 + 0.08,
    }))
  );

  useEffect(() => {
    let frameIdx = 0;
    const t = setInterval(() => {
      frameIdx++;
      setCats(prev => prev.map(c => {
        let nx = c.x + c.speedX;
        let ny = c.y + c.speedY;
        let sx = c.speedX;
        let sy = c.speedY;
        if (nx < 0 || nx > 92) sx = -sx;
        if (ny < 0 || ny > 92) sy = -sy;
        nx = Math.max(0, Math.min(92, nx));
        ny = Math.max(0, Math.min(92, ny));
        return { ...c, x: nx, y: ny, speedX: sx, speedY: sy, frame: frameIdx % CAT_FRAMES.length };
      }));
    }, 120);
    return () => clearInterval(t);
  }, []);

  return <>
    {cats.map(c => (
      <div key={c.id} style={{
        position: "fixed",
        left: c.x + "vw",
        top: c.y + "vh",
        fontSize: c.size,
        opacity: c.opacity,
        fontFamily: "monospace",
        color: "#c89fff",
        pointerEvents: "none",
        zIndex: 1,
        letterSpacing: 1,
        userSelect: "none",
        transition: "left 0.12s linear, top 0.12s linear",
      }}>{CAT_FRAMES[c.frame]}</div>
    ))}
  </>;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function FloatingHearts({ trigger }) {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + "%",
      size: Math.random() * 14 + 10,
      delay: Math.random() * 0.5,
      dur: Math.random() * 1.2 + 1.8,
    }));
    setHearts(items);
    setTimeout(() => setHearts([]), 3500);
  }, [trigger]);
  return <>
    {hearts.map(h => (
      <div key={h.id} style={{
        position: "fixed", bottom: -10, left: h.left,
        fontSize: h.size, zIndex: 999, pointerEvents: "none",
        animation: `floatUp ${h.dur}s ease-out ${h.delay}s forwards`,
        opacity: 0,
      }}>💜</div>
    ))}
  </>;
}

function CatFace() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setF(x => (x + 1) % CAT_FRAMES.length), 550);
    return () => clearInterval(t);
  }, []);
  return <div style={{ fontFamily: "monospace", fontSize: 28, color: "#b78fff", marginBottom: 16, letterSpacing: 3 }}>{CAT_FRAMES[f]}</div>;
}

function PopupToast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
      background: "#2a1245", border: "1px solid #7b3fa0", borderRadius: 16,
      padding: "14px 22px", color: "#e8d5ff", fontSize: 14, zIndex: 1000,
      maxWidth: 300, textAlign: "center", lineHeight: 1.6,
      animation: "slideUp 0.3s ease",
      boxShadow: "0 8px 32px rgba(100,40,160,0.5)",
    }}>{msg}</div>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function Landing({ go }) {
  return (
    <Screen>
      <CatFace />
      <BigTitle>before you start<br />talking shi...</BigTitle>
      <Body>aight. before you start roasting me for making a whole website, just hear me out.<br /><br />
      this took way longer than i thought it would.<br /><br />
      so click around for a bit and let me show you why you're stuck with me.</Body>
      <Btn onClick={go}>fine, i'll click 🙄</Btn>
    </Screen>
  );
}

function Sure({ go }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPos, setNoPos] = useState({ x: null, y: null });
  const noRef = useRef(null);

  const handleNo = () => {
    const next = noClicks + 1;
    setNoClicks(next);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setNoPos({
      x: Math.random() * (vw - 130),
      y: Math.random() * (vh - 70),
    });
  };

  const wrongMsgs = ["wrong answer. try again.", "that's not right lol.", "…really?", "ur trolling me rn", "last warning 😭", "just say yes omg"];

  return (
    <Screen>
      <CatFace />
      <BigTitle style={{ fontSize: 30 }}>are you the prettiest<br />girl ever?</BigTitle>
      {noClicks > 0 && <div style={{ color: "#d4a8ff", fontSize: 14, marginBottom: 16, animation: "fadeIn 0.3s" }}>{wrongMsgs[Math.min(noClicks - 1, wrongMsgs.length - 1)]}</div>}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
        <Btn onClick={go}>yes 💜</Btn>
      </div>
      <button
        ref={noRef}
        onClick={handleNo}
        style={{
          position: noPos.x !== null ? "fixed" : "relative",
          left: noPos.x !== null ? noPos.x : "auto",
          top: noPos.y !== null ? noPos.y : "auto",
          marginTop: noPos.x === null ? 12 : 0,
          background: "transparent", color: "#6b4a8a",
          border: "1px solid #4a2a6a", borderRadius: 50,
          padding: "9px 22px", fontSize: 13, cursor: "pointer",
          transition: "left 0.08s, top 0.08s",
          zIndex: 500,
        }}
      >no...</button>
    </Screen>
  );
}

function Reasons({ go }) {
  const [idx, setIdx] = useState(0);
  const [heartTrig, setHeartTrig] = useState(0);
  const next = () => {
    setHeartTrig(t => t + 1);
    if (idx < reasons.length - 1) setIdx(i => i + 1);
    else go();
  };
  return (
    <Screen>
      <FloatingHearts trigger={heartTrig} />
      <CatFace />
      <Label>reason {idx + 1} of {reasons.length} why i fw u</Label>
      <BigTitle style={{ fontSize: 26, marginTop: 8, lineHeight: 1.5 }}>{reasons[idx]}</BigTitle>
      <Btn onClick={next} style={{ marginTop: 28 }}>
        {idx < reasons.length - 1 ? "next one →" : "ok i get it 💜"}
      </Btn>
    </Screen>
  );
}

function Rather({ go }) {
  return (
    <Screen>
      <CatFace />
      <BigTitle style={{ fontSize: 28 }}>things i'd rather do<br />than lose you</BigTitle>
      <div style={{ width: "100%", maxWidth: 380, margin: "16px auto 28px", textAlign: "left" }}>
        {ratherList.map((item, i) => (
          <div key={i} style={{
            color: "#d4b8ff", fontSize: 15, lineHeight: 1.7,
            padding: "10px 0", borderBottom: i < ratherList.length - 1 ? "1px solid rgba(180,120,255,0.1)" : "none",
            animation: `fadeIn 0.4s ${i * 0.08}s ease both`,
          }}>
            — {item}
          </div>
        ))}
      </div>
      <Btn onClick={go}>okay next 💜</Btn>
    </Screen>
  );
}

function Detector({ go }) {
  const [phase, setPhase] = useState("idle");
  const [resultIdx] = useState(() => Math.floor(Math.random() * loveResults.length));
  const [step, setStep] = useState(0);
  const steps = ["scanning...", "analyzing...", "checking results...", "almost done..."];

  const start = () => {
    setPhase("scanning");
    let s = 0;
    const t = setInterval(() => {
      s++;
      setStep(s);
      if (s >= steps.length) {
        clearInterval(t);
        setTimeout(() => setPhase("result"), 600);
      }
    }, 700);
  };

  return (
    <Screen>
      <CatFace />
      {phase === "idle" && <>
        <BigTitle style={{ fontSize: 28 }}>love detector™</BigTitle>
        <Body style={{ marginBottom: 28 }}>press the button.<br />let's see what the data says.</Body>
        <Btn onClick={start}>press to see if you love me</Btn>
      </>}
      {phase === "scanning" && <>
        <BigTitle style={{ fontSize: 28 }}>🔍</BigTitle>
        <Body style={{ fontSize: 20, marginTop: 8 }}>{steps[Math.min(step, steps.length - 1)]}</Body>
      </>}
      {phase === "result" && <>
        <div style={{ fontSize: 60, marginBottom: 12 }}>💜</div>
        <BigTitle style={{ fontSize: 36 }}>{loveResults[resultIdx].top}</BigTitle>
        <Body style={{ fontSize: 18, marginTop: 4 }}>{loveResults[resultIdx].sub}</Body>
        <Btn onClick={go} style={{ marginTop: 28 }}>yeah yeah i knew it →</Btn>
      </>}
    </Screen>
  );
}

function Secret({ go }) {
  const [found, setFound] = useState(false);
  return (
    <Screen>
      {!found ? <>
        <CatFace />
        <BigTitle style={{ fontSize: 26 }}>there's a secret button<br />on this page.</BigTitle>
        <Body style={{ marginBottom: 32 }}>good luck 🙂</Body>
        {/* Visible but blended secret button — obvious enough to actually find */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginTop: 8 }}>
          <div style={{ color: "#3d1f6e", fontSize: 13 }}>hint: it's right below this text</div>
          <button
            onClick={() => setFound(true)}
            style={{
              background: "transparent",
              border: "1px dashed #4a2a7a",
              borderRadius: 50,
              padding: "10px 28px",
              color: "#4a2a7a",
              fontSize: 13,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            =^.^=
          </button>
        </div>
      </> : <>
        <CatFace />
        <BigTitle style={{ fontSize: 26 }}>i knew you'd find this.</BigTitle>
        <Body style={{ marginBottom: 8 }}>you're nosy as hell.</Body>
        <div style={{ width: "100%", maxWidth: 360, margin: "20px auto", textAlign: "left" }}>
          {[
            "but since you're here...",
            "thank you for making my life better.",
            "seriously.",
            "i don't say it enough, but you mean more to me than you know.",
            "you make the good days better and the bad days easier.",
            "and i'm really lucky i get to do life with you.",
          ].map((line, i) => (
            <div key={i} style={{ color: "#e8d5ff", fontSize: 15, lineHeight: 1.9, animation: `fadeIn 0.5s ${i * 0.18}s ease both`, opacity: 0 }}>{line}</div>
          ))}
        </div>
        <Btn onClick={go} style={{ marginTop: 16 }}>okay i'm not crying →</Btn>
      </>}
    </Screen>
  );
}

function Final() {
  const lines = [
    "congrats.",
    "you reached the end of the website.",
    "or maybe the beginning because you're probably gonna go through it again.",
    "but for real...",
    "i joke around a lot.",
    "i talk shi.",
    "i mess with you.",
    "but if there's one thing i hope you never doubt,",
    "it's how much i care about you.",
    "thank you for choosing me.",
    "thank you for putting up with my dumb ass.",
    "and thank you for making life a whole lot better.",
    "i love you pamelaaaa 💜",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), shown === 0 ? 300 : 620);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <Screen>
      <CatFace />
      <div style={{ maxWidth: 380, width: "100%", textAlign: "center" }}>
        {lines.slice(0, shown).map((l, i) => {
          const isLast = i === lines.length - 1;
          const isBig = [0, 12].includes(i);
          return (
            <div key={i} style={{
              color: isLast ? "#c89fff" : i > 7 ? "#e8d5ff" : "#b89fd4",
              fontSize: isBig ? 32 : i > 7 ? 18 : 15,
              fontWeight: isBig ? 700 : 400,
              lineHeight: 1.85,
              animation: "fadeIn 0.5s ease",
              marginBottom: isBig ? 8 : 0,
            }}>{l}</div>
          );
        })}
      </div>
    </Screen>
  );
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function Screen({ children }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 24px 40px", textAlign: "center",
      animation: "fadeIn 0.45s ease",
      position: "relative", zIndex: 2,
    }}>
      {children}
    </div>
  );
}

function BigTitle({ children, style }) {
  return <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, color: "#f0e6ff", margin: "0 0 12px", lineHeight: 1.3, ...style }}>{children}</h1>;
}

function Body({ children, style }) {
  return <p style={{ color: "#b89fd4", fontSize: 15, lineHeight: 1.75, margin: "0 0 8px", maxWidth: 360, ...style }}>{children}</p>;
}

function Label({ children }) {
  return <div style={{ fontSize: 11, color: "#7a5a9a", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{children}</div>;
}

function Btn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: "linear-gradient(135deg, #7b3fa0, #a066d4)",
      color: "#fff", border: "none", borderRadius: 50,
      padding: "13px 36px", fontSize: 15, cursor: "pointer",
      fontWeight: 600, letterSpacing: 0.3,
      boxShadow: "0 4px 20px rgba(120,60,180,0.45)",
      transition: "filter 0.15s, transform 0.15s",
      ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.15)"}
      onMouseLeave={e => e.currentTarget.style.filter = ""}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
      onMouseUp={e => e.currentTarget.style.transform = ""}
    >{children}</button>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState(0);
  const [heartTrig, setHeartTrig] = useState(0);
  const [popup, setPopup] = useState(null);
  const [popIdx, setPopIdx] = useState(0);

  const go = () => {
    setHeartTrig(t => t + 1);
    setScreen(s => s + 1);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setPopup(popups[popIdx % popups.length]);
      setPopIdx(i => i + 1);
    }, 18000);
    return () => clearInterval(t);
  }, [popIdx]);

  const screenComponents = [
    <Landing go={go} />,
    <Sure go={go} />,
    <Reasons go={go} />,
    <Rather go={go} />,
    <Detector go={go} />,
    <Secret go={go} />,
    <Final />,
  ];

  const total = screenComponents.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0618 0%, #1e0d38 55%, #0d0618 100%)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');
        @keyframes floatUp {
          0% { opacity:1; transform: translateY(0) scale(1); }
          100% { opacity:0; transform: translateY(-105vh) scale(0.4); }
        }
        @keyframes fadeIn {
          from { opacity:0; transform: translateY(10px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateX(-50%) translateY(20px); }
          to { opacity:1; transform: translateX(-50%) translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>

      <FloatingCats />
      <FloatingHearts trigger={heartTrig} />

      {/* progress dots */}
      <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 50 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ width: i === screen ? 20 : 6, height: 6, borderRadius: 3, background: i <= screen ? "#9b5fd4" : "#3a1a5a", transition: "all 0.3s" }} />
        ))}
      </div>

      {screenComponents[Math.min(screen, screenComponents.length - 1)]}

      {popup && <PopupToast msg={popup} onDone={() => setPopup(null)} />}
    </div>
  );
}

// FloatingShapes.jsx — decorative animated background blobs and food icons

export default function FloatingShapes() {
  const icons = [
    { emoji: '🍎', top: '12%', left: '8%',  delay: '0s',   dur: '5s'  },
    { emoji: '🥕', top: '22%', right: '6%', delay: '1s',   dur: '6s'  },
    { emoji: '🌰', top: '60%', left: '4%',  delay: '2s',   dur: '4.5s'},
    { emoji: '🥛', top: '75%', right: '8%', delay: '0.5s', dur: '7s'  },
    { emoji: '🫐', top: '45%', left: '92%', delay: '1.5s', dur: '5.5s'},
    { emoji: '🌿', top: '85%', left: '30%', delay: '3s',   dur: '6s'  },
    { emoji: '🍋', top: '8%',  left: '55%', delay: '2.5s', dur: '5s'  },
  ];

  return (
    <div className="floating-bg" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />
      {icons.map((ic, i) => (
        <span
          key={i}
          className="floating-icon"
          style={{
            top: ic.top,
            left: ic.left,
            right: ic.right,
            animationDelay: ic.delay,
            '--dur': ic.dur,
          }}
        >
          {ic.emoji}
        </span>
      ))}
    </div>
  );
}

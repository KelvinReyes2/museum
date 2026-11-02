// Little SVG museum visitors.
// <Viewer/> stands with their back to us, admiring the art.
// <Walker/> is a side-view person strolling past.

const SHOE = "#1a1414";

export function Viewer({
  coat = "#7a2e3b",
  pants = "#26262f",
  hair = "#1b1411",
  skin = "#d9a982",
  dress = false,
  longHair = false,
  bag = null,
  hat = null,
  height = 165,
  delay = 0,
}) {
  const w = (height * 70) / 170;
  return (
    <svg
      viewBox="0 0 70 170"
      width={w}
      height={height}
      className="viewer block overflow-visible"
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <ellipse cx="35" cy="165" rx="24" ry="4" fill="rgba(0,0,0,.4)" />
      {dress ? (
        <>
          <rect x="25" y="122" width="7" height="38" rx="3" fill={skin} />
          <rect x="38" y="122" width="7" height="38" rx="3" fill={skin} />
        </>
      ) : (
        <>
          <rect x="24" y="104" width="10.5" height="56" rx="4" fill={pants} />
          <rect x="35.5" y="104" width="10.5" height="56" rx="4" fill={pants} />
        </>
      )}
      <rect x="23" y="157" width="11" height="7" rx="3" fill={SHOE} />
      <rect x="36" y="157" width="11" height="7" rx="3" fill={SHOE} />

      {/* torso */}
      <path d="M17 52 Q35 43 53 52 L55 110 Q35 116 15 110 Z" fill={coat} />
      {dress && <path d="M16 96 L54 96 L61 132 Q35 141 9 132 Z" fill={coat} />}
      <path d="M35 46 L35 112" stroke="rgba(0,0,0,.18)" strokeWidth="1" />

      {/* arms */}
      <path d="M14 54 Q7 80 13 104 L21 104 Q22 80 20 56 Z" fill={coat} stroke="rgba(0,0,0,.2)" strokeWidth="1" />
      <path d="M56 54 Q63 80 57 104 L49 104 Q48 80 50 56 Z" fill={coat} stroke="rgba(0,0,0,.2)" strokeWidth="1" />
      <circle cx="17" cy="107" r="4" fill={skin} />
      <circle cx="53" cy="107" r="4" fill={skin} />

      {/* neck + head (back view) */}
      <rect x="31" y="40" width="8" height="12" fill={skin} />
      <circle cx="24" cy="30" r="2.6" fill={skin} />
      <circle cx="46" cy="30" r="2.6" fill={skin} />
      <ellipse cx="35" cy="27" rx="11.5" ry="13.5" fill={hair} />
      {longHair && <path d="M22 28 Q22 12 35 12 Q48 12 48 28 L52 80 Q35 88 18 80 Z" fill={hair} />}

      {bag && (
        <>
          <path d="M19 52 L51 102" stroke={bag} strokeWidth="2.6" />
          <rect x="46" y="94" width="16" height="16" rx="3" fill={bag} />
        </>
      )}
      {hat && (
        <>
          <ellipse cx="35" cy="17" rx="17" ry="4" fill={hat} />
          <path d="M24 17 Q35 -1 46 17 Z" fill={hat} />
        </>
      )}
    </svg>
  );
}

export function Walker({
  coat = "#6d4c8f",
  pants = "#25252d",
  hair = "#1b1411",
  skin = "#d9a982",
  dress = false,
  longHair = false,
  hat = null,
  height = 150,
  flip = false,
}) {
  const w = (height * 70) / 170;
  const leg = dress ? skin : pants;
  return (
    <svg
      viewBox="0 0 70 170"
      width={w}
      height={height}
      className="block overflow-visible"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <ellipse cx="38" cy="165" rx="22" ry="3.5" fill="rgba(0,0,0,.4)" />
      <g className="walker-body">
        <g className="arm-b">
          <rect x="34" y="50" width="8" height="42" rx="4" fill={coat} opacity=".75" />
          <circle cx="38" cy="94" r="4" fill={skin} />
        </g>
        <g className="leg-b">
          <rect x="33" y="102" width="10" height="55" rx="4" fill={leg} opacity=".85" />
          <rect x="33" y="154" width="17" height="8" rx="4" fill={SHOE} />
        </g>
        <g className="leg-f">
          <rect x="33" y="102" width="10" height="55" rx="4" fill={leg} />
          <rect x="33" y="154" width="17" height="8" rx="4" fill={SHOE} />
        </g>
        <rect x="27" y="44" width="22" height="62" rx="9" fill={coat} />
        {dress && <path d="M26 94 L50 94 L57 128 L19 128 Z" fill={coat} />}
        <rect x="34" y="36" width="8" height="12" fill={skin} />
        {longHair && <ellipse cx="31" cy="40" rx="7" ry="21" fill={hair} />}
        <circle cx="39" cy="27" r="11" fill={skin} />
        <path d="M27.5 29 Q26 12 40 13.5 Q51 15 50 24 Q44 19 38 21 Q33 23 33 32 Z" fill={hair} />
        <circle cx="50.5" cy="28.5" r="2.3" fill={skin} />
        {hat && (
          <>
            <ellipse cx="39" cy="16" rx="16" ry="3.8" fill={hat} />
            <path d="M28 16 Q39 -1 50 16 Z" fill={hat} />
          </>
        )}
        <g className="arm-f">
          <rect x="34" y="50" width="8" height="42" rx="4" fill={coat} />
          <circle cx="38" cy="94" r="4" fill={skin} />
        </g>
      </g>
    </svg>
  );
}

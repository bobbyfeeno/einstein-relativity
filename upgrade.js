#!/usr/bin/env node
// Hyper-realistic upgrade script for Einstein Relativity app
const fs = require('fs');
let html = fs.readFileSync('/tmp/einstein-rebuild/index.html', 'utf8');

// ============================================================
// 1. EINSTEIN SVG: Add new filters in defs (skin texture, fabric)
// ============================================================
const oldDefs = `<filter id="charOutline\${containerId}">`;
const newDefs = `<!-- Skin texture noise filter -->
      <filter id="skinTexture\${containerId}" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <!-- Fabric weave texture filter -->
      <filter id="fabricTexture\${containerId}" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence type="turbulence" baseFrequency="1.2 0.8" numOctaves="2" seed="5" result="weave"/>
        <feDisplacementMap in="SourceGraphic" in2="weave" scale="0.4" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <!-- Subsurface scattering glow -->
      <radialGradient id="sssEarL\${containerId}" cx="80%" cy="50%">
        <stop offset="0%" stop-color="#ff9060" stop-opacity=".25"/><stop offset="100%" stop-color="#ff9060" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="sssEarR\${containerId}" cx="20%" cy="50%">
        <stop offset="0%" stop-color="#ff9060" stop-opacity=".25"/><stop offset="100%" stop-color="#ff9060" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="sssNose\${containerId}" cx="50%" cy="60%">
        <stop offset="0%" stop-color="#ffa070" stop-opacity=".18"/><stop offset="100%" stop-color="#ffa070" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="sssCheekL\${containerId}" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#ff8860" stop-opacity=".12"/><stop offset="100%" stop-color="#ff8860" stop-opacity="0"/>
      </radialGradient>
      <filter id="charOutline\${containerId}">`;
html = html.replace(oldDefs, newDefs);

// ============================================================
// 2. EINSTEIN SVG: Add glasses, wrinkles, age spots, chin dimple
//    after the head ellipse and before the hair
// ============================================================
const oldForehead = `<!-- Forehead warmth -->
    <ellipse cx="50" cy="36" rx="20" ry="12" fill="rgba(255,225,190,.15)"/>`;
const newForehead = `<!-- Forehead warmth -->
    <ellipse cx="50" cy="36" rx="20" ry="12" fill="rgba(255,225,190,.15)"/>
    <!-- Forehead wrinkle lines (3 creases) -->
    <path d="M32,30 Q41,28 50,30 Q59,28 68,30" fill="none" stroke="rgba(160,110,60,.09)" stroke-width=".7" stroke-linecap="round"/>
    <path d="M34,34 Q42,32.5 50,34 Q58,32.5 66,34" fill="none" stroke="rgba(160,110,60,.07)" stroke-width=".6" stroke-linecap="round"/>
    <path d="M36,38 Q43,36.5 50,38 Q57,36.5 64,38" fill="none" stroke="rgba(160,110,60,.06)" stroke-width=".5" stroke-linecap="round"/>
    <!-- Age spots -->
    <circle cx="38" cy="32" r="2" fill="rgba(160,110,50,.06)"/>
    <circle cx="62" cy="34" r="1.5" fill="rgba(160,110,50,.05)"/>
    <circle cx="28" cy="55" r="1.8" fill="rgba(160,110,50,.05)"/>
    <!-- Chin dimple -->
    <ellipse cx="50" cy="76" rx="2" ry="1.5" fill="rgba(140,80,30,.08)"/>
    <path d="M49,75 Q50,77.5 51,75" fill="none" stroke="rgba(140,80,30,.1)" stroke-width=".5"/>`;
html = html.replace(oldForehead, newForehead);

// ============================================================
// 3. Subsurface scattering on ears
// ============================================================
const oldEarR = `<ellipse cx="80" cy="52" rx="6.5" ry="9" fill="#e4b474" stroke="rgba(170,110,50,.3)" stroke-width=".5"/>
    <ellipse cx="80" cy="52" rx="3.5" ry="5.5" fill="rgba(190,130,70,.2)"/>
    <path d="M81,48 Q83,52 81,56" fill="none" stroke="rgba(170,110,50,.2)" stroke-width=".6"/>`;
const newEarR = `<ellipse cx="80" cy="52" rx="6.5" ry="9" fill="#e4b474" stroke="rgba(170,110,50,.3)" stroke-width=".5"/>
    <ellipse cx="80" cy="52" rx="3.5" ry="5.5" fill="rgba(190,130,70,.2)"/>
    <path d="M81,48 Q83,52 81,56" fill="none" stroke="rgba(170,110,50,.2)" stroke-width=".6"/>
    <!-- SSS ear glow -->
    <ellipse cx="20" cy="52" rx="7" ry="9.5" fill="url(#sssEarL\${containerId})"/>
    <ellipse cx="80" cy="52" rx="7" ry="9.5" fill="url(#sssEarR\${containerId})"/>`;
html = html.replace(oldEarR, newEarR);

// ============================================================
// 4. EYES: Add limbal ring, blood vessels, elongated catchlight, lower eyelid
// ============================================================
const oldEyes = `<!-- Iris detail ring -->
      <circle cx="38" cy="48" r="5.5" fill="none" stroke="rgba(140,100,40,.25)" stroke-width=".5"/>
      <circle cx="64" cy="48" r="5.5" fill="none" stroke="rgba(140,100,40,.25)" stroke-width=".5"/>`;
const newEyes = `<!-- Limbal ring (dark ring around iris edge) -->
      <circle cx="38" cy="48" r="6.5" fill="none" stroke="rgba(40,20,5,.3)" stroke-width=".8"/>
      <circle cx="64" cy="48" r="6.5" fill="none" stroke="rgba(40,20,5,.3)" stroke-width=".8"/>
      <!-- Iris detail ring -->
      <circle cx="38" cy="48" r="5.5" fill="none" stroke="rgba(140,100,40,.25)" stroke-width=".5"/>
      <circle cx="64" cy="48" r="5.5" fill="none" stroke="rgba(140,100,40,.25)" stroke-width=".5"/>
      <!-- Blood vessel hints in sclera -->
      <path d="M28,46 Q31,47 33,46.5" fill="none" stroke="rgba(180,60,60,.08)" stroke-width=".3"/>
      <path d="M29,49 Q31,48.5 33,49.5" fill="none" stroke="rgba(180,60,60,.06)" stroke-width=".25"/>
      <path d="M45,47 Q43,46.5 41,47" fill="none" stroke="rgba(180,60,60,.07)" stroke-width=".3"/>
      <path d="M68,46 Q71,47 73,46.5" fill="none" stroke="rgba(180,60,60,.08)" stroke-width=".3"/>
      <path d="M69,49 Q71,48.5 73,49.5" fill="none" stroke="rgba(180,60,60,.06)" stroke-width=".25"/>
      <!-- Lower eyelid definition -->
      <path d="M28,52 Q37,57 48,52" fill="none" stroke="rgba(160,110,70,.1)" stroke-width=".8" stroke-linecap="round"/>
      <path d="M52,52 Q63,57 74,52" fill="none" stroke="rgba(160,110,70,.1)" stroke-width=".8" stroke-linecap="round"/>
      <!-- Lower lash line hint -->
      <path d="M30,53 Q37,56 46,53" fill="none" stroke="rgba(120,80,40,.08)" stroke-width=".5"/>
      <path d="M54,53 Q63,56 72,53" fill="none" stroke="rgba(120,80,40,.08)" stroke-width=".5"/>`;
html = html.replace(oldEyes, newEyes);

// Replace circular catchlights with elongated window reflections
const oldHighlight = `<!-- PRIMARY highlight (large, upper-right) -->
      <circle cx="41" cy="45" r="2.8" fill="white" opacity=".93"/>
      <circle cx="67" cy="45" r="2.8" fill="white" opacity=".93"/>`;
const newHighlight = `<!-- PRIMARY highlight (elongated window reflection) -->
      <ellipse cx="41" cy="45" rx="2" ry="3.2" fill="white" opacity=".9" transform="rotate(-10,41,45)"/>
      <ellipse cx="67" cy="45" rx="2" ry="3.2" fill="white" opacity=".9" transform="rotate(-10,67,45)"/>`;
html = html.replace(oldHighlight, newHighlight);

// ============================================================
// 5. Add crow's feet wrinkles near eyes (after cheeks)
// ============================================================
const oldCheeks = `<!-- Cheeks — rosy, warm -->
    <circle cx="22" cy="58" r="9" fill="url(#cheekGrad\${containerId})"/>
    <circle cx="78" cy="58" r="9" fill="url(#cheekGrad\${containerId})"/>`;
const newCheeks = `<!-- Cheeks — rosy, warm -->
    <circle cx="22" cy="58" r="9" fill="url(#cheekGrad\${containerId})"/>
    <circle cx="78" cy="58" r="9" fill="url(#cheekGrad\${containerId})"/>
    <!-- SSS cheek glow -->
    <circle cx="24" cy="56" r="10" fill="url(#sssCheekL\${containerId})"/>
    <circle cx="76" cy="56" r="10" fill="url(#sssCheekL\${containerId})"/>
    <!-- Crow's feet wrinkles -->
    <path d="M17,44 L13,42" fill="none" stroke="rgba(160,110,60,.08)" stroke-width=".5" stroke-linecap="round"/>
    <path d="M17,46 L12,46" fill="none" stroke="rgba(160,110,60,.07)" stroke-width=".4" stroke-linecap="round"/>
    <path d="M17,48 L13,50" fill="none" stroke="rgba(160,110,60,.06)" stroke-width=".4" stroke-linecap="round"/>
    <path d="M83,44 L87,42" fill="none" stroke="rgba(160,110,60,.08)" stroke-width=".5" stroke-linecap="round"/>
    <path d="M83,46 L88,46" fill="none" stroke="rgba(160,110,60,.07)" stroke-width=".4" stroke-linecap="round"/>
    <path d="M83,48 L87,50" fill="none" stroke="rgba(160,110,60,.06)" stroke-width=".4" stroke-linecap="round"/>`;
html = html.replace(oldCheeks, newCheeks);

// ============================================================
// 6. NOSE: Add SSS glow
// ============================================================
const oldNoseTip = `<!-- Nose tip highlight -->
    <ellipse cx="50" cy="56.5" rx="2.8" ry="2" fill="rgba(255,235,210,.22)"/>`;
const newNoseTip = `<!-- Nose tip highlight -->
    <ellipse cx="50" cy="56.5" rx="2.8" ry="2" fill="rgba(255,235,210,.22)"/>
    <!-- SSS nose tip glow -->
    <ellipse cx="50" cy="58" rx="6" ry="5" fill="url(#sssNose\${containerId})"/>`;
html = html.replace(oldNoseTip, newNoseTip);

// ============================================================
// 7. MOUTH: Add philtrum and lip texture
// ============================================================
const oldMouth = `<!-- Mouth -->
    \${mouthPath}`;
const newMouth = `<!-- Philtrum (groove above upper lip) -->
    <path d="M48.5,62 Q50,60.5 51.5,62" fill="none" stroke="rgba(170,115,60,.1)" stroke-width=".6"/>
    <path d="M49,63 L49,60.5" fill="none" stroke="rgba(160,110,55,.06)" stroke-width=".4"/>
    <path d="M51,63 L51,60.5" fill="none" stroke="rgba(160,110,55,.06)" stroke-width=".4"/>
    <!-- Upper lip shadow (darker) -->
    <path d="M36,66 Q43,64 50,66 Q57,64 64,66" fill="rgba(150,80,50,.06)" stroke="none"/>
    <!-- Mouth -->
    \${mouthPath}
    <!-- Lip creases/texture -->
    <path d="M40,68 Q44,67.5 48,68" fill="none" stroke="rgba(160,90,55,.06)" stroke-width=".3"/>
    <path d="M52,68 Q56,67.5 60,68" fill="none" stroke="rgba(160,90,55,.06)" stroke-width=".3"/>`;
html = html.replace(oldMouth, newMouth);

// ============================================================
// 8. GLASSES: Add wire-rim round glasses after eyebrows
// ============================================================
const oldBrowHighlight = `<!-- Brow highlight edge -->
    <path d="\${p.brow1}" fill="none" stroke="rgba(180,160,130,.2)" stroke-width="1.2" stroke-linecap="round" transform="translate(0,-1.2)"/>
    <path d="\${p.brow2}" fill="none" stroke="rgba(180,160,130,.2)" stroke-width="1.2" stroke-linecap="round" transform="translate(0,-1.2)"/>`;
const newBrowHighlight = `<!-- Brow highlight edge -->
    <path d="\${p.brow1}" fill="none" stroke="rgba(180,160,130,.2)" stroke-width="1.2" stroke-linecap="round" transform="translate(0,-1.2)"/>
    <path d="\${p.brow2}" fill="none" stroke="rgba(180,160,130,.2)" stroke-width="1.2" stroke-linecap="round" transform="translate(0,-1.2)"/>

    <!-- Wire-rim round glasses -->
    <g opacity=".85">
      <!-- Left lens frame -->
      <circle cx="37" cy="48" r="12" fill="none" stroke="#c8a050" stroke-width=".8"/>
      <circle cx="37" cy="48" r="11.5" fill="none" stroke="rgba(200,170,100,.3)" stroke-width=".3"/>
      <!-- Right lens frame -->
      <circle cx="63" cy="48" r="12" fill="none" stroke="#c8a050" stroke-width=".8"/>
      <circle cx="63" cy="48" r="11.5" fill="none" stroke="rgba(200,170,100,.3)" stroke-width=".3"/>
      <!-- Bridge -->
      <path d="M49,48 Q50,45 51,48" fill="none" stroke="#c8a050" stroke-width=".7"/>
      <!-- Temples (arms going to ears) -->
      <path d="M25,47 L20,49" fill="none" stroke="#c8a050" stroke-width=".6" stroke-linecap="round"/>
      <path d="M75,47 L80,49" fill="none" stroke="#c8a050" stroke-width=".6" stroke-linecap="round"/>
      <!-- Subtle lens reflection -->
      <path d="M30,42 Q35,40 40,43" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M56,42 Q61,40 66,43" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Lens tint -->
      <circle cx="37" cy="48" r="11" fill="rgba(200,220,255,.03)"/>
      <circle cx="63" cy="48" r="11" fill="rgba(200,220,255,.03)"/>
    </g>`;
html = html.replace(oldBrowHighlight, newBrowHighlight);

// ============================================================
// 9. HAIR: Add flyaway strands with varying opacity and sheen gradient
// ============================================================
const oldHairHighlight = `<!-- Highlight wisps at crown -->
      <path d="M35 2 Q40 -6 50 -8 Q60 -6 65 2" fill="rgba(255,255,248,.18)" stroke="none"/>`;
const newHairHighlight = `<!-- Highlight wisps at crown -->
      <path d="M35 2 Q40 -6 50 -8 Q60 -6 65 2" fill="rgba(255,255,248,.18)" stroke="none"/>
      <!-- Hair sheen/specular band across crown -->
      <path d="M25 10 Q35 -2 50 -6 Q65 -2 75 10" fill="rgba(255,252,245,.12)" stroke="none"/>
      <path d="M28 8 Q38 -4 50 -8 Q62 -4 72 8" fill="rgba(255,255,250,.08)" stroke="none"/>
      <!-- Extra flyaway strands with varying opacity -->
      <path d="M18 38 Q4 22 10 6" fill="none" stroke="rgba(225,218,205,.3)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M16 50 Q0 40 6 22" fill="none" stroke="rgba(210,202,188,.2)" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M84 38 Q98 22 92 6" fill="none" stroke="rgba(225,218,205,.3)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M86 50 Q100 40 94 22" fill="none" stroke="rgba(210,202,188,.2)" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Dramatic wild side wisps -->
      <path d="M8 54 Q-6 46 0 30" fill="none" stroke="rgba(215,208,195,.25)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M92 54 Q106 46 100 30" fill="none" stroke="rgba(215,208,195,.25)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M6 58 Q-8 52 -2 36" fill="none" stroke="rgba(205,198,185,.15)" stroke-width="2" stroke-linecap="round"/>
      <path d="M94 58 Q108 52 102 36" fill="none" stroke="rgba(205,198,185,.15)" stroke-width="2" stroke-linecap="round"/>
      <!-- Top wispy flyaways -->
      <path d="M46 -8 Q42 -20 48 -18" fill="none" stroke="rgba(225,220,210,.3)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M54 -8 Q58 -20 52 -18" fill="none" stroke="rgba(225,220,210,.25)" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M32 0 Q26 -14 34 -12" fill="none" stroke="rgba(220,214,202,.2)" stroke-width="1.2" stroke-linecap="round"/>`;
html = html.replace(oldHairHighlight, newHairHighlight);

// ============================================================
// 10. HANDS: Enhance with finger definition, knuckle creases, veins
//     Modify the 'open' hand type to have more detail
// ============================================================
// Add vein hints to all hands by modifying the hand rendering
// We'll add details after the hand ellipse in each type
const oldOpenHand = `} else { // 'open' - relaxed open palm
      return \`<g filter="url(#softShadow\${id})">
        <ellipse cx="\${wx}" cy="\${wy}" rx="5.5" ry="6" fill="#f5d0a0" stroke="#ddb070" stroke-width=".4"
          transform="rotate(\${Math.atan2(dy,dx)*180/Math.PI+90},\${wx},\${wy})"/>
        <path d="M\${wx+px*2},\${wy+py*2} Q\${wx+px*2.5+nx*5},\${wy+py*2.5+ny*5} \${wx+px*1.5+nx*8},\${wy+py*1.5+ny*8}"
          fill="none" stroke="#f0c890" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M\${wx},\${wy} Q\${wx+nx*6},\${wy+ny*6} \${wx+nx*9},\${wy+ny*9}"
          fill="none" stroke="#f0c890" stroke-width="2" stroke-linecap="round"/>
        <path d="M\${wx-px*2},\${wy-py*2} Q\${wx-px*2.5+nx*5},\${wy-py*2.5+ny*5} \${wx-px*2+nx*7},\${wy-py*2+ny*7}"
          fill="none" stroke="#f0c890" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="\${wx}" cy="\${wy}" rx="3" ry="3.5" fill="rgba(255,220,180,.15)"
          transform="rotate(\${Math.atan2(dy,dx)*180/Math.PI+90},\${wx},\${wy})"/>
      </g>\`;`;
const newOpenHand = `} else { // 'open' - relaxed open palm with finger detail
      return \`<g filter="url(#softShadow\${id})">
        <ellipse cx="\${wx}" cy="\${wy}" rx="5.5" ry="6" fill="#f5d0a0" stroke="#ddb070" stroke-width=".4"
          transform="rotate(\${Math.atan2(dy,dx)*180/Math.PI+90},\${wx},\${wy})"/>
        <!-- Individual fingers with joints -->
        <path d="M\${wx+px*3},\${wy+py*3} Q\${wx+px*3.5+nx*5},\${wy+py*3.5+ny*5} \${wx+px*2.5+nx*9},\${wy+py*2.5+ny*9}"
          fill="none" stroke="#f0c890" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M\${wx+px*1.5},\${wy+py*1.5} Q\${wx+px*1.8+nx*6},\${wy+py*1.8+ny*6} \${wx+px*1+nx*10.5},\${wy+py*1+ny*10.5}"
          fill="none" stroke="#f0c890" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M\${wx-px*.5},\${wy-py*.5} Q\${wx-px*.3+nx*6.5},\${wy-py*.3+ny*6.5} \${wx-px*.8+nx*10},\${wy-py*.8+ny*10}"
          fill="none" stroke="#f0c890" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M\${wx-px*2.5},\${wy-py*2.5} Q\${wx-px*2.8+nx*5},\${wy-py*2.8+ny*5} \${wx-px*2.5+nx*8},\${wy-py*2.5+ny*8}"
          fill="none" stroke="#f0c890" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Thumb -->
        <path d="M\${wx+px*4},\${wy+py*4} Q\${wx+px*5.5+nx*2},\${wy+py*5.5+ny*2} \${wx+px*5+nx*5},\${wy+py*5+ny*5}"
          fill="none" stroke="#f0c890" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Knuckle creases -->
        <path d="M\${wx+px*2.5+nx*3},\${wy+py*2.5+ny*3} L\${wx-px*2+nx*3},\${wy-py*2+ny*3}"
          fill="none" stroke="rgba(180,130,70,.12)" stroke-width=".4"/>
        <!-- Vein hints on back of hand -->
        <path d="M\${wx+px*1},\${wy+py*1} Q\${wx+px*.5+nx*2},\${wy+py*.5+ny*2} \${wx+nx*4},\${wy+ny*4}"
          fill="none" stroke="rgba(120,140,180,.06)" stroke-width=".5"/>
        <path d="M\${wx-px*1},\${wy-py*1} Q\${wx-px*1.5+nx*2},\${wy-py*1.5+ny*2} \${wx-px*.5+nx*4},\${wy-py*.5+ny*4}"
          fill="none" stroke="rgba(120,140,180,.05)" stroke-width=".4"/>
        <ellipse cx="\${wx}" cy="\${wy}" rx="3" ry="3.5" fill="rgba(255,220,180,.15)"
          transform="rotate(\${Math.atan2(dy,dx)*180/Math.PI+90},\${wx},\${wy})"/>
      </g>\`;`;
html = html.replace(oldOpenHand, newOpenHand);

// ============================================================
// 11. COAT: Add stitch marks and wrinkle shadows at bends
// ============================================================
const oldCoatHem = `<!-- Coat hem shadow -->
      <path d="M28,136 Q50,140 72,136" fill="none" stroke="rgba(140,100,50,.12)" stroke-width="1"/>`;
const newCoatHem = `<!-- Coat hem shadow -->
      <path d="M28,136 Q50,140 72,136" fill="none" stroke="rgba(140,100,50,.12)" stroke-width="1"/>
      <!-- Stitch marks along seams -->
      <path d="M24,90 L24,92 M24,95 L24,97 M24,100 L24,102 M24,105 L24,107 M24,110 L24,112" fill="none" stroke="rgba(160,130,90,.1)" stroke-width=".4" stroke-linecap="round"/>
      <path d="M76,90 L76,92 M76,95 L76,97 M76,100 L76,102 M76,105 L76,107 M76,110 L76,112" fill="none" stroke="rgba(160,130,90,.1)" stroke-width=".4" stroke-linecap="round"/>
      <!-- Elbow wrinkle shadows -->
      <path d="M26,96 Q28,98 26,100" fill="none" stroke="rgba(140,100,50,.06)" stroke-width=".6"/>
      <path d="M27,98 Q29,100 27,102" fill="none" stroke="rgba(140,100,50,.05)" stroke-width=".5"/>
      <path d="M74,96 Q72,98 74,100" fill="none" stroke="rgba(140,100,50,.06)" stroke-width=".6"/>
      <path d="M73,98 Q71,100 73,102" fill="none" stroke="rgba(140,100,50,.05)" stroke-width=".5"/>
      <!-- Waist crease -->
      <path d="M34,118 Q50,121 66,118" fill="none" stroke="rgba(140,100,50,.08)" stroke-width=".6"/>`;
html = html.replace(oldCoatHem, newCoatHem);

// ============================================================
// 12. CINEMATIC: Add film grain + chromatic aberration + stronger vignette
//     to the drawWarmVignette function
// ============================================================
const oldVignette = `/* Warm ambient vignette overlay — Ratatouille lamplight feel */
function drawWarmVignette(ctx, w, h) {
  const vg=ctx.createRadialGradient(w*.5,h*.4,w*.15,w*.5,h*.5,w*.7);
  vg.addColorStop(0,'rgba(240,180,80,.04)');
  vg.addColorStop(.5,'rgba(0,0,0,0)');
  vg.addColorStop(1,'rgba(10,5,0,.2)');
  ctx.fillStyle=vg;ctx.fillRect(0,0,w,h);
}`;
const newVignette = `/* Warm ambient vignette overlay — Ratatouille lamplight feel */
function drawWarmVignette(ctx, w, h) {
  // Stronger cinematic vignette
  const vg=ctx.createRadialGradient(w*.5,h*.4,w*.12,w*.5,h*.5,w*.72);
  vg.addColorStop(0,'rgba(240,180,80,.05)');
  vg.addColorStop(.4,'rgba(0,0,0,0)');
  vg.addColorStop(.75,'rgba(5,2,0,.15)');
  vg.addColorStop(1,'rgba(0,0,0,.35)');
  ctx.fillStyle=vg;ctx.fillRect(0,0,w,h);
}

/* Film grain overlay for cinematic feel */
function drawFilmGrain(ctx, w, h, time, intensity) {
  const id=ctx.getImageData(0,0,Math.min(w,400),Math.min(h,300));
  // Sparse noise for performance — only modify every 4th pixel
  const d=id.data;
  const seed=Math.floor(time*30);
  for(let i=0;i<d.length;i+=16){
    const noise=((seed*1103515245+12345+i)&0x7fffffff)%256-128;
    const n=noise*intensity;
    d[i]+=n;d[i+1]+=n;d[i+2]+=n;
  }
  ctx.putImageData(id,0,0);
}

/* Chromatic aberration at canvas edges (very subtle RGB split) */
function drawChromaticAberration(ctx, w, h) {
  // Subtle color fringing at edges — just draw thin colored borders
  ctx.save();
  ctx.globalAlpha=.03;
  ctx.globalCompositeOperation='screen';
  // Red shift left
  ctx.fillStyle='#ff0000';
  ctx.fillRect(0,0,3,h);
  // Cyan shift right
  ctx.fillStyle='#00ffff';
  ctx.fillRect(w-3,0,3,h);
  // Blue shift top
  ctx.fillStyle='#0000ff';
  ctx.fillRect(0,0,w,2);
  // Yellow shift bottom
  ctx.fillStyle='#ffff00';
  ctx.fillRect(0,h-2,w,2);
  ctx.globalCompositeOperation='source-over';
  ctx.globalAlpha=1;
  ctx.restore();
}

/* Lens flare for bright objects */
function drawLensFlare(ctx, x, y, brightness, color) {
  const r=20+brightness*40;
  ctx.save();
  ctx.globalCompositeOperation='screen';
  // Main flare
  const fg=ctx.createRadialGradient(x,y,0,x,y,r);
  fg.addColorStop(0,color||'rgba(255,240,200,.3)');
  fg.addColorStop(.3,'rgba(255,220,150,.1)');
  fg.addColorStop(1,'rgba(255,200,100,0)');
  ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=fg;ctx.fill();
  // Secondary flare elements
  const dx=x-ctx.canvas.width/2, dy=y-ctx.canvas.height/2;
  for(let i=1;i<=3;i++){
    const fx=x-dx*i*.3, fy=y-dy*i*.3;
    const fr=r*(1-i*.2)*.3;
    ctx.beginPath();ctx.arc(fx,fy,fr,0,Math.PI*2);
    ctx.fillStyle=\`rgba(200,180,255,\${.04/i})\`;ctx.fill();
  }
  ctx.globalCompositeOperation='source-over';
  ctx.restore();
}`;
html = html.replace(oldVignette, newVignette);

// ============================================================
// 13. CH3 CLOCKS: Add glass reflection, beveled rim, gear mechanism
// ============================================================
const oldClockCenter = `// Center dot with metallic sheen
    const cdG=ctx.createRadialGradient(cx-1,cy-1,1,cx,cy,5);
    cdG.addColorStop(0,'#fff0c0');cdG.addColorStop(.5,'#e0b050');cdG.addColorStop(1,'#806020');
    ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle=cdG;ctx.fill();`;
const newClockCenter = `// Subtle gear mechanism visible through glass at center
    ctx.save();ctx.globalAlpha=.08;
    for(let g=0;g<6;g++){
      const ga=time*speed*.5+g*Math.PI/3;
      const gx=cx+Math.cos(ga)*12;const gy=cy+Math.sin(ga)*12;
      ctx.beginPath();ctx.arc(gx,gy,4,0,Math.PI*2);
      ctx.strokeStyle='rgba(180,160,120,.5)';ctx.lineWidth=.8;ctx.stroke();
      // Gear teeth
      for(let t=0;t<6;t++){
        const ta=t*Math.PI/3+time*speed*.3;
        ctx.beginPath();
        ctx.moveTo(gx+Math.cos(ta)*3.5,gy+Math.sin(ta)*3.5);
        ctx.lineTo(gx+Math.cos(ta)*5,gy+Math.sin(ta)*5);
        ctx.stroke();
      }
    }
    ctx.restore();
    // Clock glass reflection (curved highlight sweep)
    ctx.save();ctx.globalAlpha=.06;
    ctx.beginPath();
    ctx.arc(cx,cy,radius-2,-.8,-2.4,true);
    ctx.quadraticCurveTo(cx-radius*.3,cy-radius*.5,cx+radius*.3,cy-radius*.8);
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=radius*.15;ctx.stroke();
    ctx.restore();
    // Beveled metal edge (gradient ring around clock)
    ctx.beginPath();ctx.arc(cx,cy,radius+2,0,Math.PI*2);
    const bevelG=ctx.createLinearGradient(cx-radius,cy-radius,cx+radius,cy+radius);
    bevelG.addColorStop(0,'rgba(180,160,120,.3)');bevelG.addColorStop(.25,'rgba(255,240,200,.5)');
    bevelG.addColorStop(.5,'rgba(180,160,120,.3)');bevelG.addColorStop(.75,'rgba(255,240,200,.5)');
    bevelG.addColorStop(1,'rgba(180,160,120,.3)');
    ctx.strokeStyle=bevelG;ctx.lineWidth=2.5;ctx.stroke();
    // Center dot with metallic sheen
    const cdG=ctx.createRadialGradient(cx-1,cy-1,1,cx,cy,5);
    cdG.addColorStop(0,'#fff0c0');cdG.addColorStop(.5,'#e0b050');cdG.addColorStop(1,'#806020');
    ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle=cdG;ctx.fill();`;
html = html.replace(oldClockCenter, newClockCenter);

// ============================================================
// 14. CH7 ROCKET: Add hull specular, pilot silhouette, heat shield, rivets
// ============================================================
const oldRocketBody = `// Main body
    ctx.beginPath();ctx.moveTo(40,0);ctx.quadraticCurveTo(45,-12,20,-12);ctx.lineTo(-25,-10);ctx.lineTo(-25,10);ctx.lineTo(20,12);ctx.quadraticCurveTo(45,12,40,0);ctx.closePath();
    const rg=ctx.createLinearGradient(-25,-12,40,12);rg.addColorStop(0,'#bbbbbb');rg.addColorStop(.3,'#e8e8e8');rg.addColorStop(.5,'#ffffff');rg.addColorStop(.7,'#dddddd');rg.addColorStop(1,'#999999');
    ctx.fillStyle=rg;ctx.fill();ctx.strokeStyle='#888';ctx.lineWidth=.5;ctx.stroke();
    // Panel lines (rivets)
    ctx.strokeStyle='rgba(100,100,100,.2)';ctx.lineWidth=.4;
    ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(0,12);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-12,-11);ctx.lineTo(-12,11);ctx.stroke();
    for(let i=0;i<4;i++){const ry=-9+i*6;ctx.beginPath();ctx.arc(5,ry,0.7,0,Math.PI*2);ctx.fillStyle='rgba(120,120,120,.3)';ctx.fill();}`;
const newRocketBody = `// Main body
    ctx.beginPath();ctx.moveTo(40,0);ctx.quadraticCurveTo(45,-12,20,-12);ctx.lineTo(-25,-10);ctx.lineTo(-25,10);ctx.lineTo(20,12);ctx.quadraticCurveTo(45,12,40,0);ctx.closePath();
    const rg=ctx.createLinearGradient(-25,-12,40,12);rg.addColorStop(0,'#bbbbbb');rg.addColorStop(.3,'#e8e8e8');rg.addColorStop(.5,'#ffffff');rg.addColorStop(.7,'#dddddd');rg.addColorStop(1,'#999999');
    ctx.fillStyle=rg;ctx.fill();ctx.strokeStyle='#888';ctx.lineWidth=.5;ctx.stroke();
    // Hull specular highlight
    ctx.beginPath();ctx.moveTo(35,-3);ctx.quadraticCurveTo(25,-10,5,-10);
    ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=1.5;ctx.stroke();
    // Heat shield glow at nose (when speed > 0.5)
    if(s>.5){
      const heatAlpha=(s-.5)*1.5;
      const hsg=ctx.createRadialGradient(42,0,0,42,0,8);
      hsg.addColorStop(0,\`rgba(255,200,100,\${heatAlpha*.6})\`);
      hsg.addColorStop(.5,\`rgba(255,120,40,\${heatAlpha*.3})\`);
      hsg.addColorStop(1,'rgba(255,80,20,0)');
      ctx.beginPath();ctx.arc(42,0,8,0,Math.PI*2);ctx.fillStyle=hsg;ctx.fill();
    }
    // Panel lines
    ctx.strokeStyle='rgba(100,100,100,.2)';ctx.lineWidth=.4;
    ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(0,12);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-12,-11);ctx.lineTo(-12,11);ctx.stroke();
    // Panel seam rivets (small circles with highlights)
    for(let i=0;i<6;i++){
      const ry=-10+i*4;
      ctx.beginPath();ctx.arc(5,ry,0.9,0,Math.PI*2);ctx.fillStyle='rgba(120,120,120,.3)';ctx.fill();
      ctx.beginPath();ctx.arc(5-.3,ry-.3,0.3,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.2)';ctx.fill();
    }
    for(let i=0;i<5;i++){
      const ry=-8+i*4;
      ctx.beginPath();ctx.arc(-8,ry,0.8,0,Math.PI*2);ctx.fillStyle='rgba(120,120,120,.25)';ctx.fill();
      ctx.beginPath();ctx.arc(-8-.3,ry-.3,0.25,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.15)';ctx.fill();
    }`;
html = html.replace(oldRocketBody, newRocketBody);

// Add pilot silhouette in rocket viewport
const oldRocketWindow = `// Window
    ctx.beginPath();ctx.arc(15,0,5,0,Math.PI*2);
    const wg=ctx.createRadialGradient(14,-1,1,15,0,5);wg.addColorStop(0,'#aaddff');wg.addColorStop(1,'#4488cc');
    ctx.fillStyle=wg;ctx.fill();ctx.strokeStyle='rgba(100,100,100,.3)';ctx.lineWidth=.5;ctx.stroke();`;
const newRocketWindow = `// Window with pilot silhouette
    ctx.beginPath();ctx.arc(15,0,5,0,Math.PI*2);
    const wg=ctx.createRadialGradient(14,-1,1,15,0,5);wg.addColorStop(0,'#aaddff');wg.addColorStop(1,'#4488cc');
    ctx.fillStyle=wg;ctx.fill();ctx.strokeStyle='rgba(100,100,100,.3)';ctx.lineWidth=.5;ctx.stroke();
    // Tiny pilot silhouette
    ctx.save();ctx.beginPath();ctx.arc(15,0,4.5,0,Math.PI*2);ctx.clip();
    ctx.fillStyle='rgba(30,30,50,.3)';
    // Head
    ctx.beginPath();ctx.arc(15,-1,1.8,0,Math.PI*2);ctx.fill();
    // Shoulders
    ctx.beginPath();ctx.moveTo(12.5,1);ctx.quadraticCurveTo(15,0,17.5,1);ctx.lineTo(17.5,4);ctx.lineTo(12.5,4);ctx.closePath();ctx.fill();
    ctx.restore();`;
html = html.replace(oldRocketWindow, newRocketWindow);

// ============================================================
// 15. CH8: Add nucleus with protons/neutrons, electron trail afterglow, god rays
// ============================================================
const oldNucleus = `// Nucleus
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
      const g=ctx.createRadialGradient(cx,cy,1,cx,cy,r);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#ffdd66');g.addColorStop(1,'rgba(255,100,0,.5)');
      ctx.fillStyle=g;ctx.shadowColor='#ffdd66';ctx.shadowBlur=30;ctx.fill();ctx.shadowBlur=0;`;
const newNucleus = `// Nucleus with protons/neutrons (small spheres)
      ctx.save();
      // Draw individual nucleons
      const nucleonCount=Math.max(3,Math.floor(r/3));
      for(let n=0;n<nucleonCount;n++){
        const na=n*Math.PI*2/nucleonCount+time*2;
        const nr2=r*.4;
        const nnx=cx+Math.cos(na)*nr2*(1+.2*Math.sin(time*5+n));
        const nny=cy+Math.sin(na)*nr2*(1+.2*Math.cos(time*5+n));
        const nR=r*.25;
        const isProton=n%2===0;
        const ncG=ctx.createRadialGradient(nnx-nR*.2,nny-nR*.2,nR*.1,nnx,nny,nR);
        if(isProton){ncG.addColorStop(0,'#ff8888');ncG.addColorStop(1,'#cc3333')}
        else{ncG.addColorStop(0,'#8888ff');ncG.addColorStop(1,'#3333cc')}
        ctx.beginPath();ctx.arc(nnx,nny,nR,0,Math.PI*2);ctx.fillStyle=ncG;ctx.fill();
        // Nucleon highlight
        ctx.beginPath();ctx.arc(nnx-nR*.2,nny-nR*.3,nR*.35,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,.3)';ctx.fill();
      }
      ctx.restore();
      // Overall nucleus glow
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
      const g=ctx.createRadialGradient(cx,cy,1,cx,cy,r);g.addColorStop(0,'rgba(255,255,255,.6)');g.addColorStop(.5,'rgba(255,220,100,.3)');g.addColorStop(1,'rgba(255,100,0,.1)');
      ctx.fillStyle=g;ctx.shadowColor='#ffdd66';ctx.shadowBlur=30;ctx.fill();ctx.shadowBlur=0;`;
html = html.replace(oldNucleus, newNucleus);

// Add phosphor trail to electron orbits
const oldElectronTrail = `// Trail
        for(let t=5;t>=0;t--){
          const ta=e.angle-t*.15;
          const tx=cx+Math.cos(ta)*eR;
          const ty=cy+Math.sin(ta)*eR*.6;
          ctx.beginPath();ctx.arc(tx,ty,e.size*(1-t*.12),0,Math.PI*2);
          ctx.fillStyle=\`rgba(100,180,255,\${.05*(5-t)})\`;ctx.fill();
        }`;
const newElectronTrail = `// Phosphor-trail afterglow
        for(let t=12;t>=0;t--){
          const ta=e.angle-t*.1;
          const tx=cx+Math.cos(ta)*eR;
          const ty=cy+Math.sin(ta)*eR*.6;
          ctx.beginPath();ctx.arc(tx,ty,e.size*(1-t*.06),0,Math.PI*2);
          ctx.fillStyle=\`rgba(100,180,255,\${.04*(12-t)})\`;ctx.fill();
          // Phosphor glow
          if(t<6){
            ctx.beginPath();ctx.arc(tx,ty,e.size*2*(1-t*.1),0,Math.PI*2);
            ctx.fillStyle=\`rgba(80,150,255,\${.01*(6-t)})\`;ctx.fill();
          }
        }`;
html = html.replace(oldElectronTrail, newElectronTrail);

// Add god rays to explosion
const oldExplosionCenter = `// Center glow fading
      const glow=clamp(1-phaseTime/3,0,1);
      if(glow>.01){
        const eg=ctx.createRadialGradient(cx,cy,5,cx,cy,80*glow);eg.addColorStop(0,\`rgba(255,255,200,\${glow})\`);eg.addColorStop(1,'rgba(255,100,0,0)');
        ctx.beginPath();ctx.arc(cx,cy,80*glow,0,Math.PI*2);ctx.fillStyle=eg;ctx.fill();
      }`;
const newExplosionCenter = `// Volumetric god rays radiating from center
      const godRayAlpha=clamp(1-phaseTime/4,0,1);
      if(godRayAlpha>.01){
        ctx.save();ctx.globalCompositeOperation='screen';
        for(let ray=0;ray<12;ray++){
          const ra=ray*Math.PI/6+time*.1;
          const rayLen=80+phaseTime*40;
          const rw=3+phaseTime*2;
          ctx.beginPath();
          ctx.moveTo(cx+Math.cos(ra-rw*.01)*5,cy+Math.sin(ra-rw*.01)*5);
          ctx.lineTo(cx+Math.cos(ra-rw*.005)*rayLen,cy+Math.sin(ra-rw*.005)*rayLen);
          ctx.lineTo(cx+Math.cos(ra+rw*.005)*rayLen,cy+Math.sin(ra+rw*.005)*rayLen);
          ctx.closePath();
          const rg2=ctx.createLinearGradient(cx,cy,cx+Math.cos(ra)*rayLen,cy+Math.sin(ra)*rayLen);
          rg2.addColorStop(0,\`rgba(255,240,180,\${godRayAlpha*.15})\`);
          rg2.addColorStop(.5,\`rgba(255,200,100,\${godRayAlpha*.06})\`);
          rg2.addColorStop(1,'rgba(255,150,50,0)');
          ctx.fillStyle=rg2;ctx.fill();
        }
        ctx.globalCompositeOperation='source-over';ctx.restore();
      }
      // Center glow fading
      const glow=clamp(1-phaseTime/3,0,1);
      if(glow>.01){
        const eg=ctx.createRadialGradient(cx,cy,5,cx,cy,80*glow);eg.addColorStop(0,\`rgba(255,255,200,\${glow})\`);eg.addColorStop(1,'rgba(255,100,0,0)');
        ctx.beginPath();ctx.arc(cx,cy,80*glow,0,Math.PI*2);ctx.fillStyle=eg;ctx.fill();
      }`;
html = html.replace(oldExplosionCenter, newExplosionCenter);

// ============================================================
// 16. CH1 NEWTON: Add wig curl detail, shoe buckles, apple wood grain, bark texture
// ============================================================
const oldWigCurls = `// Wig — white curls
    const headY=-60;
    ctx.fillStyle='#e8e0d4';
    // Side curls
    [{x:-14,y:headY+6,r:7},{x:16,y:headY+6,r:7},{x:-12,y:headY-2,r:6},{x:14,y:headY-2,r:6}].forEach(c=>{
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
    });
    // Top curls
    [{x:-6,y:headY-12,r:7},{x:4,y:headY-14,r:7},{x:10,y:headY-10,r:6},{x:-2,y:headY-10,r:8}].forEach(c=>{
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
    });`;
const newWigCurls = `// Wig — white curls with texture
    const headY=-60;
    ctx.fillStyle='#e8e0d4';
    // Side curls
    [{x:-14,y:headY+6,r:7},{x:16,y:headY+6,r:7},{x:-12,y:headY-2,r:6},{x:14,y:headY-2,r:6}].forEach(c=>{
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
      // Curl wrinkle detail
      ctx.beginPath();ctx.arc(c.x,c.y,c.r*.7,0,Math.PI*2);
      ctx.strokeStyle='rgba(180,170,150,.2)';ctx.lineWidth=.5;ctx.stroke();
      ctx.beginPath();ctx.arc(c.x+1,c.y+1,c.r*.4,0,Math.PI*2);
      ctx.strokeStyle='rgba(170,160,140,.15)';ctx.lineWidth=.4;ctx.stroke();
    });
    // Top curls
    [{x:-6,y:headY-12,r:7},{x:4,y:headY-14,r:7},{x:10,y:headY-10,r:6},{x:-2,y:headY-10,r:8}].forEach(c=>{
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(c.x,c.y,c.r*.65,0,Math.PI*2);
      ctx.strokeStyle='rgba(180,170,150,.18)';ctx.lineWidth=.5;ctx.stroke();
    });
    // Wig highlight sheen
    ctx.beginPath();ctx.ellipse(-2,headY-12,12,5,0,Math.PI+.3,-.3);
    ctx.fillStyle='rgba(255,255,250,.1)';ctx.fill();`;
html = html.replace(oldWigCurls, newWigCurls);

// Add shoe buckles
const oldShoes = `// Shoes
    ctx.fillStyle='#2a1a0a';
    ctx.beginPath();ctx.ellipse(38,-5,8,5,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(32,-7,7,4,.15,0,Math.PI*2);ctx.fill();`;
const newShoes = `// Shoes with buckle detail
    ctx.fillStyle='#2a1a0a';
    ctx.beginPath();ctx.ellipse(38,-5,8,5,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(32,-7,7,4,.15,0,Math.PI*2);ctx.fill();
    // Shoe buckles
    ctx.strokeStyle='#c8a840';ctx.lineWidth=.8;
    ctx.beginPath();ctx.rect(36,-7,4,3);ctx.stroke();
    ctx.beginPath();ctx.rect(30,-9,3.5,2.5);ctx.stroke();
    // Buckle shine
    ctx.fillStyle='rgba(255,220,100,.2)';
    ctx.fillRect(36.5,-6.5,1.5,1);ctx.fillRect(30.5,-8.5,1.2,.8);`;
html = html.replace(oldShoes, newShoes);

// Enhanced bark texture
const oldBark = `// Bark texture lines
    ctx.strokeStyle='rgba(40,20,5,.2)';ctx.lineWidth=.8;
    for(let i=0;i<5;i++){
      const bx=treeX-5+i*2.5;
      ctx.beginPath();ctx.moveTo(bx,groundY);ctx.quadraticCurveTo(bx+(i%2?1:-1),treeTrunkTop+(groundY-treeTrunkTop)*.5,bx,treeTrunkTop+5);ctx.stroke();
    }`;
const newBark = `// Deep bark texture with grooves
    ctx.strokeStyle='rgba(40,20,5,.25)';ctx.lineWidth=1.2;
    for(let i=0;i<7;i++){
      const bx=treeX-7+i*2;
      ctx.beginPath();ctx.moveTo(bx,groundY);ctx.quadraticCurveTo(bx+(i%2?1.5:-1.5),treeTrunkTop+(groundY-treeTrunkTop)*.5,bx+.5,treeTrunkTop+5);ctx.stroke();
    }
    // Horizontal bark cracks
    ctx.strokeStyle='rgba(40,20,5,.12)';ctx.lineWidth=.6;
    for(let i=0;i<4;i++){
      const by=treeTrunkTop+10+i*18;
      ctx.beginPath();ctx.moveTo(treeX-8,by);ctx.quadraticCurveTo(treeX,by+2+i%2*2,treeX+8,by-1);ctx.stroke();
    }
    // Knot
    ctx.beginPath();ctx.ellipse(treeX+3,treeTrunkTop+25,3,4,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(40,20,5,.15)';ctx.lineWidth=.8;ctx.stroke();`;
html = html.replace(oldBark, newBark);

// Enhanced apple with stem wood grain
const oldAppleStem = `// Stem
    ctx.beginPath();ctx.moveTo(0,-10);ctx.quadraticCurveTo(2,-16,3,-14);ctx.strokeStyle='#5a3a1a';ctx.lineWidth=1.5;ctx.stroke();
    // Leaf on stem
    ctx.beginPath();ctx.moveTo(1,-12);ctx.quadraticCurveTo(6,-14,7,-10);ctx.fillStyle='#3a8a22';ctx.fill();`;
const newAppleStem = `// Stem with wood grain
    ctx.beginPath();ctx.moveTo(0,-10);ctx.quadraticCurveTo(2,-16,3,-14);ctx.strokeStyle='#5a3a1a';ctx.lineWidth=1.8;ctx.stroke();
    // Stem wood grain lines
    ctx.beginPath();ctx.moveTo(.5,-10);ctx.quadraticCurveTo(1.5,-14,2,-13);ctx.strokeStyle='rgba(80,50,20,.3)';ctx.lineWidth=.3;ctx.stroke();
    ctx.beginPath();ctx.moveTo(-.3,-10);ctx.quadraticCurveTo(1,-15,2.5,-14.5);ctx.strokeStyle='rgba(70,40,15,.2)';ctx.lineWidth=.25;ctx.stroke();
    // Leaf on stem with vein
    ctx.beginPath();ctx.moveTo(1,-12);ctx.quadraticCurveTo(6,-14,7,-10);ctx.fillStyle='#3a8a22';ctx.fill();
    // Leaf vein
    ctx.beginPath();ctx.moveTo(2,-12);ctx.quadraticCurveTo(4.5,-12.5,6,-10.5);ctx.strokeStyle='rgba(30,70,15,.3)';ctx.lineWidth=.4;ctx.stroke();`;
html = html.replace(oldAppleStem, newAppleStem);

// ============================================================
// 17. CH10 TWINS: Add facial features to twins, continent outlines, ship windows
// ============================================================
// The twin drawing already has detailed facial features in drawTwin function.
// Let's enhance the Earth emoji to have continent outlines and the rocket to have windows

const oldEarthIcon = `// Slowly rotating Earth icon
    ctx.save();ctx.translate(W*.3,cy+85);ctx.rotate(time*.1);
    ctx.font='20px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🌍',0,0);
    ctx.restore();`;
const newEarthIcon = `// Earth with continent outlines
    ctx.save();ctx.translate(W*.3,cy+85);
    // Earth sphere
    const earthR=14;
    const eG=ctx.createRadialGradient(-3,-3,2,0,0,earthR);
    eG.addColorStop(0,'#5588dd');eG.addColorStop(.4,'#3366bb');eG.addColorStop(.8,'#224488');eG.addColorStop(1,'#112244');
    ctx.beginPath();ctx.arc(0,0,earthR,0,Math.PI*2);ctx.fillStyle=eG;ctx.fill();
    // Simplified continent outlines (rotating)
    ctx.save();ctx.beginPath();ctx.arc(0,0,earthR-.5,0,Math.PI*2);ctx.clip();
    const rot=time*.1;
    ctx.fillStyle='rgba(80,180,80,.5)';
    // Americas-like shape
    ctx.beginPath();
    const ax=-4+Math.sin(rot)*8;
    ctx.moveTo(ax-2,-10);ctx.quadraticCurveTo(ax-4,-6,ax-3,-2);ctx.quadraticCurveTo(ax-5,2,ax-3,6);
    ctx.quadraticCurveTo(ax-2,10,ax,8);ctx.quadraticCurveTo(ax+2,4,ax+1,-2);ctx.quadraticCurveTo(ax+3,-6,ax,-10);
    ctx.fill();
    // Europe/Africa shape
    const bx=6+Math.sin(rot)*8;
    ctx.beginPath();
    ctx.moveTo(bx-1,-8);ctx.quadraticCurveTo(bx+2,-4,bx+1,0);ctx.quadraticCurveTo(bx+3,4,bx+1,8);
    ctx.quadraticCurveTo(bx-1,6,bx-2,2);ctx.quadraticCurveTo(bx-3,-2,bx-1,-8);
    ctx.fill();
    ctx.restore();
    // Atmosphere rim
    ctx.beginPath();ctx.arc(0,0,earthR+1,0,Math.PI*2);
    ctx.strokeStyle='rgba(100,180,255,.2)';ctx.lineWidth=2;ctx.stroke();
    ctx.restore();`;
html = html.replace(oldEarthIcon, newEarthIcon);

// Enhance the rocket emoji to actual drawn rocket with windows
const oldRocketEmoji = `ctx.save();ctx.translate(rocketX,rocketY);ctx.rotate(Math.sin(rocketAngle)*0.3);
    ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('🚀',0,0);
    ctx.restore();`;
const newRocketEmoji = `ctx.save();ctx.translate(rocketX,rocketY);ctx.rotate(Math.sin(rocketAngle)*0.3+Math.PI*.25);
    // Mini rocket ship with windows
    ctx.beginPath();ctx.moveTo(0,-8);ctx.quadraticCurveTo(-4,-4,-4,4);ctx.lineTo(4,4);ctx.quadraticCurveTo(4,-4,0,-8);ctx.closePath();
    ctx.fillStyle='#aabbcc';ctx.fill();
    // Windows with warm light
    ctx.beginPath();ctx.arc(0,-2,1.5,0,Math.PI*2);
    ctx.fillStyle='rgba(255,220,120,.8)';ctx.shadowColor='rgba(255,200,80,.5)';ctx.shadowBlur=4;ctx.fill();
    ctx.beginPath();ctx.arc(0,2,1.2,0,Math.PI*2);
    ctx.fillStyle='rgba(255,210,100,.6)';ctx.fill();ctx.shadowBlur=0;
    // Fins
    ctx.fillStyle='#dd4444';
    ctx.beginPath();ctx.moveTo(-4,3);ctx.lineTo(-7,6);ctx.lineTo(-3,5);ctx.fill();
    ctx.beginPath();ctx.moveTo(4,3);ctx.lineTo(7,6);ctx.lineTo(3,5);ctx.fill();
    // Exhaust
    ctx.beginPath();ctx.moveTo(-2,4);ctx.quadraticCurveTo(0,8+Math.sin(time*15)*2,2,4);
    ctx.fillStyle='rgba(255,180,60,.6)';ctx.fill();
    ctx.restore();`;
html = html.replace(oldRocketEmoji, newRocketEmoji);

// ============================================================
// 18. Add Newton coat fabric texture
// ============================================================
const oldNewtonCoat = `// Body — long coat, sitting, leaning against trunk
    ctx.fillStyle='#4a6a8a';
    ctx.beginPath();
    ctx.moveTo(-8,-10);ctx.quadraticCurveTo(-12,-30,-10,-48);
    ctx.lineTo(12,-48);ctx.quadraticCurveTo(14,-30,10,-10);ctx.closePath();ctx.fill();
    // Coat details
    ctx.strokeStyle='rgba(30,50,70,.3)';ctx.lineWidth=.8;
    ctx.beginPath();ctx.moveTo(1,-48);ctx.lineTo(1,-10);ctx.stroke();`;
const newNewtonCoat = `// Body — long coat with fabric texture
    ctx.fillStyle='#4a6a8a';
    ctx.beginPath();
    ctx.moveTo(-8,-10);ctx.quadraticCurveTo(-12,-30,-10,-48);
    ctx.lineTo(12,-48);ctx.quadraticCurveTo(14,-30,10,-10);ctx.closePath();ctx.fill();
    // Fabric texture (subtle highlights)
    ctx.beginPath();ctx.moveTo(-6,-10);ctx.quadraticCurveTo(-8,-30,-6,-48);
    ctx.strokeStyle='rgba(100,140,170,.08)';ctx.lineWidth=1.2;ctx.stroke();
    ctx.beginPath();ctx.moveTo(6,-10);ctx.quadraticCurveTo(8,-30,6,-48);ctx.stroke();
    // Fabric wrinkle near waist
    ctx.beginPath();ctx.moveTo(-8,-14);ctx.quadraticCurveTo(0,-12,10,-14);
    ctx.strokeStyle='rgba(30,50,70,.15)';ctx.lineWidth=.6;ctx.stroke();
    // Coat details
    ctx.strokeStyle='rgba(30,50,70,.3)';ctx.lineWidth=.8;
    ctx.beginPath();ctx.moveTo(1,-48);ctx.lineTo(1,-10);ctx.stroke();`;
html = html.replace(oldNewtonCoat, newNewtonCoat);

// Write the final file
fs.writeFileSync('/tmp/einstein-rebuild/index.html', html, 'utf8');
console.log('All hyper-realistic upgrades applied successfully!');

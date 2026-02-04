// vis.js
// generates SVG visualizations using JS

function clearSVG(svg) {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function svgEl(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function addText(svg, x, y, txt, size) {
  const t = svgEl("text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("font-size", size || "14");
  t.setAttribute("fill", "#e7eefb");
  t.textContent = txt;
  svg.appendChild(t);
}

function addLine(svg, x1, y1, x2, y2) {
  const l = svgEl("line");
  l.setAttribute("x1", x1);
  l.setAttribute("y1", y1);
  l.setAttribute("x2", x2);
  l.setAttribute("y2", y2);
  l.setAttribute("stroke", "rgba(231,238,251,0.35)");
  l.setAttribute("stroke-width", "1");
  svg.appendChild(l);
}

function addPath(svg, d, stroke, width) {
  const p = svgEl("path");
  p.setAttribute("d", d);
  p.setAttribute("fill", "none");
  p.setAttribute("stroke", stroke);
  p.setAttribute("stroke-width", width || "3");
  p.setAttribute("stroke-linecap", "round");
  p.setAttribute("stroke-linejoin", "round");
  svg.appendChild(p);
}

function addCircle(svg, cx, cy, r, fill, stroke) {
  const c = svgEl("circle");
  c.setAttribute("cx", cx);
  c.setAttribute("cy", cy);
  c.setAttribute("r", r);
  if (fill) c.setAttribute("fill", fill);
  if (stroke) c.setAttribute("stroke", stroke);
  svg.appendChild(c);
}

// ---------- UFC chart ----------
function drawUFC(svg) {
  clearSVG(svg);

  const w = 900;
  const h = 220;

  // chart area
  const pad = 50;
  const left = pad;
  const top = 25;
  const right = w - pad;
  const bottom = h - 35;

  // axes
  addLine(svg, left, top, left, bottom);
  addLine(svg, left, bottom, right, bottom);

  addText(svg, left, 18, "Balance ($)", 12);
  addText(svg, right - 95, bottom + 22, "time →", 12);

  // funny data (starts okay then drops)
  const data = [120, 110, 95, 70, 60, 45, 35, 18, 10, 5];

  const maxV = 130;
  const minV = 0;

  function x(i) {
    return left + (i * (right - left)) / (data.length - 1);
  }
  function y(v) {
    const t = (v - minV) / (maxV - minV);
    return bottom - t * (bottom - top);
  }

  // grid lines
  for (let i = 0; i <= 4; i++) {
    const gy = top + (i * (bottom - top)) / 4;
    addLine(svg, left, gy, right, gy);
  }

  // path
  let d = "";
  for (let i = 0; i < data.length; i++) {
    const px = x(i);
    const py = y(data[i]);
    d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`;
  }
  addPath(svg, d, "#3a78ff", 4);

  // points
  for (let i = 0; i < data.length; i++) {
    addCircle(svg, x(i), y(data[i]), 4, "#e7eefb");
  }

  // caption
  addText(svg, left + 8, bottom - 8, "me: “this one is a lock”", 12);
}

// ---------- Metals chart ----------
function drawMetals(svg) {
  clearSVG(svg);

  const w = 900;
  const h = 260;

  const pad = 55;
  const left = pad;
  const top = 30;
  const right = w - pad;
  const bottom = h - 40;

  addLine(svg, left, top, left, bottom);
  addLine(svg, left, bottom, right, bottom);

  addText(svg, left, 18, "Price (index)", 12);
  addText(svg, right - 95, bottom + 24, "time →", 12);

  // simple “dropping” series
  const gold = [100, 98, 95, 92, 90, 88, 86, 83, 80, 78];
  const silver = [100, 97, 93, 91, 87, 84, 82, 79, 76, 73];

  const maxV = 105;
  const minV = 70;

  function x(i) {
    return left + (i * (right - left)) / (gold.length - 1);
  }
  function y(v) {
    const t = (v - minV) / (maxV - minV);
    return bottom - t * (bottom - top);
  }

  // grid
  for (let i = 0; i <= 5; i++) {
    const gy = top + (i * (bottom - top)) / 5;
    addLine(svg, left, gy, right, gy);
  }

  function pathFrom(arr) {
    let d = "";
    for (let i = 0; i < arr.length; i++) {
      const px = x(i);
      const py = y(arr[i]);
      d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`;
    }
    return d;
  }

  addPath(svg, pathFrom(gold), "#3a78ff", 4); // gold line
  addPath(svg, pathFrom(silver), "rgba(231,238,251,0.7)", 3); // silver line

  // legend
  addText(svg, left + 10, top + 15, "Gold", 12);
  addLine(svg, left + 45, top + 12, left + 85, top + 12);
  addPath(svg, `M ${left + 45} ${top + 12} L ${left + 85} ${top + 12}`, "#3a78ff", 4);

  addText(svg, left + 110, top + 15, "Silver", 12);
  addPath(
    svg,
    `M ${left + 160} ${top + 12} L ${left + 200} ${top + 12}`,
    "rgba(231,238,251,0.7)",
    3
  );
}

// ---------- Creative art ----------
function drawArt(svg) {
  clearSVG(svg);

  const w = 900;
  const h = 320;

  // background-ish circle rings
  const cx = 450;
  const cy = 160;

  for (let r = 30; r <= 140; r += 20) {
    const c = svgEl("circle");
    c.setAttribute("cx", cx);
    c.setAttribute("cy", cy);
    c.setAttribute("r", r);
    c.setAttribute("fill", "none");
    c.setAttribute("stroke", "rgba(58,120,255,0.25)");
    c.setAttribute("stroke-width", "2");
    svg.appendChild(c);
  }

  // cross lines
  addLine(svg, cx, 25, cx, h - 25);
  addLine(svg, 100, cy, w - 100, cy);

  // dots around
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 2;
    const r = 150 + (i % 3) * 10;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;

    const dot = svgEl("circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 4);
    dot.setAttribute("fill", "rgba(231,238,251,0.8)");
    svg.appendChild(dot);
  }

  
}

// run on page load
window.addEventListener("DOMContentLoaded", () => {
  const ufc = document.getElementById("ufcViz");
  const metals = document.getElementById("metalViz");
  const art = document.getElementById("artViz");

  if (ufc) drawUFC(ufc);
  if (metals) drawMetals(metals);
  if (art) drawArt(art);
});

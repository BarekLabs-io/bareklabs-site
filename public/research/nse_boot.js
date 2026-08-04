// BAREK LABS — New Space Economy: base64 chunk assembler (no external JS files)
(function () {
  const names = ["data.js","utils.js","cover.js","chart_evidence.js","chart_price.js","chart_peers.js","chart_cost.js","chart_tam.js","chart_spacex.js","chart_rklb.js","chart_asts.js","chart_catalysts.js","chart_scenarios.js","sources.js","main.js"];
  const counts = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  const pool = document.getElementById('nse-data-1').textContent;
  const chunks = pool.split('|');
  let off = 0;
  names.forEach((name, fi) => {
    const b64 = chunks.slice(off, off + counts[fi]).join(''); off += counts[fi];
    const s = document.createElement('script');
    s.text = atob(b64);
    document.body.appendChild(s);
  });
  const w = document.createElement('script');
  w.text = atob(document.getElementById('nse-data-2').textContent.trim());
  document.body.appendChild(w);
})();

// BAREK LABS — New Space Economy: sequential script loader
(function () {
  const files = [
    '/research/js/data.js', '/research/js/utils.js', '/research/js/cover.js',
    '/research/js/chart_evidence.js', '/research/js/chart_price.js', '/research/js/chart_peers.js',
    '/research/js/chart_cost.js', '/research/js/chart_tam.js', '/research/js/chart_spacex.js',
    '/research/js/chart_rklb.js', '/research/js/chart_asts.js', '/research/js/chart_catalysts.js',
    '/research/js/chart_scenarios.js', '/research/js/sources.js', '/research/js/main.js'
  ];
  let i = 0;
  (function next() {
    if (i >= files.length) return;
    const s = document.createElement('script');
    s.src = files[i++];
    s.onload = next;
    s.onerror = next;
    document.body.appendChild(s);
  })();
});

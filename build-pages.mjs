// Builds the GitHub Pages copy into ./docs (served under /cjmg-redesign, noindex).
process.env.BASE = '/cjmg-redesign';
process.env.OUT_DIR = 'docs';
process.env.NOINDEX = '1';
await import('./src/build.mjs');

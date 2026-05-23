/**
 * Paste this in the browser console on:
 * https://www.facebook.com/ONAT.BAKERY/photos
 *
 * It downloads visible bakery photos (requires page loaded, login optional for preview).
 * Move downloaded files to: images/facebook/fb-{id}.jpg
 */
(async () => {
  const seen = new Set();
  const imgs = [...document.querySelectorAll('img[src*="scontent"]')];

  for (const img of imgs) {
    const m = img.src.match(/\/(\d+)_(\d+)_\d+_n\.jpg/);
    if (!m) continue;
    const id = m[2];
    if (seen.has(id) || id.length < 10) continue;
    seen.add(id);

    try {
      const res = await fetch(img.src);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `onat-fb-${id}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      console.log('Downloaded', id);
      await new Promise((r) => setTimeout(r, 400));
    } catch (e) {
      console.warn('Skip', id, e);
    }
  }

  console.log(`Done — ${seen.size} files. Place them in images/facebook/ as fb-{id}.jpg`);
})();

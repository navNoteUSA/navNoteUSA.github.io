// Anti-scraping and anti-duplication measures
export const initializeAntiScraping = () => {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable keyboard shortcuts for copying
  document.addEventListener('keydown', (e) => {
    if (
      (e.ctrlKey || e.metaKey) && 
      (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')
    ) {
      e.preventDefault();
    }
  });

  // Add invisible watermark
  const addWatermark = () => {
    const watermark = document.createElement('div');
    watermark.style.position = 'fixed';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.pointerEvents = 'none';
    watermark.style.opacity = '0.003';
    watermark.style.zIndex = '9999';
    watermark.innerHTML = `navNote Official ${new Date().toISOString()}`;
    document.body.appendChild(watermark);
  };

  // Check if the site is loaded in an iframe
  if (window.self !== window.top) {
    window.top.location.href = window.self.location.href;
  }

  // Add random invisible elements to confuse scrapers
  const addHoneypots = () => {
    const honeypot = document.createElement('div');
    honeypot.style.display = 'none';
    honeypot.innerHTML = `<a href="#" class="do-not-scrape">Protected Content</a>`;
    document.body.appendChild(honeypot);
  };

  // Monitor for DOM mutations that might indicate scraping
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 50) {
        console.warn('Potential scraping detected');
        // You can add additional protection measures here
      }
    });
  });

  // Start monitoring
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initialize protections
  addWatermark();
  addHoneypots();
  
  // Add dynamic content changes
  setInterval(() => {
    // Regularly update invisible elements to make caching harder
    document.querySelectorAll('.do-not-scrape').forEach(el => {
      el.setAttribute('data-timestamp', Date.now().toString());
    });
  }, 30000);
}; 
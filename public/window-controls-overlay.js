// navNote PWA Window Controls Overlay for desktop Chrome
if ('windowControlsOverlay' in navigator) {
  // Check if the Window Controls Overlay feature is available
  if (navigator.windowControlsOverlay.visible) {
    // The Window Controls Overlay is visible
    const wcoRect = navigator.windowControlsOverlay.getTitlebarAreaRect();
    console.log(`The Window Controls Overlay height is ${wcoRect.height}px`);
    console.log(`The Window Controls Overlay width is ${wcoRect.width}px`);
    console.log(`The Window Controls Overlay x position is ${wcoRect.x}px`);
    console.log(`The Window Controls Overlay y position is ${wcoRect.y}px`);
    
    // Apply custom styles to make use of the title bar area
    document.documentElement.style.setProperty('--wco-height', `${wcoRect.height}px`);
    document.documentElement.style.setProperty('--wco-width', `${wcoRect.width}px`);
    
    // Add a task counter in the title bar area
    const titleBarElement = document.createElement('div');
    titleBarElement.classList.add('nav-title-bar');
    titleBarElement.innerHTML = `
      <img src="/navNote_logo.jpeg" alt="navNote Logo" class="nav-logo">
      <span class="nav-task-counter">5 tasks today</span>
    `;
    document.body.appendChild(titleBarElement);
  }
  
  // Listen for changes to the Window Controls Overlay visibility
  navigator.windowControlsOverlay.addEventListener('geometrychange', (event) => {
    const isVisible = event.visible;
    const wcoRect = event.titlebarAreaRect;
    
    if (isVisible) {
      console.log('Window Controls Overlay is now visible');
      // Update styles when the overlay becomes visible
      document.documentElement.style.setProperty('--wco-height', `${wcoRect.height}px`);
      document.documentElement.style.setProperty('--wco-width', `${wcoRect.width}px`);
      
      // Show the title bar content
      document.querySelector('.nav-title-bar').style.display = 'flex';
    } else {
      console.log('Window Controls Overlay is now hidden');
      // Hide the title bar content
      document.querySelector('.nav-title-bar').style.display = 'none';
    }
  });
}

// Add styles for the title bar area
const style = document.createElement('style');
style.textContent = `
  .nav-title-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: var(--wco-height, 33px);
    width: var(--wco-width, 100%);
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    z-index: 9999;
    app-region: drag;
  }
  
  .nav-logo {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 10px;
    app-region: no-drag;
  }
  
  .nav-task-counter {
    font-weight: bold;
    app-region: no-drag;
    cursor: pointer;
  }
  
  .nav-task-counter:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style); 
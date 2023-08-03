const butInstall = document.getElementById('buttonInstall');

// Keeps a reference to the deferred prompt
let deferredPrompt = null;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    deferredPrompt = event;
    butInstall.classList.remove('hidden'); // Shows the install button
});

butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  try {
    // Shows the install prompt
    await deferredPrompt.prompt();
    deferredPrompt = null;
    butInstall.classList.add('hidden'); // Hides the install button
  } catch (error) {
    console.error('Install prompt failed:', error);
  }
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
});

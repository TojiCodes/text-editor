const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
console.log('👍', 'beforeinstallprompt', event);

  // Prevents the mini-infobar from appearing on mobile
event.preventDefault();

  // Stashes the event so it can be triggered later
deferredPrompt = event;

  // Updates UI notify the user they can install the PWA
butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
console.log('👍', 'butInstall-clicked');

  // Hides the install button
butInstall.style.display = "none";

  // Shows the install prompt
if (deferredPrompt) {
    deferredPrompt.prompt();

    // Waits for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    deferredPrompt = null;
}
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
console.log('👍', 'appinstalled', event);
  // Clears the deferredPrompt variable, since it's no longer needed
deferredPrompt = null;
});

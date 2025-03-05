let isPaused = false;

function switchWord(element) {
  if (isPaused) return; // Stop word change if paused

  const options = element.dataset.options.split(", ");
  let currentIndex = options.indexOf(element.textContent);
  let nextIndex = (currentIndex + 1) % options.length;

  element.classList.add("fading"); // Start the fade effect

  setTimeout(() => {
    element.textContent = options[nextIndex]; // Change word at the peak of the fade
  }, 1500); // Change happens halfway through the fade-out

  setTimeout(() => {
    element.classList.remove("fading"); // Remove animation after full cycle
  }, 3000);
}

const changingWords = document.querySelectorAll(".changing");

// Start everything exactly 1 second after page load
setTimeout(() => {
  changingWords.forEach((element) => {
    switchWord(element); // First switch happens immediately after 1 sec

    let interval = setInterval(
      () => switchWord(element),
      Math.random() * 5000 + 8000 // Random interval between 8-13 sec
    );

    element.dataset.intervalId = interval;
  });
}, 1000); // Initial delay of exactly 1 second

// Pause animation on hover
document.querySelector(".poem").addEventListener("mouseenter", () => {
  isPaused = true;
});

document.querySelector(".poem").addEventListener("mouseleave", () => {
  isPaused = false;
});

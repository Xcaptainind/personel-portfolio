document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor functionality
  const cursor = document.querySelector(".custom-cursor");
  let mouseX = 0,
    mouseY = 0;
  let posX = 0,
    posY = 0;
  const delay = 0.15; // Adjust for trailing effect

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    posX += (mouseX - posX) * delay;
    posY += (mouseY - posY) * delay;
    cursor.style.left = posX + "px";
    cursor.style.top = posY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects for interactive elements
  document.querySelectorAll("a, button, input[type='submit']").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
      cursor.style.borderColor = "var(--hover-border-color)";
      cursor.style.backgroundColor = "var(--hover-bg-color)";
    });
    elem.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.borderColor = "var(--link-color)";
      cursor.style.backgroundColor = "transparent";
    });
  });

  // Typing text effect
  const typingElement = document.getElementById("typing");
  const texts = [
    " Innovative Problem Solver",
    "Tech Enthusiast",
    " Developer",
    "Passionate Learner",
    "Team Player",
    "Creative Thinker",
    "IT and Cyber Security Enthusiast"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 180;
  const erasingSpeed = 120;
  const newTextDelay = 1900;

  function type() {
    const currentText = texts[textIndex];
    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, newTextDelay);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, erasingSpeed);
      }
    }
  }
  type();

  // Form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    }
  });

  // Update footer year dynamically
  document.getElementById("year").textContent = new Date().getFullYear();
});

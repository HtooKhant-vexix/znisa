// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");
let isMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    navMenu.classList.add("open");
    // Animate menu button
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    navMenu.classList.remove("open");
    // Reset menu button
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (isMenuOpen) {
        mobileMenuBtn.click();
      }
    }
  });
});

// Active Navigation Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// Parallax Effect for Hero Stars
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, index) => {
    const speed = (index + 1) * 0.5;
    star.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".process-step, .project-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Button Click Effects
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Hire Me Button Actions
document.querySelectorAll(".btn-hire").forEach((button) => {
  button.addEventListener("click", () => {
    // Scroll to contact section
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Contact Button Action
document.querySelector(".btn-contact").addEventListener("click", () => {
  // Here you can add actual contact form functionality
  alert(
    "Contact form would open here. You can integrate with your preferred form service."
  );
});

// Project Card Hover Effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Testimonial Card Animations
document.querySelectorAll(".testimonial-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Tool Icons Hover Effects
document.querySelectorAll(".tool-item").forEach((tool) => {
  tool.addEventListener("mouseenter", () => {
    tool.style.transform = "translateY(-5px)";
  });

  tool.addEventListener("mouseleave", () => {
    tool.style.transform = "translateY(0)";
  });
});

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animations
  document.body.style.opacity = "1";

  // Start any initial animations
  updateActiveLink();
});

// Resize handler for responsive adjustments
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    mobileMenuBtn.click(); // Close mobile menu on desktop
  }
});

// Auto-slide hero tools on mobile
function autoSlideHeroTools() {
  const tools = document.querySelector(".hero-tools");
  if (!tools) return;
  let intervalId = tools._autoSlideIntervalId;
  if (intervalId) {
    clearInterval(intervalId);
    tools._autoSlideIntervalId = null;
  }
  if (window.innerWidth > 700) return;
  let scrollAmount = 0;
  const maxScroll = tools.scrollWidth - tools.clientWidth;
  tools._autoSlideIntervalId = setInterval(() => {
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    } else {
      scrollAmount += 120;
      if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    }
    tools.scrollTo({ left: scrollAmount, behavior: "smooth" });
  }, 2000);
}
window.addEventListener("load", autoSlideHeroTools);
window.addEventListener("resize", autoSlideHeroTools);

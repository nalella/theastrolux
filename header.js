// Toggle mobile nav
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // Swap icon
      if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✖"; // X
      } else {
        menuBtn.textContent = "☰"; // Hamburger
      }
    });
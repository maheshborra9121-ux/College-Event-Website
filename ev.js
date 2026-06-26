
  // Sidebar toggle functionality
  const toggleButton = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');

  function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    closeAllSubMenus(); // Close any open submenus when the sidebar is toggled
  }

  // Toggle sub-menu visibility
  function toggleSubMenu(button) {
    // If the submenu isn't already open, close all submenus
    if (!button.nextElementSibling.classList.contains('show')) {
      closeAllSubMenus();
    }

    // Toggle submenu visibility and button rotation
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    // If the sidebar is closed, open it
    if (sidebar.classList.contains('close')) {
      sidebar.classList.toggle('close');
      toggleButton.classList.toggle('rotate');
    }
  }

  // Close all submenus
  function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
      ul.classList.remove('show');
      ul.previousElementSibling.classList.remove('rotate');
    });
  }

  // Carousel elements
  const nextBtn = document.querySelector('.next'),
        prevBtn = document.querySelector('.prev'),
        carousel = document.querySelector('.carousel'),
        list = document.querySelector('.list'),
        runningTime = document.querySelector('.carousel .timeRunning');

  let timeRunning = 3000;
  let timeAutoNext = 4000;

  let runTimeOut;
  let runNextAuto;

  // Event listeners for carousel navigation
  if (nextBtn && prevBtn) {
    nextBtn.onclick = function() {
      showSlider('next');
    };

    prevBtn.onclick = function() {
      showSlider('prev');
    };
  }

  // Automatically trigger the "next" button after a delay
  runNextAuto = setTimeout(() => {
    if (nextBtn) nextBtn.click();
  }, timeAutoNext);

  // Function to reset the running time animation
  function resetTimeAnimation() {
    if (runningTime) {
      runningTime.style.animation = 'none'; // Reset the animation
      runningTime.offsetHeight; // Trigger reflow to reset animation
      runningTime.style.animation = null; // Remove animation
      runningTime.style.animation = 'runningTime 7s linear 1 forwards'; // Reapply animation
    }
  }

  // Function to show the next or previous slider item
  function showSlider(type) {
    const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
      list.appendChild(sliderItemsDom[0]); // Move the first item to the end
      carousel.classList.add('next');
    } else {
      list.prepend(sliderItemsDom[sliderItemsDom.length - 1]); // Move the last item to the start
      carousel.classList.add('prev');
    }

    // Clear the existing timeout for animation reset and carousel transition
    clearTimeout(runTimeOut);

    // Reset carousel transition state after the timeRunning delay
    runTimeOut = setTimeout(() => {
      carousel.classList.remove('next');
      carousel.classList.remove('prev');
    }, timeRunning);

    // Reset the auto-next timeout
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      if (nextBtn) nextBtn.click();
    }, timeAutoNext);

    // Reset the running time animation
    resetTimeAnimation();
  }

  // Start the initial animation on page load
  resetTimeAnimation();

  // Menu button toggle logic for navigation
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn ? menuBtn.querySelector("i") : null;

  if (menuBtn && navLinks && menuBtnIcon) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  }

  // ScrollReveal animation configuration
  const scrollRevealOption = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  };

  // Applying ScrollReveal animations to various elements
  ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
  ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });

  ScrollReveal().reveal(".destination__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".showcase__image img", { ...scrollRevealOption, origin: "left" });
  ScrollReveal().reveal(".showcase__content h4", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".showcase__content p", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".showcase__btn", { ...scrollRevealOption, delay: 1500 });

  ScrollReveal().reveal(".banner__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".discover__card", { ...scrollRevealOption, interval: 500 });

  // Swiper initialization for carousel/slider
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
  });

  // Toggle messages submenu
  document.getElementById('messages-toggle').addEventListener('click', function() {
    const submenu = document.querySelector('.message-submenu');
    submenu.classList.toggle('active');
  });

  // Toggle chatbot
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbot = document.getElementById('chatbot');

  chatbotIcon.addEventListener('click', function() {
    chatbot.classList.toggle('active');
  });

  // Chatbot response handling
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotBody = document.getElementById('chatbot-body');

  chatbotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('chatbot-query').value;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.textContent = query;
    chatbotBody.appendChild(userMessage);

    // Clear input
    document.getElementById('chatbot-query').value = '';

    // Simulate bot response
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.className = 'chat-message bot-message';
      botMessage.textContent = getBotResponse(query);
      chatbotBody.appendChild(botMessage);

      // Scroll to bottom
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 500);
  });

  // Simple bot response logic
  function getBotResponse(query) {
    query = query.toLowerCase();

    if (query.includes('college') && query.includes('info')) {
      return "ABC College of Engineering was established in 1995 and is known for excellence in technical education.";
    }
    else if (query.includes('staff')) {
      return "We have 120 teaching staff members across various departments. For specific faculty information, please check the staff directory.";
    }
    else if (query.includes('subject') || query.includes('course')) {
      return "Our college offers various subjects across Engineering, Computer Science, and Business departments. Please specify a department for more details.";
    }
    else if (query.includes('event')) {
      return "Upcoming events include Tech Symposium on April 15, 2025 and Cultural Fest on May 10, 2025.";
    }
    else if (query.includes('holiday') || query.includes('vacation')) {
      return "The summer break begins on June 15, 2025. For a complete list of holidays, please check the academic calendar.";
    }
    else {
      return "I'm your college assistant bot. You can ask me about college information, staff, courses, events, and holidays.";
    }
  }

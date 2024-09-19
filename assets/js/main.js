(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Form submission handling with AJAX
   */
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var data = new FormData(form);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfX0jRgPOMuQxqi8_RlpWY9nNwoEJFl1p9JfUkne7lVkVSaPQ/formResponse', {
        method: 'POST',
        body: data,
        mode: 'no-cors'
    }).then(function() {
        // Show a success message
        document.getElementById('form-message').textContent = 'Your message has been sent. Thank you!';
        document.getElementById('form-message').style.color = 'green';
        // Reset the form fields
        form.reset();
    }).catch(function(error) {
        // Show an error message
        document.getElementById('form-message').textContent = 'There was a problem sending your message. Please try again.';
        document.getElementById('form-message').style.color = 'red';
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const portfolioItems = [
      { id: 1, title: "SoapUI Integration", category: "Integration", date: "Aug. 2023", imageUrl: "assets/img/portfolio/soapApi.png", url: "https://github.com/Khalid-Galal/SoapUI-Integration-for-Phone-Number-Validation-and-SMS-Sending" },
      { id: 2, title: "OCR Invoice Analyst", category: "Automation", date: "Jul. 2021", imageUrl: "assets/img/portfolio/rpa.jpg", url: "https://github.com/Khalid-Galal/OCR-Invoice-Analyst" },
      { id: 3, title: "Student System", category: "Backend Development", date: "15 Dec. 2020", imageUrl: "assets/img/portfolio/Student.jpg", url: "https://github.com/Khalid-Galal/student-management-system" },
      { id: 4, title: "N Puzzle game", category: "Algorithms", date: "Sep. 2020", imageUrl: "assets/img/portfolio/algo.jpg", url: "https://github.com/Khalid-Galal/N-Puzzle-game" },
      { id: 5, title: "House Pricing Detection", category: "Analytics", date: "Oct. 2022", imageUrl: "assets/img/portfolio/house.jpg", url: "https://github.com/Khalid-Galal/Predicting-Housing-Price" },
      { id: 6, title: "Black Jack game", category: "Java Development", date: "Jul. 2019", imageUrl: "assets/img/portfolio/card.jpg", url: "https://github.com/Khalid-Galal/Black-jack-Game" },

        // Add more items as needed
    ];

    const container = document.getElementById("portfolioContainer");
    container.innerHTML = ''; // Clear the container before populating

    portfolioItems.forEach(item => {
        container.innerHTML += `
        <div class="col-md-4 mb-5">
          <a href="${item.url}" target="_blank" style="text-decoration: none; color: inherit;">
            <div class="PORTFOLIO-content bg-white">
                    <div class="hover01 column">
                        <div>
                            <figure><img src="${item.imageUrl}" alt="Portfolio Image ${item.id}"></figure>
                        </div>
                    </div>
                <div class="modal fade" id="exampleModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel${item.id}" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img class="img-fluid" src="${item.imageUrl}" alt="Detailed Image ${item.id}">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Updated part -->
                <div class="d-flex flex-column align-items-start w-100 p-3" style="padding-bottom: 15px;">
                    <h3 class="mb-2" style="font-size: 19px;">
                        <a href="${item.url}" target="_blank" style="text-decoration: none; color: inherit;">
                            ${item.title}
                        </a>
                    </h3>
                    <h3 style="font-size: 13px; color: #4e4e4e; margin-bottom: 10px;">
                        <span style="color: blue;">${item.category}</span> / ${item.date}
                    </h3>
                </div>
            </div>
          </a>

        </div>
                `;
    });
});

})();

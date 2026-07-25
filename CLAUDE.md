# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML portfolio website for a backend developer (Khaled Galal). Built on the Bootstrap 5 "DevFolio" template with vanilla JavaScript. No build system, no frameworks, no package manager — just static files served directly.

## Development

There are no build or test commands. To run locally, serve the files with any static HTTP server on port 8080 (VS Code launch config expects `localhost:8080`).

## Architecture

**Pages:** 5 standalone HTML files at the root — `index.html` (main landing), `resume.html`, `portfolio-details.html`, `service-details.html`, `starter-page.html`. Each page duplicates the header/footer markup; there is no templating system.

**JavaScript (`assets/js/main.js`):** Single IIFE that initializes all interactivity on DOM load. Key sections:
- Lines 267–366: Portfolio data array (6 projects) rendered dynamically into the DOM
- Lines 245–266: Contact form submission via Google Forms AJAX (`mode: 'no-cors'`)
- Scroll-based features: sticky header, scrollspy, smooth scrolling, scroll-to-top button
- Library initialization: AOS animations, Typed.js hero text, PureCounter, GLightbox, Swiper, Isotope, Waypoint-triggered skill bars

**Styles (`assets/css/main.css`):** ~1,579 lines. Uses CSS custom properties for theming — primary accent is `#0078ff`, fonts are Roboto/Raleway/Poppins. Responsive via Bootstrap grid.

**Vendor libraries (`assets/vendor/`):** All committed to the repo (not npm-managed). Includes AOS, Bootstrap 5, GLightbox, Isotope, PureCounter, Swiper, Typed.js, Waypoints, and others. Total ~10MB.

## Key Conventions

- To add/edit portfolio projects, modify the JavaScript array in `assets/js/main.js` (around line 267) and add corresponding images to `assets/img/portfolio/`.
- Contact form fields map to specific Google Form entry IDs — changing form fields requires updating both the HTML and the Google Form entry mapping in `main.js`.
- External CDN dependencies: Google Fonts (preconnect) and Font Awesome 5.15.4.
- CV PDF lives at `assets/cv/Khaled_Galal_Yehia_Software_Engineer_CV.pdf`.

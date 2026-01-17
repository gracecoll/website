/**
 * Grace Coll Portfolio - Main JavaScript
 * Handles navigation, animations, filtering, and interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initSkillAnimations();
    initContactForm();
    initModal();
    initSmoothScroll();
    setCurrentYear();
    initFadeAnimations();
});

/**
 * Navigation functionality
 * - Mobile menu toggle
 * - Active link highlighting
 * - Scroll-based header styling
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded',
                navToggle.classList.contains('active'));
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update last scroll position
        lastScroll = currentScroll;
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * Scroll reveal effects
 * - Reveals elements as they enter the viewport with float animations
 */
function initScrollEffects() {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(`
        .section__header,
        .portfolio__filters,
        .portfolio__card,
        .about__text,
        .about__recognition,
        .about__timeline,
        .about__skills,
        .about__credentials,
        .timeline__item,
        .skills__category,
        .credential,
        .contact__info,
        .contact__form,
        .contact__item,
        .form__group,
        .float-in,
        .float-in-left,
        .float-in-right,
        .float-in-scale
    `);

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Portfolio filter functionality
 * - Filters portfolio cards by category
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio__card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            // Filter cards
            portfolioCards.forEach(card => {
                const category = card.dataset.category;

                // Add filtering animation class
                card.classList.add('filtering');

                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                    card.classList.remove('filtering');
                }, 200);
            });
        });
    });
}

/**
 * Skill bar animations
 * - Animates skill progress bars when in view
 */
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill__progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = `${progress}%`;
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Contact form handling
 * - Validates and submits the contact form
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = new FormData(form);

        try {
            // For demo purposes, simulate form submission
            // In production, uncomment the fetch call and use your form endpoint

            /*
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormMessage('success', 'Thank you! Your message has been sent.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
            */

            // Simulated success (remove in production)
            await new Promise(resolve => setTimeout(resolve, 1500));
            showFormMessage('success', 'Thank you! Your message has been sent.');
            form.reset();

        } catch (error) {
            showFormMessage('error', 'Oops! Something went wrong. Please try again.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Show form submission message
 */
function showFormMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.innerHTML = message;
    messageElement.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
        animation: fadeIn 0.3s ease;
        ${type === 'success'
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

    // Insert after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

/**
 * Modal functionality
 * - Opens and closes project detail modals
 */
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = modal?.querySelector('.modal__close');
    const overlay = modal?.querySelector('.modal__overlay');
    const projectButtons = document.querySelectorAll('[data-project]');

    // Project data (can be expanded or loaded from external source)
    const projectData = {
        1: {
            title: 'Mobile App Redesign',
            category: 'UX Design',
            image: 'assets/projects/ux-project-1.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>A comprehensive mobile app redesign project completed as part of the Google UX Design Certificate program. The project focused on creating an accessible, user-centered design for a food ordering application.</p>

                <h3>My Role</h3>
                <p>Lead UX Designer responsible for user research, wireframing, prototyping, and usability testing.</p>

                <h3>Process</h3>
                <ul>
                    <li>Conducted user interviews and created personas</li>
                    <li>Developed user journey maps and information architecture</li>
                    <li>Created low and high-fidelity wireframes in Figma</li>
                    <li>Built interactive prototypes for usability testing</li>
                    <li>Iterated based on user feedback</li>
                </ul>

                <h3>Outcomes</h3>
                <p>The redesigned app achieved a 40% improvement in task completion rates during usability testing and received positive feedback for its accessibility features.</p>
            `,
            tags: ['Figma', 'User Research', 'Prototyping', 'Accessibility']
        },
        2: {
            title: 'Bay Cove Learning Database',
            category: 'Instructional Design',
            image: 'assets/projects/instructional-1.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>Designed and implemented a comprehensive learning management database for Bay Cove Human Services to streamline employee training and professional development tracking.</p>

                <h3>Challenge</h3>
                <p>The organization needed a centralized system to track employee training completions, certifications, and professional development across multiple departments.</p>

                <h3>Solution</h3>
                <ul>
                    <li>Conducted needs assessment with stakeholders</li>
                    <li>Designed database architecture and user workflows</li>
                    <li>Created intuitive interface for administrators and employees</li>
                    <li>Implemented automated tracking and reporting features</li>
                </ul>

                <h3>Impact</h3>
                <p>The new system reduced administrative time for training tracking by 60% and improved compliance documentation accuracy.</p>
            `,
            tags: ['LMS Design', 'Training', 'Database', 'Workflow Design']
        },
        3: {
            title: 'Mentorship Program',
            category: 'Instructional Design',
            image: 'assets/projects/instructional-2.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>Developed a structured mentorship program with comprehensive curriculum design, training materials, and assessment frameworks to support new employee onboarding and professional growth.</p>

                <h3>Components</h3>
                <ul>
                    <li>Mentorship curriculum and guidelines</li>
                    <li>Training materials for mentors</li>
                    <li>Progress tracking tools</li>
                    <li>Assessment and feedback frameworks</li>
                </ul>

                <h3>Results</h3>
                <p>The program increased new employee retention by 25% and received high satisfaction ratings from both mentors and mentees.</p>
            `,
            tags: ['Curriculum Design', 'Mentorship', 'Assessment', 'Training']
        },
        4: {
            title: 'Responsive Web Design',
            category: 'UX Design',
            image: 'assets/projects/ux-project-2.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>A responsive web design project demonstrating mobile-first design principles and cross-platform consistency for a nonprofit organization's website.</p>

                <h3>Approach</h3>
                <ul>
                    <li>Mobile-first design methodology</li>
                    <li>Cross-browser compatibility testing</li>
                    <li>Performance optimization</li>
                    <li>Accessibility compliance (WCAG 2.1)</li>
                </ul>
            `,
            tags: ['Responsive Design', 'Web Design', 'Adobe XD', 'CSS']
        },
        5: {
            title: 'Digital Wellbeing Research',
            category: 'Tech Ethics',
            image: 'assets/projects/ethics-1.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>Research and editorial work exploring the intersection of technology, mental health, and ethical design practices. This includes freelance editing work for Jonathan Haidt on topics related to digital wellbeing.</p>

                <h3>Focus Areas</h3>
                <ul>
                    <li>Impact of social media on mental health</li>
                    <li>Ethical design patterns vs. dark patterns</li>
                    <li>Digital wellbeing frameworks</li>
                    <li>Youth and technology use</li>
                </ul>

                <h3>Recognition</h3>
                <p>Recognized as a "super-editor" by Jonathan Haidt for editorial contributions to his work on technology and mental health.</p>
            `,
            tags: ['Research', 'Writing', 'Ethics', 'Mental Health']
        },
        6: {
            title: 'User Research Case Study',
            category: 'UX Design',
            image: 'assets/projects/ux-project-3.jpg',
            description: `
                <h3>Project Overview</h3>
                <p>A comprehensive user research project including interviews, surveys, persona development, and journey mapping for a healthcare technology application.</p>

                <h3>Methodology</h3>
                <ul>
                    <li>Stakeholder interviews</li>
                    <li>User surveys (n=150+)</li>
                    <li>Contextual inquiry</li>
                    <li>Affinity mapping and synthesis</li>
                </ul>

                <h3>Deliverables</h3>
                <ul>
                    <li>User personas (3 primary, 2 secondary)</li>
                    <li>Customer journey maps</li>
                    <li>Research insights report</li>
                    <li>Design recommendations</li>
                </ul>
            `,
            tags: ['User Research', 'Personas', 'Journey Maps', 'Analysis']
        }
    };

    if (!modal) return;

    // Open modal
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.dataset.project;
            const project = projectData[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <div class="modal__project">
                        <div class="modal__project-image">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="modal__project-content">
                            <span class="modal__project-category">${project.category}</span>
                            <h2 class="modal__project-title" id="modal-title">${project.title}</h2>
                            <div class="modal__project-description">
                                ${project.description}
                            </div>
                            <div class="modal__project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;

                // Add modal styles
                addModalStyles();

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                closeButton.focus();
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButton?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Add dynamic modal styles
 */
function addModalStyles() {
    if (document.getElementById('modal-dynamic-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'modal-dynamic-styles';
    styles.textContent = `
        .modal__project {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .modal__project-image {
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
        }

        .modal__project-image img {
            width: 100%;
            height: auto;
        }

        .modal__project-category {
            display: inline-block;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--color-primary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }

        .modal__project-title {
            font-family: var(--font-heading);
            font-size: 2rem;
            color: var(--color-text);
            margin-bottom: 1.5rem;
        }

        .modal__project-description {
            color: var(--color-text-light);
            line-height: 1.7;
        }

        .modal__project-description h3 {
            font-size: 1.1rem;
            color: var(--color-text);
            margin: 1.5rem 0 0.75rem;
        }

        .modal__project-description h3:first-child {
            margin-top: 0;
        }

        .modal__project-description p {
            margin-bottom: 1rem;
        }

        .modal__project-description ul {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
        }

        .modal__project-description li {
            margin-bottom: 0.5rem;
            list-style-type: disc;
        }

        .modal__project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
        }
    `;
    document.head.appendChild(styles);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize fade-in animations on page load
 */
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    // Trigger animations after a brief delay
    setTimeout(() => {
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
}

/**
 * Utility: Debounce function for scroll events
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function for resize events
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

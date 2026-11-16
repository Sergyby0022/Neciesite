document.addEventListener('DOMContentLoaded', function () {

    /* ===== MENU MOBILE ===== */
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Ferme le menu mobile après un clic sur un lien
        mainNav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    /* ===== LIEN DE NAVIGATION ACTIF AU DÉFILEMENT ===== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let currentId = sections[0] ? sections[0].id : '';
        const scrollPos = window.scrollY + 120; // décalage pour le header fixe

        sections.forEach(function (section) {
            if (scrollPos >= section.offsetTop) {
                currentId = section.id;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

    /* ===== ANIMATIONS AU DÉFILEMENT (reveal) ===== */
    const revealTargets = document.querySelectorAll(
        '.service-card, .pays-card, .step, .tarif-card, .contact-form, .contact-info-item'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(function (el) { observer.observe(el); });
    } else {
        // Repli si IntersectionObserver n'est pas supporté
        revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ===== FORMULAIRE DE CONTACT ===== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Zone de statut injectée sous le formulaire
        const statusEl = document.createElement('div');
        statusEl.className = 'form-status';
        statusEl.setAttribute('role', 'status');
        contactForm.appendChild(statusEl);

        function showStatus(message, type) {
            statusEl.textContent = message;
            statusEl.className = 'form-status visible ' + type;
        }

        contactForm.addEventListener('submit', function (event) {
            // Validation native HTML5 (required, type=email, etc.)
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                showStatus('Merci de compléter tous les champs obligatoires avant l\'envoi.', 'error');
                contactForm.reportValidity();
                return;
            }

            // Le formulaire utilise action="mailto:" : le navigateur ouvre
            // le client de messagerie. On informe l'utilisateur de l'étape suivante.
            showStatus(
                'Votre messagerie va s\'ouvrir avec votre demande pré-remplie. Cliquez sur "Envoyer" dans votre client mail pour finaliser.',
                'success'
            );
        });
    }

    /* ===== ACCORDÉON FAQ ===== */
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {
        faqItems.forEach(function (item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            question.addEventListener('click', function () {
                const isOpen = item.classList.contains('is-open');

                // Ferme les autres items ouverts (accordéon exclusif)
                faqItems.forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('is-open');
                        other.querySelector('.faq-answer').style.maxHeight = null;
                        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                if (isOpen) {
                    item.classList.remove('is-open');
                    answer.style.maxHeight = null;
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('is-open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ===== EFFET HEADER AU DÉFILEMENT (ombre renforcée) ===== */
    const header = document.querySelector('.header');
    function updateHeaderShadow() {
        if (!header) return;
        header.style.boxShadow = window.scrollY > 20
            ? '0 4px 24px rgba(0, 0, 0, 0.25)'
            : '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    updateHeaderShadow();

});

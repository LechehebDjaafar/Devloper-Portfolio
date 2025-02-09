document.addEventListener('DOMContentLoaded', function () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("showItems")
                } else {
                    entry.target.classList.remove("showItems")
                }
            })
        })
    
        const scrollScale = document.querySelectorAll(".scrollScale")
        scrollScale.forEach((el) => observer.observe(el))

    // Select form and feedback elements
const form = document.querySelector('.contactForm');
const feedbackDiv = document.getElementById('feedback');

// Form validation function
const validateContactForm = (email, message) => {
    let errors = [];
    if (!email) {
        errors.push('Email is required');
        document.querySelector('input[name="email"]').parentElement.classList.add('incorrect');
    } else {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            errors.push('Please enter a valid email address');
            document.querySelector('input[name="email"]').parentElement.classList.add('incorrect');
        }
    }
    if (!message) {
        errors.push('Message is required');
        document.querySelector('textarea[name="message"]').parentElement.classList.add('incorrect');
    } else if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
        document.querySelector('textarea[name="message"]').parentElement.classList.add('incorrect');
    }
    return errors;
};

// Handle form submission
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Validate form
        const errors = validateContactForm(email, message);
        if (errors.length === 0) {
            // Display sending message
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.color = 'black';
            feedbackDiv.innerHTML = 'Sending your message...';

            // Send data using fetch
            fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form),
            })
                .then(response => {
                    if (response.ok) {
                        // Success response
                        feedbackDiv.innerHTML = 'Your message has been sent successfully!';
                        feedbackDiv.style.color = 'green';
                        form.reset(); // Clear the form after submission
                    } else {
                        // Failure response
                        feedbackDiv.innerHTML = 'There was an issue sending your message.';
                        feedbackDiv.style.color = 'red';
                    }
                })
                .catch(() => {
                    // Network or other errors
                    feedbackDiv.innerHTML = 'There was an issue sending your message.';
                    feedbackDiv.style.color = 'red';
                });
        } else {
            // Display validation errors
            feedbackDiv.innerHTML = errors.join('<br>');
            feedbackDiv.style.color = 'red';
            feedbackDiv.style.display = 'block';
        }
    });
}


    // Theme toggle
    const lightIcon = document.querySelector('.theme span:nth-child(1)')
    const darkIcon = document.querySelector('.theme span:nth-child(2)')
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme')
        lightIcon.classList.toggle('active')
        darkIcon.classList.toggle('active')
    }
    if (lightIcon && darkIcon) {
        lightIcon.addEventListener('click', toggleTheme)
        darkIcon.addEventListener('click', toggleTheme)
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger')
    const links = document.querySelector('.links')
    hamburger.addEventListener('click', () => {
        links.classList.toggle('active')
        hamburger.classList.toggle('active')
    })

    // Smooth scrolling for navigation links
    const linksItems = document.querySelectorAll('.links a')
    linksItems.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            document.querySelectorAll('.links li').forEach(item => item.classList.remove('active'))
            link.querySelector('li').classList.add('active')
            const targetId = link.getAttribute('href').substring(1)
            const targetSection = document.getElementById(targetId)
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                })
            }
        })
    })

    // IntersectionObserver for active link highlighting
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id
                const link = document.querySelector(`.links a[href="#${sectionId}"]`)
                document.querySelectorAll('.links li').forEach(item => item.classList.remove('active'))
                if (link) {
                    link.querySelector('li').classList.add('active')
                }
            }
        })
    }, { threshold: 0.5 })

    const sections = document.querySelectorAll('section')
    sections.forEach(section => sectionObserver.observe(section))

    // Category filtering for projects
    const categoryItems = document.querySelectorAll('.categories ul li')
    const projectCards = document.querySelectorAll('.cards .card')
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(category => category.classList.remove('active'))
            item.classList.add('active')
            const category = item.textContent.trim()
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category')
                card.style.display = (category === 'All' || cardCategory === category) ? 'block' : 'none'
            })
        })
    })

    // Default view
    categoryItems[0].classList.add('active')
    projectCards.forEach(card => card.style.display = 'block')
})

document.addEventListener('DOMContentLoaded', function() {
    // Set welcome message with name from URL parameter or default
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Harfi';
    document.getElementById('welcome-message').textContent = `Hi ${name}, Welcome To Our Website`;

    // Form validation and submission
    const messageForm = document.getElementById('messageForm');
    const submittedData = document.getElementById('submittedData');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        
        if (name === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        if (email === '') {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (phone === '') {
            document.getElementById('phone-error').textContent = 'Phone number is required';
            isValid = false;
        } else if (!/^[0-9+]+$/.test(phone)) {
            document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        if (message === '') {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            // Display submitted data
            const now = new Date();
            document.getElementById('current-time').textContent = `Current time: ${now.toLocaleString()}`;
            document.getElementById('display-name').textContent = name;
            document.getElementById('display-email').textContent = email;
            document.getElementById('display-phone').textContent = phone;
            document.getElementById('display-gender').textContent = gender;
            document.getElementById('display-message').textContent = message;
            
            submittedData.style.display = 'block';
            
            // Scroll to submitted data
            submittedData.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form
            messageForm.reset();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } else if (currentSection === '' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    });
});
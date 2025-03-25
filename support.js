// Support Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Toggle show class on answer
            answer.classList.toggle('show');
            
            // Update the plus/minus icon
            const icon = this.querySelector('.faq-icon');
            icon.textContent = this.classList.contains('active') ? '×' : '+';
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const order = document.getElementById('order').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            
            // Clear the form
            contactForm.reset();
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We will respond within 24 hours.');
        });
    }
});
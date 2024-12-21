document.addEventListener('DOMContentLoaded', function() {
    // Existing header scroll code
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.content-section');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate stats when in view
    const stats = document.querySelectorAll('.stat-item h4');
    
    stats.forEach(stat => {
        const targetNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const interval = setInterval(() => {
                    if (currentNumber < targetNumber) {
                        currentNumber += Math.ceil(targetNumber / 50);
                        if (currentNumber > targetNumber) currentNumber = targetNumber;
                        stat.textContent = currentNumber + (stat.textContent.includes('+') ? '+' : '');
                    } else {
                        clearInterval(interval);
                    }
                }, 30);
                
                observer.unobserve(entries[0].target);
            }
        });
        
        observer.observe(stat);
    });
});
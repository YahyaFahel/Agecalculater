// Age Calculator JavaScript

// Current language
let currentLanguage = 'ar';

// Fun facts arrays
const funFacts = {
    ar: [
        "قلبك نبض أكثر من 2.5 مليار مرة!",
        "نمت أكثر من 8000 ليلة في حياتك",
        "شربت أكثر من 40,000 لتر من الماء",
        "تنفست أكثر من 600 مليون نفس",
        "مشيت مسافة تعادل الدوران حول الأرض مرتين",
        "أكلت أكثر من 30,000 وجبة",
        "ضحكت أكثر من 200,000 مرة",
        "بكيت أكثر من 100,000 مرة"
    ],
    en: [
        "Your heart has beaten over 2.5 billion times!",
        "You've slept over 8,000 nights in your life",
        "You've drunk over 40,000 liters of water",
        "You've breathed over 600 million breaths",
        "You've walked a distance equal to circling the Earth twice",
        "You've eaten over 30,000 meals",
        "You've laughed over 200,000 times",
        "You've cried over 100,000 times"
    ]
};

// Error messages
const errorMessages = {
    ar: {
        noDate: 'يرجى اختيار تاريخ الميلاد',
        futureDate: 'تاريخ الميلاد لا يمكن أن يكون في المستقبل',
        oldDate: 'يرجى إدخال تاريخ ميلاد بعد عام 1900'
    },
    en: {
        noDate: 'Please select a birth date',
        futureDate: 'Birth date cannot be in the future',
        oldDate: 'Please enter a birth date after 1900'
    }
};

// Calculate age function
function calculateAge() {
    const birthDateInput = document.getElementById('birthDate');
    const birthDateString = birthDateInput.value;

    // Validate input
    if (!birthDateString) {
        showError(errorMessages[currentLanguage].noDate);
        return;
    }

    // Create birth date
    const birthDate = new Date(birthDateString);
    const today = new Date();

    // Check if birth date is in the future
    if (birthDate > today) {
        showError(errorMessages[currentLanguage].futureDate);
        return;
    }

    // Check if birth date is too old (before 1900)
    if (birthDate.getFullYear() < 1900) {
        showError(errorMessages[currentLanguage].oldDate);
        return;
    }

    // Calculate age
    const ageInMilliseconds = today - birthDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(ageInDays / 365.25);
    const months = Math.floor((ageInDays % 365.25) / 30.44);
    const days = Math.floor(ageInDays % 30.44);

    // Display results
    displayResults(years, months, days, ageInDays);
    
    // Show fun facts
    showFunFacts(ageInDays);
}

// Display results function
function displayResults(years, months, days, totalDays) {
    const resultSection = document.getElementById('resultSection');
    const ageNumber = document.getElementById('ageNumber');
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const birthdayGreeting = document.getElementById('birthdayGreeting');

    // Check for birthday
    const birthDateInput = document.getElementById('birthDate');
    const birthDate = new Date(birthDateInput.value);
    const today = new Date();
    if (birthDate.getDate() === today.getDate() && birthDate.getMonth() === today.getMonth()) {
        // Show greeting
        birthdayGreeting.style.display = 'block';
        birthdayGreeting.innerHTML = currentLanguage === 'ar'
            ? '<div class="success-message" style="font-size:1.3rem;">🎉 عيد ميلاد سعيد! 🎂</div>'
            : '<div class="success-message" style="font-size:1.3rem;">🎉 Happy Birthday! 🎂</div>';
        // Play sound
        const audio = document.getElementById('birthdayAudio');
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    } else {
        birthdayGreeting.style.display = 'none';
        birthdayGreeting.innerHTML = '';
    }

    // Animate the age number
    animateNumber(ageNumber, 0, years, 1000);
    animateNumber(yearsSpan, 0, years, 1000);
    animateNumber(monthsSpan, 0, months, 1000);
    animateNumber(daysSpan, 0, days, 1000);

    // Show result section with animation
    resultSection.style.display = 'block';
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultSection.style.transition = 'all 0.5s ease';
        resultSection.style.opacity = '1';
        resultSection.style.transform = 'translateY(0)';
    }, 100);

    // Add celebration effect
    addCelebrationEffect();
}

// Animate number function
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (difference * easeOutQuart));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Show fun facts function
function showFunFacts(totalDays) {
    const funFactsDiv = document.getElementById('funFacts');
    const randomFact = funFacts[currentLanguage][Math.floor(Math.random() * funFacts[currentLanguage].length)];
    
    // Calculate additional fun facts
    const heartbeats = Math.floor(totalDays * 24 * 60 * 80); // 80 beats per minute average
    const nights = totalDays;
    const breaths = Math.floor(totalDays * 24 * 60 * 16); // 16 breaths per minute average
    
    const funFactsHTML = `
        <h4><i class="fas fa-lightbulb"></i> ${currentLanguage === 'ar' ? 'حقائق ممتعة عن عمرك' : 'Fun Facts About Your Age'}</h4>
        <p>${randomFact}</p>
        <div class="fun-facts-grid">
            <div class="fun-fact-item">
                <i class="fas fa-heartbeat"></i>
                <span>${formatNumber(heartbeats)}</span>
                <small>${currentLanguage === 'ar' ? 'نبضة قلب' : 'Heartbeats'}</small>
            </div>
            <div class="fun-fact-item">
                <i class="fas fa-moon"></i>
                <span>${formatNumber(nights)}</span>
                <small>${currentLanguage === 'ar' ? 'ليلة' : 'Nights'}</small>
            </div>
            <div class="fun-fact-item">
                <i class="fas fa-wind"></i>
                <span>${formatNumber(breaths)}</span>
                <small>${currentLanguage === 'ar' ? 'نفس' : 'Breaths'}</small>
            </div>
        </div>
    `;
    
    funFactsDiv.innerHTML = funFactsHTML;
}

// Format number function
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Show error function
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    const inputSection = document.querySelector('.input-section');
    inputSection.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Add celebration effect
function addCelebrationEffect() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

// Create confetti function
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

// Add input validation
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    });

    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.onclick = calculateAgeWithLoading;
    }

    // Load saved language preference
    loadLanguagePreference();

    // Set default date when page loads
    setDefaultDate();

    // Add date input change listener
    const birthDateInput = document.getElementById('birthDate');
    if (birthDateInput) {
        birthDateInput.addEventListener('change', function() {
            // Auto calculate when date changes
            setTimeout(() => {
                if (this.value) {
                    calculateAge();
                }
            }, 300);
        });
    }
});

// Quick date functions
function setQuickDate(type) {
    const birthDateInput = document.getElementById('birthDate');
    const today = new Date();
    let targetDate = new Date();

    switch(type) {
        case 'today':
            targetDate = today;
            break;
        case 'yesterday':
            targetDate.setDate(today.getDate() - 1);
            break;
        case 'week':
            targetDate.setDate(today.getDate() - 7);
            break;
        case 'month':
            targetDate.setMonth(today.getMonth() - 1);
            break;
        case 'year':
            targetDate.setFullYear(today.getFullYear() - 1);
            break;
    }

    // Format date for input (YYYY-MM-DD)
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    birthDateInput.value = formattedDate;

    // Add visual feedback
    highlightQuickButton(type);
    
    // Auto calculate after setting date
    setTimeout(() => {
        calculateAge();
    }, 500);
}

// Highlight active quick button
function highlightQuickButton(type) {
    // Remove active class from all buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    const activeButton = document.querySelector(`[onclick="setQuickDate('${type}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        
        // Remove active class after 2 seconds
        setTimeout(() => {
            activeButton.classList.remove('active');
        }, 2000);
    }
}

// Set default date to today
function setDefaultDate() {
    const birthDateInput = document.getElementById('birthDate');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    birthDateInput.value = formattedDate;
}

// Switch language function
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    updateTexts();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Update all translatable texts
function updateTexts() {
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = currentLanguage === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update title text specifically
    const titleText = document.querySelector('.title-text');
    if (titleText) {
        titleText.textContent = currentLanguage === 'ar' ? 'أداة تحديد العمر' : 'Age Calculator';
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        switchLanguage(savedLang);
    }
}

// Bitcoin Support Functions
const BITCOIN_ADDRESS = 'bc1qtaqumftzq92qdh78crazhv2m9452yhvm3ygthd';

// Copy Bitcoin address to clipboard
function copyBitcoinAddress() {
    const addressInput = document.getElementById('bitcoinAddress');
    addressInput.select();
    addressInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showSuccessMessage(currentLanguage === 'ar' ? 'تم نسخ العنوان بنجاح!' : 'Address copied successfully!');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(BITCOIN_ADDRESS).then(() => {
            showSuccessMessage(currentLanguage === 'ar' ? 'تم نسخ العنوان بنجاح!' : 'Address copied successfully!');
        }).catch(() => {
            showError(currentLanguage === 'ar' ? 'فشل في نسخ العنوان' : 'Failed to copy address');
        });
    }
}

// Open Bitcoin wallet
function openBitcoinWallet() {
    const bitcoinURL = `bitcoin:${BITCOIN_ADDRESS}`;
    window.open(bitcoinURL, '_blank');
}

// Show Bitcoin information
function showBitcoinInfo() {
    const info = currentLanguage === 'ar' 
        ? `عنوان البيتكوين: ${BITCOIN_ADDRESS}\n\nيمكنك استخدام أي محفظة بيتكوين لإرسال الدعم.\n\nمثال على المحافظ:\n• Electrum\n• Bitcoin Core\n• Exodus\n• Trust Wallet\n• Coinbase Wallet`
        : `Bitcoin Address: ${BITCOIN_ADDRESS}\n\nYou can use any Bitcoin wallet to send support.\n\nExample wallets:\n• Electrum\n• Bitcoin Core\n• Exodus\n• Trust Wallet\n• Coinbase Wallet`;
    
    alert(info);
}

// Show success message
function showSuccessMessage(message) {
    // Remove existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class=\"fas fa-check-circle\"></i> ${message}`;
    
    const supportCard = document.querySelector('.support-card');
    supportCard.insertBefore(successDiv, supportCard.firstChild);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        calculateAge();
    }
    
    // Escape to clear inputs
    if (e.key === 'Escape') {
        clearInputs();
    }
});

// Clear inputs function
function clearInputs() {
    document.getElementById('birthDate').value = '';
    document.getElementById('resultSection').style.display = 'none';
    
    // Remove error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
    
    // Reset to default date
    setDefaultDate();
}

// Add loading state to button
function setLoadingState(loading) {
    const button = document.querySelector('.calculate-btn');
    if (loading) {
        const loadingText = currentLanguage === 'ar' ? 'جاري الحساب...' : 'Calculating...';
        button.innerHTML = `<div class=\"loading\"></div> ${loadingText}`;
        button.disabled = true;
    } else {
        const calculateText = currentLanguage === 'ar' ? 'احسب العمر' : 'Calculate Age';
        button.innerHTML = `<i class=\"fas fa-calculator\"></i> <span data-ar=\"احسب العمر\" data-en=\"Calculate Age\">${calculateText}</span>`;
        button.disabled = false;
    }
}

// Enhanced calculate age with loading
function calculateAgeWithLoading() {
    setLoadingState(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
        calculateAge();
        setLoadingState(false);
    }, 800);
} 
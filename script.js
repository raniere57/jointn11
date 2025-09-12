// Funcionalidades interativas do site Joint N-11®

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initFAQ();
    initPricingCards();
    initSmoothScrolling();
    initNavInteractions();
    initAddToCartButtons();
    initScrollAnimations();
});

// Funcionalidade do FAQ (Accordion)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fechar outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
}

// Funcionalidade dos cartões de preço (removida - seção não existe mais)
function initPricingCards() {
    // Função removida pois a seção de preços foi removida
}

// Scroll suave para seções
function initSmoothScrolling() {
    // Adicionar links de navegação se necessário
    const navLinks = document.querySelectorAll('.nav-top span');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.textContent.toLowerCase().replace(/\s+/g, '-');
            const targetSection = document.getElementById(targetId) || 
                                document.querySelector(`[data-section="${targetId}"]`);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Interações da navegação
function initNavInteractions() {
    const navItems = document.querySelectorAll('.nav-top span');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe ativa de outros itens
            navItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Adicionar classe ativa ao item clicado
            this.classList.add('active');
        });
    });
}

// Funcionalidade dos botões "Adicionar ao Carrinho" (removida - seção não existe mais)
function initAddToCartButtons() {
    // Função removida pois a seção de preços foi removida
}

// Modal de confirmação de adição ao carrinho
function showAddToCartModal(bottleCount, total) {
    // Criar modal se não existir
    let modal = document.getElementById('cart-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    background: #28a745;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 24px;
                    color: white;
                ">
                    ✓
                </div>
                <h3 style="margin-bottom: 15px; color: #2c3e50;">Added to Cart!</h3>
                <p style="margin-bottom: 20px; color: #666;">
                    <strong>${bottleCount}</strong><br>
                    ${total}
                </p>
                <button id="close-modal" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                ">
                    Continue Shopping
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fechar modal
        document.getElementById('close-modal').addEventListener('click', function() {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.ingredient, .pricing-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Funcionalidade de contador de tempo limitado (opcional)
function initCountdownTimer() {
    const countdownElement = document.createElement('div');
    countdownElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    let timeLeft = 1800; // 30 minutos em segundos
    
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.innerHTML = `
            <div style="font-size: 12px; margin-bottom: 5px;">Offer Expires in:</div>
            <div style="font-size: 18px;">${minutes}:${seconds.toString().padStart(2, '0')}</div>
        `;
        
        if (timeLeft <= 0) {
            countdownElement.style.display = 'none';
            return;
        }
        
        timeLeft--;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    document.body.appendChild(countdownElement);
}

// Funcionalidade de validação de formulário (se houver)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    showFieldError(input, 'This field is required');
                } else {
                    input.style.borderColor = '#28a745';
                    hideFieldError(input);
                }
            });
            
            if (isValid) {
                showSuccessMessage('Form submitted successfully!');
            }
        });
    });
}

// Mostrar erro de campo
function showFieldError(field, message) {
    hideFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
    `;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// Esconder erro de campo
function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const successElement = document.createElement('div');
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #28a745;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease;
    `;
    successElement.textContent = message;
    
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successElement);
        }, 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
    
    .nav-top span.active {
        color: #007bff;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Funções de scroll para os botões CTA
function scrollToOrder() {
    // Redirecionar para a página de afiliado
    window.location.href = 'https://hop.clickbank.net/?affiliate=raniere57&vendor=jointn11&v=cb&tid=17539368572&p=y';
}

function scrollToBenefits() {
    const benefitsSection = document.querySelector('.benefits');
    if (benefitsSection) {
        benefitsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funcionalidade do formulário de pedido (removida - seção não existe mais)
function initOrderForm() {
    // Função removida pois a seção de pedido foi removida
}

// Inicializar funcionalidades adicionais
initCountdownTimer();
initFormValidation();
initOrderForm();

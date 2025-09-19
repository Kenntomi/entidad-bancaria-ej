document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const header = document.querySelector('header');
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close');
    const plazoInput = document.getElementById('plazo');
    const plazoValor = document.getElementById('plazo-valor');
    const calcularBtn = document.getElementById('calcular');
    const dots = document.querySelectorAll('.dot');
    const testimonios = document.querySelectorAll('.testimonio');
    const contactForm = document.getElementById('contact-form');
    const loginForm = document.getElementById('login-form');

    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Header scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Añadir clase active a la tab actual
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Modal de login
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Actualizar valor del plazo en la calculadora
    if (plazoInput) {
        plazoInput.addEventListener('input', function() {
            plazoValor.textContent = this.value;
        });
    }

    // Calculadora de préstamos
    if (calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            const cantidad = parseFloat(document.getElementById('cantidad').value);
            const plazo = parseInt(document.getElementById('plazo').value);
            const interes = parseFloat(document.getElementById('interes').value) / 100 / 12;
            
            // Fórmula para calcular la cuota mensual
            const cuotaMensual = cantidad * interes * Math.pow(1 + interes, plazo * 12) / (Math.pow(1 + interes, plazo * 12) - 1);
            
            // Actualizar resultados
            document.getElementById('cuota').textContent = cuotaMensual.toFixed(2);
            document.getElementById('total').textContent = (cuotaMensual * plazo * 12).toFixed(2);
            document.getElementById('intereses').textContent = ((cuotaMensual * plazo * 12) - cantidad).toFixed(2);
        });
    }

    // Slider de testimonios
    let currentTestimonio = 0;

    function showTestimonio(index) {
        testimonios.forEach(testimonio => testimonio.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonios[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    if (dots.length > 0 && testimonios.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonio = index;
                showTestimonio(currentTestimonio);
            });
        });

        // Mostrar el primer testimonio
        showTestimonio(currentTestimonio);

        // Cambiar testimonio automáticamente cada 5 segundos
        setInterval(() => {
            currentTestimonio = (currentTestimonio + 1) % testimonios.length;
            showTestimonio(currentTestimonio);
        }, 5000);
    }

    // Validación de formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            if (nombre.value.trim() === '') {
                showError(nombre, 'Por favor, introduce tu nombre');
                isValid = false;
            } else {
                removeError(nombre);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Por favor, introduce tu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, introduce un email válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (mensaje.value.trim() === '') {
                showError(mensaje, 'Por favor, introduce tu mensaje');
                isValid = false;
            } else {
                removeError(mensaje);
            }
            
            if (isValid) {
                // Simulación de envío
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>¡Mensaje enviado con éxito!</h3>
                            <p>Nos pondremos en contacto contigo lo antes posible.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    // Validación de formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            let isValid = true;
            const usuario = document.getElementById('usuario');
            const password = document.getElementById('password');
            
            if (usuario.value.trim() === '') {
                showError(usuario, 'Por favor, introduce tu usuario');
                isValid = false;
            } else {
                removeError(usuario);
            }
            
            if (password.value.trim() === '') {
                showError(password, 'Por favor, introduce tu contraseña');
                isValid = false;
            } else {
                removeError(password);
            }
            
            if (isValid) {
                // Simulación de login
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Accediendo...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    loginForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>¡Login exitoso!</h3>
                            <p>Redirigiendo al área de clientes...</p>
                        </div>
                    `;
                    
                    // Cerrar modal después de 2 segundos
                    setTimeout(() => {
                        loginModal.classList.remove('active');
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Funciones auxiliares
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Cerrar menú móvil si está abierto
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Animaciones al hacer scroll
    const animatedElements = document.querySelectorAll('.feature-card, .servicio-card, .producto-card, .testimonio');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Comprobar al cargar la página
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .feature-card, .servicio-card, .producto-card, .testimonio {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.show, .servicio-card.show, .producto-card.show, .testimonio.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error-message {
        color: var(--danger-color);
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }
    
    input.error, textarea.error, select.error {
        border-color: var(--danger-color);
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-message i {
        font-size: 3rem;
        color: var(--success-color);
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);
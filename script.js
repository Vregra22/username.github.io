// Ma'lumotlar bazasi (localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
    // Test user
    {
        ism: 'Test',
        familiya: 'User',
        login: 'admin',
        password: 'Admin123!'
    }
];

// Parol kuchini tekshirish
function checkPasswordStrength() {
    const password = document.getElementById('regPassword').value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    // Kuchsiz parol shartlari
    if (password.length < 8) {
        strengthDiv.className = 'password-strength weak';
        strengthDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kuchsiz: Parol 8 ta belgidan kam';
        return;
    }
    
    // Hech bo'lmaganda 1 ta raqam
    if (!/[0-9]/.test(password)) {
        strengthDiv.className = 'password-strength weak';
        strengthDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kuchsiz: Raqam bo\'lishi kerak';
        return;
    }
    
    // Hech bo'lmaganda 1 ta katta harf
    if (!/[A-Z]/.test(password)) {
        strengthDiv.className = 'password-strength weak';
        strengthDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kuchsiz: Katta harf bo\'lishi kerak';
        return;
    }
    
    // Hech bo'lmaganda 1 ta kichik harf
    if (!/[a-z]/.test(password)) {
        strengthDiv.className = 'password-strength weak';
        strengthDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kuchsiz: Kichik harf bo\'lishi kerak';
        return;
    }
    
    // Hech bo'lmaganda 1 ta maxsus belgi
    if (!/[!@#$%^&*]/.test(password)) {
        strengthDiv.className = 'password-strength weak';
        strengthDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kuchsiz: Maxsus belgi bo\'lishi kerak (!@#$%^&*)';
        return;
    }
    
    // O'rtacha parol
    if (password.length < 10) {
        strengthDiv.className = 'password-strength medium';
        strengthDiv.innerHTML = '<i class="fas fa-check-circle"></i> O\'rtacha: Yaxshi, lekin uzunroq bo\'lsa yaxshi';
        return;
    }
    
    // Kuchli parol
    strengthDiv.className = 'password-strength strong';
    strengthDiv.innerHTML = '<i class="fas fa-check-circle"></i> Kuchli parol! ✓';
}

// Parollarni solishtirish
function checkPasswordMatch() {
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;
    const matchDiv = document.getElementById('passwordMatch');
    
    if (confirm.length === 0) {
        matchDiv.style.display = 'none';
        return;
    }
    
    if (password === confirm) {
        matchDiv.className = 'password-match match';
        matchDiv.innerHTML = '<i class="fas fa-check-circle"></i> Parollar mos keldi ✓';
    } else {
        matchDiv.className = 'password-match not-match';
        matchDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Parollar mos kelmadi ✗';
    }
}

// Real-time parol tekshirish
document.getElementById('regPassword')?.addEventListener('keyup', checkPasswordMatch);
document.getElementById('regConfirmPassword')?.addEventListener('keyup', checkPasswordMatch);

// Parol ko'rsatish/berkitish
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Ro'yxatdan o'tish
function register() {
    const ism = document.getElementById('regIsm').value.trim();
    const familiya = document.getElementById('regFamiliya').value.trim();
    const login = document.getElementById('regLogin').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Bo'sh maydonlarni tekshirish
    if (!ism || !familiya || !login || !password || !confirmPassword) {
        alert('❌ Barcha maydonlarni to\'ldiring!');
        return;
    }
    
    // Ism va familiya faqat harflardan iborat
    if (!/^[a-zA-Z\u{0400}-\u{04FF}]+$/u.test(ism)) {
        alert('❌ Ism faqat harflardan iborat bo\'lishi kerak!');
        return;
    }
    
    if (!/^[a-zA-Z\u{0400}-\u{04FF}]+$/u.test(familiya)) {
        alert('❌ Familiya faqat harflardan iborat bo\'lishi kerak!');
        return;
    }
    
    // Login tekshirish
    if (login.length < 3) {
        alert('❌ Login kamida 3 ta belgidan iborat bo\'lishi kerak!');
        return;
    }
    
    // Parol kuchini tekshirish
    if (password.length < 8) {
        alert('❌ Parol 8 ta belgidan kam bo\'lmasligi kerak!');
        return;
    }
    
    if (!/[0-9]/.test(password)) {
        alert('❌ Parolda kamida 1 ta raqam bo\'lishi kerak!');
        return;
    }
    
    if (!/[A-Z]/.test(password)) {
        alert('❌ Parolda kamida 1 ta katta harf bo\'lishi kerak!');
        return;
    }
    
    if (!/[a-z]/.test(password)) {
        alert('❌ Parolda kamida 1 ta kichik harf bo\'lishi kerak!');
        return;
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
        alert('❌ Parolda kamida 1 ta maxsus belgi bo\'lishi kerak (!@#$%^&*)');
        return;
    }
    
    // Parol mosligini tekshirish
    if (password !== confirmPassword) {
        alert('❌ Parollar mos kelmadi!');
        return;
    }
    
    // Login bandligini tekshirish
    if (users.find(u => u.login === login)) {
        alert('❌ Bu login band! Boshqa login tanlang.');
        return;
    }
    
    // Yangi foydalanuvchi qo'shish
    const newUser = {
        ism: ism,
        familiya: familiya,
        login: login,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert(`✅ Tabriklaymiz, ${ism}! Ro'yxatdan o'tdingiz. Endi kiring.`);
    showLogin();
}

// Kirish
function login() {
    const login = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!login || !password) {
        alert('❌ Login va parolni kiriting!');
        return;
    }
    
    const user = users.find(u => u.login === login && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showKino();
    } else {
        alert('❌ Login yoki parol xato!');
    }
}

// Chiqish
function logout() {
    localStorage.removeItem('currentUser');
    showLogin();
}

// Kino qismini ko'rsatish
function showKino() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('kinoSection').style.display = 'block';
}

// Login formini ko'rsatish
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('kinoSection').style.display = 'none';
    
    // Inputlarni tozalash
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// Registration formini ko'rsatish
function showRegister() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('kinoSection').style.display = 'none';
    
    // Inputlarni tozalash
    document.getElementById('regIsm').value = '';
    document.getElementById('regFamiliya').value = '';
    document.getElementById('regLogin').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    document.getElementById('passwordStrength').style.display = 'none';
    document.getElementById('passwordMatch').style.display = 'none';
}

// Kino o'ynatish
function playKino(kinoId) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('kinoPlayer');
    const videoTitle = document.querySelector('.video-header h3');
    
    // Bu yerda haqiqiy kino linklarini qo'yishingiz mumkin
    const kinolar = {
        1: {
            title: 'O\'zbek kino 1',
            url: 'https://example.com/kino1.mp4'  // https://youtu.be/JLiFMCpZjZY?si=R0LAI6rayi8_EiJl
        },
        2: {
            title: 'O\'zbek kino 2',
            url: 'https://example.com/kino2.mp4'  // https://youtu.be/JLiFMCpZjZY?si=R0LAI6rayi8_EiJl
        }
    };
    
    const kino = kinolar[kinoId];
    videoTitle.innerHTML = `<i class="fas fa-film"></i> ${kino.title}`;
    video.src = kino.url;
    
    modal.style.display = 'flex';
    video.play().catch(e => {
        console.log('Video avtomatik o\'ynatilmadi');
    });
}

// Videoni yopish
function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('kinoPlayer');
    
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
}

// Enter tugmasi bilan login
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (document.getElementById('loginContainer').style.display !== 'none') {
            login();
        } else if (document.getElementById('registerContainer').style.display !== 'none') {
            register();
        }
    }
});

// Sahifa yuklanganda
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        showKino();
    } else {
        showLogin();
    }
};

// Parol tekshirish eventlari
document.getElementById('regPassword')?.addEventListener('keyup', function() {
    checkPasswordStrength();
    checkPasswordMatch();
});
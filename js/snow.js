// Получаем canvas и контекст
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Подгоняем под размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Массив снежинок
const flakes = [];


/* --------------------------------------------------
   🎚 1. НАСТРОЙКА: количество снежинок
   Измени число — получишь больше или меньше снега
   -------------------------------------------------- */
const FLAKE_COUNT = 50; // 👉 20 мало, 50 нормально, 150 метель


/* ---------- СОЗДАЁМ СНЕЖИНКИ ---------- */
for (let i = 0; i < FLAKE_COUNT; i++) {
    flakes.push({

        // Начальная позиция
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        /* --------------------------------------------------
           🎚 2. НАСТРОЙКА: размер снежинок
           Math.random() * (max-min) + min
           -------------------------------------------------- */
        r: Math.random() * 2.5 + 0.5,  
        // Сейчас: от 0.5 до 3px (мелкий снег)

        /* --------------------------------------------------
           🎚 3. НАСТРОЙКА: скорость снега
           d влияет на скорость падения
           -------------------------------------------------- */
        d: Math.random() * 0.8 + 0.4   
        // Сейчас: 0.4–1.2 (спокойный снег)
    });
}


let angle = 0;


/* ---------- Рисуем снежинки ---------- */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.beginPath();

    for (let f of flakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }

    ctx.fill();
    updateFlakes();
    requestAnimationFrame(draw);
}


/* ---------- Обновляем движение ---------- */
function updateFlakes() {
    angle += 0.01; // угол качания — не трогай

    for (let f of flakes) {

        /* --------------------------------------------------
           🎚 4. НАСТРОЙКА: вертикальная скорость падения
           Чем выше множители — тем быстрее снег падает
           Сейчас плавный снег
           -------------------------------------------------- */
        f.y += Math.pow(f.d, 2) + 0.5;

        /* --------------------------------------------------
           🎚 5. НАСТРОЙКА: сила покачивания по X
           0.2 — слабое покачивание
           1.0 — сильная метель
           -------------------------------------------------- */
        f.x += Math.sin(angle) * 0.3;

        // Когда снежинка уходит за низ — возвращаем наверх
        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    }
}


/* ---------- Запуск анимации ---------- */
draw();


// ---------- Обновление при изменении размера окна ----------
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
















// const canvas = document.getElementById('snowCanvas');
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const flakes = [];

// for (let i = 0; i < 100; i++) {
//     flakes.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         r: Math.random() * 3 + 1,
//         d: Math.random() + 1
//     });
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = 'white';
//     ctx.beginPath();

//     for (let f of flakes) {
//         ctx.moveTo(f.x, f.y);
//         ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
//     }

//     ctx.fill();
//     moveFlakes();
//     requestAnimationFrame(draw);
// }

// let angle = 0;

// function moveFlakes() {
//     angle += 0.01;
//     for (let f of flakes) {
//         f.y += Math.pow(f.d, 2) + 1;
//         f.x += Math.sin(angle) * 0.5;

//         if (f.y > canvas.height) {
//             f.y = -10;
//             f.x = Math.random() * canvas.width;
//         }
//     }
// }

// draw();

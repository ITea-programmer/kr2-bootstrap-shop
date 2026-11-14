const poems = [
    { 
        title: "«О, я хочу безумно жить...»",
        text: "«О, я хочу безумно жить:<br>Всё сущее — увековечить,<br>Безличное — вочеловечить,<br>Несбывшееся — воплотить!»", 
        author: "Александр Блок",
        image: "images/blok.jpg"
    },
    { 
        title: "«Сжала руки под темной вуалью...»",
        text: "«Сжала руки под темной вуалью...<br>«Отчего ты сегодня бледна?»<br>— Оттого, что я терпкой печалью<br>Напоила его допьяна...»", 
        author: "Анна Ахматова",
        image: "images/ahmatova.jpg"
    },
    { 
        title: "«А вы могли бы?»",
        text:"«Я сразу смазал карту будня,<br>плеснувши краску из стакана;<br>я показал на блюде студня<br>косые скулы океана.<br>На чешуе жестяной рыбы<br>прочёл я зовы новых губ.<br>А вы<br>ноктюрн сыграть<br>могли бы<br>на флейте водосточных труб?»", 
        author: "Владимир Маяковский",
        image: "images/mayakovskiy.jpg" 
    },
    { 
       title: "«Не жалею, не зову, не плачу...»",
       text: "«Не жалею, не зову, не плачу,<br>Все пройдет, как с белых яблонь дым.<br>Увяданья золотом охваченный,<br>Я не буду больше молодым...»", 
        author: "Сергей Есенин",
        image: "images/esenin.jpg"
    },
    { 
        title: "«Мне нравится, что вы больны не мной...»",
        text: "«Мне нравится, что вы больны не мной,<br>Мне нравится, что я больна не вами,<br>Что никогда тяжелый шар земной<br>Не уплывет под нашими ногами...»", 
        author: "Марина Цветаева",
        image: "images/cvetaeva.jpg" 
    },
    { 
        title: "«Птицы, звезды и степи...»",
        text: "«Птицы, звезды и степи,<br>Желтые зори.<br>И трава.<br>Тридцать три переедешь моря,<br>А в сердце:<br>Пепел<br>И маленькая Москва.»", 
        author: "Анатолий Мариенгоф",
        image: "images/mariengof.png"
    }
];

function renderPoemOfTheDay() {
    const poemContainer = document.getElementById('poem-of-the-day');
    const heroImage = document.getElementById('hero-image');
    
    // Если мы не на главной странице, выходим
    if (!poemContainer || !heroImage) return;

    // Выбираем случайный стих
    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];

    // 1. Меняем картинку в верхнем Hero-блоке
    heroImage.src = poem.image;
    heroImage.alt = poem.author;
    heroImage.style.filter = "sepia(0.8)";

    // 2. Вставляем текст в блок "Стихотворение дня" (без картинки)
    poemContainer.innerHTML = `
        <h4 class="alert-heading mb-3 text-center">Стихотворение дня</h4>
        <p class="mb-3 text-center" style="line-height: 1.8; font-size: 1.1rem;">
            <em>${poem.text}</em>
        </p>
        <div class="text-end mt-2">
            <span class="d-block fw-bold">${poem.title}</span>
            <span class="text-muted">— ${poem.author}</span>
        </div> 
           `;
}

// Логика для кнопки "Наверх"
window.addEventListener('scroll', function() {
    const btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

// Плавная прокрутка наверх
document.addEventListener('click', function(e) {
    if (e.target.closest('#scrollToTopBtn')) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', renderPoemOfTheDay);
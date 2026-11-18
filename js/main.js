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
function highlightText(text, query) { if (!query) return text; 
    // Экранируем спецсимволы в запросе, чтобы поиск работал с точками, скобками и т.д. 
const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[$$\\]/g, '\\$&')})`, 'gi');    return text.replace(regex, '<mark class="search-highlight">$1</mark>'); 
} // Функция очистки старых подсветок 
function clearHighlights(container) { 
    const marks = container.querySelectorAll('mark.search-highlight'); 
    marks.forEach(mark => { 
        // Заменяем тег <mark> обратно на обычный текст 
        const parent = mark.parentNode; 
        parent.replaceChild(document.createTextNode(mark.textContent), mark)
         parent.normalize(); 
    }); 
}
// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', renderPoemOfTheDay);

// УМНЫЙ ЛОКАЛЬНЫЙ ПОИСК ПО СТРАНИЦЕ
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('site-search');
    if (!searchInput) return;

    // Находим все крупные смысловые блоки на странице по их заголовкам
    const sections = document.querySelectorAll('section, .accordion-item, .tab-pane');

    searchInput.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase().trim();

    // Очищаем подсветку и состояние блоков, если поле пустое
    if (searchText === '') {
        sections.forEach(section => {
            section.style.display = '';
            section.style.boxShadow = '';
            clearHighlights(section); // Очищаем <mark> во всем разделе
            // Восстанавливаем состояние аккордеонов и табов при сбросе поиска
            if (section.classList.contains('accordion-collapse') && section.classList.contains('show')) {
                section.style.display = '';
            }
        });
        return;
    }

    sections.forEach(section => {
        let isSectionMatched = false;

        // 1. Сначала очищаем старые подсветки в текущем блоке
        clearHighlights(section);

        // 2. Проверяем заголовок (h2, h3, h4)
        const titles = section.querySelectorAll('h2, h3, h4'); 
        titles.forEach((title) => { 
            const titleText = title.textContent.toLowerCase(); 
            if (titleText.includes(searchText)) { isSectionMatched = true; // Раздел найден 
            title.innerHTML = highlightText(title.textContent, searchText); // Подсветка
            } 
        });

        // 3. Проверяем текстовое содержимое (ищем только в параграфах и списках, чтобы не сломать кнопки)
        const textNodes = section.querySelectorAll('p, li, .accordion-body, .card-body');
        
        textNodes.forEach(node => {
            const nodeText = node.textContent.toLowerCase();
            if (nodeText.includes(searchText)) {
                isSectionMatched = true;
                node.innerHTML = highlightText(node.textContent, searchText);
            }
        });

        // 4. Логика отображения блока
        if (isSectionMatched) {
            section.style.display = '';
            section.style.boxShadow = '0 0 10px rgba(201, 168, 106, 0.4)';

            // Автоматическое открытие табов и аккордеонов (оставьте эту логику из прошлого ответа)
            if (section.classList.contains('tab-pane')) {
                const trigger = document.querySelector(`[data-bs-target="#${section.id}"]`);
                if (trigger && !trigger.classList.contains('active')) {
                    const tab = new bootstrap.Tab(trigger);
                    tab.show();
                }
            }
            if (section.classList.contains('accordion-collapse') && !section.classList.contains('show')) {
                const accordion = new bootstrap.Collapse(section, { toggle: true });
            }
        } else {
            section.style.display = 'none';
            section.style.boxShadow = '';
        }
    });
});

});

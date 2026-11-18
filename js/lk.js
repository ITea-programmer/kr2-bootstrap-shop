// Функция для получения списка избранных ID из localStorage
function getFavorites() {
    const json = localStorage.getItem('silver-age-favorites');
    
    if (!json) return [];
    
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error("Ошибка при чтении избранного:", e);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Получаем контейнер для вывода избранного
    const favoritesListContainer = document.getElementById('favorites-list');

    // Получаем список ID избранных произведений
    const favoriteIds = getFavorites();

    // Если избранное пустое — выводим сообщение
    if (!favoriteIds.length) {
        favoritesListContainer.innerHTML = `
            <div class="col-md-6">
                <p class="lead text-center mt-4">У вас пока нет избранных произведений.</p>
            </div>`;
        return;
    }

    // Фильтруем все стихи по списку избранных ID
    const filteredPoems = poems.filter(poem => favoriteIds.includes(poem.id));

    // Генерируем HTML-карточки для каждого избранного стиха
    filteredPoems.forEach(poem => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        
        // Создаём ссылку на отдельную страницу стихотворения (если она есть)
        let poemLink = '#'; 
        if (poem.url) { 
            poemLink = poem.url; 
        }

        col.innerHTML = `
            <div class="card shadow-sm border-0 h-100">
                <div class="card-body p-4">
                    <h5 class="mb-3">${poem.title}</h5>
                    <p><em>${poem.text.substring(0, 100)}...</em></p>
                    <a href="${poemLink}" class="btn btn-outline-primary stretched-link">Читать полностью</a>
                </div>
            </div>
        `;

        favoritesListContainer.appendChild(col); // Добавляем карточку в DOM
    });
});

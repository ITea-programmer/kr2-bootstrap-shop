// Функция для получения списка избранных ID из localStorage
function getFavorites() { 
    const json = localStorage.getItem('silver-age-favorites'); 
    if (!json) return []; 
    try { return JSON.parse(json); } 
    catch (e) { console.error("Ошибка при чтении избранного:", e); 
        return []; 
    }
 } // Функция для добавления/удаления элемента по его ID
function toggleFavorite(itemId) { let favorites = getFavorites(); // Проверяем, есть ли элемент уже в списке 
const index = favorites.indexOf(itemId); if (index !== -1) { // Если есть — удаляем 
favorites.splice(index, 1); } else { 
    // Если нет — добавляем 
    
    favorites.push(itemId); 
} 
    // Сохраняем обновлённый список обратно в браузер 
localStorage.setItem('silver-age-favorites', JSON.stringify(favorites)); 
}
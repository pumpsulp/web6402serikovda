document.addEventListener("DOMContentLoaded", async () => {
    const table = document.querySelector("table tbody");

    try {
        // GET-запрос на /characters
        const response = await fetch("http://localhost:8001/characters");

        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }

        // Парсим JSON-ответ как массив
        const characters = await response.json();

        // Очищаем таблицу перед добавлением данных
        table.innerHTML = "";

        // Добавляем строки данных в таблицу
        characters.forEach((character) => {
            const row = `
                <tr>
                    <td>${character.name}</td>
                    <td>${character.role}</td>
                    <td>${character.description}</td>
                </tr>
            `;
            table.insertAdjacentHTML("beforeend", row);
        });
    } catch (error) {
        console.error("Ошибка:", error);

        // Сообщение об ошибке в случае сбоя
        table.innerHTML = "<tr><td colspan='3'>Не удалось загрузить данные.</td></tr>";
    }
});

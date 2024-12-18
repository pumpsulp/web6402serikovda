document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".support-form");
    const textarea = document.getElementById("question");
    const badWords = ["типа"]; // Список "плохих" слов

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const email = document.getElementById("email").value;
        const question = textarea.value;

        // Проверка длины сообщения
        if (question.length > 200) {
            alert("Ваше сообщение слишком длинное. Максимальная длина - 200 символов.");
            return;
        }

        // Проверка на "плохие" слова
        for (let word of badWords) {
            if (question.toLowerCase().includes(word)) {
                alert("Ваше сообщение содержит запрещённые слова. Пожалуйста, отредактируйте его.");
                return;
            }
        }

        // Отправка POST-запроса
        fetch("http://localhost:8001/support", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                message: question,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при отправке данных.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Ответ сервера:", data);
            alert("Ваш вопрос успешно отправлен!");
            form.reset();
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке формы. Попробуйте позже.");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".support-form");
    const emailInput = document.getElementById("email");
    const textarea = document.getElementById("question");
    const badWords = ["типа", "плохое", "ругательство"]; // Список "плохих" слов
    const charLimit = 200;

    // Проверка поля email на валидность
    emailInput.addEventListener("input", () => {
        if (!emailInput.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
            emailInput.style.borderColor = "red";
        } else {
            emailInput.style.borderColor = "green";
        }
    });

    // Проверка textarea на длину и "плохие" слова
    textarea.addEventListener("input", () => {
        const question = textarea.value;

        // Проверка длины сообщения
        if (question.length > charLimit) {
            textarea.style.borderColor = "red";
        } else {
            textarea.style.borderColor = "green";
        }

        // Проверка на "плохие" слова
        for (let word of badWords) {
            if (question.toLowerCase().includes(word)) {
                textarea.style.borderColor = "orange";
                return;
            }
        }
    });

    // Обработка отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const email = emailInput.value;
        const question = textarea.value;

        // Проверка email
        if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
            alert("Пожалуйста, введите корректный email.");
            return;
        }

        // Проверка длины сообщения
        if (question.length > charLimit) {
            alert(`Ваше сообщение слишком длинное. Максимальная длина - ${charLimit} символов.`);
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
        fetch("http://127.0.0.1:8001/support", {
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
            emailInput.style.borderColor = "";
            textarea.style.borderColor = "";
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке формы. Попробуйте позже.");
        });
    });
});

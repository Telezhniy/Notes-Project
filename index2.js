function showCustomConfirm() {
    // ... получение элементов кнопок ...

    return new Promise((resolve) => {
        // resolve — это функция, которую мы ВЫЗОВЕМ, когда получим ответ от пользователя

        const handleYes = () => {
            // ... скрыть окно ...
            resolve(true); // Сообщаем Промису: "Готово! Результат = true"
        };

        const handleNo = () => {
            // ... скрыть окно ...
            resolve(false); // Сообщаем Промису: "Готово! Результат = false"
        };

        yesBtn.addEventListener('click', handleYes);
        noBtn.addEventListener('click', handleNo);
    });
}

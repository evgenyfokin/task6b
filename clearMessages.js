const { Message } = require('./models'); // Замените на соответствующий путь к вашей модели

Message.destroy({ where: {}, truncate: true })
    .then(() => {
        console.log('Все данные из модели Message удалены');
        process.exit(); // Завершаем процесс после успешного удаления данных
    })
    .catch((error) => {
        console.error('Ошибка при удалении данных:', error);
        process.exit(1); // Завершаем процесс с ошибкой, если удаление не удалось
    });
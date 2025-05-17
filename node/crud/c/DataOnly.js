import * as sqlite from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
// Получаем путь к текущей директоре
const __dirname = path.dirname(__filename);

// Подключаемся к базе данных LoginData.db
// Если файл существует, открывает его. Если нет - создает новый.
const db = new sqlite.DatabaseSync('../login/LoginData.db');

const sqlFilePath = path.join(__dirname, 'DataOnly.sql'); // Путь к файлу с данными

try {
    // Читаем содержимое SQL файла синхронно
    const sqlData = fs.readFileSync(sqlFilePath, 'utf8');

    // Выполняем все SQL команды из файла
    // Файл DataOnly.sql сам управляет транзакцией
    db.exec(sqlData);
    console.log('Данные успешно вставлены из DataOnly.sql.');

} catch (error) {
    console.error('Ошибка при вставке данных:', error.message);
    // Возможно, здесь стоит добавить логику для отката,
    // если в DataOnly.sql нет ROLLBACK на случай ошибки.
    // Но пока полагаемся на транзакцию внутри SQL файла.
} finally {
    // Закрываем соединение с базой данных
    db.close();
    console.log('Соединение с базой данных закрыто.');
}
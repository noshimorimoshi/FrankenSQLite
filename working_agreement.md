### **Рабочее соглашение (версия 3.0)**

**1. Главная миссия:**
Наша основная задача — итеративно построить и проверить оптимальную схему базы данных (`SCHEMA.md`) для системы отслеживания интернет-заказов. Мы используем `DATA.md` как холст для сбора и структурирования тестовых данных, проверяя гипотезы на практике.

**2. Наш метод (Итеративность и Data-Driven подход):**
Мы отказались от последовательного заполнения таблиц. Наш новый, усовершенствованный процесс описан в `DATA_ORDER.md` и основан на логике реального мира:
*   **Сначала Исследование, потом Приоритезация:** Мы не можем назначить приоритет (`priority_id`) товару в `queue` в вакууме. Сначала мы должны исследовать рынок — найти предложения (`offer`), цены и условия.
*   **Data-Driven-приоритет:** Приоритет становится осмысленным решением, основанным на данных из таблицы `offer`.
*   **Гибкость:** Если мы обнаруживаем, что схема или процесс неоптимальны, мы останавливаемся, обсуждаем, вносим коррективы в `SCHEMA.md` и `DATA_ORDER.md`, а затем продолжаем.

**3. Ключевые архитектурные решения (Актуальны):**
*   **`product` — это каталог:** Справочник всех когда-либо существовавших товаров.
*   **Статус отслеживается отдельно:** Состояние товара определяется его присутствием в таблицах `queue`, `basket_item` и `order_item`.
*   **Пользователь привязывается на этапе "Корзины":** Очередь (`queue`) — это неперсонализированный бэклог.

**4. Наш текущий прогресс:**
*   **Процесс перестроен:** Файлы `DATA_ORDER.md` и `DATA.md` были обновлены, чтобы отразить наш новый, более логичный рабочий процесс. `offer` теперь является частью первого этапа.
*   **Мы находимся на Этапе 1: "Поиск и Приоритезация".**
*   **Таблица `product`:** Проверена. Готовы перейти к поиску предложений.

**5. Наша следующая задача:**
*   **Таблица:** `offer` в файле `DATA.md`.
*   **Продукт:** `id: 15` (`разъём rj9...`).
*   **Действие:** Начать сбор данных для нового предложения (offer) для этого продукта, начиная с поля `channel` (например, AliExpress, Ozon).
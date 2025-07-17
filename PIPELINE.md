# Конвейер обработки (PIPELINE.md)

Этот файл является центральным элементом нашего рабочего процесса. Он функционирует как "канбан-доска" или очередь задач, показывая **текущий статус** каждой сущности (например, товара), которая находится в обработке.

Логика работы теперь строится вокруг этого файла:
1.  **Выбор задачи:** Система выбирает из этого файла запись с наивысшим приоритетом и статусом, готовым к обработке (например, 'new').
2.  **Обновление статуса:** После выполнения работы над сущностью, ее статус и время обновления (`last_updated_at`) в этой таблице обновляются.

## Таблица: `pipeline`

| pipeline_id | entity_table | entity_id | status_id | priority | last_updated_at | notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | product | 4 | 48 | 6 | 2024-05-13T13:00:00Z | Priority sourced from Wekan |
| 2 | product | 2 | 46 | 6 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 3 | product | 6 | 46 | 5 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 4 | product | 15 | 46 | 3 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 5 | product | 20 | 46 | 3 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 6 | product | 52 | 46 | 2 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 7 | product | 75 | 46 | 1 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |
| 8 | product | 76 | 46 | 0 | 2024-05-13T12:00:00Z | Priority sourced from Wekan |


# Cashback Service

This service is responsible for managing cashback providers and programs.

## Tables

### Table: `web_service`
| id | name | url | is_active | status_id (FK) | created_at |
|----|------|-----|-----------|----------------|------------|
| 1  | backit.me | https://backit.me | true | NULL | 2024-01-01 |
| 2  | ubrr.ru | https://ubrr.ru | true | NULL | 2024-01-01 |
| 3  | finance.ozon | https://finance.ozon.ru | true | NULL | 2024-01-01 |
| 4  | vtb.ru | https://vtb.ru | true | NULL | 2024-01-01 |
| 5  | sberbank.ru | https://sberbank.ru | true | NULL | 2024-01-01 |
| 6  | alfabank.ru | https://alfabank.ru | true | NULL | 2024-01-01 |
| 7  | sovcombank.ru | https://sovcombank.ru | true | NULL | 2024-01-01 |
| 8  | gpb.ru | https://gpb.ru | true | NULL | 2024-01-01 |
| 9  | aliexpress.ru | https://aliexpress.ru | true | NULL | 2024-01-01 |
| 10 | avito.ru | https://avito.ru | true | NULL | 2024-01-01 |
| 11 | auchan.ru | https://auchan.ru | true | NULL | 2024-01-01 |


### Table: `cashback_provider`
| id | name | provider_type | web_service_id (FK to `web_service.id`) |
|----|------|---------------|-----------------------------------------|
| 1  | Backit | cashback-service | 1 |
| 2  | УБРиР | bank | 2 |
| 3  | Ozon Finance | bank | 3 |
| 4  | ВТБ | bank | 4 |
| 5  | Сбер | bank | 5 |
| 6  | Альфа-Банк | bank | 6 |
| 7  | Совкомбанк | bank | 7 |
| 8  | Газпромбанк | bank | 8 |

### Table: `cashback_program`
| id | cashback_provider_id (FK) | name | value_type | value | conditions | required_product_id (Logical FK to `procurement.product.id`) |
|----|---------------------------|------|------------|-------|------------|----------------------------------------------------------|
| 1  | 1 | Кэшбэк на AliExpress | percent | до 81%... | макс кэшбек: 1500₽... | NULL |
| 2  | 2 | MyLife+ | percent | 10 | 1. оборот ₽5000+/мес... | 77 |
| 3  | 2 | MyLife (стандарт) | percent | 1 | оборот ₽5000+/мес... | NULL |
| 4  | 3 | Кэшбэк на онлайн-покупки | percent | 1 | выбрать категорию до оплаты... | NULL |
| 5  | 4 | Мультибонусы | percent | 1 | выбрать категорию до оплаты... | NULL |
| 6  | 5 | СберСпасибо | percent | 0.5 | зачисление до 5-14 дней... | NULL |
| 7  | 6 | Кэшбэк по Альфа-Карте | percent | 1 | выбрать категорию до оплаты... | NULL |
| 8  | 7 | Карта "Халва" | percent | 2 | безусловный | NULL |
| 9  | 8 | "Понятный" кэшбэк | percent | 2 | максимум ₽3000 | NULL |

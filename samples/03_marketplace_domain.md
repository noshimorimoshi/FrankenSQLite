# Домен маркетплейса (Marketplace)

## Таблица: Marketplace

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| marketplace_id | INTEGER | Уникальный идентификатор | PRIMARY KEY |
| name | TEXT | Название маркетплейса | NOT NULL |
| website_url | TEXT | URL сайта | NOT NULL |
| api_endpoint | TEXT | Конечная точка API | |
| logo_url | TEXT | URL логотипа | |
| description | TEXT | Описание | |
| currency | TEXT | Основная валюта | DEFAULT 'USD' |
| language | TEXT | Основной язык | DEFAULT 'en' |
| country | TEXT | Страна происхождения | |
| support_email | TEXT | Email поддержки | |
| support_phone | TEXT | Телефон поддержки | |
| is_active | BOOLEAN | Активен ли маркетплейс | DEFAULT TRUE |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `marketplace_id`
- UNIQUE: `name`
- INDEX: `is_active`

**Предустановленные данные:**

| marketplace_id | name | website_url | api_endpoint | description | currency | language | country |
|----------------|------|-------------|-------------|-------------|----------|----------|---------|
| 1 | AliExpress | https://aliexpress.ru | https://api.aliexpress.com | Международная торговая площадка с широким ассортиментом товаров | RUB | ru | China |
| 2 | AliExpress Global | https://aliexpress.com | https://global-api.aliexpress.com | Global version of AliExpress marketplace | USD | en | China |

## Таблица: MarketplaceSettings

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| setting_id | INTEGER | Уникальный идентификатор настройки | PRIMARY KEY, AUTOINCREMENT |
| marketplace_id | INTEGER | Идентификатор маркетплейса | FOREIGN KEY REFERENCES Marketplace(marketplace_id) |
| setting_key | TEXT | Ключ настройки | NOT NULL |
| setting_value | TEXT | Значение настройки | NOT NULL |
| setting_group | TEXT | Группа настроек | |
| description | TEXT | Описание настройки | |
| is_active | BOOLEAN | Активна ли настройка | DEFAULT TRUE |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `setting_id`
- FK: `marketplace_id`
- UNIQUE: (`marketplace_id`, `setting_key`)
- INDEX: `setting_group`

## Связи с другими доменами

1. **Marketplace → Accounts**
   - `Accounts.marketplace_id` → `Marketplace.marketplace_id`
   - Каждый аккаунт принадлежит конкретному маркетплейсу

2. **Marketplace → Registration**
   - `RegistrationAccounts.marketplace_id` → `Marketplace.marketplace_id`
   - Регистрация выполняется для конкретного маркетплейса

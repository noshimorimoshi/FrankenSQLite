# Домен контактных данных (Contacts)

## Таблица: ContactTypes

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| contact_type_id | INTEGER | Уникальный идентификатор типа контакта | PRIMARY KEY, AUTOINCREMENT |
| type_name | TEXT | Название типа (email, phone, telegram, whatsapp) | UNIQUE, NOT NULL |
| validation_regex | TEXT | Регулярное выражение для валидации | |
| description | TEXT | Описание | |
| is_active | BOOLEAN | Активен ли тип контакта | DEFAULT TRUE |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `contact_type_id`
- UNIQUE: `type_name`

**Предустановленные данные:**

| contact_type_id | type_name | validation_regex | description |
|-----------------|-----------|------------------|-------------|
| 1 | email | ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ | Электронная почта |
| 2 | phone | ^\+?[0-9]{10,15}$ | Телефонный номер |
| 3 | telegram | ^@[a-zA-Z0-9_]{5,32}$ | Имя пользователя Telegram |
| 4 | whatsapp | ^\+?[0-9]{10,15}$ | Номер WhatsApp |

## Таблица: UserContacts

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| contact_id | INTEGER | Уникальный идентификатор контакта | PRIMARY KEY, AUTOINCREMENT |
| user_id | INTEGER | Идентификатор пользователя | FOREIGN KEY REFERENCES Users(user_id) |
| contact_type_id | INTEGER | Идентификатор типа контакта | FOREIGN KEY REFERENCES ContactTypes(contact_type_id) |
| contact_value | TEXT | Значение контакта | NOT NULL |
| is_verified | BOOLEAN | Верифицирован ли контакт | DEFAULT FALSE |
| is_primary | BOOLEAN | Является ли контакт основным для данного типа | DEFAULT FALSE |
| verification_code | TEXT | Код верификации | |
| verification_sent_at | DATETIME | Когда был отправлен код верификации | |
| verified_at | DATETIME | Когда контакт был верифицирован | |
| last_verification_attempt | DATETIME | Последняя попытка верификации | |
| verification_attempts | INTEGER | Количество попыток верификации | DEFAULT 0 |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `contact_id`
- FK: `user_id`, `contact_type_id`
- UNIQUE: (`user_id`, `contact_type_id`, `contact_value`)
- INDEX: `is_verified`
- INDEX: `is_primary`

## Связи с другими доменами

1. **Contacts → Users**
   - `UserContacts.user_id` → `Users.user_id`
   - Каждый контакт принадлежит одному пользователю

2. **Contacts → Registration**
   - Контакты используются при регистрации аккаунтов на AliExpress
   - Email и телефон из `UserContacts` могут использоваться в `RegistrationAccounts`

3. **Contacts → Accounts**
   - Контакты могут быть связаны с аккаунтами на AliExpress
   - Email и телефон из `UserContacts` могут использоваться в `Accounts`

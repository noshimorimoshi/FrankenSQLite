# Домен пользователей (Users)

## Таблица: Users

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| user_id | INTEGER | Уникальный идентификатор пользователя | PRIMARY KEY, AUTOINCREMENT |
| username | TEXT | Имя пользователя | UNIQUE, NOT NULL |
| password_hash | TEXT | Хеш пароля | NOT NULL |
| first_name | TEXT | Имя | |
| last_name | TEXT | Фамилия | |
| email | TEXT | Основной email пользователя | UNIQUE |
| is_active | BOOLEAN | Активен ли аккаунт | DEFAULT TRUE |
| registration_date | DATETIME | Дата регистрации | DEFAULT CURRENT_TIMESTAMP |
| last_login_date | DATETIME | Дата последнего входа | |
| user_preferences | JSON | Пользовательские настройки | |
| role | TEXT | Роль пользователя (admin, manager, user) | DEFAULT 'user' |
| notes | TEXT | Примечания | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `user_id`
- UNIQUE: `username`
- UNIQUE: `email`
- INDEX: `registration_date`
- INDEX: `is_active`

## Связи с другими доменами

1. **Users → Contacts**
   - `UserContacts.user_id` → `Users.user_id`
   - Один пользователь может иметь несколько контактных данных

2. **Users → Accounts**
   - `Accounts.user_id` → `Users.user_id`
   - Один пользователь может иметь несколько аккаунтов на AliExpress

3. **Users → Registration**
   - `RegistrationAccounts.user_id` → `Users.user_id`
   - Один пользователь может иметь несколько записей регистрации
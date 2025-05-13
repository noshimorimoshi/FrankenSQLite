# Домен регистрации аккаунтов (Registration)

## Таблица: RegistrationAccounts

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| registration_id | INTEGER | Уникальный идентификатор регистрации | PRIMARY KEY, AUTOINCREMENT |
| user_id | INTEGER | Идентификатор пользователя в системе | FOREIGN KEY REFERENCES Users(user_id) |
| marketplace_id | INTEGER | Идентификатор маркетплейса | FOREIGN KEY REFERENCES Marketplace(marketplace_id) |
| email | TEXT | Email для регистрации аккаунта | NOT NULL |
| phone | TEXT | Телефон для регистрации аккаунта | |
| login | TEXT | Логин на AliExpress | |
| password | TEXT | Зашифрованный пароль | NOT NULL |
| registration_status | TEXT | Статус регистрации (pending, verified, failed, completed) | NOT NULL, DEFAULT 'pending' |
| registration_strategy | TEXT | Стратегия регистрации (standard, express, via_app) | DEFAULT 'standard' |
| email_verification_code | TEXT | Код верификации email | |
| email_verified | BOOLEAN | Верифицирован ли email | DEFAULT FALSE |
| phone_verification_code | TEXT | Код верификации телефона | |
| phone_verified | BOOLEAN | Верифицирован ли телефон | DEFAULT FALSE |
| registration_ip | TEXT | IP-адрес при регистрации | |
| registration_proxy | TEXT | Использованный прокси при регистрации | |
| user_agent | TEXT | User-Agent браузера | |
| failure_reason | TEXT | Причина неудачи (если есть) | |
| captcha_challenge | TEXT | Полученный вызов капчи | |
| captcha_solution | TEXT | Решение капчи | |
| registration_date | DATETIME | Дата начала регистрации | DEFAULT CURRENT_TIMESTAMP |
| completion_date | DATETIME | Дата завершения регистрации | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `registration_id`
- FK: `user_id`, `marketplace_id`
- INDEX: `email`
- INDEX: `phone`
- INDEX: `login`
- INDEX: `registration_status`
- INDEX: `registration_date`

## Таблица: RegistrationLogs

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| log_id | INTEGER | Уникальный идентификатор лога | PRIMARY KEY, AUTOINCREMENT |
| registration_id | INTEGER | Идентификатор регистрации | FOREIGN KEY REFERENCES RegistrationAccounts(registration_id) |
| log_type | TEXT | Тип события (email_sent, sms_sent, verification_attempt, etc.) | NOT NULL |
| log_details | JSON | Детали события | |
| response_data | JSON | Данные ответа от сервера | |
| status | TEXT | Статус события (success, failure) | NOT NULL |
| error_message | TEXT | Сообщение об ошибке (если есть) | |
| error_code | TEXT | Код ошибки (если есть) | |
| ip_address | TEXT | IP-адрес, с которого выполнено действие | |
| proxy_used | TEXT | Использованный прокси | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `log_id`
- FK: `registration_id`
- INDEX: (`registration_id`, `log_type`)
- INDEX: `created_at`
- INDEX: `status`

## Таблица: RegistrationTemplates

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| template_id | INTEGER | Уникальный идентификатор шаблона | PRIMARY KEY, AUTOINCREMENT |
| marketplace_id | INTEGER | Идентификатор маркетплейса | FOREIGN KEY REFERENCES Marketplace(marketplace_id) |
| template_name | TEXT | Название шаблона | NOT NULL |
| template_description | TEXT | Описание шаблона | |
| registration_strategy | TEXT | Стратегия регистрации | NOT NULL |
| user_agent_template | TEXT | Шаблон User-Agent | |
| default_data | JSON | Данные по умолчанию для регистрации | |
| proxy_requirements | JSON | Требования к прокси | |
| success_rate | FLOAT | Процент успешных регистраций с этим шаблоном | DEFAULT 0 |
| is_active | BOOLEAN | Активен ли шаблон | DEFAULT TRUE |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `template_id`
- FK: `marketplace_id`
- UNIQUE: (`marketplace_id`, `template_name`)
- INDEX: `is_active`
- INDEX: `success_rate`

## Связи с другими доменами

1. **Registration → Users**
   - `RegistrationAccounts.user_id` → `Users.user_id`
   - Регистрация привязана к конкретному пользователю системы

2. **Registration → Marketplace**
   - `RegistrationAccounts.marketplace_id` → `Marketplace.marketplace_id`
   - Регистрация выполняется для конкретного маркетплейса

3. **Registration → Accounts**
   - После успешной регистрации данные переносятся в таблицу `Accounts`
   - Связь через общие поля: `user_id`, `marketplace_id`, `email`, `login`, `phone`

4. **Registration → Contacts**
   - Контактные данные (email и телефон) могут быть взяты из таблицы `UserContacts`
   - После успешной регистрации и верификации, контактные данные могут быть добавлены в `UserContacts`
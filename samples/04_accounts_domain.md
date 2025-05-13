# Домен аккаунтов (Accounts)

## Таблица: Accounts

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| account_id | INTEGER | Уникальный идентификатор аккаунта | PRIMARY KEY, AUTOINCREMENT |
| user_id | INTEGER | Идентификатор пользователя | FOREIGN KEY REFERENCES Users(user_id) |
| marketplace_id | INTEGER | Идентификатор маркетплейса | FOREIGN KEY REFERENCES Marketplace(marketplace_id) |
| login | TEXT | Логин на AliExpress | NOT NULL |
| email | TEXT | Email для аккаунта | NOT NULL |
| phone | TEXT | Телефон для аккаунта | |
| account_source | TEXT | Источник аккаунта (manual, plati.market, registration) | NOT NULL |
| source_details | JSON | Детали покупки или регистрации | |
| is_verified | BOOLEAN | Верифицирован ли аккаунт | DEFAULT FALSE |
| account_created_at | DATETIME | Дата создания аккаунта на AliExpress | |
| last_login_date | DATETIME | Дата последнего входа | |
| refresh_token | TEXT | Токен обновления для OAuth | |
| access_token | TEXT | Токен доступа для OAuth | |
| token_expires_at | DATETIME | Срок действия токена | |
| is_active | BOOLEAN | Активен ли аккаунт | DEFAULT TRUE |
| last_sync_at | DATETIME | Время последней синхронизации | |
| avatar_url | TEXT | URL аватара пользователя | |
| account_level | INTEGER | Уровень аккаунта | DEFAULT 1 |
| has_coin_discount | BOOLEAN | Есть ли скидки за монеты | DEFAULT FALSE |
| has_fan_discount | BOOLEAN | Есть ли скидки фанам | DEFAULT FALSE |
| has_bonus | BOOLEAN | Есть ли бонусы | DEFAULT FALSE |
| notes | TEXT | Примечания | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `account_id`
- FK: `user_id`, `marketplace_id`
- UNIQUE: (`user_id`, `marketplace_id`, `login`)
- UNIQUE: (`user_id`, `marketplace_id`, `email`) 
- INDEX: `account_source`
- INDEX: `is_active`
- INDEX: `account_created_at`

## Таблица: AccountActions

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| action_id | INTEGER | Уникальный идентификатор действия | PRIMARY KEY, AUTOINCREMENT |
| account_id | INTEGER | Идентификатор аккаунта | FOREIGN KEY REFERENCES Accounts(account_id) |
| action_type | TEXT | Тип действия (login, order, verification, etc.) | NOT NULL |
| action_date | DATETIME | Дата и время действия | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| action_details | JSON | Детали действия | |
| ip_address | TEXT | IP-адрес, с которого выполнено действие | |
| proxy_used | TEXT | Использованный прокси | |
| user_agent | TEXT | User-Agent браузера | |
| status | TEXT | Статус действия (success, failure, pending) | NOT NULL |
| error_message | TEXT | Сообщение об ошибке, если действие не удалось | |
| notes | TEXT | Примечания | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `action_id`
- FK: `account_id`
- INDEX: (`account_id`, `action_type`)
- INDEX: `action_date`
- INDEX: `status`

## Таблица: AccountSecurity

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|------------|
| security_id | INTEGER | Уникальный идентификатор записи | PRIMARY KEY, AUTOINCREMENT |
| account_id | INTEGER | Идентификатор аккаунта | FOREIGN KEY REFERENCES Accounts(account_id) |
| has_2fa | BOOLEAN | Включена ли двухфакторная аутентификация | DEFAULT FALSE |
| two_factor_type | TEXT | Тип двухфакторной аутентификации (sms, email, app) | |
| recovery_email | TEXT | Резервный email для восстановления | |
| recovery_phone | TEXT | Резервный телефон для восстановления | |
| security_questions | JSON | Вопросы безопасности и ответы (зашифрованные) | |
| allowed_ip_ranges | JSON | Разрешенные диапазоны IP-адресов | |
| allowed_countries | JSON | Разрешенные страны для входа | |
| last_password_change | DATETIME | Дата последней смены пароля | |
| password_expiry | DATETIME | Дата истечения срока действия пароля | |
| login_attempts_limit | INTEGER | Лимит попыток входа | DEFAULT 5 |
| current_login_attempts | INTEGER | Текущее количество неудачных попыток входа | DEFAULT 0 |
| is_locked | BOOLEAN | Заблокирован ли аккаунт | DEFAULT FALSE |
| lock_reason | TEXT | Причина блокировки | |
| lock_date | DATETIME | Дата блокировки | |
| notes | TEXT | Примечания | |
| created_at | DATETIME | Дата создания записи | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Дата обновления записи | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PK: `security_id`
- FK: `account_id`
- UNIQUE: `account_id`
- INDEX: `has_2fa`
- INDEX: `is_locked`

## Связи с другими доменами

1. **Accounts → Users**
   - `Accounts.user_id` → `Users.user_id`
   - Каждый аккаунт принадлежит определенному пользователю

2. **Accounts → Marketplace**
   - `Accounts.marketplace_id` → `Marketplace.marketplace_id`
   - Каждый аккаунт принадлежит определенному маркетплейсу

3. **Accounts → Registration**
   - После успешной регистрации данные переносятся из `RegistrationAccounts` в `Accounts`
   - Связь через общие поля: `user_id`, `marketplace_id`, `email`, `login`, `phone`


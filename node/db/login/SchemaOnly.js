import { DatabaseSync } from 'node:sqlite';

// Создаем соединение с базой данных
const db = new DatabaseSync('LoginData.db');

// Функция для создания таблицы с обработкой ошибок
function createTableSafely(db, tableName, createStatement) {
  try {
    db.exec(createStatement);
    console.log(`Таблица "${tableName}" успешно создана`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`Таблица "${tableName}" уже существует, пропускаем создание`);
    } else {
      console.error(`Ошибка при создании таблицы "${tableName}":`, error.message);
      throw error; // Проброс ошибки, если она не связана с существованием таблицы
    }
  }
}

// Функция для создания индекса с обработкой ошибок
function createIndexSafely(db, indexName, createStatement) {
  try {
    db.exec(createStatement);
    console.log(`Индекс "${indexName}" успешно создан`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`Индекс "${indexName}" уже существует, пропускаем создание`);
    } else {
      console.error(`Ошибка при создании индекса "${indexName}":`, error.message);
      throw error;
    }
  }
}

try {
  // Начинаем транзакцию
  db.exec('BEGIN TRANSACTION;');

  // Создаем таблицу field_info
  createTableSafely(db, "field_info", `
    CREATE TABLE "field_info" (
      "form_signature" INTEGER NOT NULL,
      "field_signature" INTEGER NOT NULL,
      "field_type" INTEGER NOT NULL,
      "create_time" INTEGER NOT NULL,
      UNIQUE("form_signature","field_signature")
    );
  `);

  // Создаем таблицу insecure_credentials
  createTableSafely(db, "insecure_credentials", `
    CREATE TABLE "insecure_credentials" (
      "parent_id" INTEGER,
      "insecurity_type" INTEGER NOT NULL,
      "create_time" INTEGER NOT NULL,
      "is_muted" INTEGER NOT NULL DEFAULT 0,
      "trigger_notification_from_backend" INTEGER NOT NULL DEFAULT 0,
      UNIQUE("parent_id","insecurity_type"),
      FOREIGN KEY("parent_id") REFERENCES "logins" ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
    );
  `);

  // Создаем таблицу logins
  createTableSafely(db, "logins", `
    CREATE TABLE "logins" (
      "origin_url" VARCHAR NOT NULL,
      "action_url" VARCHAR,
      "username_element" VARCHAR,
      "username_value" VARCHAR,
      "password_element" VARCHAR,
      "password_value" BLOB,
      "submit_element" VARCHAR,
      "signon_realm" VARCHAR NOT NULL,
      "date_created" INTEGER NOT NULL,
      "blacklisted_by_user" INTEGER NOT NULL,
      "scheme" INTEGER NOT NULL,
      "password_type" INTEGER,
      "times_used" INTEGER,
      "form_data" BLOB,
      "display_name" VARCHAR,
      "icon_url" VARCHAR,
      "federation_url" VARCHAR,
      "skip_zero_click" INTEGER,
      "generation_upload_status" INTEGER,
      "possible_username_pairs" BLOB,
      "id" INTEGER,
      "date_last_used" INTEGER NOT NULL DEFAULT 0,
      "moving_blocked_for" BLOB,
      "date_password_modified" INTEGER NOT NULL DEFAULT 0,
      "sender_email" VARCHAR,
      "sender_name" VARCHAR,
      "date_received" INTEGER,
      "sharing_notification_displayed" INTEGER NOT NULL DEFAULT 0,
      "keychain_identifier" BLOB,
      "sender_profile_image_url" VARCHAR,
      PRIMARY KEY("id" AUTOINCREMENT),
      UNIQUE("origin_url","username_element","username_value","password_element","signon_realm")
    );
  `);

  // Создаем таблицу meta
  createTableSafely(db, "meta", `
    CREATE TABLE "meta" (
      "key" LONGVARCHAR NOT NULL UNIQUE,
      "value" LONGVARCHAR,
      PRIMARY KEY("key")
    );
  `);

  // Создаем таблицу password_notes
  createTableSafely(db, "password_notes", `
    CREATE TABLE "password_notes" (
      "id" INTEGER,
      "parent_id" INTEGER NOT NULL,
      "key" VARCHAR NOT NULL,
      "value" BLOB,
      "date_created" INTEGER NOT NULL,
      "confidential" INTEGER,
      PRIMARY KEY("id" AUTOINCREMENT),
      UNIQUE("parent_id","key"),
      FOREIGN KEY("parent_id") REFERENCES "logins" ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
    );
  `);

  // Создаем таблицу stats
  createTableSafely(db, "stats", `
    CREATE TABLE "stats" (
      "origin_domain" VARCHAR NOT NULL,
      "username_value" VARCHAR,
      "dismissal_count" INTEGER,
      "update_time" INTEGER NOT NULL,
      UNIQUE("origin_domain","username_value")
    );
  `);

  // Создаем таблицы sync_entities_metadata
  createTableSafely(db, "sync_entities_metadata", `
    CREATE TABLE "sync_entities_metadata" (
      "storage_key" INTEGER,
      "metadata" VARCHAR NOT NULL,
      PRIMARY KEY("storage_key")
    );
  `);
  
  // Создаем таблицы sync_model_metadata
  createTableSafely(db, "sync_model_metadata", `
    CREATE TABLE "sync_model_metadata" (
      "id" INTEGER,
      "model_metadata" VARCHAR NOT NULL,
      PRIMARY KEY("id")
    );
  `);

  // Создаем индексы
  createIndexSafely(db, "field_info_index", `
    CREATE INDEX "field_info_index" ON "field_info" (
      "form_signature",
      "field_signature"
    );
  `);
  
  createIndexSafely(db, "foreign_key_index", `
    CREATE INDEX "foreign_key_index" ON "insecure_credentials" (
      "parent_id"
    );
  `);
  
  createIndexSafely(db, "foreign_key_index_notes", `
    CREATE INDEX "foreign_key_index_notes" ON "password_notes" (
      "parent_id"
    );
  `);
  
  createIndexSafely(db, "logins_signon", `
    CREATE INDEX "logins_signon" ON "logins" (
      "signon_realm"
    );
  `);
  
  createIndexSafely(db, "stats_origin", `
    CREATE INDEX "stats_origin" ON "stats" (
      "origin_domain"
    );
  `);

  // Завершаем транзакцию
  db.exec('COMMIT;');
  console.log('База данных успешно инициализирована!');

} catch (error) {
  // В случае ошибки откатываем транзакцию
  console.error('Произошла ошибка при создании базы данных:', error.message);
  try {
    db.exec('ROLLBACK;');
    console.log('Транзакция отменена');
  } catch (rollbackError) {
    console.error('Ошибка при отмене транзакции:', rollbackError.message);
  }
} finally {
  // Пример запроса для проверки
  try {
    const tables = db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all();
    console.log('Таблицы в базе данных:', tables.map(t => t.name).join(', '));
  } catch (error) {
    console.error('Ошибка при получении списка таблиц:', error.message);
  }

  // Закрываем соединение с базой данных в любом случае
  try {
    db.close();
    console.log('Соединение с базой данных закрыто');
  } catch (error) {
    console.error('Ошибка при закрытии соединения:', error.message);
  }
}
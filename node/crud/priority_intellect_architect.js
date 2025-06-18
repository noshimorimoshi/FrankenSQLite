/*
* простая обёртка для CRUD на базе node:sqlite — очень минимальный ORM-подобный слой.
*/

import { open } from 'node:sqlite';
import sqlite3 from 'sqlite3';

class SimpleORM {
  constructor(db) {
    this.db = db;
  }

  async createTable(tableName, columns) {
    const cols = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(', ');
    await this.db.exec(`CREATE TABLE IF NOT EXISTS ${tableName} (${cols})`);
  }

  async insert(tableName, data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    const values = Object.values(data);
    const result = await this.db.run(sql, values);
    return result.lastID;
  }

  async findAll(tableName) {
    return await this.db.all(`SELECT * FROM ${tableName}`);
  }

  async findById(tableName, id) {
    return await this.db.get(`SELECT * FROM ${tableName} WHERE id = ?`, id);
  }

  async update(tableName, id, data) {
    const updates = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(data), id];
    const sql = `UPDATE ${tableName} SET ${updates} WHERE id = ?`;
    const result = await this.db.run(sql, values);
    return result.changes;
  }

  async delete(tableName, id) {
    const result = await this.db.run(`DELETE FROM ${tableName} WHERE id = ?`, id);
    return result.changes;
  }
}

async function main() {
  const db = await open({ filename: ':memory:', driver: sqlite3.Database });
  const orm = new SimpleORM(db);

  await orm.createTable('users', {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    name: 'TEXT NOT NULL',
    role: 'TEXT NOT NULL'
  });

  const id1 = await orm.insert('users', { name: 'Ivan', role: 'ADMIN' });
  const id2 = await orm.insert('users', { name: 'Anna', role: 'USER' });

  console.log('Все пользователи:', await orm.findAll('users'));
  console.log('Пользователь по id:', await orm.findById('users', id1));

  await orm.update('users', id2, { role: 'MODERATOR' });
  console.log('После обновления:', await orm.findAll('users'));

  await orm.delete('users', id1);
  console.log('После удаления:', await orm.findAll('users'));
}

main();

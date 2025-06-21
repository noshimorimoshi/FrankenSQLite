/*
 * ⚠️ ⚠️ ⚠️ эта версия кода требует тюнинга, в предыдущем commit пример желаемой простоты, простой обёртки для CRUD на базе node:sqlite — очень минимальный ORM-подобный слой.
 * @fileoverview Blueprint for "Wekan-Rating-Service" based on SimpleORM.
 * @version 1.0.0
 *
 * @description
 * This file integrates the "Wekan-Rating-Service" architecture into the existing
 * SimpleORM wrapper. It respects the original CRUD abstraction and extends it to
 * build the intelligent priority calculation service.
 *
 * It uses the architectural principles from `priotity_intellect_architect.md`.
 */

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import express from 'express';


// --- Configuration ---
const DATABASE_PATH = './rating_service.db';
const PORT = 3000;
// In a real app, this would be in a secure config/env file.
const WEKAN_API_CREDENTIALS = {
    'main-wekan': { apiKey: 'your-main-wekan-api-key', apiUrl: 'https://wekan.example.com/api' }
};

/**
 * A simple wrapper for CRUD operations based on node-sqlite - a very minimal ORM-like layer.
 * @class SimpleORM
 */
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

  /**
   * Extends the ORM to find a single record by arbitrary criteria.
   * @param {string} tableName - The name of the table to search.
   * @param {object} criteria - An object of key-value pairs for the WHERE clause.
   * @returns {Promise<object|undefined>}
   */
  async findOneBy(tableName, criteria) {
    const keys = Object.keys(criteria);
    if (keys.length === 0) {
      throw new Error('findOneBy requires at least one criterion.');
    }
    const whereClause = keys.map(k => `${k} = ?`).join(' AND ');
    const values = Object.values(criteria);
    return this.db.get(`SELECT * FROM ${tableName} WHERE ${whereClause}`, values);
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
    return this.db.all(`SELECT * FROM ${tableName}`);
  }

  async findById(tableName, id) {
    return this.db.get(`SELECT * FROM ${tableName} WHERE id = ?`, id);
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

/**
 * Initializes the database schema using the SimpleORM.
 * @param {SimpleORM} orm - The ORM instance.
 */
async function initializeDatabase(orm) {
    const tables = {
        WekanApps: {
            wekan_app_id: 'TEXT PRIMARY KEY',
            app_name: 'TEXT',
            api_url: 'TEXT NOT NULL',
            weight: 'REAL DEFAULT 1.0'
        },
        WekanBoardConfigs: {
            wekan_board_id: 'TEXT PRIMARY KEY',
            board_name: 'TEXT',
            weight: 'REAL DEFAULT 1.0',
            wekan_app_id: 'TEXT NOT NULL REFERENCES WekanApps(wekan_app_id)'
        },
        WekanListConfigs: {
            wekan_list_id: 'TEXT PRIMARY KEY',
            list_name: 'TEXT',
            weight: 'REAL DEFAULT 1.0',
            wekan_board_id: 'TEXT NOT NULL REFERENCES WekanBoardConfigs(wekan_board_id)'
        },
        WekanUserRatings: {
            wekan_user_id: 'TEXT PRIMARY KEY',
            user_name: 'TEXT',
            rating: 'REAL DEFAULT 5.0'
        },
        WekanLabelRatings: {
            wekan_label_id: 'TEXT PRIMARY KEY',
            label_name: 'TEXT',
            label_color: 'TEXT',
            rating_points: 'REAL DEFAULT 0'
        },
        RatingConfigurations: {
            id: 'INTEGER PRIMARY KEY CHECK (id = 1)',
            user_rating_weight: 'REAL DEFAULT 0.1',
            label_rating_weight: 'REAL DEFAULT 1.0',
            base_priority: 'REAL DEFAULT 1.0'
        }
    };

    for (const [tableName, schema] of Object.entries(tables)) {
        await orm.createTable(tableName, schema);
    }

    // Ensure the global configuration row exists using the ORM.
    const configExists = await orm.findById('RatingConfigurations', 1);
    if (!configExists) {
        await orm.insert('RatingConfigurations', {
            id: 1,
            user_rating_weight: 0.1,
            label_rating_weight: 1.0,
            base_priority: 1.0
        });
    }
}

/**
 * PLACEHOLDER: Fetches board details from the Wekan API.
 */
async function fetchBoardDetailsFromWekanAPI(wekanAppId, boardId) {
    console.log(`[API STUB] Fetching details for board ${boardId} from app ${wekanAppId}`);
    return { name: `[API] Board ${boardId}` };
}
// ... similar fetch functions for list, user, label would be defined here ...

/**
 * Implements the "On-Demand Cache" principle using the SimpleORM.
 */
async function getOrCreateEntity(orm, entityId, tableName, idColumnName, fetchFunction, creationData = {}) {
    let entity = await orm.findOneBy(tableName, { [idColumnName]: entityId });

    if (!entity) {
        console.log(`[Cache Miss] ${tableName} for ID ${entityId}. Fetching...`);
        const apiDetails = await fetchFunction(creationData.wekan_app_id, entityId);

        const newEntityData = {
            [idColumnName]: entityId,
            [`${tableName.match(/Wekan(\w+)(Config|Rating)s/)[1].toLowerCase()}_name`]: apiDetails.name,
            ...creationData
        };

        await orm.insert(tableName, newEntityData);
        console.log(`[Cache Write] Created default entry for ${entityId} in ${tableName}.`);
        entity = await orm.findOneBy(tableName, { [idColumnName]: entityId });
    } else {
        console.log(`[Cache Hit] Found ${tableName} for ID ${entityId}.`);
    }
    return entity;
}

/**
 * Calculates the final priority based on all retrieved configuration objects.
 */
function applyRatingFormula(config) {
    const { global, app, board, list, user, labels } = config;
    const maxLabelRating = labels.length > 0 ? Math.max(...labels.map(l => l.rating_points)) : 0;

    const calculated_priority = (
        global.base_priority
        + (user.rating * global.user_rating_weight)
        + (maxLabelRating * global.label_rating_weight)
    ) * app.weight * board.weight * list.weight;

    return calculated_priority;
}


async function main() {
    // Setup database and ORM
    const db = await open({ filename: DATABASE_PATH, driver: sqlite3.Database });
    const orm = new SimpleORM(db);

    // Initialize the database schema for our service
    await initializeDatabase(orm);
    console.log('Database schema initialized for Wekan-Rating-Service.');

    // Setup Express server
    const app = express();
    app.use(express.json());

    app.get('/api/calculate-priority', async (req, res) => {
        const { wekanAppId, boardId, listId, userId, labelIds } = req.query;

        if (!wekanAppId || !boardId || !listId || !userId) {
            return res.status(400).json({ error: 'Missing required query parameters.' });
        }

        try {
            const globalConfig = await orm.findById('RatingConfigurations', 1);
            // The following calls demonstrate the "On-Demand Cache" principle
            const appConfig = await getOrCreateEntity(orm, wekanAppId, 'WekanApps', 'wekan_app_id', async (id) => ({ name: `[API] App ${id}` }));
            const boardConfig = await getOrCreateEntity(orm, boardId, 'WekanBoardConfigs', 'wekan_board_id', fetchBoardDetailsFromWekanAPI, { wekan_app_id: wekanAppId });
            const listConfig = await getOrCreateEntity(orm, listId, 'WekanListConfigs', 'wekan_list_id', async (appId, id) => ({ name: `[API] List ${id}` }), { wekan_board_id: boardId });
            const userConfig = await getOrCreateEntity(orm, userId, 'WekanUserRatings', 'wekan_user_id', async (appId, id) => ({ name: `[API] User ${id}` }));
            const labels = labelIds
                ? await Promise.all(labelIds.split(',').map(id =>
                    getOrCreateEntity(orm, id, 'WekanLabelRatings', 'wekan_label_id', async (appId, id) => ({ name: `[API] Label ${id}` }))
                  ))
                : [];

            const priority = applyRatingFormula({ global: globalConfig, app: appConfig, board: boardConfig, list: listConfig, user: userConfig, labels });

            res.json({ calculated_priority: priority });
        } catch (error) {
            console.error('Error calculating priority:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Wekan-Rating-Service listening on http://localhost:${PORT}`);
        console.log('Test with a query like:');
        console.log(`http://localhost:3000/api/calculate-priority?wekanAppId=main-wekan&boardId=b1&listId=l1&userId=u1&labelIds=label1,label2`);
    });
}

main().catch(err => {
    console.error("Failed to start the service:", err);
    process.exit(1);
});

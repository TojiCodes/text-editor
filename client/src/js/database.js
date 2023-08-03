import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};

let db;
const getDB = async () => {
  if (!db) {
    db = await initDB();
  }
  return db;
};

export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await getDB();
  const tx = jateDb.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const request = store.put({ jate: content });
  await tx.done;
  console.log('🚀 - data saved to the database');
};

export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await getDB();
  const tx = jateDb.transaction(OBJECT_STORE_NAME, 'readonly');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

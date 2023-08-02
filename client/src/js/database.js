import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Opens the database
    const db = await initdb();
    
    // Opens a readwrite transaction
    const tx = db.transaction('jate', 'readwrite');
  
    // Gets the notes object store
    const store = tx.objectStore('jate');
  
    // Adds the note to the object store
    await store.put(content);
  
    // Waits for the transaction to complete
    await tx.done;

    console.log('Data stored successfully');
  } catch (error) {
    console.error('Failed to store data:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Opens the database
    const db = await initdb();
    
    // Opens a readonly transaction
    const tx = db.transaction('jate', 'readonly');
  
    // Gets the notes object store
    const store = tx.objectStore('jate');
  
    // Gets all the notes from the object store
    const data = await store.getAll();
  
    // Waits for the transaction to complete
    await tx.done;
    
    console.log('Data retrieved successfully');
  
    // Returns the data
    return data;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
  }
};

initdb();

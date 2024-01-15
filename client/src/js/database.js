import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const id = await store.put({ content: content });
    console.log(`Data saved to the database with this Id: ${id}`);
    await tx.done;
  } catch (err) {
    console.error("Error writing to the database", err);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = await store.getAll();
  console.log('request', request);
};

initdb();

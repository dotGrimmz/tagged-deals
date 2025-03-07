import { openDB } from "idb";

// Initialize the database
const dbPromise = openDB("MobileGameDB", 2, {
  // 🔥 Bump version to 2
  upgrade(db, oldVersion, newVersion) {
    if (oldVersion < 2) {
      if (db.objectStoreNames.contains("games")) {
        db.deleteObjectStore("games"); // 🚨 Remove old store with incorrect keyPath
      }
      db.createObjectStore("games", { keyPath: "id", autoIncrement: true }); // ✅ Corrected
    }
  },
});

// Export functions
export default dbPromise;

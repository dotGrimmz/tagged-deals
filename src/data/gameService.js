import dbPromise from "./idb";
import { addDays } from "date-fns";

// 📌 CREATE: Add a new game to the database
export const addGame = async (game) => {
  const db = await dbPromise;
  const newGame = { ...game, createdAt: Date.now() };
  const id = await db.add("games", newGame);
  console.log("Game added:", newGame, id);
};

// 📌 READ: Get a game by name
export const getGame = async (name) => {
  const db = await dbPromise;
  return await db.get("games", name);
};

// 📌 READ ALL: Get all games
export const getAllGames = async () => {
  const db = await dbPromise;
  const games = await db.getAll("games");
  games.sort((a, b) => b.createdAt - a.createdAt);
  return games;
};

// 📌 UPDATE: Update a game by name
export const updateGame = async (id, updatedData) => {
  const db = await dbPromise;
  let existingGame = await db.get("games", id);
  if (!existingGame) {
    console.log("Game not found!");
    return;
  }
  const updatedGame = { ...existingGame, ...updatedData };
  await db.put("games", updatedGame);
  console.log("Game updated:", updatedGame);
};

// 📌 DELETE: Remove a game by name
export const deleteGame = async (id) => {
  const db = await dbPromise;
  await db.delete("games", id);
  console.log(`Game "${id}" deleted`);
};

// 📌 DELETE ALL: Clear the entire database
export const clearGames = async () => {
  const db = await dbPromise;
  await db.clear("games");
  console.log("All games deleted");
};

export const saveGame = async (game) => {
  const db = await dbPromise;
  const tx = db.transaction("games", "readwrite");
  const store = tx.objectStore("games");

  if (game.id) {
    // 🔄 Update existing game (if it has an ID)
    await store.put(game);
    console.log("Game updated:", game);
  } else {
    // 🆕 Create new game (if no ID exists)
    delete game.id;
    const currentTimestamp = Date.now();

    // const expiryDateTs =
    //   currentTimestamp + game.daysTillExp * 24 * 60 * 60 * 1000; // Calculate expiry timestamp

    const expiryDateTs = addDays(currentTimestamp, game.daysTillExp).getTime();
    const newId = await store.add({
      ...game,
      createdAt: currentTimestamp,
      expiryDate: expiryDateTs,
    });
    console.log("New game added with ID:", newId);
  }

  await tx.done;
};

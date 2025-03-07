import { useState } from "react";
import { getAllGames, clearGames, saveGame } from "../data/gameService";
import { calculateGoldMultiplier } from "../utils/utils";

export const useTaggedApp = () => {
  const [goldOwed, setGoldOwed] = useState(0);
  const [cashPayment, setCashPayment] = useState("5");
  const [gameName, setGameName] = useState("");
  const [daysTillExpired, setDaysTillExpired] = useState(30);
  const [gameDetails, setGameDetails] = useState("");
  const [gameId, setGameId] = useState(undefined);
  const [allGames, setAllGames] = useState([]);

  const fetchGames = async () => {
    const allGames = await getAllGames();
    setAllGames(allGames);
  };

  const handleTempRes = () => {
    const { resultStr } = calculateGoldMultiplier(cashPayment, goldOwed);
    return resultStr;
  };

  const handleCheck = (cb) => {
    if (goldOwed < 1) {
      console.log("Add Gold Owed");
      cb();
      return;
    }
    calculateGoldMultiplier(cashPayment, goldOwed);
  };

  const handleReset = () => {
    setGoldOwed(0);
    setCashPayment("5");
    setGameName("");
    setGameDetails("");
    setDaysTillExpired(30);
    setGameId(undefined);
  };
  const clearDb = async () => {
    await clearGames();
    await fetchGames();
  };

  const handleAddGame = async () => {
    let submission = {
      name: gameName,
      results: {
        [cashPayment]: goldOwed,
      },
      details: gameDetails,
      daysTillExp: daysTillExpired,
      id: gameId,
    };

    try {
      let prevId = gameId;
      await saveGame(submission);
      handleReset();
      return [true, prevId];
    } catch (e) {
      console.error("error adding game");
    }
  };

  const handleSave = async (cb) => {
    if (!gameName || goldOwed < 1) {
      return cb("Add Game Name or Gold or BOTH", {
        variant: "error",
      });
    }

    const [added, id] = await handleAddGame();
    if (added) {
      // Need to refresh page to call latest games
      await fetchGames();
      setAllGames((prev) => {
        const lastUpdatedGame = prev.find((game) => game.id === id);
        const updatedGames = prev.filter((game) => game.id !== id);
        return [lastUpdatedGame, ...updatedGames];
      });

      return cb(`${id ? "Updated" : "Added "} ${gameName}`, {
        variant: "success",
      });
    }

    return cb(`Failed to ${id ? "Update" : "Add"} ${gameName}`, {
      variant: "success",
    });
  };

  const handleEdit = (id) => {
    const selectedGame = allGames.find((game) => game.id === id);
    if (!selectedGame || !selectedGame.results) return;

    const [[payment, gold]] = Object.entries(selectedGame.results);

    setCashPayment(payment);
    setGoldOwed(gold);
    setGameName(selectedGame.name);
    setGameDetails(selectedGame.details);
    setDaysTillExpired(selectedGame.daysTillExp);
    setGameId(id);
  };

  const handleDelete = () => {
    /**
     *  I believe I just need the Id
     * popover asks if they are sure
     * send the request
     * refresh the list
     */
  };

  return {
    goldOwed,
    cashPayment,
    gameName,
    daysTillExpired,
    allGames,
    gameDetails,
    fetchGames,
    handleTempRes,
    handleCheck,
    handleSave,
    clearDb,
    setGoldOwed,
    setCashPayment,
    setGameName,
    setDaysTillExpired,
    setGameDetails,
    handleEdit,
    handleDelete,
  };
};

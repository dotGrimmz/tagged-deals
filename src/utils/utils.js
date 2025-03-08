import { addDays } from "date-fns";
export const WebPrices = {
  5: 5000,
  10: 20000,
  20: 50000,
  50: 150000,
  100: 400000,
  200: 800000,
};

export const paymentOpts = [
  {
    value: "5",
    label: "5",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "100",
    label: "100",
  },
  {
    value: "200",
    label: "200",
  },
];

export const calculateGoldMultiplier = (payment, goldOwed, gameName) => {
  const webGold = WebPrices[payment];
  const goldMultiplier = (goldOwed / webGold).toFixed(2);
  let resultStr = `Spend ${payment}$ on ${
    gameName ? gameName : "this game"
  } and get ${goldOwed} gold, that's ${goldMultiplier}x as much as web ${
    WebPrices[payment]
  } gold.`;

  return {
    payment,
    webGold,
    goldOwed,
    goldMultiplier: `${goldMultiplier}x`,
    resultStr,
  };
};

/**
 *
 * calculate the amount of days left before offers expire
 *  I need to take the days till exp value
 *
 *  add that amount of days to the createdAt Value
 * and that will be the expiryDateTs value
 *
 *
 * This needs to be formatted for a timestamp
 * expiryDateTs = addDays(new Date.now(), game.daysTillExp).getTime()
 */
export const computeDaysTillExp = (createdDate, daysPending) => {
  // moving this to the the db method
  const expDateTs = addDays(createdDate, daysPending).getTime();
};

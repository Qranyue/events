import { createEvents } from "../src/index";

const evConter = createEvents();

evConter.on("a", (a, b, c) => {
  console.log(a, b, c);
});

evConter.emit("a", 1, 2, 3);
evConter.emit("a", 1, 2, 3);

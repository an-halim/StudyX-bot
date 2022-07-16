import StudyX from "./lib/studyX.js";
import readLineSync from "readline-sync";

(async () => {
  console.log("\nStudyX BOT");
  console.log("by _anhalim\n");
  let inviteCode = readLineSync.question("Input invitation code: ");

  while (true) {
    let bot = new StudyX(inviteCode);
    await bot.run();
  }

})();

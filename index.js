import { generateArticleWithAI } from "./openAI/openaiAPI.js";
import { postArticleAsync } from "./medium/mediumAPI.js";
import { TOPICS } from "./openAI/topics.js";
import { config } from "dotenv";
import fs from "fs";
config();

let currentTopicIndex = 0;
function log(message) {
  const date = new Date();
  const logMessage = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:: ${message} \r`;
  fs.appendFileSync("log.txt", logMessage);
}

async function generateArticle() {
  log(`currentTopicIndex: ${currentTopicIndex}`);
  log("Waiting 24 hours...");
  await setTimeout(async () => {
    if (!!TOPICS[currentTopicIndex].name) {
      log(
        `Generating article form topic: ${TOPICS[currentTopicIndex].name}...`
      );
      try {
        // generate article
        const article = await generateArticleWithAI(TOPICS[currentTopicIndex]);

        // post article
        log("Posting article to medium...");
        await postArticleAsync(article);
        log("Article posted to medium!");

        // increase index and repeat
        currentTopicIndex = currentTopicIndex++;
        generateArticle();
      } catch (error) {
        log(error.message);
      }
    } else {
      log("No more topics");
    }
  }, 86400000);
}

log("---------------------------------");
log("Starting to generate articles...");
console.log("Starting to generate articles...");
console.log("check log.txt for more information...");
await generateArticle();

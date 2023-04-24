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
  // fs.appendFileSync("log.txt", logMessage);
  console.log(logMessage);
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

        log("Logging article to file");
        await fs.writeFileSync(
          `./medium/articles/${TOPICS[currentTopicIndex].file}`,
          article.content
        );

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
  }, 90000000);
}

log("---------------------------------");
log("Starting to generate articles...");
await generateArticle();

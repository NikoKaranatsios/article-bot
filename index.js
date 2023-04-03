import { generateArticleWithAI } from "./openAI/openaiAPI.js";
import { postArticleAsync } from "./medium/mediumAPI.js";
import { TOPICS } from "./openAI/topics.js";
import { config } from "dotenv";
config();

let currentTopicIndex = 0;

async function generateArticle() {
  console.log("currentTopicIndex: ", currentTopicIndex);
  console.log("Waiting 24 hours...");
  await setTimeout(async () => {
    console.log(
      "Generating new article. Topic: ",
      TOPICS[currentTopicIndex].name
    );
    if (currentTopicIndex < TOPICS.length) {
      const article = await generateArticleWithAI(TOPICS[currentTopicIndex]);
      await postArticleAsync(article);
      currentTopicIndex++;
      generateArticle();
    } else {
      console.log("No more topics");
    }
  }, 86400000);
}

console.log("Starting to generate articles...");
// insert some console art here
console.log(":::::::::::::::::::::::::::;::::::::::::::::::::::");
console.log(":::::::::::::::::::::::::::;::::::::::::::::::::::");
console.log("Press Ctrl + C to stop");
await generateArticle();

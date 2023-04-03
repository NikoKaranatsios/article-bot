import { generateArticleWithAI } from "./openAI/openaiAPI.js";
import { getArticlesAsync, postArticleAsync } from "./medium/mediumAPI.js";
import { TOPICS } from "./openAI/topics.js";
import { config } from "dotenv";
config();

const currentTopicIndex = 0;

if (currentTopicIndex < TOPICS.length) {
  const article = await generateArticleWithAI(TOPICS[currentTopicIndex]);
  await postArticleAsync(article);
} else {
  console.log("No more topics");
}

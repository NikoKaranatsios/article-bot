import { generateArticleWithAI } from "./generateArticleWithAI.js";
import { TOPICS } from "./topics.js";
import { config } from "dotenv";
config();

console.log(process.env.OPENAI_API_KEY);

const currentTopicIndex = 0;

if (currentTopicIndex < TOPICS.length) {
  // const article = await generateArticleWithAI(TOPICS[currentTopicIndex]);
  const article = "This is a test article";
  console.log(article);
} else {
  console.log("No more topics");
}

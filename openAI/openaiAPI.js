import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_ACCESS_TOKEN,
});
const openai = new OpenAIApi(configuration);

export async function generateArticleWithAI(topic) {
  const message = {
    role: "user",
    content:
      topic.contnet + "\n\n Please use the following format: " + topic.format,
  };

  const content = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [message],
    })
    .then((res) => res.data.choices[0].message)
    .catch((err) => {
      throw new Error(err);
    });

  let articleBody = content.concat("\n\n", "...");
  articleBody = articleBody.concat("\n", "written by: ", "https://openai.com");

  const article = {
    title: topic.name,
    contentFormat: topic.format,
    content: articleBody,
  };

  return article;
}

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-EhRcnFN06RPOnNAkNz1JgZin",
  apiKey: process.env.OPENAI_ACCESS_TOKEN,
});
const openai = new OpenAIApi(configuration);

export async function generateArticleWithAI(topic) {
  const message = {
    role: "user",
    content:
      topic.contnet + "\n\n Please use the following format:" + topic.format,
  };

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [message],
  });

  const content = completion.data.choices[0].message;
  const articleBody = content.concat("\n\n", "...");
  articleBody.concat("\n\n", "written by: ", "https://openai.com");

  const article = {
    title: topic.name,
    contentFormat: topic.format,
    content: articleBody,
  };

  return article;
}

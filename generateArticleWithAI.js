import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-EhRcnFN06RPOnNAkNz1JgZin",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export async function generateArticleWithAI(topic) {
  const message = {
    role: "user",
    content: topic.contnet,
  };

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [message],
  });

  const content = completion.data.choices[0].message;
  const article = content.concat("\n\n", "...");
  article.concat("\n\n", "written by: ", "https://openai.com");

  return article;
}

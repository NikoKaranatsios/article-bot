import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-EhRcnFN06RPOnNAkNz1JgZin",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listEngines({});

console.log(response.data);

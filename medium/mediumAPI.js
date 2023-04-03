import fetch from "node-fetch";
import { config } from "dotenv";
config();

const mediumBaseURL = "https://api.medium.com/v1";
const accessToken = process.env.MEDIUM_ACCESS_TOKEN;

export async function getUserInformationAsync() {
  const response = await fetch(`${mediumBaseURL}/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

/**
 * Post an article to a users medium account and get the information about the article back
 * @param {string} article
 * @returns {Promise<JSON>}
 */
export async function postArticleAsync(article) {
  const user = await getUserInformationAsync();
  const userID = user.data.id;

  const response = await fetch(`${mediumBaseURL}/users/${userID}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
    body: JSON.stringify(article),
  });

  return response.json();
}

/**
 * Get all articles from a user
 * @returns {Promise<JSON>}
 */
export async function getArticlesAsync() {
  const user = await getUserInformationAsync();
  const userID = user.data.id;
  const response = await fetch(
    `${mediumBaseURL}/users/${userID}/publications`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

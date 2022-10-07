import faunadb from "faunadb";

export const q = faunadb.query;

export const getClient = (region) => {
  let config;
  switch (region) {
    case "US" || "CA":
      config = {
        secret: "fnAEyOigRHAAId4RkUGJ8jqf5zmiDhw8B6ccQKwn", // secret should be in env variables
        domain: "db.us.fauna.com",
      }
      break;
    case "EU":
      config = {
        secret: "fnAEyQ4M9fAAyzq3hnegxEZI0yysL9-RCk2WFCgb",
        domain: "db.eu.fauna.com",
      }
  }
  return new faunadb.Client(config)
};
const defaultLLMConfig = {
  // moonshot
  moonshot: {
    apiKey: "",
    modelName: "moonshot-v1-8k",
    baseUrl: "https://api.moonshot.cn/v1",
  },

  // openai
  openai: {
    apiKey: "",
    modelName: "gpt-4-turbo-preview",
    baseUrl: "https://api.openai.com/v1",
  },

  // azure
  azure: {
    apiKey: "",
    modelName: "gpt-35-turbo",
    baseUrl: "***",
    apiVersion: "2024-02-15-preview",
  },

  // gemini
  gemini: {
    apiKey: "",
    modelName: "",
    baseUrl: "***",
  },

  // g4f
  g4f: {
    apiKey: "xxx",
    modelName: "gpt-3.5-turbo-16k-0613",
    baseUrl: "***",
  },

  // gpt4js
  gpt4js: {
    apiKey: "xxx",
    provider: "Nextway",
    modelName: "gpt-4o-free",
    baseUrl: "***",
  },

  otherAI: {
    apiKey: "",
    modelName: "",
    baseUrl: "",
  },

  // default
  default: {
    apiKey: "",
    modelName: "",
    baseUrl: "***",
  },
};

module.exports = defaultLLMConfig;

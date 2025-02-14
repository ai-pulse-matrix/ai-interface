const axios = require("axios");
const { get } = require("lodash");
const G4F = require("g4f");
const getGPT4js = require("gpt4js");
const OpenAI = require("openai");
const { OpenAIApi: AzureOpenAIApi, Configuration } = require("azure-openai");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");

class AIInterface {
  constructor(config) {
    this.config = config;
    this.llmConfig = this.getLLMConfig();
  }

  getLLMConfig() {
    const provider = this.config.provider.toLowerCase();
    let llmConfig = { ...this.config.default };

    const providerConfigs = {
      moonshot: this.config.moonshot,
      openai: this.config.openai,
      azure: this.config.azure,
      gemini: this.config.gemini,
      g4f: this.config.g4f,
      gpt4js: this.config.gpt4js,
      other: this.config.otherAI,
      deepseek: this.config.deepseek, // 添加 deepseek 配置
    };

    if (provider in providerConfigs) {
      const providerConfig = providerConfigs[provider];
      if (providerConfig) {
        llmConfig = { ...llmConfig, ...providerConfig };
      }
    } else {
      throw new Error("LLM provider is not set in the config file.");
    }

    return llmConfig;
  }

  async callAIInterface(prompt) {
    let content = "";
    const provider = this.config.provider.toLowerCase();

    switch (provider) {
      case "g4f":
        content = await this.callG4F(prompt);
        break;
      case "gpt4js":
        content = await this.callGPT4JS(prompt);
        break;
      case "gemini":
        content = await this.callGemini(prompt);
        break;
      case "azure":
        content = await this.callAzure(prompt);
        break;
      case "other":
        content = await this.callOther(prompt);
        break;
      case "deepseek":
        content = await this.callDeepseek(prompt);
        break;
      default:
        content = await this.callOpenAI(prompt);
    }

    return content.replace("\n", "");
  }

  async callG4F(prompt) {
    const g4f = new G4F();
    const modelName = this.config.g4f.modelName;
    const messages = [{ role: "user", content: prompt }];
    try {
      return await g4f.chatCompletion(messages, { model: modelName });
    } catch (e) {
      console.log(`Sorry, there was an error calling g4f.`, e);
      return "";
    }
  }

  async callGPT4JS(prompt) {
    const providerName = this.config.gpt4js?.provider || "Nextway";
    const gpt4js = await getGPT4js();
    const provider = gpt4js.createProvider(providerName);
    const modelName = this.config.gpt4js.modelName;
    const messages = [{ role: "user", content: prompt }];
    try {
      return await provider.chatCompletion(
        messages,
        {
          provider: providerName,
          model: modelName,
        },
        (data) => {}
      );
    } catch (e) {
      console.log(`Sorry, there was an error calling gpt4js.`, e);
      return "";
    }
  }

  async callGemini(prompt) {
    const generationConfig = {
      temperature: 0.5,
      top_p: 1,
      top_k: 1,
      max_output_tokens: 2048,
    };
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    const genAI = new GoogleGenerativeAI(this.llmConfig.apiKey);
    const model = genAI.getGenerativeModel({
      model: this.llmConfig.modelName || "",
      generationConfig,
      safetySettings,
    });

    const chat = model.startChat();
    try {
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (e) {
      console.log(`Sorry, there was an error calling gemini.`, e);
      return "";
    }
  }

  async callAzure(prompt) {
    const client = new AzureOpenAIApi(
      new Configuration({
        apiKey: this.llmConfig.apiKey,
        basePath: this.llmConfig.baseUrl,
      })
    );

    const response = await client.createCompletion({
      model: this.llmConfig.modelName,
      prompt: prompt,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text.trim();
  }

  async callOther(prompt) {
    try {
      const data = { message: prompt, ...this.llmConfig.data };
      const response = await axios.post(
        this.llmConfig.baseUrl,
        data,
        this.llmConfig.requestConfig
      );

      if (response && response.data) {
        const responsePath =
          this.llmConfig.responsePath || "data.choices[0].message.content";
        return get(response.data, responsePath, "");
      }
      return "";
    } catch (error) {
      console.error("Error making other API call:", error);
      throw error;
    }
  }

  async callOpenAI(prompt) {
    console.log(this.config.provider, JSON.stringify(this.llmConfig));
    const client = new OpenAI({
      apiKey: this.llmConfig.apiKey,
      baseURL: this.llmConfig.baseUrl,
    });
    const response = await client.chat.completions.create({
      model: this.llmConfig.modelName,
      messages: [{ role: "user", content: prompt }],
    });
    if (response) {
      return response.choices[0]?.message?.content || "";
    }
    return "";
  }

  async callDeepseek(prompt) {
    console.log(this.config.provider, JSON.stringify(this.llmConfig));
    const client = new OpenAI({
      apiKey: this.llmConfig.apiKey,
      baseURL: this.llmConfig.baseUrl,
    });
    const response = await client.chat.completions.create({
      model: this.llmConfig.modelName,
      messages: [{ role: "user", content: prompt }],
    });
    if (response) {
      return response.choices[0]?.message?.content || "";
    }
    return "";
  }
}

module.exports = AIInterface;

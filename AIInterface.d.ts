declare module "AIInterface" {
  import { AxiosRequestConfig } from "axios";

  interface AIConfig {
    provider: string;
    default: any;
    moonshot?: any;
    openai?: any;
    azure?: any;
    gemini?: any;
    g4f?: any;
    gpt4js?: any;
    otherAI?: any;
    deepseek?: any;
  }

  interface LLMConfig {
    apiKey?: string;
    modelName?: string;
    baseUrl?: string;
    data?: any;
    requestConfig?: AxiosRequestConfig;
    responsePath?: string;
    provider?: string;
    [key: string]: any;
  }

  class AIInterface {
    constructor(config: AIConfig);

    private config: AIConfig;
    private llmConfig: LLMConfig;

    private getLLMConfig(): LLMConfig;

    callAIInterface(prompt: string): Promise<string>;

    private callG4F(prompt: string): Promise<string>;
    private callGPT4JS(prompt: string): Promise<string>;
    private callGemini(prompt: string): Promise<string>;
    private callAzure(prompt: string): Promise<string>;
    private callOther(prompt: string): Promise<string>;
    private callOpenAI(prompt: string): Promise<string>;
    private callDeepseek(prompt: string): Promise<string>;
  }

  export = AIInterface;
}

# AIInterface

AIInterface is a flexible AI interface class that supports multiple AI providers, including OpenAI, Azure, Google Gemini, G4F, GPT4JS, custom APIs, and Deepseek.

## Installation

First, ensure you have installed all necessary dependencies:

```bash
npm install ai-interface
```

## Usage

1. Import the AIInterface class:

```javascript
const AIInterface = require("ai-interface");
```

2. Create a configuration object:

```javascript
const config = {
  provider: "openai", // or 'azure', 'gemini', 'g4f', 'gpt4js', 'custom', 'deepseek'
  default: {
    // Default configuration
  },
  openai: {
    apiKey: "your-openai-api-key",
    modelName: "gpt-3.5-turbo",
    baseUrl: "https://api.openai.com/v1",
  },
  // Configuration for other providers...
};
```

3. Initialize AIInterface:

```javascript
const ai = new AIInterface(config);
```

4. Call the AI interface:

```javascript
async function main() {
  const prompt = "Hello, can you tell me about today's weather?";
  try {
    const response = await ai.callAIInterface(prompt);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## Supported Providers

- OpenAI
- Azure OpenAI
- Google Gemini
- G4F
- GPT4JS
- Deepseek
- Moonshot
- Custom API

## Configuration

Each provider requires specific configuration. Ensure that you include the necessary API keys, model names, and base URLs in the configuration object.

### OpenAI Configuration

```javascript
openai: {
  apiKey: "your-openai-api-key",
  modelName: "gpt-3.5-turbo",
  baseUrl: "https://api.openai.com/v1",
}
```

### Azure Configuration

```javascript
azure: {
  apiKey: "your-azure-api-key",
  modelName: "your-azure-model",
  baseUrl: "your-azure-endpoint",
}
```

### Google Gemini Configuration

```javascript
gemini: {
  apiKey: "your-gemini-api-key",
  modelName: "gemini-pro",
}
```

### Custom API Configuration

```javascript
customAI: {
  baseUrl: "your-custom-api-endpoint",
  data: {
    // Additional data to send with the request
  },
  requestConfig: {
    // Axios request configuration
  },
  responsePath: "data.choices[0].message.content",
}
```

## Error Handling

The AIInterface class throws errors when configuration is missing or API calls fail. Ensure you handle these errors appropriately in your application.

## Advanced Usage

### Switching Providers

You can switch between providers by updating the `provider` field in your configuration:

```javascript
config.provider = "azure";
const azureAI = new AIInterface(config);
```

### Custom Provider Implementation

To add a new provider, extend the `AIInterface` class and implement a new method for your provider:

```javascript
class ExtendedAIInterface extends AIInterface {
  async callNewProvider(prompt) {
    // Implement the API call for the new provider
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests to improve this project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Thanks to all the AI providers for their APIs
- Contributors and maintainers of the dependencies used in this project

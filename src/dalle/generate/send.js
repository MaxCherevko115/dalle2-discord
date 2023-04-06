const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const send = async(userPrompt, userQty) => {
    userQty = userQty || 1;

    try {
        const response = await openai.createImage({
            prompt: userPrompt,
            size: "1024x1024",
            n: userQty,
            response_format: 'b64_json'
        });
        return response.data;

    } catch (error) {
        return {error: error.response.data.error.message};
    }
    
}

module.exports = send;
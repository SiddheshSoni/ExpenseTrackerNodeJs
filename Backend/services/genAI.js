const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});


const suggestCategory = async(description) =>{
    try{
        const response = await ai.models.generateContent({
            "model":"gemini-3.6-flash",
            "contents":`Give only one suitable category for an item with this description in plain text and only one word- ${description}`,
        });
        const category = response.text;
        // console.log(typeof(category));
        return category;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    suggestCategory
};
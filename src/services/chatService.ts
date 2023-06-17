import { MessageProps } from "@/components/Messages";
import { Configuration, OpenAIApi } from "openai";
import {
    ChatCompletionRequestMessage,
    ChatCompletionRequestMessageRoleEnum,
} from "openai";

export const createChatResponse = async (
    userProfile: any,
    chatPartnerProfile: any,
    messages: MessageProps[]
) => {
    // This hardcodes insertion of 'User-Agent'
    let config = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_GPT4,
    });

    // Delete it
    delete config.baseOptions.headers["User-Agent"];
    let openai = new OpenAIApi(config);
    console.log("chatPartnerProfile", chatPartnerProfile);
    console.log("userProfile", userProfile);
    let prompt =
        "Hallo! Habe eine Unterhaltung mit mir" +
        "Mein Vorname ist: " +
        userProfile.firstName +
        ". Mein Nachname ist: " +
        userProfile.lastName +
        ". Ich studiere " +
        userProfile.study +
        " und ich habe Folgende Interessen " +
        userProfile.interests +
        ". Du als AI Bot bist Person: Vorname" +
        chatPartnerProfile.firstName +
        ", Nachname: " +
        chatPartnerProfile.lastName +
        ", Alter: " +
        chatPartnerProfile.age +
        "Du als AI Bot studierst folgendes: " +
        chatPartnerProfile.study +
        " und du als AI Bot hast folgende Interessen: " +
        chatPartnerProfile.interests;

    if (messages.length === 0) {
        prompt +=
            ". Erwähne nicht, dass du ein KI Modell bist. Fange eine Unterhaltung an. Sprich mich auf mein Stuidum oder meine Interessen an. Erwähne auch dein Studium und deine Interessen. Schreibe maximal 3 Sätze";
    } else {
        prompt +=
            ". Sei mein Gesprächspartner. Erwähne nicht, dass du ein KI Modell bist. Führe die Konversation über mein Studium oder meine Interessen weiter. Erwähne auch dein Studium und deine Interessen";
    }

    var promptMessages: ChatCompletionRequestMessage[] = [];
    promptMessages.push({
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: prompt,
    });

    messages.forEach((message) => {
        let msg: ChatCompletionRequestMessage = {
            role:
                message.userId > 100
                    ? ChatCompletionRequestMessageRoleEnum.User
                    : ChatCompletionRequestMessageRoleEnum.Assistant,
            content: message.message,
        };
        promptMessages.push(msg);
    });

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k-0613",
        messages: promptMessages,
    });
    console.log(chatCompletion.data.choices[0].message);
    return chatCompletion.data.choices[0].message?.content ?? "";
};

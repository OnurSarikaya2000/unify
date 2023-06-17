"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getMatchUser } from "@/services/matchService";
import { IProfile, getProfileLocalStorage } from "@/services/profile";
import { createChatResponse } from "@/services/chatService";
import { MessageProps, MessagesComponent } from "@/components/Messages";

export default function Chat({ params }: { params: { id: string } }) {
    const [chatUser, setChatUser] = useState<any | null>(null);
    const [user, setUser] = useState<IProfile | null>(null);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [messageText, setMessageText] = useState("");

    const handleMessageTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMessageText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setMessages([...messages, { userId: 101, message: messageText }]);
        // Send `profile` to an API or something...
        setMessageText("");
    };

    useEffect(() => {
        const chatUser = getMatchUser(params.id);
        console.log(params.id, chatUser);
        const user = getProfileLocalStorage();

        console.log(user, chatUser);
        setUser(user);
        setChatUser(chatUser);

        if (
            (messages.length > 0 &&
                messages[messages.length - 1].userId === 101) ||
            messages.length === 0
        ) {
            chatPrompt();
        }
    }, [params.id, messages]);

    async function chatPrompt() {
        const chatUser = getMatchUser(params.id);
        console.log(params.id, chatUser);
        const user = getProfileLocalStorage();
        const messageResponse = await createChatResponse(
            user,
            chatUser,
            messages
        );
        setMessages([
            ...messages,
            { userId: chatUser ? chatUser.id : 0, message: messageResponse },
        ]);
    }

    return (
        <div className={styles.container}>
            {chatUser && (
                <div>
                    <div className={styles.card}>
                        <div className={styles.infoHeaderText}>
                            <h2 style={{ margin: 0 }}>
                                Chat - {chatUser.firstName} {chatUser.lastName}
                            </h2>
                            <p style={{ margin: 0 }}>Age: {chatUser.age}</p>
                        </div>
                        <div className={styles.info}>
                            <p>Studienfach: {chatUser.study}</p>
                            <p>Interessen: {chatUser.interests.join(", ")}</p>
                        </div>
                    </div>

                    <MessagesComponent messages={messages} />
                </div>
            )}

            <form className={styles.messageBox} onSubmit={handleSubmit}>
                <label style={{ width: "100%" }} className={styles.label}>
                    <input
                        className={styles.input}
                        value={messageText}
                        name="messageBox"
                        placeholder="Nachricht eingeben"
                        onChange={handleMessageTextChange}
                    />
                </label>
                <input
                    className={styles.sendButton}
                    value="Senden"
                    type="submit"
                />
            </form>
        </div>
    );
}

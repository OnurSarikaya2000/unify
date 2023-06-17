import styles from "./messages.module.css";

export interface MessageProps {
    userId: number;
    message: string;
}

export const MessagesComponent = ({
    messages,
}: {
    messages: MessageProps[];
}) => {
    return (
        <div>
            {messages.map((message, index) => (
                <div key={index} className={styles.message}>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

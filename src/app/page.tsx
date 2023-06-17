"use client";

import Image from "next/image";
import styles from "./page.module.css";
import getMatches from "@/services/matchService";
import { useRouter } from "next/navigation";

export default function Home() {
    const { push } = useRouter();
    const matches = getMatches();

    function openChat(id: number) {
        console.log(`Open chat with ${id}`);
        push(`/chat/${id}`);
    }

    return (
        <div className={styles.container}>
            <h2>Matches</h2>
            {matches.map((match, i) => (
                <div
                    key={match.id}
                    className={styles.card}
                    onClick={() => openChat(match.id)}
                >
                    <div className={styles.infoHeaderText}>
                        <h2 style={{ margin: 0 }}>
                            {match.firstName} {match.lastName}
                        </h2>
                        <p style={{ margin: 0 }}>Age: {match.age}</p>
                    </div>
                    <div className={styles.info}>
                        <p>Study: {match.study}</p>
                        <p>Interests: {match.interests.join(", ")}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

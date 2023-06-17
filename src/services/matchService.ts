let matches = [
    {
        id: 1,
        firstName: "Johannes",
        lastName: "Müller",
        age: 25,
        study: "Informatik",
        interests: ["Programmieren", "Wandern", "Schach"],
    },
    {
        id: 2,
        firstName: "Sofia",
        lastName: "Ivanova",
        age: 22,
        study: "Maschinenbau",
        interests: ["Robotik", "Musik", "Malerei"],
    },
    {
        id: 3,
        firstName: "Mohammed",
        lastName: "Al-Salem",
        age: 23,
        study: "Betriebswirtschaft",
        interests: ["Wirtschaft", "Golf", "Lesen"],
    },
    {
        id: 4,
        firstName: "Isabella",
        lastName: "Rossi",
        age: 24,
        study: "Umweltwissenschaften",
        interests: ["Naturschutz", "Camping", "Fotografie"],
    },
    {
        id: 5,
        firstName: "François",
        lastName: "Dubois",
        age: 25,
        study: "Physik",
        interests: ["Astrophysik", "Laufen", "Gitarre"],
    },
    {
        id: 6,
        firstName: "Fatima",
        lastName: "Hassan",
        age: 22,
        study: "Chemie",
        interests: ["Organische Chemie", "Yoga", "Kochen"],
    },
    {
        id: 7,
        firstName: "Javier",
        lastName: "Gomez",
        age: 23,
        study: "Literatur",
        interests: ["Schreiben", "Reisen", "Filme"],
    },
];

export default function getMatches() {
    return matches;
}

export function getMatchUser(id: string) {
    return matches.find((match) => `${match.id}` === id);
}

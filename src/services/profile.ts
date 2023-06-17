"use client";

export interface IProfile {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    study: string;
    interests: string[];
}

export function getProfileLocalStorage(): IProfile | null {
    const localStorageProfile = localStorage.getItem("profile");
    console.log("getProfileLocalStorage", localStorageProfile);
    if (localStorageProfile === null) {
        return null;
    }
    let profile = JSON.parse(localStorageProfile);
    return profile;
}

export function setProfileLocalStorage(profile: IProfile) {
    console.log("setProfileLocalStorage", JSON.stringify(profile));
    localStorage.setItem("profile", JSON.stringify(profile));
    console.log("saved", localStorage.getItem("profile"));
}

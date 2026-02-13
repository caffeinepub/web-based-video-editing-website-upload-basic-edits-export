import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EditSettings {
    trimOut: bigint;
    mute: boolean;
    trimIn: bigint;
    playbackSpeed: number;
}
export type Time = bigint;
export interface Project {
    created: Time;
    name: string;
    settings: EditSettings;
    updated: Time;
}
export interface backendInterface {
    getProject(name: string): Promise<Project>;
    listProjects(): Promise<Array<Project>>;
    listProjectsView(): Promise<Array<[string, Time]>>;
    saveProject(name: string, settings: EditSettings): Promise<void>;
}

export interface BuildPaths {
    entry: string;
    html: string;
    public: string;
    output: string;
    src: string;
}

export type BuildMode = "development" | "production";
export type BuildPlatfom = "mobile" | "desktop";

export interface BuildOptions {
    port?: number;
    paths: BuildPaths;
    mode: BuildMode;
    platform: BuildPlatfom;
    analyzer?: boolean;
}
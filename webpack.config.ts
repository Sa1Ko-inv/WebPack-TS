import fs from "fs";
import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatfom } from "./config/build/types/types";
import CopyPlugin from "copy-webpack-plugin";

interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatfom;
}

export default (env: any) => {
    const isProd = env.mode === 'production';

    const paths: BuildPaths = {

        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    };

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
    });


    // Копируем build в docs только если папка build уже существует
    if (isProd) {
        config.plugins?.push({
            apply: (compiler: { hooks: { afterEmit: { tap: (arg0: string, arg1: () => void) => void; }; }; }) => {
                compiler.hooks.afterEmit.tap("CopyPlugin", () => {
                    const buildPath = path.resolve(__dirname, "build");
                    const docsPath = path.resolve(__dirname, "docs");

                    if (fs.existsSync(buildPath)) {
                        fs.rmSync(docsPath, { recursive: true, force: true });
                        fs.cpSync(buildPath, docsPath, { recursive: true });
                    } else {
                    }
                });
            }
        });
    }

    return config;
};

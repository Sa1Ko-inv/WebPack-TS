import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildPlagins} from "./buildPlagins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";
import {buildLoaders} from "./buildLoaders";

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options;
    const isDev = mode === "development";

 return {
     mode: mode ?? 'development',
     entry: paths.entry,
     output: {
         path: paths.output,
         filename: '[name].[contenthash].js',
         clean: true,
         // publicPath: '/',
     },
     plugins: buildPlagins(options),
     module: {
         rules: buildLoaders(options)
     },
     resolve: buildResolvers(options),
     devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
     devServer: isDev ? buildDevServer(options) : undefined,
 }
}
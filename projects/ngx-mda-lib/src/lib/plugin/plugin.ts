import { AngularCompilerPlugin, AngularCompilerPluginOptions, ivy } from '@ngtools/webpack';
import * as ts from 'typescript';
import * as webpack from 'webpack';

// This key is used to access a private property on the AngularCompilerPlugin
// that indicates whether we are running in JIT mode or not
export const JIT_MODE = '_JitMode';

export default {
    config(config: webpack.Configuration) {
        console.log('HELLO PLUGIN s');

        const angularWebpackPlugin = findAngularWebpackPlugin(config) as ivy.AngularWebpackPlugin;

        if (!angularWebpackPlugin) {
            throw new Error('Could not inject TypeScript Transformer: Webpack AngularWebpackPlugin not found');
        }

        const jitMode = isJitMode(angularWebpackPlugin);

        // Turn off direct template loading. By default this option is `true`, causing
        // the plugin to load component templates (HTML) directly from the filesystem.
        // This is more efficient than using the raw-loader. However, if we want to add
        // a custom html-loader we have to turn off direct template loading. To do so
        // we have to remove the old compiler plugin and create a new instance with
        // updated options.

        // We also don't run the TypeChecker in a forked process when AOT is enabled.
        // Because of template and class transformations this results in type errors.
        // TODO: This needs a bit further investigation.

        const options: ivy.AngularPluginOptions = {
            ...angularWebpackPlugin.options,
            directTemplateLoading: false,
        };

        config.plugins = removeCompilerPlugin(config.plugins, angularWebpackPlugin);

        const newCompilerPlugin = new ivy.AngularWebpackPlugin(options);
        config.plugins.push(newCompilerPlugin);

        return config;
    },
};

function findAngularCompilerPlugin(config: webpack.Configuration) {
    return config.plugins && config.plugins.find(isAngularCompilerPlugin);
}

function findAngularWebpackPlugin(config: webpack.Configuration) {
    return config.plugins && config.plugins.find(isAngularWebpackPlugin);
}

function isAngularWebpackPlugin(plugin: webpack.Plugin) {
    return plugin instanceof ivy.AngularWebpackPlugin;
}

function isAngularCompilerPlugin(plugin: webpack.Plugin) {
    return plugin instanceof AngularCompilerPlugin;
}

function addTransformers(acp: any, transformers: Array<ts.TransformerFactory<ts.SourceFile>>): void {
    // The AngularCompilerPlugin has no public API to add transformers, use private API _transformers instead
    acp._transformers = [...transformers, ...acp._transformers];
}

function removeCompilerPlugin(plugins: webpack.Plugin[], acp: webpack.Plugin) {
    return plugins.filter((plugin) => plugin !== acp);
}

function isJitMode(plugin: ivy.AngularWebpackPlugin) {
    return plugin[JIT_MODE];
}

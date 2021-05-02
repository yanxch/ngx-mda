import { ivy } from '@ngtools/webpack';
import * as webpack from 'webpack';

export default {
    config(config: webpack.Configuration) {
        console.log('HELLO PLUGIN s');

        const angularWebpackPlugin = findAngularWebpackPlugin(config) as ivy.AngularWebpackPlugin;

        if (!angularWebpackPlugin) {
            throw new Error('Could not inject TypeScript Transformer: Webpack AngularWebpackPlugin not found');
        }

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

function findAngularWebpackPlugin(config: webpack.Configuration) {
    return config.plugins && config.plugins.find(isAngularWebpackPlugin);
}

function isAngularWebpackPlugin(plugin: webpack.Plugin) {
    return plugin instanceof ivy.AngularWebpackPlugin;
}

function removeCompilerPlugin(plugins: webpack.Plugin[], acp: webpack.Plugin) {
    return plugins.filter((plugin) => plugin !== acp);
}

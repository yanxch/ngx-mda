import { workspaces } from '@angular-devkit/core';
import { Rule } from '@angular-devkit/schematics';
import { chain, externalSchematic, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { ProjectType, WorkspaceTargets } from '@schematics/angular/utility/workspace-models';
import { AddSchema } from './schema';

type WorkspaceTarget = 'build' | 'serve' | 'test';

interface NgxBuildPlusOptions {
    extraWebpackConfig: string;
    plugin: string;
}

const libPath = 'node_modules/@typebytes/ngx-template-streams';

export default function (options: AddSchema): Rule {
    return async (tree: Tree) => {
        const workspace = await getWorkspace(tree);
        const project = getProject(options, workspace);

        const ngxBuildPlusOptions = {
            ...options,
            project,
        };

        return chain([
            externalSchematic('ngx-build-plus', 'ng-add', ngxBuildPlusOptions),
            updateBuilderOptions(options),
        ]);
    };
}

function updateBuilderOptions(options: AddSchema) {
    return (tree: Tree) => {
        const builderOptions: NgxBuildPlusOptions = {
            extraWebpackConfig: `${libPath}/webpack/webpack.config.js`,
            plugin: `~${libPath}/internal/plugin.js`,
        };

        const workspace = getWorkspace(tree);
        const project = getProject(options, workspace);
        const architect = workspace.projects[project].architect;

        if (!architect) {
            throw new SchematicsException(`Expected node projects/${project}/architect`);
        }

        addOptions(project, architect, 'build', builderOptions);
        addOptions(project, architect, 'serve', builderOptions);
        addOptions(project, architect, 'test', builderOptions);

        return updateWorkspace(workspace);
    };
}

function getProject(options: AddSchema, workspace: workspaces.WorkspaceDefinition) {
    return options.project || Object.keys(workspace.projects)[0];
}

function addOptions(
    project: string,
    architect: WorkspaceTargets<ProjectType>,
    target: WorkspaceTarget,
    ngxBuildPlusOptions: NgxBuildPlusOptions
) {
    const workspaceTarget = architect[target];

    if (!workspaceTarget) {
        throw new SchematicsException(`Expected node projects/${project}/architect/${target} in angular.json`);
    }

    workspaceTarget.options = {
        ...workspaceTarget.options,
        ...ngxBuildPlusOptions,
    };
}

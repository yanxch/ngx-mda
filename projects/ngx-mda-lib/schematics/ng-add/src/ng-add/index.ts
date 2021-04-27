import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageToPackageJson } from '../utils/package-config';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const ngxBuildPlusVersion = '^11.0.0';

export function ngAdd(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        addPackageToPackageJson(tree, 'ngx-build-plus', ngxBuildPlusVersion, 'devDependencies');

        const installTaskId = _context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

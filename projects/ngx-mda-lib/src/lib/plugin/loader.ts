import { loader } from 'webpack';
import * as html from 'remark-html';
import * as remark from 'remark';
// Problem: unist-util-visit is not a ESM Module ? ==> write your own?
import { removePosition } from 'unist-util-remove-position';

const parentTransformer = (processor: any, options: any) => {
    const transformer = (node) => {
        if (node.children) {
            node.children.forEach((child) => {
                child.parent = node.type;
                if (child.children) {
                    transformer(child);
                }
            });
        }

        return node;
    };

    return transformer;
};

const listTransformer = (processor: any, options: any) => {
    const transformer = (node) => {
        const list = node.children.filter((n) => n.type === 'list');

        console.log('Found a list: ', JSON.stringify(list));

        return node;
    };

    return transformer;
};

const codeTransformer = (processor: any, options: any) => {
    const transformer = (node) => {
        console.log('Node:', node);
        const codeDefs = node.children.filter((n) => n.type === 'code');

        codeDefs.forEach((n) => {
            n.value = n.value.replace(/{/g, "{{ '{' @@");
            n.value = n.value.replace(/}/g, "{{ '}' }}");
            n.value = n.value.replace(/@@/g, '}}');
        });

        return node;
    };

    return transformer;
};

function transform(template: string) {
    const processor = remark()
        .use(removePosition as any)
        .use(listTransformer as any)
        .use(codeTransformer as any)
        .use(html);

    const result = processor.processSync(template);

    return result.toString();
}

export default function transformHtmlLoader(source: string): string;
export default function transformHtmlLoader(this: loader.LoaderContext, source: string): string {
    // fetching content of export default "CONTENT"
    const regex = /(?<=((?<=[\s,.:;"']|^)["']))(?:(?=(\\?))\2.)*?(?=\1)/gmu; // lol driven development
    const match = source.match(regex);
    const result = transform(match[0].replace(/\\n/g, '\n'));
    console.log('Result: ', result);
    return 'export default `' + result + '`';
}

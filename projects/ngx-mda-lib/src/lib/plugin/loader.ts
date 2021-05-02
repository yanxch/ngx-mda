import { loader } from 'webpack';
import * as html from 'remark-html';
import * as remark from 'remark';
import * as handlers from 'mdast-util-to-hast/lib/handlers';

const visitNgFor = (listItem: any) => {
    const transform = (node) => {
        if (node.children) {
            node.children.forEach((child) => {
                if (child.type === 'text' && child.value.includes('ngFor')) {
                    const ngForValue = child.value;
                    child.value = ''; // remove from child
                    listItem.type = 'angularListItem';
                    listItem.value = ngForValue;
                }
                if (child.children) {
                    transform(child);
                }
            });
        }
    };
    transform(listItem);
};

const listTransformer = (processor: any, options: any) => {
    const transformer = (node) => {
        if (node.type === 'listItem') {
            visitNgFor(node);
        }

        if (node.children) {
            node.children.forEach((n) => transformer(n));
        }

        return node;
    };

    return transformer;
};

const codeTransformer = (processor: any, options: any) => {
    const transformer = (node) => {
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
        // .use(removePosition as any)
        .use(listTransformer as any)
        .use(codeTransformer as any)
        .use(html, {
            handlers: {
                angularListItem: function (h, node) {
                    console.log('Within custom angular list item handler!!', node);
                    const result = handlers.listItem(h, node);

                    result.properties = {
                        ...result.properties,
                        ['*ngFor']: (node as any).value.replace('*ngFor=', '').replace('"', '').replace('"', ''),
                    };

                    console.log(result);

                    return result;
                },
            },
        });

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

import { loader } from 'webpack';
import * as html from 'remark-html';
import * as remark from 'remark';
import * as handlers from 'mdast-util-to-hast/lib/handlers';
import * as loaderUtils from 'loader-utils';

function transform(template: string, transformers: any[]) {
    console.log('Transform....', transformers);
    const processor = remark();

    transformers.forEach((t) => processor.use(t.transform));

    processor.use(html, {
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
    const options = loaderUtils.getOptions(this);
    console.log('MAH OPTIONS: ', options);

    // fetching content of export default "CONTENT"
    const regex = /(?<=((?<=[\s,.:;"']|^)["']))(?:(?=(\\?))\2.)*?(?=\1)/gmu; // lol driven development
    const match = source.match(regex);
    const result = transform(match[0].replace(/\\n/g, '\n'), options.transformers);
    console.log('Result: ', result);
    return 'export default `' + result + '`';
}

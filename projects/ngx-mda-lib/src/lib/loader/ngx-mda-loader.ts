import { loader } from 'webpack';
import * as html from 'remark-html';
import * as remark from 'remark';

import * as loaderUtils from 'loader-utils';

function transform(template: string, transformers: any[], customHandlers: {}) {
    const processor = remark();

    transformers.forEach((t) => processor.use(t.transform));

    processor.use(html, {
        handlers: {
            ...customHandlers,
        },
    });

    const result = processor.processSync(template);

    return result.toString();
}

export default function transformHtmlLoader(source: string): string;
export default function transformHtmlLoader(this: loader.LoaderContext, source: string): string {
    const options = loaderUtils.getOptions(this);
    console.log('MAH OPTIONS: ', options);

    // fetching CONTENT from string >>export default "CONTENT"<<
    const regex = /(?<=((?<=[\s,.:;"']|^)["']))(?:(?=(\\?))\2.)*?(?=\1)/gmu; // lol driven development
    const match = source.match(regex);
    const result = transform(match[0].replace(/\\n/g, '\n'), options.transformers, options.handlers);
    console.log('Result: ', result);
    return 'export default `' + result + '`';
}

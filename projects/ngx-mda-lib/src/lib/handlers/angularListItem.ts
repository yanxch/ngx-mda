import * as handlers from 'mdast-util-to-hast/lib/handlers';

export function angularListItem(h, node) {
    console.log('Within custom angular list item handler!!', node);
    const result = handlers.listItem(h, node);

    result.properties = {
        ...result.properties,
        ['*ngFor']: (node as any).value.replace('*ngFor=', '').replace('"', '').replace('"', ''),
    };

    console.log(result);

    return result;
}

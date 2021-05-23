export function transform(processor: any, options: any) {
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
}

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

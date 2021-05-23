export function transform(processor: any, options: any) {
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
}

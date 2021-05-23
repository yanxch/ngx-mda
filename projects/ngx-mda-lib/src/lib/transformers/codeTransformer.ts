export function transform(processor: any, options: any) {
    const transformer = (node) => {
        console.log('im code TRANSFORMER ', JSON.stringify(node, undefined, "    "));
        const codeDefs = node.children.filter((n) => n.type === 'code');
        console.log('found code defs: ', codeDefs);
        codeDefs.forEach((n) => {
            n.value = n.value.replace(/{/g, "{{ '{' @@");
            n.value = n.value.replace(/}/g, "{{ '}' }}");
            n.value = n.value.replace(/@@/g, '}}');
        });

        return node;
    };

    return transformer;
}

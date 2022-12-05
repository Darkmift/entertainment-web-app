export function prettyStringify(
    obj: string | unknown,
    key: string = '',
): string {
    let payload = obj;
    if (key?.length || typeof obj !== 'object') payload = { [key]: obj };
    return JSON.stringify(payload, null, 2);
}

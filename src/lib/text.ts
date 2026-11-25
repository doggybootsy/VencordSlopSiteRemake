export function humanFriendlyJoin<T>(elements: T[], mapper: (e: T) => string = String): string {
    const { length } = elements;
    if (length === 0) return "";
    if (length === 1) return mapper(elements[0]);

    let s = "";
    for (let i = 0; i < length; i++) {
        s += mapper(elements[i]);
        if (length - i > 2) s += ", ";
        else if (length - i > 1) s += " and ";
    }
    return s;
}

export function formatCount(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

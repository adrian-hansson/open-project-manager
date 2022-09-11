export function getRangeOfNumbers(start: number, end: number): number[] {
    let range: number[] = [];

    for (let number = start; number < end; number++) {
        range.push(number);
    }

    return range;
}

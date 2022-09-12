export const abbreviateText = (text: string, maxTextLength?: number, cutoffSuffix?: string): string => {
    maxTextLength = maxTextLength || 20;
    const isTextLongerThanCutoff: boolean = !!(text && text.length && text.length > maxTextLength);
    
    if (isTextLongerThanCutoff) {
        cutoffSuffix = cutoffSuffix || '...';
        const cutoffText: string = text.slice(0, maxTextLength) + cutoffSuffix;

        return cutoffText;
    }

    return text;
};

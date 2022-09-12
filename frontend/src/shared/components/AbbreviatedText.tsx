import { abbreviateText } from "shared/utils/abbreviateText";

export interface IAbbreviatedTextProps {
    text: string;
    maxTextLength?: number;
    cutoffSuffix?: string;
}

function AbbreviatedText(props: IAbbreviatedTextProps) {
    return (
        <abbr title={props.text}>
            {abbreviateText(props.text, props.maxTextLength, props.cutoffSuffix)}
        </abbr>
    );
}

export default AbbreviatedText

export interface ICopyrightProps {
    copyrightHolder: string;
}

function Copyright(props: ICopyrightProps) {
    return (
        <div className="copyright">
            Copyright {props.copyrightHolder} {new Date().getFullYear()}
        </div>
    )
}

export default Copyright

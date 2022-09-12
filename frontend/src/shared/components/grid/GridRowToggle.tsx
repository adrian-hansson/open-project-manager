export interface IGridRowToggleProps {
    isCollapsed: boolean;
    onClick: () => void;
}

function GridRowToggle(props: IGridRowToggleProps) {
  return (
    <button className='row-toggle' onClick={props.onClick}>
        {props.isCollapsed ? '+' : '-'}
    </button>
  )
}

export default GridRowToggle;

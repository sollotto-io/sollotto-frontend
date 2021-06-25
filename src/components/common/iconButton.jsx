import { Tooltip } from '@material-ui/core';

export default function IconButton({ icon, tooltip, onClick, className, style }) {
  return (
    <Tooltip title={tooltip}>
      <img onClick={onClick} src={icon} className={className ?? ''} alt="hi" style={style ?? {}} />
    </Tooltip>
  );
}

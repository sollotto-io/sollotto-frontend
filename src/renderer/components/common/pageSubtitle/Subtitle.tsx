export default function PageSubTitle({
  subtitle,
  style,
}: {
  subtitle: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <h4 className="pageSubTitle" style={style ?? {}}>
      {subtitle}
    </h4>
  );
}

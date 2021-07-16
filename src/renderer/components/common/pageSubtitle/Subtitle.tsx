export default function PageSubTitle({
  subtitle,
}: {
  subtitle: string;
}): JSX.Element {
  return <h4 className="pageSubTitle">{subtitle}</h4>;
}

import "./index.scss";
export default function CharityImage({
  charityId,
}: {
  charityId: string;
}): JSX.Element {
  return (
    <img
      src={`https://app.sollotto.io/images/pictures/${charityId}.png`}
      height={150}
      alt="charity"
      className="charityImg"
    />
  );
}

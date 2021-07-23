import "./index.scss";
export default function CharityImage({
  charityId,
}: {
  charityId: string;
}): JSX.Element {
  return (
    <img
      src={`${process.env.REACT_APP_IMAGE_LINK}${charityId}`}
      height={150}
      alt="charity"
      className="charityImg"
    />
  );
}

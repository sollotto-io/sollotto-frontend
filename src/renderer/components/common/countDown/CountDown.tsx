import "./index.scss";

import useCountdown from "../../../hooks/useCountDown";

export default function CountDown({ date }: { date: string }): JSX.Element {
  const { days, hours, min, sec } = useCountdown(date);

  return (
    <>
      {days}:{hours}:{min}:{sec}
    </>
  );
}

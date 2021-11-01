import Paragraph from "../../common/paragraph/Parapraph";

export default function TicketPrice({
  price,
}: {
  price?: number;
}): JSX.Element {
  return (
    <Paragraph className="ticketPrice">
      Ticket Price: {price ?? 0.1} SOL
    </Paragraph>
  );
}

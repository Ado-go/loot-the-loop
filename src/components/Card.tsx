type CardProps = {
  suit: string;
  value: string;
  revealed: boolean;
  position: number;
};

export default function Card({ suit, value, revealed, position }: CardProps) {
  let color = "";

  if (revealed) {
    switch (value) {
      case "Joker":
        color = " text-amber-300";
        break;
      case "A":
        color = "text-blue-400";
        break;
      case "J":
      case "Q":
      case "K":
        color = "text-red-400";
        break;
      default:
        color = "";
        break;
    }
  }
  return (
    <>
      <div className={"w-10 h-32 bg-gray-700 border " + color}>
        <span className="relative bottom-5">{position}</span>
        {revealed ? suit + value : "??"}
      </div>
    </>
  );
}

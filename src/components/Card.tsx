type CardProps = {
  suit: string;
  value: string;
  revealed: boolean;
  position: number;
};

export default function Card({ suit, value, revealed, position }: CardProps) {
  return (
    <>
      <div className="w-10 h-32 bg-gray-700 border">
        <span className="relative bottom-5">{position}</span>
        {revealed ? suit + value : "??"}
      </div>
    </>
  );
}

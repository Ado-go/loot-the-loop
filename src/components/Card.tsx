type CardProps = {
  suit: string;
  value: string;
  revealed: boolean;
};

export default function Card({ suit, value, revealed }: CardProps) {
  <div>{revealed ? suit + value : "??"}</div>;
}

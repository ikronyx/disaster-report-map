type Props = {
  total: number;
  floods: number;
  roadBlocks: number;
  powerOutages: number;
};

export default function StatsCards({
  total,
  floods,
  roadBlocks,
  powerOutages,
}: Props) {
  const cards = [
    {
      label: "Total Reports",
      value: total,
    },
    {
      label: "Floods",
      value: floods,
    },
    {
      label: "Road Blocks",
      value: roadBlocks,
    },
    {
      label: "Power Outages",
      value: powerOutages,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded p-4 shadow">
          <div className="text-sm text-gray-500">{card.label}</div>

          <div className="text-3xl font-bold">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

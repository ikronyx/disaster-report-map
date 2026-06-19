type Props = {
  incidents: any[];
};

export default function RecentReportsTable({ incidents }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">Recent Reports</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Type</th>

            <th className="text-left">Score</th>

            <th className="text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="border-t">
              <td>{incident.type}</td>

              <td>{incident.verificationScore}</td>

              <td>{new Date(incident.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

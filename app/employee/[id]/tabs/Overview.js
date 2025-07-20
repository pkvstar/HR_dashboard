export default function Overview() {
  const history = [
    'Promoted to Team Lead in 2023',
    'Completed AWS Certification',
    'Lead Developer for Product X',
    'Mentored 3 interns',
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-2">Past Performance History</h3>
      <ul className="list-disc pl-5 text-gray-700">
        {history.sort(() => 0.5 - Math.random()).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

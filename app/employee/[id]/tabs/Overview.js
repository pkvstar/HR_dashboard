import { useUsers } from '../../../context/UserContext';

export default function Overview() {
  const {addBookMarkUser,theme} = useUsers();
  const history = [
    'Promoted to Team Lead in 2023',
    'Completed AWS Certification',
    'Lead Developer for Product X',
    'Mentored 3 interns',
  ];

  return (
    <div className="space-y-2">
      <h3 className={` ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900'} text-lg font-semibold mb-2`}>Past Performance History</h3>
      <ul className={`list-disc pl-5 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}>
        {history.sort(() => 0.5 - Math.random()).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

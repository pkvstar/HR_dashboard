import { MessageCircleMore } from 'lucide-react';
import { useUsers } from '../../../context/UserContext';

export default function Feedback() {
  const mockFeedbacks = [
    "Great team player and communicator.",
    "Delivered project ahead of deadline.",
    "Strong technical skills.",
    "Needs to improve documentation habits.",
  ];
  const {theme} = useUsers();
  
  return (
    <div>
      <h3 className={` ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900'} text-lg font-semibold mb-2 flex gap-1`}><MessageCircleMore /> Feedback</h3>
      <ul className={`space-y-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}>
        {mockFeedbacks.sort(() => 0.5 - Math.random()).map((fb, idx) => (
          <li key={idx} className="border-l-4 border-blue-500 pl-3">
            {fb}
          </li>
        ))}
      </ul>
    </div>
  );
}

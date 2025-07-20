'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Overview from './tabs/Overview';
import Projects from './tabs/Projects';
import Feedback from './tabs/Feedback';
import { useUsers } from '../../context/UserContext';


const tabs = ['Overview', 'Projects', 'Feedback'];

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const getBadgeColor = (rating) => {
  if (rating >= 4) return 'bg-green-500';
  if (rating >= 3) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function EmployeeDetail() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('Overview');
  const rating = getRandomRating();
  const {theme} = useUsers();
  

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.id == id);
    setUser(found);
  }, [id]);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className={`p-8 ${ theme === 'light' ? 'bg-gray-50' : 'bg-gray-900' } min-h-screen`}>
      <h1 className={`text-3xl font-bold mb-4 ${ theme === 'light' ? 'text-gray-900' : 'text-gray-50' }`}>{user.firstName} {user.lastName}</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className={`${ theme === 'light' ? 'text-gray-900' : 'text-gray-50' } mb-2`}><strong>Email:</strong> {user.email}</p>
          <p className={`${ theme === 'light' ? 'text-gray-900' : 'text-gray-50' } mb-2`}><strong>Phone:</strong> {user.phone}</p>
          <p className={`${ theme === 'light' ? 'text-gray-900' : 'text-gray-50' } mb-2`}><strong>Address:</strong> {user.address?.address}, {user.address?.city}</p>
          <p className={`${ theme === 'light' ? 'text-gray-900' : 'text-gray-50' } mb-2`}><strong>Bio:</strong> Passionate and dedicated employee. Loves team collaboration.</p>
        </div>

        <div className="mt-4 sm:mt-0">
          <p className="text-gray-600"><strong>Performance Rating:</strong></p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
            <span className={`ml-3 px-2 py-1 rounded-full text-white text-xs ${getBadgeColor(rating)}`}>
              {rating} Stars
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-sm font-medium ${
              tab === t ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === 'Overview' && <Overview />}
        {tab === 'Projects' && <Projects />}
        {tab === 'Feedback' && <Feedback />}
      </div>
    </div>
  );
}

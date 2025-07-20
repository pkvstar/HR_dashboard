'use client'
import React,{useState,useEffect} from 'react'
import { useUsers } from '../context/UserContext';
import Link from "next/link"
const page = () => {
  const [bookUsers,setBookUsers] = useState([]); 
  const {deleteBookMarkUser,bookMarkedUser} = useUsers();
  
  useEffect(() => {
    setBookUsers(bookMarkedUser);
  }, [bookMarkedUser]);

  function delBook(user) {
    deleteBookMarkUser(user.id);
    alert(`${user.firstName} is removed from Bookmarks`);
  }
  
  function promotionUser(data){
    alert(`${data.firstName} ${data.lastName} is promoted to higher post`);
  } 
  return (
    bookMarkedUser.length < 1 ? <h1 className='text-red-500 p-10 text-2xl'>No User is BookMarked</h1> : 
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">BookMarked Employee</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.company?.department}</p>
              <p><strong>Title:</strong> {user.company?.title}</p>
              <p><strong>Rating:</strong> ⭐ {user.rating}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <Link href={`/employee/${user.id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  View
                </button>
              </Link>
              <button onClick={()=>{delBook(user)}} className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm">
                Remove from Bookmark
              </button>
              <button onClick={()=>{promotionUser(user)}} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                Promote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
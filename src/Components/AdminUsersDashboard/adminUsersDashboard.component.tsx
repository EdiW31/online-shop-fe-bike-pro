import React from 'react'
import { useState, useEffect} from 'react'       
import { getUsers, deleteUsers } from '../../EndPoints/Users/users.endpoints'


interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    id: string;
}

export const UsersDashboard = () => {

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    }
    
    useEffect(() => {
        fetchUsers();
    }, []);

    // Assuming deleteUsers function exists and requires a userId as an argument

// Step 1: Modify the handleDelete function
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Extract the user id from the button's dataset or another attribute
        const userId = event.currentTarget.getAttribute('data-userid');
        
        if (userId) {
            await deleteUsers(userId);
            await fetchUsers();
        }
    };    

return (
    <div>
        <div className="">
        <div className="flex items-center justify-between pb-6">
            <div>
            <h2 className="font-semibold text-gray-700 text-2xl">All the informations are here:</h2>
            <span className="text-xs text-gray-500">View accounts of registered users and edit or delete them.</span>
            </div>
            <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
                
            </div>
            </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Created at</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-500">
                {users.map((user) => (
                    <tr>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap max-w-10">{user.id}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                        <div className="ml-3">
                        <p className="whitespace-no-wrap">{user.name}</p>
                        </div>
                    </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.email}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.createdAt}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    {user.role === 'ADMIN' ? (
                        <span className="bg-green-200 text-green-600 rounded-full px-3 py-1 text-xs font-semibold"> {user.role} </span>
                    ) : (
                    <span className="bg-blue-200 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold"> {user.role} </span>
                    )}
                    </td>
                    <td className='border-b border-gray-50 bg-white px-5 py-5 text-sm'>
                        <button className='text-sm mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'>Edit</button>
                        <button onClick={handleDelete} data-userid={user.id} className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'>Delete</button>
                    </td>

                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UsersDashboard

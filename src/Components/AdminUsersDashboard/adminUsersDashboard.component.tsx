import React from 'react';
import { useState, useEffect } from 'react';
import { getUsers, deleteUsers, updateUsers } from '../../EndPoints/Users/users.endpoints';

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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Assuming deleteUsers function exists and requires a userId as an argument

  // Step 1: Modify the handleDelete function
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // Extract the user id from the button's dataset or another attribute
    const userId = event.currentTarget.getAttribute('data-userid');

    if (userId) {
      await deleteUsers(userId);
      await fetchUsers();
    }
  };

  const handleUpdate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // Extract the user id from the button's dataset or another attribute
    const userId = event.currentTarget.getAttribute('data-userid');
  
    if (userId) {
      await updateUsers(userId, { name: '', email: '', role: ''});
      await fetchUsers();
    }
  }

  return (
    <div>
      <div className=''>
        <div className='flex items-center justify-between pb-6'>
          <div>
            <h2 className='font-semibold text-gray-700 text-2xl'>
              All the informations are here:
            </h2>
            <span className='text-xs text-gray-500'>
              View accounts of registered users and edit or delete them.
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='ml-10 space-x-8 lg:ml-40'></div>
          </div>
        </div>
        <div className='overflow-y-hidden rounded-lg border'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white'>
                  <th className='px-5 py-3'>ID</th>
                  <th className='px-5 py-3'>Name</th>
                  <th className='px-5 py-3'>Email</th>
                  <th className='px-5 py-3'>Created at</th>
                  <th className='px-5 py-3'>Role</th>
                  <th className='px-5 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-500'>
                {users.map(user => (
                  <tr>
                    <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                      <p className='whitespace-no-wrap max-w-10'>{user.id}</p>
                    </td>
                    <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                      <div className='flex items-center'>
                        <div className='ml-3'>
                          <p className='whitespace-no-wrap'>{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                      <p className='whitespace-no-wrap'>{user.email}</p>
                    </td>
                    <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                      <p className='whitespace-no-wrap'>{user.createdAt}</p>
                    </td>

                    <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                      {user.role === 'ADMIN' ? (
                        <span className='bg-green-200 text-green-600 rounded-full px-3 py-1 text-xs font-semibold'>
                          {' '}
                          {user.role}{' '}
                        </span>
                      ) : (
                        <span className='bg-blue-200 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold'>
                          {' '}
                          {user.role}{' '}
                        </span>
                      )}
                    </td>
                    <td className='border-b border-gray-50 bg-white px-5 py-5 text-sm'>
                      <button className='text-sm mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'>
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        data-userid={user.id}
                        className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="bg-slate-100 ">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold ">Update user</h2>
                    <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">New Email</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Enter the new Email"/>
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">New Name</label>
                                <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Enter the new Name" />
                            </div>
                            
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Update product
                            </button>
                            <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;

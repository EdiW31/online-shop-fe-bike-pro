import { useEffect, useState } from 'react';
import AdminNavbar from '../../Components/AdminNavbar/navbar.component';
import { getUsers, updateUsers } from '../../EndPoints/Users/users.endpoints';
import { UsersDashboard } from '../../Components/AdminUsersDashboard/adminUsersDashboard.component';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleInputChange = (userId: string, field: string, value: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, [field]: value } : user));
  };

  const handleSave = async (userId: string) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      try {
        const updateData = { name: user.name, email: user.email, role: user.role };
        await updateUsers(user.id, updateData);
        console.log(user.id)
        console.log(user)
        console.log('User updated successfully');
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  return (
    <div>
      <div className="sticky top-0 left-0">
        <AdminNavbar />
      </div>
      <section className="flex flex-col p-10 ml-20 gap-5">
        <h1 className="text-4xl text-neutral-400">Users Dashboard, edit, delete, create!</h1>
        <div className="bg-teal-600 p-1 rounded-full" />
        <div className="w-full lg:block">
          <UsersDashboard />
          {/* <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 ">Id</th>
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Role</th>
                <th></th>
              </tr>
              {users.map((user) => (
                <tr className="border-b hover:bg-orange-100" key={user.id}>
                  <td className="p-3 px-5">
                    {user.id}
                  </td>
                  <td className="p-3 px-5">
                    <input type="text" value={user.name} name="name" onChange={(e) => handleInputChange(user.id, e.target.name, e.target.value)}
                      className="bg-transparent border-b-2 border-gray-300 py-2" />
                  </td>
                  <td className="p-3 px-5">
                    <input type="text" value={user.email} name="email" onChange={(e) => handleInputChange(user.id, e.target.name, e.target.value)}
                      className="bg-transparent border-b-2 border-gray-300 py-2" />
                  </td>
                  <td className="p-3 px-5">
                    <select value={user.role} name="role" onChange={(e) => handleInputChange(user.id, e.target.name, e.target.value)} className="bg-transparent border-b-2 border-gray-300 py-2">
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button type="button" onClick={() => handleSave(user.id)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                    <button type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
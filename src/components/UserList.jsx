import React, { useState, useMemo } from 'react';
import useApi from '../hooks/useApi';
import Card from './Card';
import Button from './Button';

const UserList = () => {
  const { data: users, loading, error, loadMore } = useApi('https://jsonplaceholder.typicode.com/users');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (error) {
    return (
      <Card className="text-center py-8">
        <div className="text-red-600 dark:text-red-400">
          <p className="text-xl mb-2">Error loading users</p>
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through our user directory
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search users by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredUsers.length} users found
          </div>
        </div>
      </Card>

      {loading && users.length === 0 && (
        <Card className="text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                {user.company.name}
              </p>
              <div className="text-xs text-gray-400 dark:text-gray-600">
                {user.address.city}, {user.address.zipcode}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No users found matching your search.
          </p>
        </Card>
      )}

      {users.length > 0 && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="secondary"
          >
            {loading ? 'Loading...' : 'Load More Users'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
import React, { useEffect, useState } from 'react';

function AdminUserControl() {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/auth/getallusers')
      .then(response => response.json())
      .then(data => {
        // Initialize state for each user
        const usersWithState = data.map(user => ({
          ...user,
          isDeactivated: user.isDeactivated,
          role: user.role || 'User', // Default to 'User' if no role is set
        }));
        setUsers(usersWithState);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleExpandClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const handleSave = (userIndex) => {
    const user = users[userIndex];
    fetch('http://localhost:3001/api/auth/updateuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        isDeactivated: user.isDeactivated,
        role: user.role,
        isVerified: user.isVerified,
        isNews: user.isNews
      }),
    })
      .then(response => {
        if (response.ok) {
          alert('User updated successfully');
        } else {
          alert('Failed to update user');
        }
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleChange = (userIndex, changes) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...changes };
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>User Management</h2>
      {users.map((user, index) => (
        <div key={user._id}>
          <p onClick={() => handleExpandClick(user._id)}>{user.username} - {user.email}</p>
          {expandedUserId === user._id && (
            <div>
              <p>
                Verified: 
                <input
                  type="checkbox"
                  checked={user.isVerified}
                  onChange={e => handleChange(index, { isVerified: e.target.checked })}
                />
              </p>
              <p>
                Deactivated: 
                <input
                  type="checkbox"
                  checked={user.isDeactivated}
                  onChange={e => handleChange(index, { isDeactivated: e.target.checked })}
                />
              </p>
              <p>
                Signed up forlnews Letter: 
                <input
                  type="checkbox"
                  checked={user.isNews}
                  onChange={e => handleChange(index, { isNews: e.target.checked })}
                />
              </p>
              <p>
                Role: 
                <select
                  value={user.role}
                  onChange={e => handleChange(index, { role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="verifiedUser">Verified User</option>
                </select>
              </p>
              <button onClick={() => handleSave(index)}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminUserControl;

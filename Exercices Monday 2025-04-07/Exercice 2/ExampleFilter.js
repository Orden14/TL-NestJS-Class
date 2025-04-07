/**
 * @param {Array<{username: string, email: string}>} users
 * @param {string} filter
 *
 * @returns {Array<{username: string, email: string}>}
 */
function filterUsers(users, filter) {
    return users.filter(user =>
        user.username.includes(filter) || user.email.includes(filter)
    );
}

const users = [
    { username: 'coucou', email: 'superemail@test.com' },
    { username: 'odette', email: 'hello@example.com' },
    { username: 'kassadin', email: 'hardstyle@freelp.net' }
];

const filteredUsers = filterUsers(users, 'hardstyle');
console.log(filteredUsers)

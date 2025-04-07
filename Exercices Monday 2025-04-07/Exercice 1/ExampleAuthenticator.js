function generateToken(user) {
    const userString = JSON.stringify(user);

    return btoa(userString);
}

function verifyToken(token) {
    const userString = atob(token);
    const user = JSON.parse(userString);

    return user.username;
}

const user = { username: 'testUser', password: 'passwordTest123' };
const token = generateToken(user);
console.log('Token:', token);

const decodedUsername = verifyToken(token);
console.log('Decoded Username:', decodedUsername);

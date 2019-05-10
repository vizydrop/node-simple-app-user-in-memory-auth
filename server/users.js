const users = {
    bob: {
        password: 'abc123',
        name: 'Bob',
        email: 'bob@mail.mm'
    },
    tom: {
        password: 'abc321',
        name: 'Tom',
        email: 'tom@mail.mm'
    }
};


function findUser(username, password) {
    const user = users[username];
    if (!user) {
        return null;
    }

    return user.password === password ? user : null;
}

module.exports = {
    findUser,
};

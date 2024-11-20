const bcrypt = require('bcryptjs');

async function setPassword(plainTextPassword) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    console.log('Hashed Password:', hash);
}

setPassword('admin')

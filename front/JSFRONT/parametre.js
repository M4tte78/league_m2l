const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'm2l'
});

function updateProfilePicture(userId, imagePath) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET profile_picture = ? WHERE id = ?', [imagePath, userId], (error, results) => {
            if (error) {
                console.error('Failed to update profile picture:', error);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    updateProfilePicture
};
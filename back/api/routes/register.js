router.post('/registration', (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hash], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server error');
                return;
            }

            res.status(201).send('User registered');
        });
    });
});
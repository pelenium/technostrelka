const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const dbPath = path.join(__dirname, 'database.db');

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY, user_id INTEGER, url TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY, user_id INTEGER, url TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS raw_files (id INTEGER PRIMARY KEY, user_id INTEGER, url TEXT)');
});

app.use(express.static('html'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/profile/upload', upload.single('media'), (req, res) => {
    const { username } = req.query;
    const mediaPath = req.file.path;

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error('Error retrieving user from database:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!row) {
            console.log('User not found');
            return res.status(401).send('User not found');
        }

        if (req.file.mimetype.startsWith('image')) {
            db.run('INSERT INTO photos (user_id, url) VALUES (?, ?)', [row.id, mediaPath], (err) => {
                if (err) {
                    console.error('Error inserting photo into database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.redirect('/profile?username=' + username);
            });
        } else if (req.file.mimetype.startsWith('video')) {
            db.run('INSERT INTO videos (user_id, url) VALUES (?, ?)', [row.id, mediaPath], (err) => {
                if (err) {
                    console.error('Error inserting video into database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.redirect('/profile?username=' + username);
            });
        } else if (req.file.mimetype.startsWith('application/octet-stream')) {
            db.run('INSERT INTO raw_files (user_id, url) VALUES (?, ?)', [row.id, mediaPath], (err) => {
                if (err) {
                    console.error('Error inserting raw file into database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.redirect('/profile?username=' + username);
            });
        } else {
            console.error('Unsupported media type');
            return res.status(400).send('Unsupported media type');
        }
    });
});

app.post('/profile/delete/photo', (req, res) => {
    const { photoId } = req.body;

    db.run('DELETE FROM photos WHERE id = ?', [photoId], (err) => {
        if (err) {
            console.error('Error deleting photo from database:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.redirect('/succes');
    });
});

app.get('/profile', (req, res) => {
    const { username } = req.query;

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error('Error retrieving user from database:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!row) {
            console.log('Такого юзера нет');
            return res.status(200).redirect('/login');
        }

        db.all('SELECT * FROM photos WHERE user_id = ?', [row.id], (err, photos) => {
            if (err) {
                console.error('Error retrieving photos from database:', err);
                return res.status(500).send('Internal Server Error');
            }

            db.all('SELECT * FROM videos WHERE user_id = ?', [row.id], (err, videos) => {
                if (err) {
                    console.error('Error retrieving videos from database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                db.all('SELECT * FROM raw_files WHERE user_id = ?', [row.id], (err, rawFiles) => {
                    if (err) {
                        console.error('Error retrieving raw files from database:', err);
                        return res.status(500).send('Internal Server Error');
                    }

                    res.render('profile', {
                        username: username,
                        photos: photos,
                        videos: videos,
                        rawFiles: rawFiles
                    });
                });
            });
        });
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/html/signup.html');
});

app.get('/succes', (req, res) => {
    res.sendFile(__dirname + '/html/succes.html');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send('Error creating user');
        }
        res.redirect('/login');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error('Error retrieving user from database:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!row) {
            console.log('Где-то возникла ошибка');
            return res.status(401).send('Где-то возникла ошибка');
        }

        res.redirect('/profile?username=' + username);
    });
});

app.get('/404', (req, res) => {
    res.sendFile(__dirname + '/html/notfound.html');
});

app.get('/', (req, res) => {
    db.all('SELECT photos.*, users.username AS uploader FROM photos JOIN users ON photos.user_id = users.id', (err, photosWithUsers) => {
        if (err) {
            console.error('Error retrieving photos from database:', err);
            return res.status(500).send('Internal Server Error');
        }

        db.all('SELECT videos.*, users.username AS uploader FROM videos JOIN users ON videos.user_id = users.id', (err, videosWithUsers) => {
            if (err) {
                console.error('Error retrieving videos from database:', err);
                return res.status(500).send('Internal Server Error');
            }

            db.all('SELECT raw_files.*, users.username AS uploader FROM raw_files JOIN users ON raw_files.user_id = users.id', (err, rawFilesWithUsers) => {
                if (err) {
                    console.error('Error retrieving raw files from database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.render('index', {
                    photosWithUsers: photosWithUsers,
                    videosWithUsers: videosWithUsers,
                    rawFilesWithUsers: rawFilesWithUsers
                });
            });
        });
    });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

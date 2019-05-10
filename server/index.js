const express = require('express');
const users = require('./users');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    const app = {
        id: `demoapp`,
        name: 'Custom app user auth ',
        version: '1.0',
        type: 'none',
        description: 'Custom app with user auth',
        authentication: [
            {
                name: 'in-memory',
                id: 'in-memory',
                fields: [
                    {
                        optional: false,
                        id: 'username',
                        name: 'Username',
                        type: 'text',
                        description: 'Username',
                        datalist: false
                    },
                    {
                        optional: false,
                        id: 'password',
                        name: 'Password',
                        type: 'password',
                        description: 'Password',
                        datalist: false
                    },
                ]
            }
        ],
        sources: [],
        responsibleFor: {
            userAuthentication: true
        }
    };

    res.json(app);
});

app.post('/authenticate', (req, res) => {
    const {username, password} = req.body.fields;
    const user = users.findUser(username, password);
    if (user) {
        res.json({
            id: username,
            host: 'demoapp',
            email: user.email,
            name: user.name,
            companies: [
                {
                    host: 'companyid',
                    title: 'Embedded company',
                    groups: ['collaborators']
                }
            ]
        })
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
});


app.post('/validate', (req, res) => {
    const {username, password} = req.body.fields;
    const user = users.findUser(username, password);

    if (user) {
        res.json({name: user.name});
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
});

app.listen(process.env.PORT || 8082);

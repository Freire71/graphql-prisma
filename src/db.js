let users = [
    {
        id: '123alex',
        name: 'Alex',
        email: 'alex@user.com',
        age: null
    },
    {
        id: '123caio',
        name: 'Caio',
        email: 'caio@user.com',
        age: null
    },
    {
        id: '123joao',
        name: 'João',
        email: 'joao@user.com',
        age: null
    },
]

let posts = [
    {
        id: 'es6',
        title: 'Javascript ES6',
        body: 'es6 é a nova versão da linguagem javascript...',
        published: true,
        author: '123alex'
       
    },
    {
        id: 'node',
        title: 'Node JS',
        body: 'NodeJS é o principal ecossistema para executar javascript no desktop. Usa a engine V8 do chrome',
        published: true,
        author: '123caio'
    },
    {
        id: 'swift',
        title: 'Swift para iOS',
        body: 'Swift é a mais nova linguagem de desenvolvimento para aparelhos iOS, AppleTV, SmartWatch etc',
        published: true,
        author: '123alex'
    },
]

let comments = [
    {
        id: 'node',
        text: 'um bom post sobre node js',
        author: '123caio',
        post:'node'
    },
    {
        id: 'es6',
        text: 'um bom post sobre es6',
        author: '123alex',
        post: 'es6'
    },
    {
        id: 'swift1',
        text: 'um bom post sobre swift',
        author: '123joao',
        post: 'swift'

    },
    {
        id: 'swift2',
        text: 'Estou muito feliz que vocês estejam curtindo o post',
        author: '123alex',
        post: 'swift'
    },
]

const db = {
    users,
    posts,
    comments
}

export default db
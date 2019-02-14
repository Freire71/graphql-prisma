const Query = {
    users(parent, args, { db }, info) {
        if (args.query) {
            const filteredArray = db.users.filter(item => item.name.toLowerCase() === args.query.toLowerCase());
            return filteredArray;
        }
        return db.users;
    },
    posts(parent, args, { db }, info) {
        if (args.query) {
            const filteredArray = db.posts.filter(item => {
                return item.title.toLowerCase().includes(args.query.toLowerCase()) ||
                item.body.toLocaleLowerCase().includes(args.query.toLowerCase())
            })
            return filteredArray;
        }
        return db.posts;
    },
    comments(parent, args, { db }, info) {
        if (args.query) {
            const filteredArray = db.comments.filter(item => {
                return item.text.toLowerCase().includes(args.query.toLocaleLowerCase())
            })
            return filteredArray
        }
        return db.comments;
    }
}

export default Query
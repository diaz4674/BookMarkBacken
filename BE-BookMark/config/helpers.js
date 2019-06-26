const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

const find = () =>{
    return db('users').select('id', 'username','password')

}

const findBy = filter => {
    return db('users').where(filter)
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

const findById = id => {
    return db('users').where({id}).first()
}
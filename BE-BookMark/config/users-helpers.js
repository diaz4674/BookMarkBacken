const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
    addFinancial,
    addStores
}

function find() {
    return db('users').select('id', 'username', 'email', 'password')
}

function findBy(filter) {
    return db('users').where(filter);
}

async function addFinancial(bank){
    const [id] = await db('financial').insert(bank)
    return findById(id)
}

async function addStores(store){
    const [id] = await db('shopping').insert(store)
    return findById(id)
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

function findById(id) {
    return db('users')
        .where({id})
        .first()
}
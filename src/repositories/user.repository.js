export default class UserRepository {
    constructor(UsersDaoMongo) {
        this.userDao = UsersDaoMongo
    }
    getUsers = async () => await this.userDao.getUsers()
    createUser = async (user) => await this.userDao.createUser(user)
    getUser = async filter => await this.userDao.getUserBy(filter)
    getUserByEmail = async email => await this.userDao.getUserByEmail(email)
}
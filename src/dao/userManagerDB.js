import { userModel } from "./models/usersModels.js";

export class UsersManagerMongo {
  constructor() {
    this.userModel = userModel;
  }

  async getUsers({ limit = 10, numPage = 1 }) {
    const users = await this.userModel.paginate({}, { limit, page: numPage, sort: { price: -1 }, lean: true })
    return users
  }

  async createUser(newUser) {
    return await this.userModel.create(newUser)
  }

  async getUserBy(filter) {
    console.log(filter);
    return this.userModel.findOne(filter);
  }

  async getUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

}
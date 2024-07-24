import { faker} from '@faker-js/faker'
export const generarProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription()
    }
};
import { Category } from '../types/Category';

export const categories: Category = {
    food: {title: 'Alimentação', color: 'blue', expense: true},
    rent: {title: 'Aluguel', color: 'brown', expense: true},
    credit: {title: 'Cartão de crédito', color: 'purple', expense: true},
    conta: {title: 'Contas', color: 'FireBrick', expense: true},
    renda: {title: 'Renda Extra', color: 'ForestGreen', expense: false},
    salary: {title: 'Salário', color: 'green', expense: false}
}
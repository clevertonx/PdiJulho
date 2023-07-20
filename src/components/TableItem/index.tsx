import * as C from './styles';
import { Item } from '../../types/Item';
import { formatDate } from '../../helpers/dateFilter';
import { categories } from '../../data/categories';
import { parseTimestampToDate } from '../../helpers/dateFilter'

type Props = {
    item: Item
}

export const TableItem = ({ item }: Props) => {
    const dateObject = item.date instanceof Date ? item.date : parseTimestampToDate(item.date);
    const dateString = dateObject.toISOString();
    const formattedDate = formatDate(dateString);




    return (
        <C.TableLine>
            <C.TableColumn>{formattedDate}</C.TableColumn>
            <C.TableColumn>
                <C.Category color={categories[item.category].color}>
                    {categories[item.category].title}
                </C.Category>
            </C.TableColumn>
            <C.TableColumn>{item.title}</C.TableColumn>
            <C.TableColumn>
                <C.Value color={categories[item.category].expense ? 'red' : 'green'}>
                    R$ {item.value}
                </C.Value>
            </C.TableColumn>
            <C.TableColumn>
                <C.Excluir><button>❌</button></C.Excluir>
            </C.TableColumn>
        </C.TableLine>
    );
}

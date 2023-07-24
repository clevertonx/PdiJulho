import * as C from './styles';
import { Item } from '../../types/Item';
import { formatDate } from '../../helpers/dateFilter';
import { categories } from '../../data/categories';
import { parseTimestampToDate } from '../../helpers/dateFilter'
import { ref, remove } from 'firebase/database';
import { database } from '../../FireBase/firebase';
import { ConfirmationModal } from '../ConfirmationModal';
import { useState } from 'react';

type Props = {
    item: Item
    onDelete: (title: string) => void;
}

export const TableItem = ({ item, onDelete }: Props) => {
    const dateObject = item.date instanceof Date ? item.date : parseTimestampToDate(item.date);
    const dateString = dateObject.toISOString();
    const formattedDate = formatDate(dateString);

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleDeleteItem = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = () => {
        remove(ref(database, `items/${item.title}`))
            .then(() => {
                console.log('Item excluído com sucesso do Database!');
                onDelete(item.title);
            })
            .catch((error) => {
                console.error('Erro ao excluir item do Database:', error);
            })
            .finally(() => {
                setIsConfirmationOpen(false);
            });
    };

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
                <C.Excluir>
                    <button onClick={handleDeleteItem}>X</button>
                </C.Excluir>
            </C.TableColumn>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Tem certeza que deseja excluir o item "${item.title}"?`}
            />
        </C.TableLine>
    );
}






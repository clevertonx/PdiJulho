import { ref, remove, update } from 'firebase/database';
import { useState } from 'react';
import { database } from '../../FireBase/firebase';
import { categories } from '../../data/categories';
import { formatDate, parseTimestampToDate } from '../../helpers/dateFilter';
import { Item } from '../../types/Item';
import { ConfirmationModal } from '../ConfirmationModal';
import * as C from './styles';
import { getEventListeners } from 'events';

type Props = {
    item: Item;
    onDelete: (title: string) => void;
};

export const TableItem = ({ item, onDelete }: Props) => {
    const dateObject = item.date instanceof Date ? item.date : parseTimestampToDate(item.date);
    const dateString = dateObject.toISOString();
    const formattedDate = formatDate(dateString);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(item.status === 'pago');


    const handleDeleteItem = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = () => {
        remove(ref(database, `items/${item.id}`))
            .then(() => {
                console.log('Item excluído com sucesso do Database!');
                onDelete(item.id);
            })
            .catch((error) => {
                console.error('Erro ao excluir item do Database:', error);
            })
            .finally(() => {
                setIsConfirmationOpen(false);
            });
    };

    const handleCheckboxChange = async () => {
        const db = database;
        const currentDate = new Date().getTime();
        const itemDate = dateObject.getTime();
        console.log('itemDate:', itemDate);
        console.log('currentDate:', currentDate);
    
        let newStatus = '';
    
        if (!isChecked) {
            newStatus = 'pago';
        } else {
            if (itemDate > currentDate) {
                newStatus = 'aguardando pagamento';
            } else if (itemDate < currentDate) {
                newStatus = 'vencida';
            }
        }
    
        console.log('newStatus:', newStatus);
    
        setIsChecked(!isChecked);
    
        try {
            await update(ref(db, `items/${item.id}`), {
                status: newStatus
            });
            console.log('Status do item atualizado com sucesso no Database!');
        } catch (error) {
            console.error('Erro ao atualizar status do item no Database:', error);
        }
    }
    
    
    


    return (
        <C.TableLine>
            <C.TableColumn>{formattedDate}</C.TableColumn>
            <C.TableColumn>
                <C.Category color={categories[item.category].color}>
                    {categories[item.category].title}
                </C.Category>
            </C.TableColumn>
            <C.TableColumn>{item.title}</C.TableColumn>
            <C.StatusColumn status={item.status}>{item.status}</C.StatusColumn>
            <C.TableColumn>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </C.TableColumn>
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
};

import * as C from './styles';
import { useState } from 'react';
import { Item } from '../../types/Item';
import { database } from '../../FireBase/firebase';
import { ref, push, set, getDatabase, query, orderByChild, equalTo, get } from 'firebase/database';
import { categories } from '../../data/categories';
import { Category } from '../../types/Category';
import { AlertModal } from '../AlertModal';


type Props = {
    onAdd: (item: Item) => void;
}

const checkIfItemExists = async (title: string): Promise<boolean> => {
    const itemsRef = ref(database, 'items');
    const itemsQuery = query(itemsRef, orderByChild('title'), equalTo(title));

    try {
        const snapshot = await get(itemsQuery);
        return snapshot.exists();
    } catch (error) {
        console.error('Erro ao verificar se o item já existe:', error);
        return false;
    }
};

export const InputArea = ({ onAdd }: Props) => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [showFieldAlert, setShowFieldAlert] = useState(false);
    const [showItemExistsAlert, setShowItemExistsAlert] = useState(false);

    const handleAddItem = async () => {
        if (!date || !category || !title || !value) {
            setShowFieldAlert(true);
            return;
        }

        const itemExists = await checkIfItemExists(title);
        if (itemExists) {
            setShowItemExistsAlert(true);
            return;
        }
        
        const parsedValue = parseInt(value);

        const newItem: Item = {
            date: new Date(date),
            category,
            title,
            value: isNaN(parsedValue) ? 0 : parsedValue,
        };
        const formattedDate = newItem.date.toISOString();
        const itemsRef = ref(database, 'items');
        const newItemRef = push(itemsRef);

        set(newItemRef, { ...newItem, date: formattedDate })
            .then(() => {
                console.log('Item adicionado com sucesso ao Database!');
                onAdd(newItem);
                setDate('');
                setCategory('');
                setTitle('');
                setValue('');
            })
            .catch((error) => {
                console.error('Erro ao adicionar item no Database:', error);
            });
    };

    return (
        <C.Container>
            <C.Input><input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            /></C.Input>
            <C.Input>  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Selecione</option>
                {Object.keys(categories).map((categoryKey) => (
                    <option key={categoryKey} value={categoryKey}>
                        {categories[categoryKey as keyof Category].title}{' '}
                        {categories[categoryKey as keyof Category].expense ? '(-)' : '(+)'}
                    </option>
                ))}
            </select></C.Input>
            <C.Input><input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /></C.Input>
            <C.Input>
                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                /></C.Input>

            <C.Input><button onClick={handleAddItem}>Adicionar</button></C.Input>
            <AlertModal
                isOpen={showFieldAlert}
                onClose={() => setShowFieldAlert(false)}
                message="Por favor, preencha todos os campos antes de adicionar o item."
            />
            <AlertModal
                isOpen={showItemExistsAlert}
                onClose={() => setShowItemExistsAlert(false)}
                message="Já existe um item com o mesmo título. Por favor, escolha um título diferente."
            />

        </C.Container>
    );
};

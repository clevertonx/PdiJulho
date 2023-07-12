import * as C from './styles';
import { useState } from 'react';
import { Item } from '../../types/Item';
import { database } from '../../FireBase/firebase';
import { ref, push, set } from 'firebase/database';


type Props = {
    onAdd: (item: Item) => void;
}

export const InputArea = ({ onAdd }: Props) => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    const handleAddItem = () => {
        const parsedValue = parseInt(value);


        const newItem: Item = {
            date: new Date(date),
            category,
            title,
            value: isNaN(parsedValue) ? 0 : parsedValue,
        };
        console.log(newItem)
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
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleAddItem}>Adicionar</button>
        </C.Container>
    );
};

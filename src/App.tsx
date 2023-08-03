import { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from './FireBase/firebase';
import * as C from './App.styles';
import { Item } from './types/Item';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([])
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const itemsRef = ref(database, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsList: Item[] = Object.values(data);
        const filteredList = filterListByMonth(itemsList, currentMonth);
        setFilteredList(filteredList);
      }
    });
  }, [currentMonth]);

  useEffect(() => {
    if (list.length > 0) {
      setFilteredList(filterListByMonth(list, currentMonth));
    }
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  function handleAddItem(item: Item): void {
    throw new Error('Function not implemented.');
  }

  const handleDeleteItem = (title: string) => {
    const itemsRef = ref(database, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.error('Nenhum item encontrado no banco de dados.');
        return;
      }

      const itemKeys = Object.keys(data);
      const itemId = itemKeys.find((key) => data[key]?.title === title);

      if (!itemId) {
        console.error(`Item "${title}" não encontrado no banco de dados.`);
        return;
      }

      const itemRef = ref(database, `items/${itemId}`);
      remove(itemRef)
        .then(() => {
          console.log('Item excluído com sucesso do Database!');
          setList((prevList) => prevList.filter((item) => item.title !== title));
        })
        .catch((error) => {
          console.error('Erro ao excluir item do Database:', error);
        });
    });
  };


  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} onDelete={handleDeleteItem} />

      </C.Body>
    </C.Container>
  );
}

export default App;
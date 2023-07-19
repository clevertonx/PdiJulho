import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './FireBase/firebase';
import * as C from './App.styles';
import { Item } from './types/Item';
import { Category } from './types/Category';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const itemsRef = ref(database, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('useEffect - data:', data);
      if (data) {
        const itemsList: Item[] = Object.values(data);
        console.log('useEffect - ItemsList:', itemsList);
        const filteredList = filterListByMonth(itemsList, currentMonth);
        console.log('useEffect - filteredList:', filteredList);
        setFilteredList(filteredList);
        setIsLoading(false); 
      }
    });
  }, [currentMonth]);

  const updateFilteredList = (list: Item[], currentMonth: string) => {
    const filteredList = filterListByMonth(list, currentMonth);
    setFilteredList(filteredList);
  };


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

  const formatDateToMonthString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  function handleAddItem(item: Item): void {
    throw new Error('Function not implemented.');
  }


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

        <TableArea list={filteredList} />

      </C.Body>
    </C.Container>
  );
}

export default App;
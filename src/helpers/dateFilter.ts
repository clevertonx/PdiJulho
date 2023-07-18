import { Item } from "../types/Item";

export const getCurrentMonth = () => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export const parseTimestampToDate = (timestamp: string): Date => {
    return new Date(timestamp);
};

export const filterListByMonth = (list: Item[], date: string): Item[] => {
  
    const [year, month] = date.split('-');
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month);
    console.log('num', numericYear, numericMonth)
  
    if (isNaN(numericYear) || isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      return [];
    }
  
    const filteredList = list.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === numericYear &&
        (itemDate.getMonth() + 1) === numericMonth
      );
    });
  
    return filteredList;
  };
  


export const formatDate = (dateString: string): string => {
    console.log(dateString)
    const dateObject = new Date(dateString);
    
    if (isNaN(dateObject.getTime())) {
        return "data inválida";
    }

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
};

const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`;

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${months[parseInt(month) - 1]} de ${year}`;

}
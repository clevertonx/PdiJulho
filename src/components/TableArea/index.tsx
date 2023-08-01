import * as C from './styles';
import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';

type Props = {
    list: Item[]
    onDelete: (title: string) => void
}

export const TableArea = ({ list, onDelete }: Props) => {
    console.log(list)
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={100}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Título</C.TableHeadColumn>
                    <C.TableHeadColumn width={220}>Status</C.TableHeadColumn>
                    <C.TableHeadColumn width={120}>Pago?</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Excluir</C.TableHeadColumn>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <TableItem key={index} item={item} onDelete={onDelete} />
                ))}
            </tbody>
        </C.Table>
    );
}

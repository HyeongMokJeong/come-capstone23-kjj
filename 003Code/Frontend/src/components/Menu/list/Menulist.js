import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenulistRow from './MenulistRow';

const table_header_data = [
  {
    id: 0,
  },
  {
    id: 1,
    text: '이름',
  },
  {
    id: 2,
    text: '정보',
    align: 'left',
  },
  {
    id: 3,
    text: '가격',
    align: 'right',
  },
  {
    id: 4,
    text: '상태',
    align: 'right',
  },
  {
    id: 5,
  },
];

export default function Menulist(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {table_header_data.map((item) => (
              <TableCell key={item.id + 'menulist'} align={item.align}>
                {item.text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.menus?.map((row) => (
            <MenulistRow
              key={row.name}
              row={row}
              onDelete={props.onDelete}
              soldout={props.soldout}
              resale={props.resale}
              onUpdate={props.onUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

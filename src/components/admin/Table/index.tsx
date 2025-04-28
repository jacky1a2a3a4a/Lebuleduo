import {
  StyledTable,
  StyledThead,
  StyledTbody,
  StyledTd,
  ViewDetailsButton,
  TableContainer,
} from './styles';

import StatusTag from '../StatusTag';
import { TableProps } from './types';
import { getFormattedDateTime } from '../../../utils/formatDate';

export const Table = ({
  orders,
  filteredTasks,
  itemsPerPage,
  selectedTasks,
  handleSelectAll,
  handleTaskSelection,
}: TableProps) => {
  return (
    <TableContainer>
      <StyledTable>
        <StyledThead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedTasks.length === orders.length && orders.length > 0
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th>任務ID</th>
            <th>客戶名稱</th>
            <th>任務狀態</th>
            <th>方案類型</th>
            <th>收運地區</th>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>負責汪汪員</th>
            <th>訂單詳情</th>
          </tr>
        </StyledThead>

        <StyledTbody>
          {filteredTasks.slice(0, itemsPerPage).map((order) => (
            <tr key={order.OrderDetailID}>
              <StyledTd>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(
                    order.OrderDetailID.toString(),
                  )}
                  onChange={(e) =>
                    handleTaskSelection(
                      order.OrderDetailID.toString(),
                      e.target.checked,
                    )
                  }
                />
              </StyledTd>
              <StyledTd>{order.OrderDetailID}</StyledTd>
              <StyledTd>{order.OrderName}</StyledTd>
              <StyledTd>
                <StatusTag status={order.OrderStatus} />
              </StyledTd>
              <StyledTd>{order.PlanName}</StyledTd>
              <StyledTd>{order.Region}</StyledTd>
              <StyledTd>
                {order.DriverTimeStart
                  ? getFormattedDateTime(order.DriverTimeStart)
                  : '未開始'}
              </StyledTd>
              <StyledTd>
                {order.DriverTimeEnd
                  ? getFormattedDateTime(order.DriverTimeEnd)
                  : '未完成'}
              </StyledTd>
              <StyledTd>{order.ResponsibleDriver}</StyledTd>
              <StyledTd>
                <ViewDetailsButton>查看詳情</ViewDetailsButton>
              </StyledTd>
            </tr>
          ))}
        </StyledTbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;

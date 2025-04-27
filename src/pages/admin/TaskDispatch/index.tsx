'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  MainContent,
  Content,
  StatsGrid,
  TableContainer,
  TableHeader,
  StyledTable,
  Badge,
} from './styles';
import { Order, Amount, ApiResponse, Filters } from './types';
import Header from '../../../components/admin/Header';
import FunctionHeader from '../../../components/admin/FunctionHeader';
import {
  MdDescription,
  MdLocalShipping,
  MdEditCalendar,
  MdEventAvailable,
} from 'react-icons/md';

import StatCard from '../../../components/admin/StatCard';

export default function TaskDispatchSystem() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [amount, setAmount] = useState<Amount>({
    totalCount: 0,
    UnScheduled: 0,
    Scheduled: 0,
    totalDrivers: 0,
    DriverIsOnline: 0,
  });
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [assignmentPanelOpen, setAssignmentPanelOpen] = useState(false);

  // 新增過濾和分頁狀態
  const [filters, setFilters] = useState<Filters>({
    status: '',
    district: '',
    planType: '',
    collector: '',
    orderId: '',
    region: '',
  });
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // 獲取訂單資料
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('api/GET/Admin/OrderDetail/Pending');
        const data: ApiResponse = await response.json();
        if (data.status) {
          setOrders(data.result);
          setAmount(data.Amount);
        }
      } catch (error) {
        console.error('獲取訂單資料失敗:', error);
      }
    };

    fetchOrders();
  }, []);

  // 過濾邏輯
  const filteredTasks = orders.filter((order) => {
    if (filters.status && order.OrderStatus.toString() !== filters.status)
      return false;
    if (filters.planType && order.PlanName !== filters.planType) return false;
    if (filters.region && order.Region !== filters.region) return false;
    if (
      filters.orderId &&
      !order.OrderName.toLowerCase().includes(filters.orderId.toLowerCase())
    )
      return false;
    return true;
  });

  // 處理過濾器變更
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // 處理每頁顯示數量變更
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
  };

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
      if (!assignmentPanelOpen) setAssignmentPanelOpen(true);
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      if (selectedTasks.length === 1) setAssignmentPanelOpen(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(orders.map((order) => order.OrderDetailID.toString()));
      setAssignmentPanelOpen(true);
    } else {
      setSelectedTasks([]);
      setAssignmentPanelOpen(false);
    }
  };

  return (
    <Container>
      <MainContent $assignmentPanelOpen={assignmentPanelOpen}>
        <Header />

        <Content style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
          <FunctionHeader />

          <StatsGrid>
            <StatCard
              title="任務總數"
              value={amount.totalCount.toString()}
              subtitle="所有任務"
              icon={<MdDescription size={24} />}
            />
            <StatCard
              title="未分派任務"
              value={amount.UnScheduled.toString()}
              subtitle="進行中的任務"
              icon={<MdEditCalendar size={24} />}
            />
            <StatCard
              title="已分派任務"
              value={amount.Scheduled.toString()}
              subtitle="已完成的任務"
              icon={<MdEventAvailable size={24} />}
            />
            <StatCard
              title="可上工代收員"
              value={`${amount.DriverIsOnline}/${amount.totalDrivers}`}
              subtitle="每人平均上限為25筆任務"
              icon={<MdLocalShipping size={24} />}
            />
          </StatsGrid>

          <TableContainer style={{ height: 'calc(100% - 200px)' }}>
            <TableHeader>
              <div className="header-left">
                <h1>任務列表</h1>
                <div className="filters">
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange('status', e.target.value)
                    }
                  >
                    <option value="">分派狀態</option>
                    <option value="0">未分派</option>
                    <option value="1">已分派</option>
                  </select>
                  <select
                    value={filters.planType}
                    onChange={(e) =>
                      handleFilterChange('planType', e.target.value)
                    }
                  >
                    <option value="">方案類型</option>
                    <option value="小資方案">小資方案</option>
                    <option value="標準方案">標準方案</option>
                  </select>
                  <select
                    value={filters.region}
                    onChange={(e) =>
                      handleFilterChange('region', e.target.value)
                    }
                  >
                    <option value="">收運地區</option>
                    <option value="路竹區">路竹區</option>
                    <option value="楠梓區">楠梓區</option>
                    <option value="仁武區">仁武區</option>
                    <option value="三民區">三民區</option>
                  </select>
                  <input
                    type="text"
                    placeholder="搜尋訂單編號"
                    value={filters.orderId}
                    onChange={(e) =>
                      handleFilterChange('orderId', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="header-right">
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                >
                  <option value="10">10 筆/頁</option>
                  <option value="20">20 筆/頁</option>
                  <option value="50">50 筆/頁</option>
                </select>
              </div>
            </TableHeader>

            <div style={{ height: 'calc(100% - 120px)', overflowY: 'auto' }}>
              <StyledTable>
                <thead
                  style={{
                    position: 'sticky',
                    top: 0,
                    background: 'white',
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          selectedTasks.length === orders.length &&
                          orders.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th>訂單編號</th>
                    <th>客戶名稱</th>
                    <th>分派狀態</th>
                    <th>方案類型</th>
                    <th>收運地區</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>負責司機</th>
                    <th>訂單詳情</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.slice(0, itemsPerPage).map((order) => (
                    <tr key={order.OrderDetailID}>
                      <td>
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
                      </td>
                      <td>{order.OrderDetailID}</td>
                      <td>{order.OrderName}</td>
                      <td>
                        <Badge $variant="warning">
                          {order.OrderStatus === 1 ? '進行中' : '已完成'}
                        </Badge>
                      </td>
                      <td>{order.PlanName}</td>
                      <td>{order.Region}</td>
                      <td>{order.DriverTimeStart ? '進行中' : '未開始'}</td>
                      <td>{order.DriverTimeEnd ? '已完成' : '未完成'}</td>
                      <td>{order.ResponsibleDriver}</td>
                      <td>
                        <button
                          style={{
                            color: 'var(--color-primary)',
                            padding: 0,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          查看詳情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </div>
          </TableContainer>
        </Content>
      </MainContent>
    </Container>
  );
}

'use client';
import { useState, useEffect } from 'react';
import {
  MdDescription,
  MdLocalShipping,
  MdEditCalendar,
  MdEventAvailable,
} from 'react-icons/md';
import {
  Container,
  MainContent,
  StatsGrid,
  TableContainer,
  TableHeader,
  ContentWrapper,
} from './styles';
import { Order, Amount, ApiResponse, Filters } from './types';

import Header from '../../../components/admin/Header';
import FunctionHeader from '../../../components/admin/FunctionHeader';
import Select from '../../../components/admin/Select';
import StatCard from '../../../components/admin/StatCard';
import Table from '../../../components/admin/Table';

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

        <ContentWrapper>
          <FunctionHeader />

          {/* 狀態卡片 */}
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
              subtitle=""
              icon={<MdEditCalendar size={24} />}
            />
            <StatCard
              title="已分派任務"
              value={amount.Scheduled.toString()}
              subtitle=""
              icon={<MdEventAvailable size={24} />}
            />
            <StatCard
              title="可上工代收員"
              value={`${amount.DriverIsOnline}/${amount.totalDrivers}`}
              subtitle="每人平均上限為25筆任務"
              icon={<MdLocalShipping size={24} />}
            />
          </StatsGrid>

          <TableContainer>
            <TableHeader>
              <h1>任務列表</h1>
              <div className="header-container">
                <div className="header-left">
                  <div className="filters">
                    <Select
                      value={filters.status}
                      onChange={(value) => handleFilterChange('status', value)}
                      options={[
                        { value: '', label: '分派狀態' },
                        { value: '0', label: '未分派' },
                        { value: '1', label: '已分派' },
                      ]}
                    />
                    <Select
                      value={filters.planType}
                      onChange={(value) =>
                        handleFilterChange('planType', value)
                      }
                      options={[
                        { value: '', label: '方案類型' },
                        { value: '小資方案', label: '小資方案' },
                        { value: '標準方案', label: '標準方案' },
                      ]}
                    />
                    <Select
                      value={filters.region}
                      onChange={(value) => handleFilterChange('region', value)}
                      options={[
                        { value: '', label: '收運地區' },
                        { value: '路竹區', label: '路竹區' },
                        { value: '楠梓區', label: '楠梓區' },
                        { value: '仁武區', label: '仁武區' },
                        { value: '三民區', label: '三民區' },
                      ]}
                    />
                    <input
                      type="text"
                      placeholder="搜尋訂單編號"
                      value={filters.orderId}
                      onChange={(e) =>
                        handleFilterChange('orderId', e.target.value)
                      }
                      width="100px"
                    />
                  </div>
                </div>
                <div className="header-right">
                  <p>每頁顯示筆數</p>
                  <Select
                    value={itemsPerPage.toString()}
                    onChange={(value) => handleItemsPerPageChange(value)}
                    options={[
                      { value: '10', label: '10' },
                      { value: '20', label: '20' },
                      { value: '50', label: '50' },
                    ]}
                    width="35px"
                  />
                </div>
              </div>
            </TableHeader>

            <Table
              orders={orders}
              filteredTasks={filteredTasks}
              itemsPerPage={itemsPerPage}
              selectedTasks={selectedTasks}
              handleSelectAll={handleSelectAll}
              handleTaskSelection={handleTaskSelection}
            />
          </TableContainer>
        </ContentWrapper>
      </MainContent>
    </Container>
  );
}

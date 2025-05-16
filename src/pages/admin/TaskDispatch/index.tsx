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
} from './styled';
import { Order, Amount, Filters, Driver } from './types';

import Header from '../../../components/admin/Header';
import Select from '../../../components/admin/Select';
import StatCard from '../../../components/admin/StatCard';
import Table from '../../../components/admin/Table';
import AssignmentPanel from '../../../components/admin/AssignmentPanel';
import CommonLoading from '../../../components/common/CommonLoading';

import { getAllTasks } from '../../../apis/admin/getAllTasks'; //api 獲取任務(明天)
import { assignTasks } from '../../../apis/admin/assignTasks'; //api 分配任務
import { getTodayDate } from '../../../utils/getDate';
import { getTomorrowDate } from '../../../utils/getDate';
import {
  getFormattedDateWithDay,
  getFormattedDateDash,
} from '../../../utils/formatDate';

export default function TaskDispatchSystem() {
  const [orders, setOrders] = useState<Order[]>([]); // 儲存api獲取的所有任務
  const [amount, setAmount] = useState<Amount>({
    totalCount: 0,
    UnScheduled: 0,
    Scheduled: 0,
    totalDrivers: 0,
    DriverIsOnline: 0,
  }); // 儲存api獲取的訂單數量資料
  const [delivers, setDelivers] = useState<Driver[]>([]); // 儲存api獲取的汪汪員資料
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]); // 儲存選取的任務
  const [assignmentPanelOpen, setAssignmentPanelOpen] = useState(false); // 儲存分派面板是否開啟
  const [deliverAssignments, setDeliverAssignments] = useState<
    Record<number, number>
  >({}); // 儲存汪汪員分配的任務數量
  const [isLoading, setIsLoading] = useState(false); // 新增 loading 狀態

  // 新增過濾和分頁狀態
  const [filters, setFilters] = useState<Filters>({
    status: '',
    planType: '',
    deliver: '',
    orderDetailId: '',
    region: '',
  }); // 過濾器
  const [itemsPerPage, setItemsPerPage] = useState(20); // 每頁顯示筆數

  // 獲取訂單資料
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllTasks();
        console.log('api 原始回傳資料', data);

        if (data.status) {
          // 初始化空陣列和預設值
          setOrders(data.result || []);
          setAmount(
            data.Amount || {
              totalCount: 0,
              UnScheduled: 0,
              Scheduled: 0,
              totalDrivers: 0,
              DriverIsOnline: 0,
            },
          );
          setDelivers(data.Drivers || []);

          // 初始化代收員分配數量
          const initialAssignments = (data.Drivers || []).reduce(
            (acc, driver) => {
              acc[driver.UsersID] = 0;
              return acc;
            },
            {} as Record<number, number>,
          );
          setDeliverAssignments(initialAssignments);
        }
      } catch (error) {
        console.error('獲取訂單資料失敗:', error);
        // 發生錯誤時初始化空值
        setOrders([]);
        setAmount({
          totalCount: 0,
          UnScheduled: 0,
          Scheduled: 0,
          totalDrivers: 0,
          DriverIsOnline: 0,
        });
        setDelivers([]);
        setDeliverAssignments({});
      }
    };

    fetchOrders();
  }, []);

  // 計算未分配的任務數量
  const unassignedTasksCount =
    selectedTasks.length -
    Object.values(deliverAssignments).reduce((sum, count) => sum + count, 0);

  // 處理代收員任務分配變更
  const handleAssignmentChange = (deliverId: number, count: number) => {
    setDeliverAssignments((prev) => ({
      ...prev,
      [deliverId]: Math.max(0, Math.min(count, selectedTasks.length)),
    }));
  };

  // 平均分配任務
  const distributeEvenly = () => {
    const totalTasks = selectedTasks.length;
    const totalDelivers = delivers.length;
    const baseCount = Math.floor(totalTasks / totalDelivers);
    const remainder = totalTasks % totalDelivers;

    const newAssignments = delivers.reduce(
      (acc, deliver, index) => {
        acc[deliver.UsersID] = baseCount + (index < remainder ? 1 : 0);
        return acc;
      },
      {} as Record<number, number>,
    );

    setDeliverAssignments(newAssignments);
    console.log('平均分配任務', newAssignments);
  };

  // 取消分配
  const cancelAssignment = () => {
    setSelectedTasks([]);
    setAssignmentPanelOpen(false);
    setDeliverAssignments(
      delivers.reduce(
        (acc, driver) => {
          acc[driver.UsersID] = 0;
          return acc;
        },
        {} as Record<number, number>,
      ),
    );
  };

  // 確認分配
  const confirmAssignment = async () => {
    if (unassignedTasksCount > 0) return;

    try {
      setIsLoading(true); // 開始 loading
      // 將 deliverAssignments 轉換為 API 需要的格式
      let currentIndex = 0;
      const assignments = {
        ServiceDate: getFormattedDateDash(getTomorrowDate()),
        Assign: Object.entries(deliverAssignments)
          .filter(([, taskCount]) => taskCount > 0)
          .map(([driverId, count]) => {
            const driverTasks = selectedTasks
              .slice(currentIndex, currentIndex + count)
              .map((taskId) => parseInt(taskId));
            currentIndex += count;
            return {
              driverID: parseInt(driverId),
              tasks: driverTasks,
            };
          }),
      };


      // api 分配任務
      const response = await assignTasks(assignments);
      console.log('api 分配任務回傳', response);

      if (response.status) {
        // 重新獲取任務列表以更新狀態
        const data = await getAllTasks();
        if (data.status) {
          setOrders(data.result);
          setAmount(data.Amount);
          setDelivers(data.Drivers);
        }
      }

      setSelectedTasks([]);
      setAssignmentPanelOpen(false);
    } catch (error) {
      console.error('分配任務失敗:', error);
    } finally {
      setIsLoading(false); // 結束 loading
    }
  };

  // 過濾邏輯
  const filteredTasks = orders.filter((order) => {
    if (filters.status && order.OrderStatus.toString() !== filters.status)
      return false; //過濾任務狀態
    if (filters.planType && order.PlanName !== filters.planType) return false; //過濾方案
    if (filters.region && order.Region !== filters.region) return false; //過濾地區
    if (
      filters.orderDetailId &&
      !order.OrderDetailID.toString().includes(filters.orderDetailId)
    )
      return false; //任務ID搜尋
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

  // 處理任務選取
  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
      if (!assignmentPanelOpen) setAssignmentPanelOpen(true);
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      if (selectedTasks.length === 1) setAssignmentPanelOpen(false);
    }
  };

  // 處理全選
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
      {isLoading && <CommonLoading />}
      <MainContent $assignmentPanelOpen={assignmentPanelOpen}>
        <Header />

        <ContentWrapper>
          {/* 狀態卡片 */}
          <StatsGrid>
            <StatCard
              title="今天日期"
              value={getFormattedDateWithDay(getTodayDate())}
              subtitle="請發派明日任務"
              icon={<MdDescription size={24} />}
            />
            <StatCard
              title="任務總數"
              value={amount.totalCount.toString()}
              subtitle="任務列表為明日任務"
              icon={<MdDescription size={24} />}
            />
            <StatCard
              title="未分派任務"
              value={amount.UnScheduled.toString()}
              subtitle="請於今日18:00前發派完畢"
              icon={<MdEditCalendar size={24} />}
            />
            <StatCard
              title="已分派任務"
              value={amount.Scheduled.toString()}
              subtitle="請隨時注意任務狀態"
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
                        { value: '', label: '分派狀態: 所有' },
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
                        { value: '', label: '方案類型: 所有' },
                        { value: '小資方案', label: '小資方案' },
                        { value: '標準方案', label: '標準方案' },
                        { value: '大量方案', label: '大量方案' },
                      ]}
                    />
                    <Select
                      value={filters.region}
                      onChange={(value) => handleFilterChange('region', value)}
                      options={[
                        { value: '', label: '收運地區: 所有' },
                        ...Array.from(
                          new Set(orders.map((order) => order.Region)),
                        )
                          .filter((region) => region) // 過濾掉空值
                          .map((region) => ({
                            value: region,
                            label: region,
                          })),
                      ]}
                      placeholder="收運地區"
                    />
                    <input
                      type="text"
                      placeholder="搜尋任務ID"
                      value={filters.orderDetailId}
                      onChange={(e) =>
                        handleFilterChange('orderDetailId', e.target.value)
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

      {assignmentPanelOpen && (
        <AssignmentPanel
          selectedTasks={selectedTasks}
          delivers={delivers}
          deliverAssignments={deliverAssignments}
          onAssignmentChange={handleAssignmentChange}
          onDistributeEvenly={distributeEvenly}
          onCancel={cancelAssignment}
          onConfirm={confirmAssignment}
        />
      )}
    </Container>
  );
}

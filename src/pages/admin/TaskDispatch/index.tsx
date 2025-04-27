'use client';
import { useState } from 'react';
import {
  MdCalendarToday,
  MdDescription,
  MdSearch,
  MdLocalShipping,
} from 'react-icons/md';
import {
  Container,
  MainContent,
  Header,
  SearchInput,
  UserInfo,
  Content,
  PageHeader,
  StatsGrid,
  StatCard,
  TableContainer,
  StyledTable,
  Badge,
  AssignmentPanel,
  PanelHeader,
  PanelContent,
  CollectorCard,
  PanelFooter,
} from './styles';

// 模擬任務數據
const tasks = Array.from({ length: 50 }, (_, i) => ({
  id: `ORD2025050${i + 1}`.padStart(11, '0'),
  customerName: `王小明`,
  district: `三民區`,
  status: `待分派`,
  planType: `標準方案`,
  collectionMethod: `定點收貨`,
  collectionTime: `-`,
  responsibleCollector: `-`,
  details: `訂單詳情`,
}));

// 模擬代收員數據
const collectors = [
  { id: 1, name: '張小明', currentTasks: 5, status: '可用' },
  { id: 2, name: '李大華', currentTasks: 8, status: '可用' },
  { id: 3, name: '陳小芳', currentTasks: 3, status: '可用' },
  { id: 4, name: '林小雨', currentTasks: 10, status: '可用' },
  { id: 5, name: '黃大勇', currentTasks: 6, status: '可用' },
];

export default function TaskDispatchSystem() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [assignmentPanelOpen, setAssignmentPanelOpen] = useState(false);
  const [collectorAssignments, setCollectorAssignments] = useState<
    Record<number, number>
  >(collectors.reduce((acc, collector) => ({ ...acc, [collector.id]: 0 }), {}));

  const unassignedTasksCount =
    selectedTasks.length -
    Object.values(collectorAssignments).reduce((sum, count) => sum + count, 0);

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
      setSelectedTasks(tasks.map((task) => task.id));
      setAssignmentPanelOpen(true);
    } else {
      setSelectedTasks([]);
      setAssignmentPanelOpen(false);
    }
  };

  const handleAssignmentChange = (collectorId: number, count: number) => {
    setCollectorAssignments({
      ...collectorAssignments,
      [collectorId]: count,
    });
  };

  const distributeEvenly = () => {
    const availableCollectors = collectors.length;
    if (availableCollectors === 0) return;

    const tasksPerCollector = Math.floor(
      selectedTasks.length / availableCollectors,
    );
    const remainder = selectedTasks.length % availableCollectors;

    const newAssignments: Record<number, number> = {};

    collectors.forEach((collector, index) => {
      newAssignments[collector.id] =
        tasksPerCollector + (index < remainder ? 1 : 0);
    });

    setCollectorAssignments(newAssignments);
  };

  const cancelAssignment = () => {
    setAssignmentPanelOpen(false);
    setSelectedTasks([]);
    setCollectorAssignments(
      collectors.reduce(
        (acc, collector) => ({ ...acc, [collector.id]: 0 }),
        {},
      ),
    );
  };

  const confirmAssignment = () => {
    alert(`已成功分派 ${selectedTasks.length - unassignedTasksCount} 筆任務`);
    cancelAssignment();
  };

  return (
    <Container>
      <MainContent $assignmentPanelOpen={assignmentPanelOpen}>
        <Header>
          <SearchInput>
            <MdSearch size={18} />
            <input type="text" placeholder="搜尋訂單、用戶或代收員..." />
          </SearchInput>
          <UserInfo>
            <span>管理員A355</span>
            <div className="avatar">A</div>
          </UserInfo>
        </Header>

        <Content>
          <PageHeader>
            <h1>任務發派</h1>
            <div className="date-picker">
              <MdCalendarToday size={18} />
              <input type="date" defaultValue="2025-05-03" />
            </div>
          </PageHeader>

          <StatsGrid>
            <StatCard>
              <div className="title">任務總數</div>
              <div className="content">
                <MdDescription size={24} className="icon" />
                <div className="numbers">
                  <div className="value">128</div>
                  <div className="subtitle">2025/05/03 的任務</div>
                </div>
              </div>
            </StatCard>
            <StatCard>
              <div className="title">未分派任務</div>
              <div className="content">
                <MdDescription size={24} className="icon" />
                <div className="numbers">
                  <div className="value">48</div>
                  <div className="subtitle">2025/05/03 的任務</div>
                </div>
              </div>
            </StatCard>
            <StatCard>
              <div className="title">已分派任務</div>
              <div className="content">
                <MdDescription size={24} className="icon" />
                <div className="numbers">
                  <div className="value">80</div>
                  <div className="subtitle">2025/05/03 的任務</div>
                </div>
              </div>
            </StatCard>
            <StatCard>
              <div className="title">可上工代收員</div>
              <div className="content">
                <MdLocalShipping size={24} className="icon" />
                <div className="numbers">
                  <div className="value">8/10</div>
                  <div className="subtitle">每人平均上限為25筆任務</div>
                </div>
              </div>
            </StatCard>
          </StatsGrid>

          <TableContainer>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedTasks.length === tasks.length &&
                        tasks.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th>任務ID</th>
                  <th>客戶名稱</th>
                  <th>分派狀態</th>
                  <th>行政區</th>
                  <th>收貨方式</th>
                  <th>訂單方案</th>
                  <th>收貨時間</th>
                  <th>負責代收員</th>
                  <th>訂單詳情</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 10).map((task) => (
                  <tr key={task.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={(e) =>
                          handleTaskSelection(task.id, e.target.checked)
                        }
                      />
                    </td>
                    <td>{task.id}</td>
                    <td>{task.customerName}</td>
                    <td>
                      <Badge $variant="warning">{task.status}</Badge>
                    </td>
                    <td>{task.district}</td>
                    <td>{task.collectionMethod}</td>
                    <td>{task.planType}</td>
                    <td>{task.collectionTime}</td>
                    <td>{task.responsibleCollector}</td>
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
                        {task.details}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
        </Content>
      </MainContent>

      {assignmentPanelOpen && (
        <AssignmentPanel>
          <PanelHeader>
            <h2>分派任務</h2>
            <p>已選擇 {selectedTasks.length} 筆任務</p>
          </PanelHeader>
          <PanelContent>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <h3
                style={{
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                可用代收員
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-12)',
                }}
              >
                {collectors.map((collector) => (
                  <CollectorCard key={collector.id}>
                    <div className="info">
                      <p>{collector.name}</p>
                      <p>目前任務數: {collector.currentTasks}</p>
                    </div>
                    <div className="controls">
                      <button
                        onClick={() =>
                          handleAssignmentChange(
                            collector.id,
                            Math.max(0, collectorAssignments[collector.id] - 1),
                          )
                        }
                        disabled={collectorAssignments[collector.id] <= 0}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={collectorAssignments[collector.id]}
                        onChange={(e) =>
                          handleAssignmentChange(
                            collector.id,
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        min={0}
                        max={selectedTasks.length}
                      />
                      <button
                        onClick={() =>
                          handleAssignmentChange(
                            collector.id,
                            collectorAssignments[collector.id] + 1,
                          )
                        }
                        disabled={
                          Object.values(collectorAssignments).reduce(
                            (sum, count) => sum + count,
                            0,
                          ) >= selectedTasks.length
                        }
                      >
                        +
                      </button>
                    </div>
                  </CollectorCard>
                ))}
              </div>
            </div>

            {unassignedTasksCount > 0 && (
              <div
                style={{
                  color: 'var(--color-red-500)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                尚有 {unassignedTasksCount} 筆任務未分配
              </div>
            )}

            <button
              onClick={distributeEvenly}
              style={{
                width: '100%',
                padding: 'var(--spacing-xs)',
                marginBottom: 'var(--spacing-md)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--color-background-primary)',
                cursor: 'pointer',
              }}
            >
              平均分配
            </button>
          </PanelContent>
          <PanelFooter>
            <button onClick={cancelAssignment}>取消</button>
            <button
              onClick={confirmAssignment}
              disabled={unassignedTasksCount > 0}
            >
              確認分派
            </button>
          </PanelFooter>
        </AssignmentPanel>
      )}
    </Container>
  );
}

import { MdRemove, MdAdd } from 'react-icons/md';
import {
  Panel,
  PanelHeader,
  PanelContent,
  PanelFooter,
  DeliverHeader,
  DeliverItem,
  DeliverInfo,
  DeliverControls,
  Warning,
  StyledInput,
  DeliverListContainer,
  QuantityControls,
  QuantityButton,
  DistributeButton,
  FooterButton,
  PanelText,
} from './styles';
import { AssignmentPanelProps } from './types';

const AssignmentPanel = ({
  selectedTasks,
  delivers,
  deliverAssignments,
  onAssignmentChange,
  onDistributeEvenly,
  onCancel,
  onConfirm,
}: AssignmentPanelProps) => {
  const unassignedTasksCount =
    selectedTasks.length -
    Object.values(deliverAssignments).reduce((sum, count) => sum + count, 0);

  return (
    <Panel>
      {/* 分派任務 */}
      <PanelHeader>
        <h2>分派任務</h2>
      </PanelHeader>

      {/* 可用代收員 */}
      <DeliverHeader>
        <h2>汪汪員列表</h2>
        <p>目前有 {delivers.length} 位汪汪員</p>
      </DeliverHeader>

      {/* 代收員列表 */}
      <PanelContent>
        <DeliverListContainer>
          {delivers.map((deliver) => (
            <DeliverItem key={deliver.UsersID}>
              {/* 卡片資訊 */}
              <DeliverInfo>
                <p>{deliver.LineName}</p>
                <span>
                  目前任務數:{' '}
                  <span className="task-count">{deliver.TodayTaskCount}</span>
                </span>
              </DeliverInfo>
              {/* 卡片操作 */}
              <DeliverControls>
                <QuantityControls>
                  <QuantityButton
                    onClick={() =>
                      onAssignmentChange(
                        deliver.UsersID,
                        Math.max(0, deliverAssignments[deliver.UsersID] - 1),
                      )
                    }
                    disabled={deliverAssignments[deliver.UsersID] <= 0}
                  >
                    <MdRemove />
                  </QuantityButton>
                  <StyledInput
                    type="number"
                    value={deliverAssignments[deliver.UsersID]}
                    onChange={(e) =>
                      onAssignmentChange(
                        deliver.UsersID,
                        Number.parseInt(e.target.value) || 0,
                      )
                    }
                    min={0}
                    max={selectedTasks.length}
                  />
                  <QuantityButton
                    onClick={() =>
                      onAssignmentChange(
                        deliver.UsersID,
                        deliverAssignments[deliver.UsersID] + 1,
                      )
                    }
                    disabled={
                      Object.values(deliverAssignments).reduce(
                        (sum, count) => sum + count,
                        0,
                      ) >= selectedTasks.length
                    }
                  >
                    <MdAdd />
                  </QuantityButton>
                </QuantityControls>
              </DeliverControls>
            </DeliverItem>
          ))}
        </DeliverListContainer>
      </PanelContent>

      {/* 已選取任務提示 */}
      <PanelText>
        <p>總共選取 {selectedTasks.length} 筆任務</p>
        {unassignedTasksCount > 0 && (
          <Warning>*尚有 {unassignedTasksCount} 筆任務未分配</Warning>
        )}
      </PanelText>

      {/* 平均分配按鈕 */}
      <DistributeButton onClick={onDistributeEvenly}>平均分配</DistributeButton>

      {/* 取消確認 */}
      <PanelFooter>
        <FooterButton $variant="outline" onClick={onCancel}>
          取消
        </FooterButton>
        <FooterButton
          $variant="primary"
          onClick={onConfirm}
          disabled={unassignedTasksCount > 0}
        >
          確認分派
        </FooterButton>
      </PanelFooter>
    </Panel>
  );
};

export default AssignmentPanel;

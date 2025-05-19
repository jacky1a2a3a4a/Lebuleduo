import React from 'react';
import {
  ReportModal,
  ReportModalTitle,
  ReportSection,
  ReportSectionTitle,
  ReportOption,
  ReportTextarea,
  ReportButtonGroup,
  ReportSubmitButton,
  ReportCancelButton,
} from './styled';

interface TaskReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: string, otherIssue: string) => void;
  selectedIssue: string | null;
  otherIssue: string;
  onSelectedIssueChange: (issue: string) => void;
  onOtherIssueChange: (otherIssue: string) => void;
  setReportForm: React.Dispatch<
    React.SetStateAction<{
      issue: string | null;
      otherIssue: string;
      isSubmitted: boolean;
      isCleared: boolean;
      lastSubmitted: {
        issue: string | null;
        otherIssue: string;
      } | null;
    }>
  >;
}

const TaskReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedIssue,
  otherIssue,
  onSelectedIssueChange,
  onOtherIssueChange,
  setReportForm,
}: TaskReportModalProps) => {
  const handleSubmit = () => {
    onSubmit(selectedIssue || '', otherIssue);
  };

  const handleCancel = () => {
    setReportForm((prev) => ({
      ...prev,
      issue: null,
      otherIssue: '',
      isSubmitted: false,
      isCleared: true,
      lastSubmitted: null,
    }));
    onClose();
  };

  const canSubmit = selectedIssue !== null;

  return (
    <ReportModal $isOpen={isOpen}>
      <ReportModalTitle>異常回報</ReportModalTitle>

      <ReportSection>
        <ReportSectionTitle>常見問題</ReportSectionTitle>
        <ReportOption
          $selected={selectedIssue === '1'}
          onClick={() => onSelectedIssueChange('1')}
        >
          垃圾量超過方案重量
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '2'}
          onClick={() => onSelectedIssueChange('2')}
        >
          客戶未放置垃圾
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '3'}
          onClick={() => onSelectedIssueChange('3')}
        >
          客戶未分類
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '4'}
          onClick={() => onSelectedIssueChange('4')}
        >
          其他問題
        </ReportOption>
      </ReportSection>

      <ReportSection>
        <ReportSectionTitle>問題描述</ReportSectionTitle>
        <ReportTextarea
          value={otherIssue}
          onChange={(e) => onOtherIssueChange(e.target.value)}
          placeholder="請描述問題詳情..."
        />
      </ReportSection>

      <ReportButtonGroup>
        <ReportCancelButton onClick={handleCancel}>取消</ReportCancelButton>
        <ReportSubmitButton onClick={handleSubmit} disabled={!canSubmit}>
          確認回報
        </ReportSubmitButton>
      </ReportButtonGroup>
    </ReportModal>
  );
};

export default TaskReportModal;

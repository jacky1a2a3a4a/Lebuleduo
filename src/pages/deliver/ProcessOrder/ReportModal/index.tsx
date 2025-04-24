import {
  ReportModal as StyledReportModal,
  ReportModalTitle,
  ReportSection,
  ReportSectionTitle,
  ReportOption,
  ReportTextarea,
  ReportButtonGroup,
  ReportSubmitButton,
  ReportCancelButton,
} from './styled';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: string, otherIssue: string) => void;
  selectedIssue: string | null;
  otherIssue: string;
  onSelectedIssueChange: (issue: string | null) => void;
  onOtherIssueChange: (issue: string) => void;
}

//異常回報 選項
// 1 = 垃圾量超過方案限制
// 2 = 未找到垃圾袋，用戶無回應
// 3 = 無 QR 碼，用戶無回應
// 4 = 垃圾袋破損嚴重
// 5 = 面交未見用戶，已聯絡無回應

const ReportModalComponent = ({
  isOpen,
  onClose,
  onSubmit,
  selectedIssue,
  otherIssue,
  onSelectedIssueChange,
  onOtherIssueChange,
}: ReportModalProps) => {
  const handleSubmit = () => {
    if (!selectedIssue) {
      alert('請選擇異常問題');
      return;
    }

    onSubmit(selectedIssue, otherIssue);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledReportModal $isOpen={isOpen}>
      <ReportModalTitle>異常回報</ReportModalTitle>

      <ReportSection>
        <ReportSectionTitle>* 請選擇異常問題 *</ReportSectionTitle>
        <ReportOption
          $selected={selectedIssue === '1'}
          onClick={() => onSelectedIssueChange('1')}
        >
          垃圾量超過方案限制
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '2'}
          onClick={() => onSelectedIssueChange('2')}
        >
          未找到垃圾袋，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '3'}
          onClick={() => onSelectedIssueChange('3')}
        >
          無 QR 碼，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '4'}
          onClick={() => onSelectedIssueChange('4')}
        >
          垃圾袋破損嚴重
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '5'}
          onClick={() => onSelectedIssueChange('5')}
        >
          面交未見用戶，已聯絡無回應
        </ReportOption>
      </ReportSection>

      <ReportSection>
        <ReportSectionTitle>其他問題回報</ReportSectionTitle>
        <ReportTextarea
          placeholder="請描述其他異常情況..."
          value={otherIssue}
          onChange={(e) => onOtherIssueChange(e.target.value)}
        />
      </ReportSection>

      <ReportButtonGroup>
        <ReportCancelButton onClick={handleCancel}>取消</ReportCancelButton>
        <ReportSubmitButton onClick={handleSubmit}>提交</ReportSubmitButton>
      </ReportButtonGroup>
    </StyledReportModal>
  );
};

export default ReportModalComponent;

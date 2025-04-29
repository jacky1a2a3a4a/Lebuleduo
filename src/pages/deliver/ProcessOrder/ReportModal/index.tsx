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
import { ReportForm } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: string, otherIssue: string) => void;
  selectedIssue: string | null;
  otherIssue: string;
  onSelectedIssueChange: (issue: string | null) => void;
  onOtherIssueChange: (issue: string) => void;
  setReportForm: (
    form: ReportForm | ((prev: ReportForm) => ReportForm),
  ) => void;
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
  setReportForm,
}: ReportModalProps) => {
  const handleSubmit = () => {
    if (!selectedIssue) {
      alert('請選擇異常問題');
      return;
    }

    onSubmit(selectedIssue, otherIssue);
    // 提交後關閉 modal，但不清除選項
    onClose();
  };

  const handleCancel = () => {
    // 清除選取的選項
    onSelectedIssueChange(null);
    // 清除填寫的文字
    onOtherIssueChange('');
    // 設置清除標記
    setReportForm((prev) => ({
      ...prev,
      isCleared: true,
    }));
    // 關閉 modal
    onClose();
  };

  const handleOptionClick = (issue: string) => {
    // 如果點選的是當前已選中的選項，則取消選擇
    if (selectedIssue === issue) {
      onSelectedIssueChange(null);
    } else {
      onSelectedIssueChange(issue);
    }
  };

  return (
    <StyledReportModal $isOpen={isOpen}>
      <ReportModalTitle>異常回報</ReportModalTitle>

      <ReportSection>
        <ReportSectionTitle>* 請選擇異常問題 *</ReportSectionTitle>
        <ReportOption
          $selected={selectedIssue === '1'}
          onClick={() => handleOptionClick('1')}
        >
          垃圾量超過方案限制
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '2'}
          onClick={() => handleOptionClick('2')}
        >
          未找到垃圾袋，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '3'}
          onClick={() => handleOptionClick('3')}
        >
          無 QR 碼，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '4'}
          onClick={() => handleOptionClick('4')}
        >
          垃圾袋破損嚴重
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === '5'}
          onClick={() => handleOptionClick('5')}
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
        <ReportCancelButton onClick={handleCancel}>清除</ReportCancelButton>
        <ReportSubmitButton onClick={handleSubmit}>確認</ReportSubmitButton>
      </ReportButtonGroup>
    </StyledReportModal>
  );
};

export default ReportModalComponent;

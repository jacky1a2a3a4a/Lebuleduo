import { useState } from 'react';
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
}

const ReportModalComponent = ({
  isOpen,
  onClose,
  onSubmit,
}: ReportModalProps) => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [otherIssue, setOtherIssue] = useState('');

  const handleSubmit = () => {
    if (!selectedIssue) {
      alert('請選擇異常問題');
      return;
    }

    onSubmit(selectedIssue, otherIssue);
    setSelectedIssue(null);
    setOtherIssue('');
  };

  const handleCancel = () => {
    setSelectedIssue(null);
    setOtherIssue('');
    onClose();
  };

  return (
    <StyledReportModal $isOpen={isOpen}>
      <ReportModalTitle>異常回報</ReportModalTitle>

      <ReportSection>
        <ReportSectionTitle>* 請選擇異常問題 *</ReportSectionTitle>
        <ReportOption
          $selected={selectedIssue === 'overweight'}
          onClick={() => setSelectedIssue('overweight')}
        >
          垃圾量超過方案限制
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === 'no_bag'}
          onClick={() => setSelectedIssue('no_bag')}
        >
          未找到垃圾袋，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === 'no_qrcode'}
          onClick={() => setSelectedIssue('no_qrcode')}
        >
          無 QR 碼，用戶無回應
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === 'broken_bag'}
          onClick={() => setSelectedIssue('broken_bag')}
        >
          垃圾袋破損嚴重
        </ReportOption>
        <ReportOption
          $selected={selectedIssue === 'no_contact'}
          onClick={() => setSelectedIssue('no_contact')}
        >
          面交未見用戶，已聯絡無回應
        </ReportOption>
      </ReportSection>

      <ReportSection>
        <ReportSectionTitle>其他問題回報</ReportSectionTitle>
        <ReportTextarea
          placeholder="請描述其他異常情況..."
          value={otherIssue}
          onChange={(e) => setOtherIssue(e.target.value)}
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

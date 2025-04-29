import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { issue: string; otherIssue?: string }) => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: var(--font-size-xl);
`;

const ModalBody = styled.div`
  margin-bottom: var(--spacing-md);
`;

const IssueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const IssueItem = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-primary)' : 'var(--color-gray-100)'};
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color-white)' : 'var(--color-text-primary)'};
  border: none;
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  cursor: pointer;
  font-size: var(--font-size-sm);
`;

const OtherIssueInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
`;

const SubmitButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  width: 100%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  margin-top: var(--spacing-md);
`;

const issues = [
  '垃圾未放置',
  '垃圾量過多',
  '垃圾量過少',
  '垃圾分類錯誤',
  '其他',
];

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedIssue, setSelectedIssue] = React.useState<string>('');
  const [otherIssue, setOtherIssue] = React.useState<string>('');

  const handleSubmit = () => {
    if (selectedIssue) {
      onSubmit({
        issue: selectedIssue,
        otherIssue: selectedIssue === '其他' ? otherIssue : undefined,
      });
    }
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>回報異常</ModalTitle>
          <CloseButton onClick={onClose}>
            <MdClose />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <IssueList>
            {issues.map((issue) => (
              <IssueItem
                key={issue}
                isSelected={selectedIssue === issue}
                onClick={() => setSelectedIssue(issue)}
              >
                {issue}
              </IssueItem>
            ))}
          </IssueList>
          {selectedIssue === '其他' && (
            <OtherIssueInput
              placeholder="請描述異常情況"
              value={otherIssue}
              onChange={(e) => setOtherIssue(e.target.value)}
            />
          )}
        </ModalBody>
        <SubmitButton onClick={handleSubmit} disabled={!selectedIssue}>
          提交
        </SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReportModal;

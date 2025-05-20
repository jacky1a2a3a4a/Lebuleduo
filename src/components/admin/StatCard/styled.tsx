import styled from 'styled-components';

export const StatCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  width: 100%;
  height: 100%;
  max-height: 50px;

  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Icon = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  aspect-ratio: 1/1;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const Numbers = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  color: ${({ theme }) => theme.colors.neutral[500]};
  text-overflow: ellipsis;
`;

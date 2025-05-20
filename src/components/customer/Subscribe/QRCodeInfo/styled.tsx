import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.5;

  width: 100%;
  height: 2px;

  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const MethodTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Note = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

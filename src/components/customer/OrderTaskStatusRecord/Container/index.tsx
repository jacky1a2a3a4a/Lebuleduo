import { PropsWithChildren } from 'react';
import { StatusCard } from './styled';

interface ContainerProps {
  isOverweight?: boolean;
}

export default function Container({
  children,
  isOverweight,
}: PropsWithChildren<ContainerProps>) {
  return <StatusCard $isOverweight={isOverweight}>{children}</StatusCard>;
}

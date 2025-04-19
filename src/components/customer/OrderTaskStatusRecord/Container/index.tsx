import { PropsWithChildren } from 'react';
import { StatusCard } from './styled';

export default function Container({ children }: PropsWithChildren) {
  return <StatusCard>{children}</StatusCard>;
}

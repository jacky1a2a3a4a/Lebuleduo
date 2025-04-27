import { PageHeader } from './styles';

export default function FunctionHeader() {
  return (
    <PageHeader>
      <div className="date-picker">
        <input type="date" defaultValue="2025-05-03" />
      </div>
    </PageHeader>
  );
}

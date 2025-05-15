import { TabContainer, Tab } from './styled';

interface TabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: {
    name: string;
    count: number;
  }[];
}

const OrderDetailTab = ({ activeTab, onTabChange, tabs }: TabProps) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.name}
          $active={activeTab === tab.name}
          onClick={() => onTabChange(tab.name)}
        >
          {tab.name} ({tab.count})
        </Tab>
      ))}
    </TabContainer>
  );
};

export default OrderDetailTab;

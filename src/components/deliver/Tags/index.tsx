import { CategoryType } from '../../../types/deliver/OrderDetail';
import {
  TaskCategoryWrapper,
  TaskCategoryContainer,
  CategoryTab,
} from './styled';

interface CategoryTagsProps {
  topPosition?: number;
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  scheduledTasksCount: number;
  completedTasksCount: number;
  abnormalTasksCount: number;
}

const CategoryTags = ({
  topPosition,
  activeCategory,
  onCategoryChange,
  scheduledTasksCount,
  completedTasksCount,
  abnormalTasksCount,
}: CategoryTagsProps) => {
  return (
    <TaskCategoryWrapper $topPosition={topPosition}>
      <TaskCategoryContainer>
        <CategoryTab
          $isActive={activeCategory === 'scheduled'}
          onClick={() => onCategoryChange('scheduled')}
        >
          待前往({scheduledTasksCount})
        </CategoryTab>

        <CategoryTab
          $isActive={activeCategory === 'completed'}
          onClick={() => onCategoryChange('completed')}
        >
          已完成({completedTasksCount})
        </CategoryTab>

        <CategoryTab
          $isActive={activeCategory === 'abnormal'}
          onClick={() => onCategoryChange('abnormal')}
        >
          異常回報({abnormalTasksCount})
        </CategoryTab>
      </TaskCategoryContainer>
    </TaskCategoryWrapper>
  );
};

export default CategoryTags;

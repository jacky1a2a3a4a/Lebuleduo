import styled from 'styled-components';

const PlanSectionStyled = styled.section`
  background-color: var(--color-gray-0);
  width: 100%;
  height: 100vh;
`;

const PlanContainer = styled.div`
  background-color: var(--color-gray-0);
  width: 100%;
  height: 100vh;
`;

const PlanCard = styled.div`
  background-color: var(--color-gray-0);
  width: 100%;
  height: 100vh;
`;

const PlanCardTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

const PlanCardDescription = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

const PlanCardPrice = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

const Plan = () => {
  return (
    <PlanSectionStyled>
      <PlanContainer>
        <PlanCard>
          <PlanCardTitle>方案名稱</PlanCardTitle>
          <PlanCardDescription>方案描述</PlanCardDescription>
          <PlanCardPrice>方案價格</PlanCardPrice>
        </PlanCard>
      </PlanContainer>
    </PlanSectionStyled>
  );
};

export default Plan;

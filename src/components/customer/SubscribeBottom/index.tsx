import {
  BottomInfoContainer,
  TotalPrice,
  TotalPriceText,
  TotalPriceContainer,
  TotalPriceTCount,
  PriceDetails,
  OriginalPriceText,
  DiscountText,
  SubscribeNextButton,
  ContentWrapper,
} from './styled';

interface SubscribeBottomProps {
  totalPrice: number;
  originalPrice?: number;
  discount?: number;
  isActive: boolean;
  onNext: () => void;
  children?: React.ReactNode;
}

const SubscribeBottom = ({
  totalPrice,
  originalPrice,
  discount,
  isActive,
  onNext,
  children,
}: SubscribeBottomProps) => {
  const hasDiscount = Boolean(
    discount &&
      originalPrice &&
      discount > 0 &&
      originalPrice > totalPrice &&
      originalPrice !== totalPrice,
  );

  return (
    <>
      <ContentWrapper>{children}</ContentWrapper>
      <BottomInfoContainer>
        <TotalPrice>
          <TotalPriceText>總金額</TotalPriceText>
          <TotalPriceContainer>
            <TotalPriceTCount $isActive={isActive}>
              NT${totalPrice}
            </TotalPriceTCount>
            {hasDiscount && (
              <PriceDetails>
                <OriginalPriceText>NT${originalPrice}</OriginalPriceText>
                <DiscountText>節省 NT${discount}</DiscountText>
              </PriceDetails>
            )}
          </TotalPriceContainer>
        </TotalPrice>

        <SubscribeNextButton onClick={onNext} $active={isActive}>
          下一步
        </SubscribeNextButton>
      </BottomInfoContainer>
    </>
  );
};

export default SubscribeBottom;

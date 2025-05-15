import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
  SelectContainer,
  SelectButton,
  OptionsContainer,
  Option,
} from './styled';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = '請選擇',
  width,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <SelectContainer ref={selectRef} width={width}>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {isOpen ? (
          <MdKeyboardArrowUp size={14} />
        ) : (
          <MdKeyboardArrowDown size={14} />
        )}
      </SelectButton>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              selected={option.value === value}
            >
              {option.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};

export default Select;

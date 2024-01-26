import React from "react";
import { Icon } from "@iconify/react";

export interface optionsGroupProps {
  id: number;
  dimension: string;
}

interface CollapsibleSectionProps {
  title: string;
  optionsGroup: optionsGroupProps[];
  isDimensionOpened: boolean;
  setIsDimensionOpened: (isOpen: boolean) => void;
  selectedOption: number;
  setSelectedOption: (value: number) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  optionsGroup,
  isDimensionOpened,
  setIsDimensionOpened,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="border-b-[1px] border-[#ffffff29] py-3">
      <button
        className="flex flex-row items-center justify-between w-full bg-transparent"
        onClick={() => setIsDimensionOpened(!isDimensionOpened)}
      >
        <span className="font-chakra">{title}</span>
        <Icon
          icon={`${
            !isDimensionOpened ? "charm:chevron-up" : "charm:chevron-down"
          }`}
          rotate={2}
          className="w-4 h-4"
        />
      </button>
      <div
        className={`overflow-visible pt-3 transition-all duration-500 ease-in-out ${
          !isDimensionOpened
            ? "hidden opacity-0 h-0"
            : "block opacity-100 h-auto"
        }`}
      >
        <div className="pe-0 p-0 overflow-visible">
          <div className="image-board grid-2">
            {optionsGroup.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="image-dimension-group"
                  value={option.dimension}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="image-radio"
                ></input>
                <div
                  className={`image-radio-board ${
                    selectedOption === option.id ? "image-radio-checked" : ""
                  }`}
                >
                  {option.dimension}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollapsibleSection;

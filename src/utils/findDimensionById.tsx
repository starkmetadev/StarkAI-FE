import { optionsGroupProps } from "../components/ImageGeneration/CollapsibleSection";

const findDimensionById = (id: number, dimensions: optionsGroupProps[]) => {
  const outputDimension = dimensions.find((dimension) => dimension.id === id);
  return outputDimension?.dimension || "";
};

export default findDimensionById;

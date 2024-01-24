import Card from "../Others/Card";
import { Image } from "../../utils/types";

interface GenerationHistoryProps {
  imageData: Image[];
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({ imageData }) => {
  return (
    <>
      {imageData.length > 0 && (
        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 grid-cols-1 gap-4 py-6 px-4 md:px-8 sm:px-4 justify-start">
          {imageData.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default GenerationHistory;
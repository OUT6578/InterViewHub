import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Question {
  id: number;
  category: string;
  level: string;
  difficulty: string;
  question: string;
  code: string;
  output: string;
  explanation: string;
}

interface QuestionItemProps {
  question: Question;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-orange-100 text-orange-700",
    Expert: "bg-red-100 text-red-700",
  };
  return colors[difficulty] || "bg-gray-100 text-gray-700";
};

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  expanded,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-purple-600 font-bold text-lg">
                Q{index + 1}
              </span>
              <span className="text-gray-500 font-semibold">
                {question.level}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(
                  question.difficulty
                )}`}
              >
                {question.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {question.question}
            </h3>
          </div>
          <button className="text-purple-600 p-2">
            {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4 mt-6">
            <div>
              <h4 className="text-sm font-bold text-gray-600 mb-2">
                💻 CODE:
              </h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
                {question.code}
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-600 mb-2">
                ✅ OUTPUT:
              </h4>
              <pre className="bg-green-50 text-green-800 p-4 rounded-xl border-l-4 border-green-500 text-sm">
                {question.output}
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-600 mb-2">
                🧠 EXPLANATION:
              </h4>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <pre className="text-blue-900 whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {question.explanation}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;

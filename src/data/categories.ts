import {
  Code,
  Zap,
  BookOpen,
} from "lucide-react";

export const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      id: "async",
      name: "Async & Event Loop",
      icon: Zap,
      color: "bg-blue-500",
    },
    { id: "array", name: "Array Methods", icon: Code, color: "bg-green-500" },
    { id: "react", name: "React Hooks", icon: Code, color: "bg-cyan-500" },
    {
      id: "operators",
      name: "Operators & Coercion",
      icon: Code,
      color: "bg-orange-500",
    },
    {
      id: "scope",
      name: "Var, Let, Const & Scope",
      icon: Code,
      color: "bg-pink-500",
    },
  ];

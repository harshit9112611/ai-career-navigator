export interface CareerMatch {
  title: string;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  salaryRange: string;
  growthOutlook: string;
  roadmap: string[];
}

export interface AssessmentData {
  skills: string[];
  interests: string[];
  strengths: string[];
}

export interface CareerState {
  assessment: AssessmentData;
  results: CareerMatch[];
  isLoading: boolean;
  error: string | null;
  setSkills: (skills: string[]) => void;
  setInterests: (interests: string[]) => void;
  setStrengths: (strengths: string[]) => void;
  setResults: (results: CareerMatch[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

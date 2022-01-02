export interface GLMSummary {
  name: string;
  desc: string;
  target: string;
  prediction: string;
  var_weights: string;
  link_function: string;
  error_dist: string;
  explained_variance: number;
  feature_summary: FeatureSummary[];
}

export interface FeatureSummaryData {
  bin_edge_right: number[];
  sum_target: number[];
  sum_prediction: number[];
  sum_weight: number[];
  wtd_avg_prediction: number[];
  wtd_avg_target: number[];
}

export interface FeatureSummary {
  name: string;
  data: FeatureSummaryData;
}

export interface paramsGetSummary {
  name: string | undefined;
  desc: string | undefined;
  min_explained_variance: number | undefined;
  max_explained_variance: number | undefined;
  features: string[] | undefined;
}
export interface ShortSummaryCard {
  name: string;
  desc: string;
  target: string;
  explained_variance: number;
}

export type UpdateStateFunction<T> = <K extends keyof T>(key: K, val: T[K]) => void;

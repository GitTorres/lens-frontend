export interface GLMSummary {
    name: string
    desc: string
    target: string
    prediction: string
    var_weights: string
    link_function: string
    error_dist: string
    explained_variance: number
    feature_summary: FeatureSummary[]
}

export interface FeatureSummaryData {
    bin_edge_right: number[]
    sum_target: number[]
    sum_prediction: number[]
    sum_weight: number[]
    wtd_avg_prediction: number[]
    wtd_avg_target: number[]
}

export interface FeatureSummary {
    name: string
    data: FeatureSummaryData

}
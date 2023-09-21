export const isInterventionExportFeatureEnabled = Boolean(
  +process.env.INTERVENTION_EXPORT_FEATURE_ENABLED!,
);

export const isHfhsIntegrationFeatureEnabled = Boolean(
  +process.env.HFHS_INTEGRATION_FEATURE_ENABLED!,
);

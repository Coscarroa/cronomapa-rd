export interface OfficialArchiveLink {
  label: string;
  institution: string;
  url: string;
}

export interface MinerdCompetencyBlock {
  fundamental: string;
  specific: string[];
  achievementIndicator: string;
}

export interface PrimarySourceCapsule {
  id: string;
  epochKey: '1492' | 'colonia' | '1844' | 'restauracion' | 'siglo_xx';
  epochId: string;
  periodLabel: string;
  title: string;
  documentTitle: string;
  year: string;
  author: string;
  archiveRef: string;
  excerpt: string;
  secondaryExcerpt: string;
  historicalContext: string;
  socraticQuestions: string[];
  minerdCompetencies: MinerdCompetencyBlock;
  cartographicActivity: string;
  officialLinks: OfficialArchiveLink[];
}

export declare const PRIMARY_SOURCES_BY_EPOCH: Record<
  '1492' | 'colonia' | '1844' | 'restauracion' | 'siglo_xx',
  PrimarySourceCapsule
>;

export declare const PRIMARY_SOURCES_LIST: PrimarySourceCapsule[];

export declare function getPrimarySourceForYearOrEpoch(
  yearOrEpoch: number | string,
): PrimarySourceCapsule;

import { UdiapFactorInput, UdiapEvaluationResult } from '../types';

export function calculateUdiapDecision(input: UdiapFactorInput, lang: 'en' | 'sw' = 'en'): UdiapEvaluationResult {
  // Normalized CapEx factor: projects under $200k are nimble; above $500k require elevated capital reserves
  const capexNorm = Math.max(0, Math.min(100, 100 - (input.capexBudget / 5000)));

  // Standard enterprise weights:
  // Regulatory: 25%, Market Urgency: 20%, Technical Feasibility: 20%, Team Readiness: 20%, Capital Optimization: 15%
  const weightReg = 0.25;
  const weightMarket = 0.20;
  const weightTech = 0.20;
  const weightTeam = 0.20;
  const weightCapex = 0.15;

  // Technical feasibility is inversely proportional to excessive complexity unless team readiness is very high
  const techFeasibility = Math.max(10, 100 - (input.technicalComplexityScore * 0.6) + (input.teamReadinessScore * 0.4));

  const weightedSum =
    (input.regulatoryComplianceScore * weightReg) +
    (input.marketUrgencyScore * weightMarket) +
    (techFeasibility * weightTech) +
    (input.teamReadinessScore * weightTeam) +
    (capexNorm * weightCapex);

  const decisionScore = Math.round(weightedSum * 10) / 10;

  // Calculate confidence index based on input alignment and minimum thresholds
  const variancePenalty = Math.abs(input.regulatoryComplianceScore - input.teamReadinessScore) * 0.15;
  const confidenceIndex = Math.min(98, Math.max(45, Math.round(88 - variancePenalty + (input.regulatoryComplianceScore > 75 ? 8 : -5))));

  let recommendation: UdiapEvaluationResult['recommendation'] = 'REVISE_PROPOSAL';
  let recommendationSw = 'REKEBISHA PENDEKEZO';
  let riskRating: UdiapEvaluationResult['riskRating'] = 'Critical';
  let summary = '';

  if (decisionScore >= 78 && input.regulatoryComplianceScore >= 70) {
    recommendation = 'EXECUTE_IMMEDIATELY';
    recommendationSw = 'TEKELEZA MARA MOJA (IDHINISHA)';
    riskRating = 'Low';
    summary = lang === 'sw'
      ? 'Tathmini ya UDIAP inaonesha utayari wa juu sana wa kiutendaji na uzingatiaji mzuri wa kanuni. Mradi una kiwango cha chini cha vihatarishi na unafaa kuingia katika hatua ya utekelezaji.'
      : 'UDIAP assessment confirms superior operational viability, compliant regulatory posture, and strong execution synergy. Risk vectors are contained.';
  } else if (decisionScore >= 64) {
    recommendation = 'CONDITIONAL_APPROVAL';
    recommendationSw = 'IDHINISHO LA MASHARTI';
    riskRating = 'Moderate';
    summary = lang === 'sw'
      ? 'Mradi una nafasi nzuri ya mafanikio lakini unahitaji udhibiti wa gharama za mtaji na uimarishaji wa timu ya kiufundi kabla ya kusambaza kwa wateja wote.'
      : 'Viable strategic initiative with favorable returns. Requires milestone-gated capital release and pre-launch compliance confirmation.';
  } else if (decisionScore >= 50) {
    recommendation = 'PILOT_VALIDATION';
    recommendationSw = 'JARIBIO LA AWALI (PILOT)';
    riskRating = 'Elevated';
    summary = lang === 'sw'
      ? 'Kiwango cha vihatarishi ni cha kati hadi cha juu. Inashauriwa kutekeleza toleo la majaribio (pilot) kwenye eneo dogo kabla ya uwekezaji mkuu.'
      : 'Elevated technical or regulatory friction detected. Recommend scoping a contained sandbox or pilot cohort before broader capital deployment.';
  } else {
    recommendation = 'REVISE_PROPOSAL';
    recommendationSw = 'REKEBISHA PENDEKEZO KWANZA';
    riskRating = 'Critical';
    summary = lang === 'sw'
      ? 'Alama za utayari ziko chini ya viwango vya usalama wa uwekezaji. Marekebisho makubwa ya bajeti, timu, na kanuni za kisheria yanahitajika.'
      : 'Fundamental operational deficits identified. Capital commitment poses high vulnerability without substantial restructuring.';
  }

  const factors = [
    {
      name: lang === 'sw' ? 'Uzingatiaji wa Kanuni (TCRA/PDPA/BOT)' : 'Regulatory & Legal Compliance',
      score: input.regulatoryComplianceScore,
      weight: 25,
      impact: (input.regulatoryComplianceScore >= 70 ? 'Positive' : input.regulatoryComplianceScore >= 50 ? 'Neutral' : 'Risk') as 'Positive' | 'Neutral' | 'Risk'
    },
    {
      name: lang === 'sw' ? 'Uhifadhi na Ufanisi wa Mtaji (CapEx)' : 'CapEx Capital Efficiency',
      score: Math.round(capexNorm),
      weight: 15,
      impact: (capexNorm >= 65 ? 'Positive' : capexNorm >= 45 ? 'Neutral' : 'Risk') as 'Positive' | 'Neutral' | 'Risk'
    },
    {
      name: lang === 'sw' ? 'Uharaka na Hitaji la Soko' : 'Market Demand & Time-to-Market',
      score: input.marketUrgencyScore,
      weight: 20,
      impact: (input.marketUrgencyScore >= 70 ? 'Positive' : input.marketUrgencyScore >= 50 ? 'Neutral' : 'Risk') as 'Positive' | 'Neutral' | 'Risk'
    },
    {
      name: lang === 'sw' ? 'Uwezekano wa Kiufundi (Feasibility)' : 'Technical Feasibility',
      score: Math.round(techFeasibility),
      weight: 20,
      impact: (techFeasibility >= 65 ? 'Positive' : techFeasibility >= 50 ? 'Neutral' : 'Risk') as 'Positive' | 'Neutral' | 'Risk'
    },
    {
      name: lang === 'sw' ? 'Utayari wa Timu ya Utekelezaji' : 'Engineering & Ops Team Readiness',
      score: input.teamReadinessScore,
      weight: 20,
      impact: (input.teamReadinessScore >= 70 ? 'Positive' : input.teamReadinessScore >= 50 ? 'Neutral' : 'Risk') as 'Positive' | 'Neutral' | 'Risk'
    }
  ];

  const mitigationSteps = [
    lang === 'sw' ? 'Hakikisha usajili na ukaguzi wa data kwa mujibu wa Sheria ya Ulinzi wa Taarifa Binafsi (PDPA).' : 'Establish formal data handling compliance audit under Tanzania PDPA guidelines.',
    lang === 'sw' ? 'Weka mkataba wa huduma (SLA) wa 99.9% pamoja na mifumo ya kuzuia kukatika kwa mawasiliano.' : 'Contract redundant cloud interconnects to uphold sub-50ms regional SLA targets.',
    lang === 'sw' ? 'Gawa bajeti ya mtaji katika awamu 3 zenye vipimo vilivyowazi vya uthibitisho kabla ya malipo.' : 'Structure capital drawdown across 3 milestone-gated tranches tied to user validation.',
    lang === 'sw' ? 'Unganisha ufuatiliaji wa wakati halisi kupitia J4Q Connect API Gateway kwa usalama wa miundombinu.' : 'Integrate continuous audit telemetry via J4Q Connect Gateway for automated incident response.'
  ];

  return {
    decisionScore,
    confidenceIndex,
    recommendation,
    recommendationSw,
    summary,
    riskRating,
    factors,
    mitigationSteps
  };
}

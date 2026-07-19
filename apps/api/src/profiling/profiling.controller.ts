import { Controller, Post, Body, Get, Query, Logger } from '@nestjs/common';
import { ProfilingService, ProfilingSubmissionDto } from './profiling.service';

@Controller('profiling')
export class ProfilingController {
  private readonly logger = new Logger(ProfilingController.name);

  constructor(private readonly profilingService: ProfilingService) {}

  @Post('submit')
  async submitProfile(@Body() body: ProfilingSubmissionDto) {
    this.logger.log(`Received profiling submission: Q1=${body.q1_assetPreference}, Q3=${body.q3_budget}`);
    return this.profilingService.submitProfile(body);
  }

  @Get('recommendations')
  async getRecommendations(@Query() query: Partial<ProfilingSubmissionDto>) {
    const defaultDto: ProfilingSubmissionDto = {
      q1_assetPreference: query.q1_assetPreference || 'Residential Layout Plot',
      q2_investmentGoal: query.q2_investmentGoal || 'Capital Appreciation',
      q3_budget: query.q3_budget || '₹50 Lakhs – ₹1 Crore',
      q4_timeline: query.q4_timeline || 'Within 2 Months',
      q5_fundingMethod: query.q5_fundingMethod || 'Self-Funded',
      q6_decisionMaker: query.q6_decisionMaker || 'I will decide',
      q7_experience: query.q7_experience || 'Multiple Investments',
      q8_riskApproach: query.q8_riskApproach || 'Balanced',
    };

    const labels = this.profilingService.generateCrmLabels(defaultDto);
    return {
      success: true,
      recommendations: this.profilingService.getDynamicRecommendations(labels),
    };
  }

  @Get('status')
  async getProfilingStatus(@Query('userId') userId: string) {
    if (!userId) {
      return { hasProfile: false };
    }
    const hasProfile = await this.profilingService.checkProfileExists(userId);
    return { hasProfile };
  }
}

import type { ComponentType } from 'react';
import { TitleSlide } from './TitleSlide';
import { AboutMeSlide } from './AboutMeSlide';
import { ResumeSlide } from './ResumeSlide';
import { NinthGradeSlide } from './NinthGradeSlide';
import { TenthGradeSlide } from './TenthGradeSlide';
import { ServiceLearningSlide } from './ServiceLearningSlide';
import { EverFiSlide } from './EverFiSlide';
import { JobShadowSlide } from './JobShadowSlide';
import { ExperienceSlide } from './ExperienceSlide';
import { ReflectionSlide } from './ReflectionSlide';
import { FuturePlansSlide } from './FuturePlansSlide';
import { ThankYouSlide } from './ThankYouSlide';

// Order must match slideMeta in data/presentation.ts
export const slideComponents: ComponentType[] = [
  TitleSlide,
  AboutMeSlide,
  ResumeSlide,
  NinthGradeSlide,
  TenthGradeSlide,
  ServiceLearningSlide,
  EverFiSlide,
  JobShadowSlide,
  ExperienceSlide,
  ReflectionSlide,
  FuturePlansSlide,
  ThankYouSlide,
];

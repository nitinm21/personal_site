import type { Metadata } from 'next';
import AgentSummary from '@/components/AgentSummary';
import SiteJsonLd from '@/components/SiteJsonLd';
import { pageMetadata } from '@/utils/pageMetadata';
import HomeHero from './HomeHero';

export const metadata: Metadata = pageMetadata('/');

export default function Home() {
  return (
    <>
      <HomeHero />
      <AgentSummary />
      <SiteJsonLd />
    </>
  );
}

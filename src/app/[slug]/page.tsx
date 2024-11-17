import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { api } from '~/trpc/server';
import { type ShortenedLink } from '~/types/link-shortener';

export const metadata: Metadata = {
  title: 'Redirecting...',
};

async function getLink(slug: string): Promise<ShortenedLink | null> {
  try {
    const res = await api.linkShortener.getBySlug({
      slug,
    });

    if (!res.success) {
      return null;
    }

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch {
    return null;
  }
}

export const revalidate = 300;

interface SearchParamProps {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_id?: string;
  utm_term?: string;
  utm_content?: string;
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: SearchParamProps;
}

const Page: React.FC<PageProps> = async ({
  params: { slug },
  searchParams,
}) => {
  const link = await getLink(slug);

  if (!link) {
    return notFound();
  }

  await api.linkShortenerRecrods.updateLinkVisitedCount({
    slug,
    searchParams,
  });

  redirect(link.URL);
};

export default Page;

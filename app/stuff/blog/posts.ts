export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  postUrl: string;
  openGraphImage: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'what-if-anyone-at-your-company-could',
    title: 'What if Anyone at Your Company Could Create a Pull Request?',
    description: 'Thoughts on Replit',
    publishedAt: '2025-06-06',
    publishedLabel: 'Jun 6, 2025',
    postUrl: 'https://nitinmurali.substack.com/p/what-if-anyone-at-your-company-could',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/de9f7ffd-8f1f-4ee1-a0c1-cc8e335d28d3_1264x728.png',
  },
  {
    id: 'winning-companies-stay-closest-to-customers',
    title: 'Winning companies stay closest to customers',
    description: 'Not a piece on user research, just a few thoughts on the interface layer!',
    publishedAt: '2024-05-09',
    publishedLabel: 'May 9, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/winning-companies-stay-closest-to-customers',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/c49604bd-510e-4a44-a985-04a755d68c97_1024x1024.webp',
  },
  {
    id: 'why-churn-is-not-always-bad-in-dating',
    title: 'Why churn is not always bad in dating apps?',
    description: 'What I learned after overhearing a couple on the subway.',
    publishedAt: '2024-02-11',
    publishedLabel: 'Feb 11, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/why-churn-is-not-always-bad-in-dating',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/28a9587a-5a8f-4ed4-8391-4e25059fb07a_3840x2160.png',
  },
  {
    id: 'what-b2b-physical-products-taught',
    title: 'What B2B physical products taught me about B2B SaaS products',
    description: 'Great insights usually come from the most disconnected of industries. This time, it was no different',
    publishedAt: '2023-06-20',
    publishedLabel: 'Jun 20, 2023',
    postUrl: 'https://nitinmurali.substack.com/p/what-b2b-physical-products-taught',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!hBtG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2fe8be5-7fbe-469e-b108-7408a70eb528_4624x2080.jpeg',
  },
  {
    id: 'what-linear-and-figma-taught-me-about',
    title: 'What Linear and Figma taught me about product differentiation.',
    description: 'With a few learnings on competing in a red ocean market',
    publishedAt: '2022-12-04',
    publishedLabel: 'Dec 4, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/what-linear-and-figma-taught-me-about',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!rCRC!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F52ebc565-70f7-4a22-a606-cc8ae2b9f784_1024x1024.png',
  },
  {
    id: 'jobs-theory-and-staying-close-to',
    title: 'Jobs Theory and staying close to your users',
    description: 'How a simple conversation about milkshakes rewired my brain',
    publishedAt: '2022-10-23',
    publishedLabel: 'Oct 23, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/jobs-theory-and-staying-close-to',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!CaZv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F2992a376-aab3-420a-acb9-4c0c6549a511_512x512.jpeg',
  },
  {
    id: 'changelog-2021-2022',
    title: 'Changelog: 2021-2022',
    description: 'A list of misses in the year gone by',
    publishedAt: '2022-04-24',
    publishedLabel: 'Apr 24, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/changelog-2021-2022',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!aZ2v!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ff423a5-0f05-460c-8cb4-9e5d7b1cba40_768x768.png',
  },
  {
    id: 'continuous-improvisation',
    title: 'Continuous Improvisation',
    description: 'Why should you become a feedback magnet?',
    publishedAt: '2022-01-02',
    publishedLabel: 'Jan 2, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/continuous-improvisation',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!LjX1!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe10274e2-9dbf-43fd-b6f2-8b6a58384db2_420x300.png',
  },
  {
    id: 'product-improvements-spotify-tv',
    title: 'Product Improvements: Spotify TV',
    description: 'Most of us will agree that Spotify is one of the most well-designed products in recent times.',
    publishedAt: '2021-10-17',
    publishedLabel: 'Oct 17, 2021',
    postUrl: 'https://nitinmurali.substack.com/p/product-improvements-spotify-tv',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!rFjD!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Feaeea9cd-614a-409b-b339-2b2f4c19357e_420x300.png',
  },
  {
    id: 'no-one-cares-about-your-product',
    title: 'No one cares about your product',
    description: "Building with a null hypothesis and the Chekhov's Gun principle",
    publishedAt: '2021-07-27',
    publishedLabel: 'Jul 27, 2021',
    postUrl: 'https://nitinmurali.substack.com/p/no-one-cares-about-your-product',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!NKSj!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F40356cbe-fa14-4b7b-91b6-5bca07ca6d59_420x300.png',
  },
];

import type { StaticImageData } from "next/image";

export interface TestimonialCoin {
  src: StaticImageData;
  alt: string;
}

export interface Testimonial {
  id: string;
  investorName: string;
  role: string;
  avatar: StaticImageData;
  quote: string;
  /** e.g. "+$18,200" or "+64%" */
  metricValue: string;
  /** e.g. "portfolio growth" or "since 2021" */
  metricLabel: string;
  /** 1–5 */
  rating: number;
  coins: TestimonialCoin[];
}

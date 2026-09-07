'use client';

import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type ChartSplineProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        pathLength: 1,
        transition: { duration: 0.4, ease: 'easeInOut' },
      },
      animate: {
        pathLength: [0.1, 1],
        transition: { duration: 0.6, ease: 'easeInOut' },
      },
    },
    path1: {},
    path2: {},
  } satisfies Record<string, Variants>,
  'default-loop': {
    group: {
      initial: {
        pathLength: 1,
      },
      animate: {
        pathLength: [1, 0.1, 1],
        transition: { duration: 1.2, ease: 'easeInOut' },
      },
    },
    path1: {},
    path2: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: ChartSplineProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M3 3v16a2 2 0 0 0 2 2h16"
        variants={variants.path1}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 1.5 0 2-1 2-1"
        variants={variants.path2}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function ChartSpline(props: ChartSplineProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  ChartSpline,
  ChartSpline as ChartSplineIcon,
  type ChartSplineProps,
  type ChartSplineProps as ChartSplineIconProps,
};

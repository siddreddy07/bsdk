'use client';

import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type ToggleLeftProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {},
    rect: {
      initial: {},
      animate: {
        transition: { duration: 0.3, ease: 'easeInOut' },
      },
    },
    circle: {
      initial: {
        cx: 8,
      },
      animate: {
        cx: 16,
        transition: { duration: 0.3, ease: 'easeInOut' },
      },
    },
  } satisfies Record<string, Variants>,
  'default-loop': {
    group: {},
    rect: {},
    circle: {
      initial: {
        cx: 8,
      },
      animate: {
        cx: [8, 16, 16, 8],
        transition: { duration: 0.8, ease: 'easeInOut' },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: ToggleLeftProps) {
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
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        <motion.rect
          width="20"
          height="12"
          x="2"
          y="6"
          rx="6"
          ry="6"
          variants={variants.rect}
          initial="initial"
          animate={controls}
        />
        <motion.circle
          cx="8"
          cy="12"
          r="2"
          variants={variants.circle}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function ToggleLeft(props: ToggleLeftProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  ToggleLeft,
  ToggleLeft as ToggleLeftIcon,
  type ToggleLeftProps,
  type ToggleLeftProps as ToggleLeftIconProps,
};

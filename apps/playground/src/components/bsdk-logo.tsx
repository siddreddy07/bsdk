type BsdkLogoProps = {
  width?: number
  height?: number
  className?: string
}

const BsdkLogo = ({ width = 18, height = 18, className }: BsdkLogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="2" fill="#EDEDED" />
      <rect x="14" y="3" width="7" height="7" rx="2" fill="#717680" />
      <rect x="3" y="14" width="7" height="7" rx="2" fill="#717680" />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="2"
        fill="#EDEDED"
        fillOpacity="0.4"
      />
      <circle cx="12" cy="12" r="1.5" fill="#B8D96A" />
    </svg>
  )
}

export default BsdkLogo
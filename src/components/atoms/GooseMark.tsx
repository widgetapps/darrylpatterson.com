/**
 * Atom: the goose mark from the Patterson coat of arms, as drawn (DSN-1).
 * Body follows the theme (ink in light, paper in dark); the wing stays amber.
 * Decorative by default: the wordmark beside it carries the name.
 */
export type GooseMarkProps = {
  size?: number;
  className?: string;
  title?: string;
  inverse?: boolean;
};

export function GooseMark({ size = 40, className, title, inverse = false }: GooseMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 187.19 171.56"
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        className="fill-goose"
        fillRule="evenodd"
        d="M110.88,86.49c2.66,2.79,5.54,5.41,8.41,8,3.25,2.91,6.54,5.77,9.78,8.7a121.2,121.2,0,0,1,14.55,15.07q34.08-46.47,38.32-92.67L108.59,70.35l0,0c-1.71,1-4,2.54-4.34,4.65-.56,3.65,4.4,9.08,6.68,11.46"
      />
      <path
        className={inverse ? "fill-on-inverse" : "fill-goose-body"}
        fillRule="evenodd"
        d="M85.78,5.68a79.88,79.88,0,0,1,56.64,23.46c.53.54,1.06,1.08,1.58,1.63l5.45-2.47c-1-1.09-2-2.14-3-3.18a85.78,85.78,0,1,0-11.55,131v.06c17.38-11.54,15.34-23.59,6.67-35.17-16.24-21.68-55.79-41.69-34.64-53.53l75.35-46,4.93-3-98,48.71c-66.05,38.13,37.88,52.62,45.72,81.87A80.1,80.1,0,1,1,85.78,5.68"
      />
    </svg>
  );
}

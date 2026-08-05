import type { AnchorHTMLAttributes, MouseEvent } from "react";
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Link({ href, onClick, ...props }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || href.startsWith("#") || /^(https?:|mailto:)/.test(href)) return;
    event.preventDefault(); window.history.pushState({}, "", href); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo(0, 0);
  };
  return <a href={href} onClick={handleClick} {...props} />;
}

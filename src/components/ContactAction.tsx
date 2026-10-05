import { contactLinks } from "../lib/business";
import { Icon, type IconName } from "./Icon";
export type ActionKind = keyof typeof contactLinks;
const labels: Record<ActionKind, string> = {
  call: "Call now",
  whatsapp: "WhatsApp us",
  directions: "Get directions",
};
const icons: Record<ActionKind, IconName> = {
  call: "phone",
  whatsapp: "message",
  directions: "arrow",
};
export function ContactAction({
  kind,
  primary = false,
  compact = false,
}: {
  kind: ActionKind;
  primary?: boolean;
  compact?: boolean;
}) {
  const href = contactLinks[kind];
  const classes = `${compact ? "compact-action" : "button"} ${primary ? "primary" : ""}`;
  if (!href)
    return (
      <span className={`${classes} unavailable`} aria-disabled="true">
        <Icon name={icons[kind]} />
        <span>
          {labels[kind]}
          <small>Details pending</small>
        </span>
      </span>
    );
  return (
    <a
      className={classes}
      href={href}
      {...(kind !== "call"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <Icon name={icons[kind]} />
      {labels[kind]}
    </a>
  );
}
export function ContactActions({ all = false }: { all?: boolean }) {
  return (
    <div className="actions">
      <ContactAction kind="call" primary />
      {all && <ContactAction kind="whatsapp" />}
      <ContactAction kind="directions" />
    </div>
  );
}

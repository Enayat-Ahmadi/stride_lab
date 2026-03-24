import StatusScreen from "./StatusScreen";

export default function EmptyState({
  title = "Nothing here yet",
  message = "No items to display.",
  actionLabel = "Explore sneakers",
  actionHref = "/products",
  icon,
  ...props
}) {
  return (
    <StatusScreen
      type="empty"
      fullScreen={false}
      title={title}
      message={message}
      actionLabel={actionLabel}
      actionHref={actionHref}
      icon={icon}
      {...props}
    />
  );
}
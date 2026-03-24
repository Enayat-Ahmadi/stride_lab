import ErrorScreen from "@/components/ui/ErrorScreen";

export default function Custom500() {
  return (
    <ErrorScreen
      title="Server error"
      message="Something broke on our side. Please try again later."
      actionLabel="Back to home"
      actionHref="/"
    />
  );
}
import MatomoTracker from "./matomoTracker";

enum vendor {
  None,
  Matomo,
}
type TrackerProviderProps = {
  useTracker: boolean
  vendor: (children: React.ReactNode) => JSX.Element
  children?: React.ReactNode;
};

// to be refactored later
const TrackerProvider = ({ useTracker, vendor, children }: TrackerProviderProps) => {
  return useTracker ? vendor(children) : <>{children}</>
  }
export default TrackerProvider;

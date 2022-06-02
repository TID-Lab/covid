
type TrackerProviderProps = {
  useTracker: boolean
  vendor: (children: React.ReactNode) => JSX.Element
  children?: React.ReactNode;
};

const TrackerProvider = ({ useTracker = false, vendor, children }: TrackerProviderProps) => {
  return useTracker ? vendor(children) : <>{children}</>
  }
export default TrackerProvider;

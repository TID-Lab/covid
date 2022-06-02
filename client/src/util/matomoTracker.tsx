import { MatomoProvider } from "@jonkoops/matomo-tracker-react";
import { MatomoInstance } from "@jonkoops/matomo-tracker-react/lib/types";
import React from "react";

type MatomoTrackerProps = {
  value: MatomoInstance,
  children?: React.ReactNode
}
const MatomoTracker = ({ value, children }: MatomoTrackerProps) => {
 return ( 
  <MatomoProvider value={value}>
    {children}
  </MatomoProvider>
 )
}
export default MatomoTracker;

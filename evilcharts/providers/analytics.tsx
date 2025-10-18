import { OpenPanelComponent } from "@openpanel/nextjs";

const Analytics = () => {
  return (
    <>
      <OpenPanelComponent
        clientId="c8796996-20b3-410f-b0a7-f0703e01e3d6"
        trackScreenViews={true}
        trackAttributes={true}
        trackOutgoingLinks={true}
        trackHashChanges={true}
      />
    </>
  );
};

export default Analytics;

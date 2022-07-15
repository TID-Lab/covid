import useTracker from 'hooks/useTracker';
import { useEffect } from 'react';

const DataDeletion = () => {
  const { trackPageView } = useTracker();
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="Policy overflow-auto">
      <div className="container mx-auto my-9 space-y-5">
        <h1>Data Deletion Instructions</h1>

        <p>
          If you, either as a user of the Project PEACH Social Media Dashboard
          or as a user of a social media platform with data collected by our
          dasbhoard, would like to have your data deleted, please contact us at{' '}
          <a href="mailto:mikeb@gatech.edu">mikeb@gatech.edu</a>. If you are a
          social media platform user with data collectd by our dashboard, please
          provide us your username for the relevant social media platform(s) so
          that we can identify the data which needs to be deleted.
        </p>
      </div>
    </div>
  );
};

export default DataDeletion;

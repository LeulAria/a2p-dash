import React, { useState } from 'react';

const ConfirmationBox = () => {
  const [opened] = useState(false);

  return (
    <>
      {
        opened && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              zIndex: 90000,
            }}
          >
            Confirmation Box
          </div>
        )
      }
    </>
  );
};

export default ConfirmationBox;

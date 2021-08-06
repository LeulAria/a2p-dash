import React, { useState } from "react";
import uuid from "../../../utils/uuid";
import "./devtool.css";

// const ReactJson = lazy(() => import("react-json-view"));

const DevTool: React.FC<any> = ({ data }) => {
  const [showDevtool, setShowDevTools] = useState(false);
  const [collabse, setCollabse] = useState(true);

  const toggleDevtools = () => {
    setShowDevTools(!showDevtool);
  };

  const togglecollabse = () => {
    setCollabse(!collabse);
  };

  return (
    <div className={`DevTool ${showDevtool ? "show-devtool" : "hide-devtool"}`}>
      <div className='DevToolsContent'>
        <h1 className='DevToolsTitle'>Firequery Aria</h1>
        <div className='DevtoolContentContainer'>
          <div className='DevtoolsSelectors'>
            {Array(10)
              .fill(0)
              .map((a: any) => (
                <div className='DevtoolAction' key={uuid()}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-archive'
                    viewBox='0 0 16 16'
                  >
                    <path d='M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z' />
                  </svg>
                  Action
                </div>
              ))}
          </div>
          <div className='DevToolTreeViewContainer'>
            <div className='DevToolTreeViewTitle'>
              <h3>collection: products</h3>
              <h5>status: success</h5>
              <button className='collapse-data-btn' onClick={togglecollabse}>
                collabse
              </button>
            </div>
            {/* <div className="DevToolTreeView">
              <Suspense fallback={<div>Loading...</div>}>
                <ReactJson
                  src={data}
                  theme="chalk"
                  iconStyle="square"
                  indentWidth={2}
                  enableClipboard={true}
                  defaultValue={[]}
                  collapsed={collabse}
                />
              </Suspense>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTool;

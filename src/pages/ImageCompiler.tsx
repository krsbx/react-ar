import React from 'react';
import { useCompiler, COMPILER_STATE } from 'mind-ar-react';
import UploadTab from '../components/UploadTab';
import VisualTab from '../components/VisualTab';

const ImageCompilerPage = () => {
  const { startCompiler, dataList, exportedBuffer, percentage, step } = useCompiler();

  const RenderTab = () => {
    switch (step) {
      case COMPILER_STATE.IDLE:
        return (
          <UploadTab
            percentage={percentage}
            onClick={(files) => {
              startCompiler(files);
            }}
          />
        );
      case COMPILER_STATE.COMPILED:
        return <VisualTab dataList={dataList} exportedBuffer={exportedBuffer} />;
      default:
        return <></>;
    }
  };

  return <RenderTab />;
};

export default ImageCompilerPage;

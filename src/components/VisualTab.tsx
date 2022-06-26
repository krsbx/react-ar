import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, createRef, useState } from 'react';
import { Button, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { ICompilerData } from 'mind-ar-ts/src/image-target/utils/types/compiler';

const VisualTab = ({
  dataList,
  exportedBuffer,
}: {
  dataList: ICompilerData[];
  exportedBuffer: Uint8Array;
}) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const [targetIndex, setTargetIndex] = useState(0);
  const [keyframeIndex, setKeyframeIndex] = useState(0);

  const drawPoint = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      color: string | CanvasGradient | CanvasPattern,
      centerX: number,
      centerY: number,
      radius = 1
    ) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    if (dataList.length === 0) return;

    const targetImage = dataList[targetIndex].imageList[keyframeIndex];
    const matchingPoints = [
      ...dataList[targetIndex].matchingData[keyframeIndex].maximaPoints,
      ...dataList[targetIndex].matchingData[keyframeIndex].minimaPoints,
    ];

    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = targetImage.width;
    canvas.height = targetImage.height;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tData = new Uint8ClampedArray(targetImage.width * targetImage.height * 4);

    for (let i = 0; i < targetImage.data.length; i++) {
      tData[i * 4 + 0] = targetImage.data[i];
      tData[i * 4 + 1] = targetImage.data[i];
      tData[i * 4 + 2] = targetImage.data[i];
      tData[i * 4 + 3] = 255;
    }

    const imageData = new ImageData(tData, targetImage.width, targetImage.height);

    ctx.putImageData(imageData, 0, 0);

    for (let i = 0; i < matchingPoints.length; i++) {
      const point = matchingPoints[i];
      drawPoint(ctx, '#ff0000', Math.round(point.x), Math.round(point.y), point.scale);
    }
  }, [dataList, targetIndex, keyframeIndex]);

  const numTargetRange = useMemo(() => dataList.map((data, index) => index), [dataList]);

  const numScaleRange = useMemo(
    () => dataList?.[targetIndex]?.imageList?.map((data, index) => index) ?? [],
    [dataList, targetIndex]
  );

  const canvasStyle = useMemo(() => {
    const width = 100 * (dataList?.[targetIndex]?.imageList?.[keyframeIndex]?.scale ?? 1);

    return {
      width: width * 0.95 + '%',
      maxHeight: '100%',
      top: (100 - width) / 2 + '%',
    };
  }, [dataList, targetIndex, keyframeIndex]);

  const downloadHandler = useCallback(() => {
    const blob = new Blob([exportedBuffer]);
    const aLink = document.createElement('a') as unknown as HTMLAnchorElement;

    aLink.download = 'targets.mind';
    aLink.href = URL.createObjectURL(blob);

    aLink.click();
    URL.revokeObjectURL(aLink.href);
  }, [exportedBuffer]);

  const Lists = ({ children }: { children: React.ReactNode }) => (
    <List role="tablist" aria-orientation="horizontal" listStyleType="none" display="flex">
      {children}
    </List>
  );

  const ListItems = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <ListItem role="tab" onClick={onClick} p={5}>
      <Button
        transition={'all 0.3s ease-in-out'}
        fontWeight={'semibold'}
        cursor="pointer"
        color={'blackAlpha.600'}
        bg={'whiteAlpha.600'}
        _hover={{
          color: 'blackAlpha.900',
          bg: 'whiteAlpha.900',
        }}
      >
        {text}
      </Button>
    </ListItem>
  );

  return (
    <Flex overflow="hidden" flex={1} mt={5} flexDirection="column" alignItems="center">
      <Flex flexDirection="column" alignItems="center">
        <Text color={'whiteAlpha.700'} fontWeight={'semibold'}>
          Select an Image to change the scales of the image
        </Text>
        <Lists>
          {_.map(numTargetRange, (index) => (
            <ListItems
              onClick={() => {
                setTargetIndex(index);
                setKeyframeIndex(0);
              }}
              text={`Image ${index + 1}`}
              key={index}
            />
          ))}
        </Lists>
        <Divider mb={3} />
        <Text color={'whiteAlpha.700'} fontWeight={'semibold'}>
          Select a scale to use for selected image
        </Text>
        <Lists>
          {_.map(numScaleRange, (index) => (
            <ListItems
              onClick={() => {
                setKeyframeIndex(index);
              }}
              text={`Scale ${index + 1}`}
              key={index}
            />
          ))}
        </Lists>
      </Flex>
      <Flex height={'50%'} overflow={'auto'} my={2}>
        <Flex flexDirection="column" alignItems="center">
          <canvas style={canvasStyle} ref={canvasRef} />
        </Flex>
      </Flex>
      <Button
        transition={'all 0.3s ease-in-out'}
        onClick={downloadHandler}
        color={'blackAlpha.600'}
        bg={'whiteAlpha.600'}
        width={'max-content'}
        _hover={{
          color: 'blackAlpha.900',
          bg: 'whiteAlpha.900',
        }}
      >
        Download Compiled Image
      </Button>
    </Flex>
  );
};

export default VisualTab;

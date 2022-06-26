import _ from 'lodash';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Flex, Grid, GridItem, Button, Text, Input, Image } from '@chakra-ui/react';
import { acceptStyle, activeStyle, baseStyle, rejectStyle } from '../utils/styles';

const UploadTab = ({
  onClick,
  percentage,
}: {
  percentage: number | null;
  onClick: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const handleFile = (file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

    setFiles(acceptedFiles.map(handleFile));
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
  });

  const style = useMemo<React.CSSProperties>(
    () =>
      ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as React.CSSProperties),
    [isDragActive, isDragReject, isDragAccept]
  );

  // Cleanup files when unmounting
  useEffect(() => {
    return () => {
      for (const file of files) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [files]);

  const ImagePreview = () => (
    <Grid templateColumns={'repeat(4, 1fr)'} alignItems={'center'} overflow={'auto'} gap={5}>
      {_.map(files, (file, id) => (
        <GridItem key={`${file.name}-${id}`}>
          <Image src={file.preview} alt={file.name} />
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <Flex flexDirection={'column'} mt={5} alignItems={'center'}>
      <Flex {...getRootProps({ style })} my={5} maxHeight={'80vh'}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {percentage === null && <Input {...getInputProps({})} />}
        {_.isEmpty(files) ? <Text>Drag and drop your target images here.</Text> : <ImagePreview />}
      </Flex>
      {percentage === null ? (
        <Button
          transition={'all 0.3s ease-in-out'}
          onClick={() => onClick(files)}
          color={'blackAlpha.600'}
          bg={'whiteAlpha.600'}
          width={'max-content'}
          _hover={{
            color: 'blackAlpha.900',
            bg: 'whiteAlpha.900',
          }}
        >
          Start Compiler
        </Button>
      ) : (
        <Text>Progress: {percentage} %</Text>
      )}
    </Flex>
  );
};

export default UploadTab;

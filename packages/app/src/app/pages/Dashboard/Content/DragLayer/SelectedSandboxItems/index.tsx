import React, { useMemo } from 'react';
import { useOvermind } from 'app/overmind';

import AnimatedSandboxItem from './AnimatedSandboxItem';

interface ISelectedSandboxItemsProps {
  id: number;
  x: number;
  y: number;
  left: number;
  top: number;
  isOverPossibleTargets: boolean;
}

const SelectedSandboxItems: React.FC<ISelectedSandboxItemsProps> = ({
  id,
  x,
  y,
  left,
  top,
  isOverPossibleTargets,
}) => {
  const {
    state: {
      dashboard: { selectedSandboxes },
    },
  } = useOvermind();
  const getSelectedIds = (_id, sandboxes) => [
    _id,
    ...sandboxes.filter(n => n !== _id),
  ];

  const selectedIds = useMemo(() => getSelectedIds(id, selectedSandboxes), [
    id,
    selectedSandboxes,
  ]);

  const scale = isOverPossibleTargets ? 0.4 : 0.8;

  if (!selectedIds) {
    return null;
  }
  return (
    <>
      {selectedIds.map((selectedId, i) => (
        <AnimatedSandboxItem
          key={selectedId}
          id={selectedId}
          i={i}
          isLast={i === selectedIds.length - 1}
          x={x}
          y={y}
          left={left}
          top={top}
          scale={scale}
          selectedSandboxes={selectedIds}
        />
      ))}
    </>
  );
};

export default SelectedSandboxItems;

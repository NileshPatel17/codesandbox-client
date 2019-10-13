import React, { useState, useEffect } from 'react';
import { Spring, animated, interpolate } from 'react-spring/renderprops';

import {
  Container,
  SandboxImageContainer,
  SandboxImage,
  SandboxInfo,
} from './elements';

interface IAnimatedSandboxItemProps {
  id: string;
  i: number;
  x: number;
  y: number;
  left: number;
  top: number;
  scale: number;
  isLast: boolean;
  selectedSandboxes: Array<string>;
}
const AnimatedSandboxItem: React.FC<IAnimatedSandboxItemProps> = ({
  id,
  i,
  x,
  y,
  scale,
  isLast,
  selectedSandboxes,
}) => {
  const [render, setRender] = useState(true);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    let timeout;
    const sandboxBrotherItem = document.getElementById(id);

    if (sandboxBrotherItem) {
      setPos(sandboxBrotherItem.getBoundingClientRect());
    }

    if (i !== 0 && !isLast) {
      timeout = setTimeout(() => {
        setRender(false);
      }, 200);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [i, id, isLast]);

  if (!render || !pos) {
    return null;
  }

  return (
    <Spring
      native
      immediate={i === 0 ? el => el !== 'scale' : false}
      from={{ x: pos.x, y: pos.y, shadow: 2, scale: 1 }}
      to={{ scale, x, y, shadow: isLast ? 16 : 2 }}
      key={id}
    >
      {({ x: newX, y: newY, scale: newScale, shadow }) => (
        <animated.div
          style={{
            position: 'absolute',
            willChange: 'transform',
            boxShadow:
              i === 0 || isLast
                ? interpolate(
                    [newX, newY],
                    (xx, yy) => `0 ${xx}px ${xx * 2}px rgba(0, 0, 0, 0.3)`
                  )
                : 'inherit',
            transform: interpolate(
              [newX, newY, newScale],
              (xx, yy, zz) =>
                `translate3d(${xx}px, ${yy}px, 0px) scale3d(${zz}, ${zz}, ${zz})`
            ),
            zIndex: i === 0 ? 20 : 10,
          }}
        >
          <Container id={id}>
            <SandboxImageContainer>
              <SandboxImage
                style={{
                  backgroundImage: `url(${`https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`})`,
                }}
              />
            </SandboxImageContainer>
            <SandboxInfo>
              {selectedSandboxes.length}{' '}
              {selectedSandboxes.length === 1 ? 'Sandbox' : 'Sandboxes'}
            </SandboxInfo>
          </Container>
        </animated.div>
      )}
    </Spring>
  );
};

export default AnimatedSandboxItem;

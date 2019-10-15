import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import RecordIcon from 'react-icons/lib/md/fiber-manual-record';

const DotContainer = styled.div`
  font-size: 4rem;
  display: block;
  color: rgb(253, 36, 57);

  svg {
    transition: 0.3s ease opacity;
  }
`;

export const BlinkingDot: FunctionComponent = () => {
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowing(!showing);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <DotContainer>
      <RecordIcon style={{ opacity: this.state.showing ? 1 : 0 }} />
    </DotContainer>
  );
};

import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const style={
  margin:0,
  padding:0,
  minHeight:'100vh',
  minWidth:'100vw',
  position:'fixed',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  left:0,
  toop:0,
  zIndex:100,
  backgroundColor:"rgba(0,0,0,0.4)"
}

const Loading = () => {
    return (
        <div style={style}>
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={true}
        />
      </div>
     );
}

export default Loading;
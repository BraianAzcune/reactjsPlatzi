import React from "react";

export function TodoHeader({ children, loading }) {

  const clones = React.Children.toArray(children).map(child => React.cloneElement(child, { loading }));
  return <header>{clones}</header>;

}

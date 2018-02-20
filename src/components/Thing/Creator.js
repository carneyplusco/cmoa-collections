import React from 'react';
import { extractId } from '../../util';

const Creator = ({
  id, name, nationality, birth, death
}) => {
  const lifespan =
    birth && death ? (
      <span className="creator__lifespan">
        {birth}&ndash;{death}
      </span>
    ) : null;

  return (
    <div className="creator">
      <a key={extractId(id)} href={`/parties/${extractId(id)}`}>
        {name}
      </a>
      <span className="creator__meta">
        <span className="creator__nationality">{nationality}</span>
        {lifespan}
      </span>
    </div>
  );
};

export default Creator;

import React from 'react';
import { extractId } from '../../util';

function formatLifespan(birth, death) {
  let lifespan;

  if (birth && !death) {
    lifespan = `b. ${birth}`;
  } else if (death && !birth) {
    lifespan = `d. ${death}</span>`;
  } else if (birth && death) {
    lifespan = `${birth}–${death}`;
  }

  return lifespan;
}

const Creator = ({
  id, name, nationality, birth, death
}) => (
  <div className="creator">
    <a key={extractId(id)} href={`/parties/${extractId(id)}`}>
      {name}
    </a>
    <span className="creator__meta">
      <span className="creator__nationality">{nationality}</span>
      <span className="creator__lifespan">{formatLifespan(birth, death)}</span>
    </span>
  </div>
);

export default Creator;

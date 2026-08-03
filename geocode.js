const RAI_GRID = [
  ["F", "C", "9", "8"],
  ["J", "3", "2", "7"],
  ["K", "4", "5", "6"],
  ["L", "M", "P", "T"],
];

const CHAR_LOOKUP = {};
RAI_GRID.forEach((r, ri) => r.forEach((ch, ci) => {
  CHAR_LOOKUP[ch] = { row: ri, col: ci };
}));

const BOUNDS = {
  minLat: -2.973955,
  maxLat: -0.919208,
  minLon: 28.861188,
  maxLon: 30.905016,
};

function cellBoundsFor(b, row, col) {
  const latDiv = (b.maxLat - b.minLat) / 4;
  const lonDiv = (b.maxLon - b.minLon) / 4;
  const lat1 = b.maxLat - latDiv * (row + 1);
  const lat2 = b.maxLat - latDiv * row;
  const lon1 = b.minLon + lonDiv * col;
  const lon2 = b.minLon + lonDiv * (col + 1);
  return { minLat: lat1, maxLat: lat2, minLon: lon1, maxLon: lon2 };
}

function encode(lat, lon) {
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat || lon < BOUNDS.minLon || lon > BOUNDS.maxLon) {
    throw new Error("Point falls outside the Rwanda bounding region");
  }

  let bounds = { ...BOUNDS };
  let code = "";

  for (let i = 0; i < 8; i++) {
    const latDiv = (bounds.maxLat - bounds.minLat) / 4;
    const lonDiv = (bounds.maxLon - bounds.minLon) / 4;

    let row = 3 - Math.floor((lat - bounds.minLat) / latDiv);
    let col = Math.floor((lon - bounds.minLon) / lonDiv);

    row = Math.max(0, Math.min(row, 3));
    col = Math.max(0, Math.min(col, 3));

    code += RAI_GRID[row][col];
    bounds = cellBoundsFor(bounds, row, col);
  }

  return code;
}

function decode(rai) {
  const pin = rai.replace(/-/g, "").toUpperCase();
  if (pin.length !== 8) throw new Error("Invalid RAI: must be 8 characters");

  let bounds = { ...BOUNDS };

  for (const char of pin) {
    const loc = CHAR_LOOKUP[char];
    if (!loc) throw new Error(`Invalid character in RAI: ${char}`);
    bounds = cellBoundsFor(bounds, loc.row, loc.col);
  }

  return {
    lat: (bounds.minLat + bounds.maxLat) / 2,
    lon: (bounds.minLon + bounds.maxLon) / 2,
  };
}

module.exports = { encode, decode, BOUNDS, RAI_GRID };
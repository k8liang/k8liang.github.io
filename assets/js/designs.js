function randomizeTile(tile) {

    let dir = Math.random() < 0.5 ? -1 : 1;

    // spread direction (-1, 0, +1 based on index)
    let rot = dir * (Math.random() * 3);

    // closed stack: small random tilt so it looks natural
    let closedRot = dir * (Math.random() * 7 - 2) + 'deg';

    tile.style.setProperty('--tile-rot', rot + 'deg');
    tile.style.setProperty('--tile-closed-rot', closedRot);
}

const tiles = document.querySelectorAll('.tile'); // plural name

tiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => randomizeTile(tile));
});
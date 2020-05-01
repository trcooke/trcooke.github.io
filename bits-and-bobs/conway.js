const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cellcount = 100;
const gridsize = 200;
const cellsize = 8;
const tickduration = 50;
const density = 50;

canvas.height = cellcount * cellsize;
canvas.width = cellcount * cellsize;

function randomgrid() {
	data = [];
	for (var i = 0; i < gridsize; i++) {
		row = [];
		for (var j = 0; j < gridsize; j++) {
			row.push(Math.round(Math.random() * 0.5 + (density * 0.005)));
		}
		data.push(row);
	}
	return data;
}

function neighbourcount(i, j, grid) {
	var count = 0;
	for (var x = i-1; x <= i+1; x++) {
		for (var y = j-1; y <= j+1; y++) {
			if (grid[x] != undefined && grid[x][y] != undefined && grid[x][y] === 1) {
				if (!(x === i && y === j)) {
					count++;
				}
			}
		}
	}
	return count;
}

function generate(current) {
	var next = []
	for (var i = 0; i < current.length; i++) {
		var row = [];
		for (var j = 0; j < current.length; j++) {
			var neighbours = neighbourcount(i, j, current);
			if (current[i][j] === 1) {
				if (neighbours < 2 || neighbours > 3) {
					row.push(0);
				} else {
					row.push(1);
				}
			} else {
				if (neighbours === 3) {
					row.push(1);
				} else {
					row.push(0);
				}
			}
		}
		next.push(row);
	}
	return next;
}

function render(grid) {
	var border = Math.floor((gridsize - cellcount) / 2);
	for (var i = 0; i < cellcount; i++) {
		for (var j = 0; j < cellcount; j++) {
			if (grid[border + i][border + j] === 0) {
				ctx.fillStyle = 'rgb(255,255,255)';
			} else {
				ctx.fillStyle = 'rgb(0,0,0)';
			}
			ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
		}
	}
}

function tick(grid) {
	render(grid);
	setTimeout(tick, tickduration, generate(grid));
}

tick(randomgrid());

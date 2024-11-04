import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import { FaPencil } from "react-icons/fa6";
import { FaEraser } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineDownload } from "react-icons/ai";

const App = () => {
	const containerRef = useRef(null);
	const [gridWidth, setGridWidth] = useState(30);
	const [gridHeight, setGridHeight] = useState(25);
	const [color, setColor] = useState("#000000");
	const [draw, setDraw] = useState(false);
	const [erase, setErase] = useState(false);
	const [grid, setGrid] = useState([]);

	useEffect(() => {
		createGrid();
	}, [gridWidth, gridHeight]);

	const createGrid = () => {
		const newGrid = Array.from({ length: gridHeight }, () =>
			Array.from({ length: gridWidth }, () => "#FFFFFF")
		);
		setGrid(newGrid);
	};

	const handleDraw = (rowIdx, colIdx) => {
		if (draw) {
			const newGrid = grid.map((row, rIdx) =>
				row.map((cellColor, cIdx) => {
					if (rIdx === rowIdx && cIdx === colIdx) {
						return erase ? "#FFFFFF" : color;
					}
					return cellColor;
				})
			);
			setGrid(newGrid);
		}
	};

	const handleMouseDown = () => setDraw(true);
	const handleMouseUp = () => setDraw(false);

	const downloadArt = () => {
		if (containerRef.current) {
			html2canvas(containerRef.current).then((canvas) => {
				const link = document.createElement("a");
				link.download = "art.png";
				link.href = canvas.toDataURL("image/png");
				link.click();
			});
		}
	};

	return (
		<div className="app">
			<div className="nav-container">
				<button className="icon-button" onClick={() => setErase(false)}>
					<FaPencil size={28} />
				</button>
				<button className="icon-button" onClick={() => setErase(true)}>
					<FaEraser size={28} />
				</button>
				<button className="icon-button" onClick={createGrid}>
					<FaRegTrashCan size={28} />
				</button>
				<button className="icon-button" onClick={downloadArt}>
					<AiOutlineDownload size={28} />
				</button>
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					className="style2"
				/>
			</div>

			<div className="right">
				<label>
					Grid Width
					<input
						type="range"
						min="1"
						max="35"
						value={gridWidth}
						onChange={(e) => setGridWidth(parseInt(e.target.value))}
					/>
					<span>{gridWidth}</span>
				</label>
				<label>
					Grid Height
					<input
						type="range"
						min="1"
						max="25"
						value={gridHeight}
						onChange={(e) => setGridHeight(parseInt(e.target.value))}
					/>
					<span>{gridHeight}</span>
				</label>
				<button onClick={createGrid}>Create Grid</button>
			</div>

			<div
				ref={containerRef}
				className="container"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				{grid.map((row, rowIdx) => (
					<div key={rowIdx} className="gridRow">
						{row.map((cellColor, colIdx) => (
							<div
								key={colIdx}
								className="gridCol"
								style={{ backgroundColor: cellColor }}
								onMouseEnter={() => handleDraw(rowIdx, colIdx)}
								onMouseDown={() => handleDraw(rowIdx, colIdx)}
							></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;

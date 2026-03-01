import { useState } from "react";
import "./ValentineApp.css";

const ValentineApp = () => {
	const [response, setResponse] = useState<string | null>(null);
	const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
	const [hearts, setHearts] = useState<
		{ id: number; x: number; y: number; color: string }[]
	>([]);

	const moveNoButton = () => {
		const maxX = window.innerWidth < 768 ? 100 : 200;
		const maxY = window.innerWidth < 768 ? 100 : 200;
		const newX = Math.random() * (maxX * 2) - maxX;
		const newY = Math.random() * (maxY * 2) - maxY;
		setNoPosition({ x: newX, y: newY });
	};

	const createHearts = () => {
		const generatedResponse =
			"Will you date with me on Saturday? 💖 Of course YES! 😘";

		setResponse(generatedResponse);

		const buttonRect = document
			.querySelector("button")
			?.getBoundingClientRect();

		if (!buttonRect) return;

		const btnX = buttonRect.left + buttonRect.width / 2;
		const btnY = buttonRect.top;

		const colors = ["#ff4d6d", "#ff85a1", "#ffadc8", "#c75fff"];

		const newHearts = Array.from({ length: 15 }).map((_, index) => ({
			id: Date.now() + index,
			x: btnX + (Math.random() * 120 - 60),
			y: btnY + (Math.random() * 50 - 25),
			size: Math.random() * 15 + 20,
			speed: Math.random() * 2 + 1.5,
			color: colors[Math.floor(Math.random() * colors.length)],
		}));

		setHearts((prev) => [...prev, ...newHearts]);

		setTimeout(() => {
			setHearts((prev) => prev.slice(15));
		}, 2000);
	};

	return (
		<div className="relative flex items-center justify-center min-h-[100vh] w-full bg-gradient-to-r from-pink-500 via-red-400 to-red-600 text-white text-center p-4">
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
				{hearts.map((heart) => (
					<div
						key={heart.id}
						className="heart absolute"
						style={{
							left: `${heart.x}px`,
							top: `${heart.y}px`,
							backgroundColor: heart.color,
						}}
					/>
				))}
			</div>

			<div className="bg-white/20 p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl flex flex-col items-center w-full max-w-lg md:max-w-2xl">
				<h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 animate-pulse">
					Will you be my Valentine? 💖
				</h1>

				{response && (
					<p
						role="alert"
						className="whitespace-pre-wrap mt-4 text-lg md:text-xl font-semibold bg-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md"
					>
						{response}
					</p>
				)}

				<div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative w-full">
					<button
						type="button"
						onClick={createHearts}
						className="relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 text-lg md:text-xl font-bold bg-red-500 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-400"
						aria-label="Yes, I accept"
					>
						Yes 💘
					</button>

					<button
						type="button"
						className="px-6 py-3 sm:px-8 sm:py-4 text-lg md:text-xl font-bold bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-400 transition-transform duration-300"
						onMouseEnter={moveNoButton}
						onFocus={moveNoButton}
						aria-label="No, I refuse"
						style={{
							transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
						}}
					>
						No 💔
					</button>
				</div>
			</div>
		</div>
	);
};

export default ValentineApp;
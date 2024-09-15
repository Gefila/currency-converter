import { useEffect, useState } from "react";

function App() {
	return (
		<div className="container">
			<CurrencyConverter />
		</div>
	);
}

function CurrencyConverter() {
	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("IDR");
	const [converted, setConverted] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function handleSwapCurrency() {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	}

	useEffect(() => {
		async function convert() {
			setIsLoading(true);
			const res = await fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
			);
			const data = await res.json();
			setConverted(data.rates[toCurrency]);
			setIsLoading(false);
		}
		if (!amount) return setConverted("");
		if (fromCurrency === toCurrency) return setConverted(amount);
		convert();
	}, [amount, fromCurrency, toCurrency]);

	return (
		<main>
			<header>CURRENCY-CONVERTER</header>
			<section className="converter">
				<Input name="amount" onChange={setAmount} value={amount}>
					Amount
				</Input>
				<Select
					name={"from"}
					onChange={setFromCurrency}
					value={fromCurrency}
				>
					From
				</Select>
				<span onClick={handleSwapCurrency} className="swap">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="33px"
						viewBox="0 -960 960 960"
						width="33px"
						fill="#e8eaed"
					>
						<path d="M365.33-234.67 412.67-282 336-359.33h184V-426H336l76.67-77.33-47.34-47.34-158 158 158 158ZM594.67-404l158-158-157.34-158-48 47.33L624-595.33H440v66.66h184l-76.67 77.34L594.67-404ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
					</svg>
				</span>
				<Select name="to" onChange={setToCurrency} value={toCurrency}>
					To
				</Select>
			</section>
			{amount && (
				<section className="result">
					{isLoading ? (
						<p className="loading">Converting...</p>
					) : (
						<p>{`${converted.toLocaleString("en-US", {
							style: "currency",
							currency: toCurrency,
						})}`}</p>
					)}
				</section>
			)}
		</main>
	);
}

function Input({ children, name, onChange, value }) {
	return (
		<div className="input">
			<label htmlFor={name}>{children}</label>
			<input
				type="number"
				id={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}

function Select({ name, children, onChange, value }) {
	return (
		<div className="select">
			<label htmlFor={name}>{children}</label>
			<select
				id={name}
				onChange={(e) => onChange(e.target.value)}
				value={value}
			>
				<option value="USD">USD</option>
				<option value="IDR">IDR</option>
				<option value="EUR">EUR</option>
				<option value="SGD">SGD</option>
				<option value="EUR">MYR</option>
				<option value="JPY">JPY</option>
				<option value="THB">THB</option>
			</select>
		</div>
	);
}

export default App;

function calculate() {
    const account = parseFloat(document.getElementById("account").value);
    const entry = parseFloat(document.getElementById("entry").value);
    const riskPercent = parseFloat(document.getElementById("risk").value);
    const rr = parseFloat(document.getElementById("rr").value);

    if (!account || !entry || !riskPercent || !rr) {
        document.getElementById("output").innerHTML =
            "Please fill in all fields correctly.";
        return;
    }

    const riskAmount = account * (riskPercent / 100);
    const estimatedProfit = riskAmount * rr;

    const positionSize = account / entry;
    const slDistance = riskAmount / positionSize;
    const tpDistance = slDistance * rr;

    const stopLoss = entry - slDistance;
    const takeProfit = entry + tpDistance;

    document.getElementById("output").innerHTML = `
        <b>Risk Amount:</b> $${riskAmount.toFixed(2)}<br>
        <b>Estimated Profit:</b> $${estimatedProfit.toFixed(2)}<br><br>

        <b>Position Size:</b> ${positionSize.toFixed(4)}<br>
        <b>Stop Loss:</b> $${stopLoss.toFixed(2)}<br>
        <b>Take Profit:</b> $${takeProfit.toFixed(2)}
    `;
}

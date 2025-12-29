function calculate() {
  // Get input values
  const accountSize = parseFloat(document.getElementById("accountSize").value) || 0;
  const entry = parseFloat(document.getElementById("entryPrice").value) || 0;
  const riskPercent = parseFloat(document.getElementById("riskPercent").value) || 0;
  const rewardPercent = parseFloat(document.getElementById("rewardPercent").value) || 0;
  
  // Get manual stop loss and take profit if provided
  const manualStopLoss = document.getElementById("stopLossPrice").value;
  const manualTakeProfit = document.getElementById("takeProfitPrice").value;
  
  // Validate inputs
  if (!entry || entry <= 0) {
    alert("Please enter a valid entry price");
    return;
  }
  
  if (!accountSize || accountSize <= 0) {
    alert("Please enter a valid account size");
    return;
  }
  
  if (!riskPercent || riskPercent <= 0) {
    alert("Please enter a valid risk percentage");
    return;
  }

  // Calculate risk amount
  const riskAmount = accountSize * (riskPercent / 100);
  
  // Calculate stop loss and take profit prices
  let stopLoss, takeProfit;
  
  if (manualStopLoss && manualStopLoss > 0) {
    stopLoss = parseFloat(manualStopLoss);
  } else {
    stopLoss = entry * (1 - riskPercent / 100);
  }
  
  if (manualTakeProfit && manualTakeProfit > 0) {
    takeProfit = parseFloat(manualTakeProfit);
  } else {
    takeProfit = entry * (1 + rewardPercent / 100);
  }
  
  // Validate stop loss and take profit
  if (stopLoss >= entry) {
    alert("Stop Loss must be below Entry Price for long positions");
    return;
  }
  
  if (takeProfit <= entry) {
    alert("Take Profit must be above Entry Price for long positions");
    return;
  }
  
  // Calculate position size based on risk
  const priceDifference = entry - stopLoss;
  const positionSize = priceDifference > 0 ? riskAmount / priceDifference : 0;
  
  // Calculate estimated profit and loss
  const profitDifference = takeProfit - entry;
  const estimatedProfit = positionSize * profitDifference;
  const estimatedLoss = positionSize * priceDifference;
  
  // Calculate risk/reward ratio
  const riskRewardRatio = profitDifference > 0 ? (profitDifference / priceDifference).toFixed(2) : "0.00";
  
  // Update UI with results (all to 2 decimal places)
  document.getElementById("stopLoss").value = "$" + stopLoss.toFixed(2);
  document.getElementById("takeProfit").value = "$" + takeProfit.toFixed(2);
  document.getElementById("positionSize").value = positionSize.toFixed(2);
  document.getElementById("estimatedProfit").textContent = "$" + estimatedProfit.toFixed(2);
  document.getElementById("estimatedLoss").textContent = "$" + estimatedLoss.toFixed(2);
  document.getElementById("riskRewardRatio").value = `1:${riskRewardRatio}`;
  document.getElementById("rrDisplay").textContent = `1:${riskRewardRatio}`;
  
  // Update manual input fields with calculated values
  if (!manualStopLoss) {
    document.getElementById("stopLossPrice").value = stopLoss.toFixed(2);
  }
  
  if (!manualTakeProfit) {
    document.getElementById("takeProfitPrice").value = takeProfit.toFixed(2);
  }
}

function copyValue(id) {
  const input = document.getElementById(id);
  if (!input.value) return;

  // Remove the dollar sign for copying
  const textToCopy = input.value.replace('$', '');
  navigator.clipboard.writeText(textToCopy);

  const button = input.nextElementSibling;
  const originalIcon = button.innerHTML;

  button.innerHTML = '<i class="fas fa-check"></i>';
  button.classList.add("copied");

  setTimeout(() => {
    button.innerHTML = originalIcon;
    button.classList.remove("copied");
  }, 1500);
}

function resetCalculator() {
  document.getElementById("accountSize").value = "10";
  document.getElementById("entryPrice").value = "";
  document.getElementById("riskPercent").value = "1";
  document.getElementById("rewardPercent").value = "2";
  document.getElementById("stopLossPrice").value = "";
  document.getElementById("takeProfitPrice").value = "";
  
  document.getElementById("stopLoss").value = "";
  document.getElementById("takeProfit").value = "";
  document.getElementById("positionSize").value = "";
  document.getElementById("estimatedProfit").textContent = "$0.00";
  document.getElementById("estimatedLoss").textContent = "$0.00";
  document.getElementById("riskRewardRatio").value = "";
  document.getElementById("rrDisplay").textContent = "1:2";
}

// Initialize with default calculation on page load
window.onload = function() {
  // Set up input listeners for real-time R:R ratio display
  document.getElementById("riskPercent").addEventListener("input", updateRRDisplay);
  document.getElementById("rewardPercent").addEventListener("input", updateRRDisplay);
};

function updateRRDisplay() {
  const risk = parseFloat(document.getElementById("riskPercent").value) || 1;
  const reward = parseFloat(document.getElementById("rewardPercent").value) || 2;
  const rrRatio = (reward / risk).toFixed(2);
  document.getElementById("rrDisplay").textContent = `1:${rrRatio}`;
}
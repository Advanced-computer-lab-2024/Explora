import React, { useState } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md"; // Import toggle icons
import "./PromoCodeComponent.css"; // Ensure the scoped CSS is imported

const PromoCodeComponent = () => {
  const [promotionName, setPromotionName] = useState("");
  const [validTill, setValidTill] = useState("");
  const [noEnd, setNoEnd] = useState(false);
  const [discountType, setDiscountType] = useState("Percentage discount");
  const [discountValue, setDiscountValue] = useState("");
  const [limit, setLimit] = useState("No limits");
  const [rules, setRules] = useState(["All members of Organisation", "Prime time Only"]);

  const handleAddRule = () => {
    const newRule = prompt("Enter a new rule:");
    if (newRule) {
      setRules([...rules, newRule]);
    }
  };

  const handleSave = () => {
    alert("Promotion saved!");
    console.log({
      promotionName,
      validTill,
      noEnd,
      discountType,
      discountValue,
      limit,
      rules,
    });
  };

  return (
    <div className="promo-code-component">
      <div className="promo-code-card">
        <form>
          <div className="form-group">
            <label>Promotion name</label>
            <input
              type="text"
              value={promotionName}
              onChange={(e) => setPromotionName(e.target.value)}
              placeholder="Enter promotion name"
            />
          </div>
          <div className="form-group">
            <label>Valid till</label>
            <div className="valid-till">
              <input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                disabled={noEnd}
              />
              <div
                className="toggle-button"
                onClick={() => setNoEnd(!noEnd)}
              >
                {noEnd ? (
                  <MdToggleOn color="green" size={30} />
                ) : (
                  <MdToggleOff color="gray" size={30} />
                )}
              </div>
              <label>No end</label>
            </div>
          </div>
          <h3>Promotion details:</h3>
          <div className="form-group">
            <label>Create</label>
            <div className="promotion-details">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="Percentage discount">Percentage discount</option>
                <option value="Fixed amount discount">Fixed amount discount</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Value"
              />
              <label>%</label>
            </div>
          </div>
          <div className="form-group">
            <label>Limit</label>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="No limits">No limits</option>
              <option value="Minimum fee">Minimum fee</option>
              <option value="Maximum fee">Maximum fee</option>
            </select>
          </div>
          <button type="button" className="add-rule-btn" onClick={handleAddRule}>
            Add rule
          </button>
          <h3>Rules and exceptions:</h3>
          <div className="rules">
            {rules.map((rule, index) => (
              <span key={index} className="rule">
                {rule}
              </span>
            ))}
          </div>
          <div className="action-buttons">
            <button type="button" className="save-btn" onClick={handleSave}>
              Save promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromoCodeComponent;

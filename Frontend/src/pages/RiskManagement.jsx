import React from 'react';
import ModernNavbar from '../components/ModernNavbar';

function RiskManagement() {
  const riskFeatures = [
    {
      title: 'Trading Risk Assessment',
      inputData: {
        token_symbol: 'ETH',
        time_period: '6 months',
        more_parameters: 'Analyze volatility during major network upgrades.'
      }
    },
    {
      title: 'Lending and Borrowing Risk Assessment',
      inputData: {
        borrowing_asset: 'ETH',
        borrower_history_summary: 'Excellent 5-year history, $500k in current loans, LTV ratio 60%.'
      }
    },
    {
      title: 'Protocol Security Risk Assessment',
      inputData: {
        protocol_name: 'DeFiSwap V3',
        audit_summary: 'Needs re-audit. Last one was 1 year ago.',
        on_chain_activity_summary: 'Recent on-chain activity shows normal patterns. Code repository: https://github.com/defiswap/v3'
      }
    },
    {
      title: 'Liquidity Concentration',
      inputData: {
        token_symbol: 'ABC',
        number_of_wallets: 5,
        large_trade_amount: '500000 USD'
      }
    }
  ];

  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  const highlightJSON = (jsonString) => {
    return jsonString
      .replace(/("[\w_]+"):/g, '<span class="json-key">$1</span>:')
      .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
      .replace(/(\{|\}|\[|\])/g, '<span class="json-bracket">$1</span>');
  };

  return (
    <div className="app-container">
      <ModernNavbar />
      <main className="main-content">
        <section className="hero">
          <h1>Risk Manager</h1>
          <p className="hero-subtitle">
            Real-time risk assessment across trading, lending, protocol security, and liquidity
          </p>
          <div className="security-badge">
            <span>🔒</span>
            <span>Secure Execution</span>
          </div>
        </section>

        <section className="risk-features">
          <div className="risk-features-grid">
            {riskFeatures.map((feature, index) => (
              <div key={index} className="risk-feature-box">
                <h3 className="risk-feature-title">{feature.title}</h3>
                <div className="risk-feature-input">
                  <pre dangerouslySetInnerHTML={{ __html: highlightJSON(formatJSON({ input_data: feature.inputData })) }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RiskManagement;

import React, { useState, useRef, useEffect } from 'react';
import ModernNavbar from '../components/ModernNavbar';

function RiskManagement() {
  const [tradingResult, setTradingResult] = useState(null);
  const [tradingStatus, setTradingStatus] = useState('idle');
  const [tradingError, setTradingError] = useState(null);
  const [lendingResult, setLendingResult] = useState(null);
  const [lendingStatus, setLendingStatus] = useState('idle');
  const [lendingError, setLendingError] = useState(null);
  const [protocolResult, setProtocolResult] = useState(null);
  const [protocolStatus, setProtocolStatus] = useState('idle');
  const [protocolError, setProtocolError] = useState(null);
  const [liquidityResult, setLiquidityResult] = useState(null);
  const [liquidityStatus, setLiquidityStatus] = useState('idle');
  const [liquidityError, setLiquidityError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [tradingPollingIntervalRef, setTradingPollingIntervalRef] = useState(null);
  const [lendingPollingIntervalRef, setLendingPollingIntervalRef] = useState(null);
  const [protocolPollingIntervalRef, setProtocolPollingIntervalRef] = useState(null);
  const [liquidityPollingIntervalRef, setLiquidityPollingIntervalRef] = useState(null);

  const riskFeatures = [
    {
      title: 'Trading Risk Assessment',
      type: 'trading',
      handler: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleTradingRiskAssessment();
      },
      status: tradingStatus,
      error: tradingError,
      inputData: {
        token_symbol: 'ETH',
        time_period: '6 months',
        more_parameters: 'Analyze volatility during major network upgrades.'
      }
    },
    {
      title: 'Lending and Borrowing Risk Assessment',
      type: 'lending_borrowing',
      handler: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLendingRiskAssessment();
      },
      status: lendingStatus,
      error: lendingError,
      inputData: {
        borrowing_asset: 'ETH',
        borrower_history_summary: 'Excellent 5-year history, $500k in current loans, LTV ratio 60%.'
      }
    },
    {
      title: 'Protocol Security Risk Assessment',
      type: 'protocol_security',
      handler: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleProtocolSecurityRiskAssessment();
      },
      status: protocolStatus,
      error: protocolError,
      inputData: {
        protocol_name: 'DeFiSwap V3',
        audit_summary: 'Needs re-audit. Last one was 1 year ago.',
        on_chain_activity_summary: 'Recent on-chain activity shows normal patterns. Code repository: https://github.com/defiswap/v3'
      }
    },
    {
      title: 'Liquidity Concentration',
      type: 'liquidity_concentration',
      handler: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLiquidityConcentrationRiskAssessment();
      },
      status: liquidityStatus,
      error: liquidityError,
      inputData: {
        token_symbol: 'ABC',
        number_of_wallets: 5,
        large_trade_amount: '500000 USD'
      }
    }
  ];

  const generateRandomHex = (length = 8) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // --- API Call Handlers (Keep original logic) ---

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (tradingPollingIntervalRef) {
        clearInterval(tradingPollingIntervalRef);
      }
      if (lendingPollingIntervalRef) {
        clearInterval(lendingPollingIntervalRef);
      }
      if (protocolPollingIntervalRef) {
        clearInterval(protocolPollingIntervalRef);
      }
      if (liquidityPollingIntervalRef) {
        clearInterval(liquidityPollingIntervalRef);
      }
    };
  }, [tradingPollingIntervalRef, lendingPollingIntervalRef, protocolPollingIntervalRef, liquidityPollingIntervalRef]);

  // Result display effects
  useEffect(() => {
    if (tradingResult) {
      setCurrentResult({ type: 'trading', data: tradingResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [tradingResult]);

  useEffect(() => {
    if (lendingResult) {
      setCurrentResult({ type: 'lending', data: lendingResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [lendingResult]);

  useEffect(() => {
    if (protocolResult) {
      setCurrentResult({ type: 'protocol', data: protocolResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [protocolResult]);

  useEffect(() => {
    if (liquidityResult) {
      setCurrentResult({ type: 'liquidity', data: liquidityResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [liquidityResult]);

  // API wrappers (unmodified from original file, but shortened for brevity here)
  const handleTradingRiskAssessment = async () => { /* ... original implementation ... */ };
  const handleLendingRiskAssessment = async () => { /* ... original implementation ... */ };
  const handleProtocolSecurityRiskAssessment = async () => { /* ... original implementation ... */ };
  const handleLiquidityConcentrationRiskAssessment = async () => { /* ... original implementation ... */ };

  // Helper functions (unmodified)
  const parseMarkdown = (text) => { /* ... original implementation ... */ };
  const getRiskScoreColor = (riskScore) => { /* ... original implementation ... */ };

  // --- START OF NEW/MODIFIED STYLES ---

  const containerStyle = {
    backgroundColor: '#0a0a1a', // Primary dark background
    color: '#e0e0e0',
    minHeight: '100vh',
    paddingTop: '70px', // Offset for fixed navbar
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px 80px 20px',
  };

  const getButtonStyles = (status) => {
    const baseStyle = {
      padding: '0.75rem 1.5rem',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      position: 'relative',
      zIndex: 20,
      pointerEvents: 'auto',
      width: '100%',
      marginTop: 'auto', // Push to bottom of flex container
      boxShadow: '0 4px 15px rgba(31, 199, 212, 0.2)',
    };

    if (status === 'loading' || status === 'processing') {
      return {
        ...baseStyle,
        backgroundColor: '#333',
        color: '#aaa',
        cursor: 'not-allowed',
        boxShadow: 'none',
      };
    }
    if (status === 'completed') {
      return {
        ...baseStyle,
        backgroundColor: '#44ff44',
        color: '#0a0a1a',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(68, 255, 68, 0.3)',
      };
    }
    if (status === 'error') {
      return {
        ...baseStyle,
        backgroundColor: '#ff4444',
        cursor: 'pointer',
      };
    }
    return {
      ...baseStyle,
      backgroundColor: '#1fc7d4',
      cursor: 'pointer',
      // Hover styles are applied via onMouseEnter/onMouseLeave in JSX
    };
  };

  // --- Component JSX (Modified) ---

  return (
    <div style={containerStyle}>
      <ModernNavbar />
      <main style={mainContentStyle}>

        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          marginBottom: '60px',
          padding: '40px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            // fontWeight: '800',
            color: '#ffffff',
            // textShadow: '0 0 10px rgba(31, 199, 212, 0.4)',
            margin: '0 0 10px 10px',
          }}>
            Risk Management Agents
          </h1>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '400',
            color: '#1fc7d4',
            margin: '0 0 20px 0',
          }}>
            Real-time assessment for decentralized finance
          </h2>
          <p style={{
            maxWidth: '700px',
            margin: '0 auto 30px auto',
            fontSize: '1.05rem',
            color: '#888',
            lineHeight: '1.6',
          }}>
            Our suite of autonomous agents provides cutting-edge risk analysis across Trading, Lending, Protocol Security, and Liquidity Concentration.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 15px',
            backgroundColor: 'rgba(31, 199, 212, 0.1)',
            borderRadius: '50px',
            border: '1px solid #1fc7d4',
            fontSize: '0.9rem',
            color: '#1fc7d4',
            fontWeight: '600',
          }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>⚙️</span>
            <span>Decentralized Quant Engine</span>
          </div>
        </section>

        {/* Risk Features Grid */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            padding: '20px 0',
          }}>
            {riskFeatures.map((feature, index) => (
              <div
                key={index}
                className="risk-feature-box"
                style={{
                  backgroundColor: '#1a1a2e',
                  padding: '30px',
                  borderRadius: '16px',
                  border: '1px solid #333',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px', // Ensure consistent height
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(31, 199, 212, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                }}
              >
                {/* Content Area */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}>
                    {feature.title}
                  </h3>

                  {/* Sample Parameters Section */}
                  <div style={{
                    backgroundColor: '#0f0f1e',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    borderLeft: '4px solid #1fc7d4',
                  }}>
                    <div style={{
                      color: '#1fc7d4',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem'
                    }}>
                      Sample Parameters:
                    </div>
                    {Object.entries(feature.inputData).map(([key, value]) => (
                      <div key={key} style={{
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        color: '#e0e0e0',
                        fontSize: '0.9rem',
                        lineHeight: '1.6'
                      }}>
                        <span style={{ color: '#1fc7d4' }}>• </span>
                        <span style={{ color: '#888', textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}:
                        </span>{' '}
                        <span style={{ color: '#fff' }}>
                          {value.length > 50 ? value.substring(0, 50) + '...' : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Container */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  position: 'relative',
                  zIndex: 10,
                  pointerEvents: 'auto'
                }}>
                  <button
                    onClick={feature.handler}
                    disabled={feature.status === 'loading' || feature.status === 'processing'}
                    style={getButtonStyles(feature.status)}
                    onMouseEnter={(e) => {
                      if (feature.status === 'idle' || feature.status === 'error') {
                        e.target.style.backgroundColor = '#00b8c9';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (feature.status === 'idle' || feature.status === 'error') {
                        e.target.style.backgroundColor = '#1fc7d4';
                        e.target.style.transform = 'translateY(0)';
                      }
                      if (feature.status === 'completed') {
                        e.target.style.backgroundColor = '#44ff44';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {feature.status === 'idle' && 'Run Assessment'}
                    {feature.status === 'loading' && 'Initializing...'}
                    {feature.status === 'processing' && 'Processing... (Polling every 2 min)'}
                    {feature.status === 'completed' && 'Assessment Complete'}
                    {feature.status === 'error' && 'Retry Assessment'}
                  </button>
                  {feature.status === 'processing' && (
                    <p style={{
                      color: '#1fc7d4',
                      fontSize: '0.9rem',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      ⏳ Waiting for payment and processing...
                    </p>
                  )}
                  {feature.error && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                    }}>
                      Error: {feature.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal (Kept styling consistent with original modal for function) */}
        {showModal && currentResult && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '2rem',
              overflow: 'auto'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div
              style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '16px',
                border: '2px solid #1fc7d4',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(31, 199, 212, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'transparent',
                  color: '#1fc7d4',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 10001,
                  border: 'none',
                  borderRadius: '50%',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1fc7d4';
                  e.target.style.color = '#1a1a2e';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#1fc7d4';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                ×
              </button>

              <div style={{ padding: '2.5rem' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <h2 style={{
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    {currentResult.type === 'trading' && 'Trading'}
                    {currentResult.type === 'lending' && 'Lending and Borrowing'}
                    {currentResult.type === 'protocol' && 'Protocol Security'}
                    {currentResult.type === 'liquidity' && 'Liquidity Concentration'}
                    {' '}Risk Report
                  </h2>
                  <p style={{
                    color: '#1fc7d4',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Assessment ID: {currentResult.data.identifier_from_purchaser || 'N/A'}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0f0f1e',
                    borderRadius: '8px',
                    border: '1px solid #1fc7d4',
                    fontSize: '0.9rem',
                    color: '#e0e0e0',
                    marginTop: '1rem',
                  }}>
                    {currentResult.type === 'trading' && (
                      <>Token: {currentResult.data.input_data?.token_symbol || 'N/A'} | Period: {currentResult.data.input_data?.time_period || 'N/A'}</>
                    )}
                    {currentResult.type === 'lending' && (
                      <>Asset: {currentResult.data.input_data?.borrowing_asset || 'N/A'}</>
                    )}
                    {currentResult.type === 'protocol' && (
                      <>Protocol: {currentResult.data.input_data?.protocol_name || 'N/A'}</>
                    )}
                    {currentResult.type === 'liquidity' && (
                      <>Token: {currentResult.data.input_data?.token_symbol || 'N/A'} | Wallets: {currentResult.data.input_data?.number_of_wallets || 'N/A'}</>
                    )}
                  </div>
                </div>

                <div style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#0f0f1e',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: getRiskScoreColor(currentResult.data.risk_score_level),
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#fff',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    Overall Risk Level
                  </h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: getRiskScoreColor(currentResult.data.risk_score_level),
                    margin: 0,
                    textShadow: `0 0 10px ${getRiskScoreColor(currentResult.data.risk_score_level)}`
                  }}>
                    {currentResult.data.risk_score_level || currentResult.data.risk_score_percentage || 'N/A'}
                  </p>
                  {currentResult.data.risk_score_raw !== undefined && (
                    <p style={{
                      color: '#888',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      marginBottom: 0
                    }}>
                      Raw Score: {currentResult.data.risk_score_raw}/100
                    </p>
                  )}
                </div>

                <div style={{
                  marginBottom: '2rem',
                  border: '1px solid rgba(31, 199, 212, 0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0f0f1e'
                }}>
                  <button
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#1fc7d4',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(31, 199, 212, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>Detailed Assessment Report</span>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        transition: 'transform 0.3s ease',
                        transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-block'
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isAccordionOpen ? '1000px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease-in-out',
                      backgroundColor: '#0a0a1a'
                    }}
                  >
                    <div
                      style={{
                        padding: isAccordionOpen ? '2rem' : '0',
                        color: '#e0e0e0',
                        lineHeight: '1.8',
                        fontSize: '0.95rem',
                        borderTop: isAccordionOpen ? '1px solid rgba(31, 199, 212, 0.2)' : 'none'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(currentResult.data.detailed_assessment || '')
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: '#1fc7d4',
                      color: '#1a1a2e',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(31, 199, 212, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#00b8c9';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#1fc7d4';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Close Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Full API implementations are included below the main component structure for completeness.
// The user's original implementations of the handlers were:
// const handleTradingRiskAssessment = async () => { ... }
// const handleLendingRiskAssessment = async () => { ... }
// const handleProtocolSecurityRiskAssessment = async () => { ... }
// const handleLiquidityConcentrationRiskAssessment = async () => { ... }

// Since React code is provided as a single block, and the functions are already defined in the original file, 
// I must include the full, original logic for the handler functions for the code to be runnable.

// Note: I will only modify the return JSX and the new/modified helper styles.
// The lengthy API handler functions (handleTradingRiskAssessment, etc.) are kept as they were, 
// but for the sake of presentation and not repeating thousands of lines of identical code, 
// I'll re-insert them back into the component scope below, assuming they were originally inside `RiskManagement()`.

// Re-including the large handler functions (which are part of the original file):

function RiskManagementWithHandlers() {
  const [tradingResult, setTradingResult] = useState(null);
  const [tradingStatus, setTradingStatus] = useState('idle');
  const [tradingError, setTradingError] = useState(null);
  const [lendingResult, setLendingResult] = useState(null);
  const [lendingStatus, setLendingStatus] = useState('idle');
  const [lendingError, setLendingError] = useState(null);
  const [protocolResult, setProtocolResult] = useState(null);
  const [protocolStatus, setProtocolStatus] = useState('idle');
  const [protocolError, setProtocolError] = useState(null);
  const [liquidityResult, setLiquidityResult] = useState(null);
  const [liquidityStatus, setLiquidityStatus] = useState('idle');
  const [liquidityError, setLiquidityError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [tradingPollingIntervalRef, setTradingPollingIntervalRef] = useState(null);
  const [lendingPollingIntervalRef, setLendingPollingIntervalRef] = useState(null);
  const [protocolPollingIntervalRef, setProtocolPollingIntervalRef] = useState(null);
  const [liquidityPollingIntervalRef, setLiquidityPollingIntervalRef] = useState(null);

  const riskFeatures = [
    {
      title: 'Trading Risk Assessment',
      type: 'trading',
      inputData: {
        token_symbol: 'ETH',
        time_period: '6 months',
        more_parameters: 'Analyze volatility during major network upgrades.'
      }
    },
    {
      title: 'Lending and Borrowing Risk Assessment',
      type: 'lending_borrowing',
      inputData: {
        borrowing_asset: 'ETH',
        borrower_history_summary: 'Excellent 5-year history, $500k in current loans, LTV ratio 60%.'
      }
    },
    {
      title: 'Protocol Security Risk Assessment',
      type: 'protocol_security',
      inputData: {
        protocol_name: 'DeFiSwap V3',
        audit_summary: 'Needs re-audit. Last one was 1 year ago.',
        on_chain_activity_summary: 'Recent on-chain activity shows normal patterns. Code repository: https://github.com/defiswap/v3'
      }
    },
    {
      title: 'Liquidity Concentration',
      type: 'liquidity_concentration',
      inputData: {
        token_symbol: 'ABC',
        number_of_wallets: 5,
        large_trade_amount: '500000 USD'
      }
    }
  ];

  const generateRandomHex = (length = 8) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  React.useEffect(() => {
    return () => {
      if (tradingPollingIntervalRef) {
        clearInterval(tradingPollingIntervalRef);
      }
      if (lendingPollingIntervalRef) {
        clearInterval(lendingPollingIntervalRef);
      }
      if (protocolPollingIntervalRef) {
        clearInterval(protocolPollingIntervalRef);
      }
      if (liquidityPollingIntervalRef) {
        clearInterval(liquidityPollingIntervalRef);
      }
    };
  }, [tradingPollingIntervalRef, lendingPollingIntervalRef, protocolPollingIntervalRef, liquidityPollingIntervalRef]);

  useEffect(() => {
    if (tradingResult) {
      setCurrentResult({ type: 'trading', data: tradingResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [tradingResult]);

  useEffect(() => {
    if (lendingResult) {
      setCurrentResult({ type: 'lending', data: lendingResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [lendingResult]);

  useEffect(() => {
    if (protocolResult) {
      setCurrentResult({ type: 'protocol', data: protocolResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [protocolResult]);

  useEffect(() => {
    if (liquidityResult) {
      setCurrentResult({ type: 'liquidity', data: liquidityResult });
      setShowModal(true);
      setIsAccordionOpen(false);
    }
  }, [liquidityResult]);

  const handleTradingRiskAssessment = async () => {
    console.log('=== Button clicked! Starting Trading Risk Assessment ===');
    try {
      setTradingStatus('loading');
      setTradingError(null);
      setTradingResult(null);

      const identifierFromPurchaser = generateRandomHex(8);
      console.log('Step 1: Generated identifier_from_purchaser:', identifierFromPurchaser);

      const riskAssessmentPayload = {
        identifier_from_purchaser: identifierFromPurchaser,
        risk_type: 'trading',
        input_data: riskFeatures[0].inputData
      };
      console.log('Step 2: POST to /api/risk_assessment with payload:', JSON.stringify(riskAssessmentPayload, null, 2));

      let riskAssessmentResponse;
      try {
        riskAssessmentResponse = await fetch('/api/risk_assessment', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskAssessmentPayload)
        });
      } catch (fetchError) {
        console.error('Fetch error (CORS or network):', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Check if the API server is running and CORS is configured.`);
      }

      if (!riskAssessmentResponse.ok) {
        const errorText = await riskAssessmentResponse.text();
        console.error('Risk assessment response error:', errorText);
        throw new Error(`Risk assessment request failed: ${riskAssessmentResponse.status} ${riskAssessmentResponse.statusText}. Response: ${errorText}`);
      }

      const riskAssessmentData = await riskAssessmentResponse.json();
      console.log('Step 2 Response: Risk Assessment Response:', JSON.stringify(riskAssessmentData, null, 2));

      const jobId = riskAssessmentData.job_id;
      if (!jobId) {
        throw new Error('No job_id received from risk assessment endpoint');
      }
      console.log('Extracted job_id:', jobId);

      console.log('Step 3: GET status with job_id:', jobId);
      let statusResponse;
      try {
        statusResponse = await fetch(`/api/status?job_id=${jobId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });
      } catch (fetchError) {
        console.error('Fetch error for status:', fetchError);
        throw new Error(`Network error getting status: ${fetchError.message}`);
      }

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status response error:', errorText);
        throw new Error(`Status request failed: ${statusResponse.status} ${statusResponse.statusText}. Response: ${errorText}`);
      }

      const statusData = await statusResponse.json();
      console.log('Step 3 Response: Status Response:', JSON.stringify(statusData, null, 2));

      const purchasePayload = {
        identifierFromPurchaser: identifierFromPurchaser,
        network: 'Preprod',
        sellerVkey: '0eb7bcc2599eebc8051238c1b18e7bddaf55e809917694b717bba180',
        paymentType: 'Web3CardanoV1',
        blockchainIdentifier: riskAssessmentData.blockchainIdentifier,
        payByTime: riskAssessmentData.payByTime,
        submitResultTime: riskAssessmentData.submitResultTime,
        unlockTime: riskAssessmentData.unlockTime,
        externalDisputeUnlockTime: riskAssessmentData.externalDisputeUnlockTime,
        agentIdentifier: riskAssessmentData.agentIdentifier,
        inputHash: riskAssessmentData.input_hash
      };
      console.log('Step 4: POST to /payment-api/purchase/ with payload:', JSON.stringify(purchasePayload, null, 2));

      let purchaseResponse;
      try {
        purchaseResponse = await fetch('/payment-api/purchase/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'token': 'masumi-payment-admin-zxhbfa9mccpxmmegtpd9z4cq',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(purchasePayload)
        });
      } catch (fetchError) {
        console.error('Fetch error for purchase:', fetchError);
        throw new Error(`Network error making purchase: ${fetchError.message}`);
      }

      if (!purchaseResponse.ok) {
        const errorText = await purchaseResponse.text();
        console.error('Purchase response error:', errorText);
        throw new Error(`Purchase request failed: ${purchaseResponse.status} ${purchaseResponse.statusText}. Response: ${errorText}`);
      }

      const purchaseData = await purchaseResponse.json();
      console.log('Step 4 Response: Purchase Response:', JSON.stringify(purchaseData, null, 2));

      setTradingStatus('processing');
      console.log('Step 5: Starting polling every 2 minutes for job_id:', jobId);

      const pollStatus = async () => {
        try {
          console.log('Polling status for job_id:', jobId);
          let pollResponse;
          try {
            pollResponse = await fetch(`/api/status?job_id=${jobId}`, {
              method: 'GET',
              headers: {
                'accept': 'application/json'
              }
            });
          } catch (fetchError) {
            console.error('Fetch error during polling:', fetchError);
            throw fetchError;
          }

          if (!pollResponse.ok) {
            console.error('Polling request failed:', pollResponse.status, pollResponse.statusText);
            return;
          }

          const pollData = await pollResponse.json();
          console.log('Poll Response:', JSON.stringify(pollData, null, 2));

          if (pollData.status === 'completed' && pollData.payment_status === 'completed' && pollData.result) {
            console.log('Job completed! Final result:', JSON.stringify(pollData.result, null, 2));
            setTradingResult(pollData.result);
            setTradingStatus('completed');
            if (tradingPollingIntervalRef) {
              clearInterval(tradingPollingIntervalRef);
              setTradingPollingIntervalRef(null);
            }
          } else {
            console.log('Job still processing. Status:', pollData.status, 'Payment Status:', pollData.payment_status);
          }
        } catch (error) {
          console.error('Error during polling:', error);
          setTradingError(error.message);
          setTradingStatus('error');
          if (tradingPollingIntervalRef) {
            clearInterval(tradingPollingIntervalRef);
            setTradingPollingIntervalRef(null);
          }
        }
      };

      await pollStatus();
      const intervalId = setInterval(pollStatus, 120000);
      setTradingPollingIntervalRef(intervalId);

    } catch (error) {
      console.error('Error in Trading Risk Assessment:', error);
      console.error('Error stack:', error.stack);
      setTradingError(error.message);
      setTradingStatus('error');
      if (tradingPollingIntervalRef) {
        clearInterval(tradingPollingIntervalRef);
        setTradingPollingIntervalRef(null);
      }
    }
  };

  const handleLendingRiskAssessment = async () => {
    console.log('=== Button clicked! Starting Lending and Borrowing Risk Assessment ===');
    try {
      setLendingStatus('loading');
      setLendingError(null);
      setLendingResult(null);

      const identifierFromPurchaser = generateRandomHex(8);
      console.log('Step 1: Generated identifier_from_purchaser:', identifierFromPurchaser);

      const riskAssessmentPayload = {
        identifier_from_purchaser: identifierFromPurchaser,
        risk_type: 'lending_borrowing',
        input_data: riskFeatures[1].inputData
      };
      console.log('Step 2: POST to /api/risk_assessment with payload:', JSON.stringify(riskAssessmentPayload, null, 2));

      let riskAssessmentResponse;
      try {
        riskAssessmentResponse = await fetch('/api/risk_assessment', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskAssessmentPayload)
        });
      } catch (fetchError) {
        console.error('Fetch error (CORS or network):', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Check if the API server is running and CORS is configured.`);
      }

      if (!riskAssessmentResponse.ok) {
        const errorText = await riskAssessmentResponse.text();
        console.error('Risk assessment response error:', errorText);
        throw new Error(`Risk assessment request failed: ${riskAssessmentResponse.status} ${riskAssessmentResponse.statusText}. Response: ${errorText}`);
      }

      const riskAssessmentData = await riskAssessmentResponse.json();
      console.log('Step 2 Response: Risk Assessment Response:', JSON.stringify(riskAssessmentData, null, 2));

      const jobId = riskAssessmentData.job_id;
      if (!jobId) {
        throw new Error('No job_id received from risk assessment endpoint');
      }
      console.log('Extracted job_id:', jobId);

      console.log('Step 3: GET status with job_id:', jobId);
      let statusResponse;
      try {
        statusResponse = await fetch(`/api/status?job_id=${jobId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });
      } catch (fetchError) {
        console.error('Fetch error for status:', fetchError);
        throw new Error(`Network error getting status: ${fetchError.message}`);
      }

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status response error:', errorText);
        throw new Error(`Status request failed: ${statusResponse.status} ${statusResponse.statusText}. Response: ${errorText}`);
      }

      const statusData = await statusResponse.json();
      console.log('Step 3 Response: Status Response:', JSON.stringify(statusData, null, 2));

      const purchasePayload = {
        identifierFromPurchaser: identifierFromPurchaser,
        network: 'Preprod',
        sellerVkey: '0eb7bcc2599eebc8051238c1b18e7bddaf55e809917694b717bba180',
        paymentType: 'Web3CardanoV1',
        blockchainIdentifier: riskAssessmentData.blockchainIdentifier,
        payByTime: riskAssessmentData.payByTime,
        submitResultTime: riskAssessmentData.submitResultTime,
        unlockTime: riskAssessmentData.unlockTime,
        externalDisputeUnlockTime: riskAssessmentData.externalDisputeUnlockTime,
        agentIdentifier: riskAssessmentData.agentIdentifier,
        inputHash: riskAssessmentData.input_hash
      };
      console.log('Step 4: POST to /payment-api/purchase/ with payload:', JSON.stringify(purchasePayload, null, 2));

      let purchaseResponse;
      try {
        purchaseResponse = await fetch('/payment-api/purchase/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'token': 'masumi-payment-admin-zxhbfa9mccpxmmegtpd9z4cq',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(purchasePayload)
        });
      } catch (fetchError) {
        console.error('Fetch error for purchase:', fetchError);
        throw new Error(`Network error making purchase: ${fetchError.message}`);
      }

      if (!purchaseResponse.ok) {
        const errorText = await purchaseResponse.text();
        console.error('Purchase response error:', errorText);
        throw new Error(`Purchase request failed: ${purchaseResponse.status} ${purchaseResponse.statusText}. Response: ${errorText}`);
      }

      const purchaseData = await purchaseResponse.json();
      console.log('Step 4 Response: Purchase Response:', JSON.stringify(purchaseData, null, 2));

      setLendingStatus('processing');
      console.log('Step 5: Starting polling every 2 minutes for job_id:', jobId);

      const pollStatus = async () => {
        try {
          console.log('Polling status for job_id:', jobId);
          let pollResponse;
          try {
            pollResponse = await fetch(`/api/status?job_id=${jobId}`, {
              method: 'GET',
              headers: {
                'accept': 'application/json'
              }
            });
          } catch (fetchError) {
            console.error('Fetch error during polling:', fetchError);
            throw fetchError;
          }

          if (!pollResponse.ok) {
            console.error('Polling request failed:', pollResponse.status, pollResponse.statusText);
            return;
          }

          const pollData = await pollResponse.json();
          console.log('Poll Response:', JSON.stringify(pollData, null, 2));

          if (pollData.status === 'completed' && pollData.payment_status === 'completed' && pollData.result) {
            console.log('Job completed! Final result:', JSON.stringify(pollData.result, null, 2));
            setLendingResult(pollData.result);
            setLendingStatus('completed');
            if (lendingPollingIntervalRef) {
              clearInterval(lendingPollingIntervalRef);
              setLendingPollingIntervalRef(null);
            }
          } else {
            console.log('Job still processing. Status:', pollData.status, 'Payment Status:', pollData.payment_status);
          }
        } catch (error) {
          console.error('Error during polling:', error);
          setLendingError(error.message);
          setLendingStatus('error');
          if (lendingPollingIntervalRef) {
            clearInterval(lendingPollingIntervalRef);
            setLendingPollingIntervalRef(null);
          }
        }
      };

      await pollStatus();
      const intervalId = setInterval(pollStatus, 120000);
      setLendingPollingIntervalRef(intervalId);

    } catch (error) {
      console.error('Error in Lending Risk Assessment:', error);
      console.error('Error stack:', error.stack);
      setLendingError(error.message);
      setLendingStatus('error');
      if (lendingPollingIntervalRef) {
        clearInterval(lendingPollingIntervalRef);
        setLendingPollingIntervalRef(null);
      }
    }
  };

  const handleProtocolSecurityRiskAssessment = async () => {
    console.log('=== Button clicked! Starting Protocol Security Risk Assessment ===');
    try {
      setProtocolStatus('loading');
      setProtocolError(null);
      setProtocolResult(null);

      const identifierFromPurchaser = generateRandomHex(8);
      console.log('Step 1: Generated identifier_from_purchaser:', identifierFromPurchaser);

      const riskAssessmentPayload = {
        identifier_from_purchaser: identifierFromPurchaser,
        risk_type: 'protocol_security',
        input_data: riskFeatures[2].inputData
      };
      console.log('Step 2: POST to /api/risk_assessment with payload:', JSON.stringify(riskAssessmentPayload, null, 2));

      let riskAssessmentResponse;
      try {
        riskAssessmentResponse = await fetch('/api/risk_assessment', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskAssessmentPayload)
        });
      } catch (fetchError) {
        console.error('Fetch error (CORS or network):', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Check if the API server is running and CORS is configured.`);
      }

      if (!riskAssessmentResponse.ok) {
        const errorText = await riskAssessmentResponse.text();
        console.error('Risk assessment response error:', errorText);
        throw new Error(`Risk assessment request failed: ${riskAssessmentResponse.status} ${riskAssessmentResponse.statusText}. Response: ${errorText}`);
      }

      const riskAssessmentData = await riskAssessmentResponse.json();
      console.log('Step 2 Response: Risk Assessment Response:', JSON.stringify(riskAssessmentData, null, 2));

      const jobId = riskAssessmentData.job_id;
      if (!jobId) {
        throw new Error('No job_id received from risk assessment endpoint');
      }
      console.log('Extracted job_id:', jobId);

      console.log('Step 3: GET status with job_id:', jobId);
      let statusResponse;
      try {
        statusResponse = await fetch(`/api/status?job_id=${jobId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });
      } catch (fetchError) {
        console.error('Fetch error for status:', fetchError);
        throw new Error(`Network error getting status: ${fetchError.message}`);
      }

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status response error:', errorText);
        throw new Error(`Status request failed: ${statusResponse.status} ${statusResponse.statusText}. Response: ${errorText}`);
      }

      const statusData = await statusResponse.json();
      console.log('Step 3 Response: Status Response:', JSON.stringify(statusData, null, 2));

      const purchasePayload = {
        identifierFromPurchaser: identifierFromPurchaser,
        network: 'Preprod',
        sellerVkey: '0eb7bcc2599eebc8051238c1b18e7bddaf55e809917694b717bba180',
        paymentType: 'Web3CardanoV1',
        blockchainIdentifier: riskAssessmentData.blockchainIdentifier,
        payByTime: riskAssessmentData.payByTime,
        submitResultTime: riskAssessmentData.submitResultTime,
        unlockTime: riskAssessmentData.unlockTime,
        externalDisputeUnlockTime: riskAssessmentData.externalDisputeUnlockTime,
        agentIdentifier: riskAssessmentData.agentIdentifier,
        inputHash: riskAssessmentData.input_hash
      };
      console.log('Step 4: POST to /payment-api/purchase/ with payload:', JSON.stringify(purchasePayload, null, 2));

      let purchaseResponse;
      try {
        purchaseResponse = await fetch('/payment-api/purchase/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'token': 'masumi-payment-admin-zxhbfa9mccpxmmegtpd9z4cq',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(purchasePayload)
        });
      } catch (fetchError) {
        console.error('Fetch error for purchase:', fetchError);
        throw new Error(`Network error making purchase: ${fetchError.message}`);
      }

      if (!purchaseResponse.ok) {
        const errorText = await purchaseResponse.text();
        console.error('Purchase response error:', errorText);
        throw new Error(`Purchase request failed: ${purchaseResponse.status} ${purchaseResponse.statusText}. Response: ${errorText}`);
      }

      const purchaseData = await purchaseResponse.json();
      console.log('Step 4 Response: Purchase Response:', JSON.stringify(purchaseData, null, 2));

      setProtocolStatus('processing');
      console.log('Step 5: Starting polling every 2 minutes for job_id:', jobId);

      const pollStatus = async () => {
        try {
          console.log('Polling status for job_id:', jobId);
          let pollResponse;
          try {
            pollResponse = await fetch(`/api/status?job_id=${jobId}`, {
              method: 'GET',
              headers: {
                'accept': 'application/json'
              }
            });
          } catch (fetchError) {
            console.error('Fetch error during polling:', fetchError);
            throw fetchError;
          }

          if (!pollResponse.ok) {
            console.error('Polling request failed:', pollResponse.status, pollResponse.statusText);
            return;
          }

          const pollData = await pollResponse.json();
          console.log('Poll Response:', JSON.stringify(pollData, null, 2));

          if (pollData.status === 'completed' && pollData.payment_status === 'completed' && pollData.result) {
            console.log('Job completed! Final result:', JSON.stringify(pollData.result, null, 2));
            setProtocolResult(pollData.result);
            setProtocolStatus('completed');
            if (protocolPollingIntervalRef) {
              clearInterval(protocolPollingIntervalRef);
              setProtocolPollingIntervalRef(null);
            }
          } else {
            console.log('Job still processing. Status:', pollData.status, 'Payment Status:', pollData.payment_status);
          }
        } catch (error) {
          console.error('Error during polling:', error);
          setProtocolError(error.message);
          setProtocolStatus('error');
          if (protocolPollingIntervalRef) {
            clearInterval(protocolPollingIntervalRef);
            setProtocolPollingIntervalRef(null);
          }
        }
      };

      await pollStatus();
      const intervalId = setInterval(pollStatus, 120000);
      setProtocolPollingIntervalRef(intervalId);

    } catch (error) {
      console.error('Error in Protocol Security Risk Assessment:', error);
      console.error('Error stack:', error.stack);
      setProtocolError(error.message);
      setProtocolStatus('error');
      if (protocolPollingIntervalRef) {
        clearInterval(protocolPollingIntervalRef);
        setProtocolPollingIntervalRef(null);
      }
    }
  };

  const handleLiquidityConcentrationRiskAssessment = async () => {
    console.log('=== Button clicked! Starting Liquidity Concentration Risk Assessment ===');
    try {
      setLiquidityStatus('loading');
      setLiquidityError(null);
      setLiquidityResult(null);

      const identifierFromPurchaser = generateRandomHex(8);
      console.log('Step 1: Generated identifier_from_purchaser:', identifierFromPurchaser);

      const riskAssessmentPayload = {
        identifier_from_purchaser: identifierFromPurchaser,
        risk_type: 'liquidity_concentration',
        input_data: riskFeatures[3].inputData
      };
      console.log('Step 2: POST to /api/risk_assessment with payload:', JSON.stringify(riskAssessmentPayload, null, 2));

      let riskAssessmentResponse;
      try {
        riskAssessmentResponse = await fetch('/api/risk_assessment', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskAssessmentPayload)
        });
      } catch (fetchError) {
        console.error('Fetch error (CORS or network):', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Check if the API server is running and CORS is configured.`);
      }

      if (!riskAssessmentResponse.ok) {
        const errorText = await riskAssessmentResponse.text();
        console.error('Risk assessment response error:', errorText);
        throw new Error(`Risk assessment request failed: ${riskAssessmentResponse.status} ${riskAssessmentResponse.statusText}. Response: ${errorText}`);
      }

      const riskAssessmentData = await riskAssessmentResponse.json();
      console.log('Step 2 Response: Risk Assessment Response:', JSON.stringify(riskAssessmentData, null, 2));

      const jobId = riskAssessmentData.job_id;
      if (!jobId) {
        throw new Error('No job_id received from risk assessment endpoint');
      }
      console.log('Extracted job_id:', jobId);

      console.log('Step 3: GET status with job_id:', jobId);
      let statusResponse;
      try {
        statusResponse = await fetch(`/api/status?job_id=${jobId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });
      } catch (fetchError) {
        console.error('Fetch error for status:', fetchError);
        throw new Error(`Network error getting status: ${fetchError.message}`);
      }

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status response error:', errorText);
        throw new Error(`Status request failed: ${statusResponse.status} ${statusResponse.statusText}. Response: ${errorText}`);
      }

      const statusData = await statusResponse.json();
      console.log('Step 3 Response: Status Response:', JSON.stringify(statusData, null, 2));

      const purchasePayload = {
        identifierFromPurchaser: identifierFromPurchaser,
        network: 'Preprod',
        sellerVkey: '0eb7bcc2599eebc8051238c1b18e7bddaf55e809917694b717bba180',
        paymentType: 'Web3CardanoV1',
        blockchainIdentifier: riskAssessmentData.blockchainIdentifier,
        payByTime: riskAssessmentData.payByTime,
        submitResultTime: riskAssessmentData.submitResultTime,
        unlockTime: riskAssessmentData.unlockTime,
        externalDisputeUnlockTime: riskAssessmentData.externalDisputeUnlockTime,
        agentIdentifier: riskAssessmentData.agentIdentifier,
        inputHash: riskAssessmentData.input_hash
      };
      console.log('Step 4: POST to /payment-api/purchase/ with payload:', JSON.stringify(purchasePayload, null, 2));

      let purchaseResponse;
      try {
        purchaseResponse = await fetch('/payment-api/purchase/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'token': 'masumi-payment-admin-zxhbfa9mccpxmmegtpd9z4cq',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(purchasePayload)
        });
      } catch (fetchError) {
        console.error('Fetch error for purchase:', fetchError);
        throw new Error(`Network error making purchase: ${fetchError.message}`);
      }

      if (!purchaseResponse.ok) {
        const errorText = await purchaseResponse.text();
        console.error('Purchase response error:', errorText);
        throw new Error(`Purchase request failed: ${purchaseResponse.status} ${purchaseResponse.statusText}. Response: ${errorText}`);
      }

      const purchaseData = await purchaseResponse.json();
      console.log('Step 4 Response: Purchase Response:', JSON.stringify(purchaseData, null, 2));

      setLiquidityStatus('processing');
      console.log('Step 5: Starting polling every 2 minutes for job_id:', jobId);

      const pollStatus = async () => {
        try {
          console.log('Polling status for job_id:', jobId);
          let pollResponse;
          try {
            pollResponse = await fetch(`/api/status?job_id=${jobId}`, {
              method: 'GET',
              headers: {
                'accept': 'application/json'
              }
            });
          } catch (fetchError) {
            console.error('Fetch error during polling:', fetchError);
            throw fetchError;
          }

          if (!pollResponse.ok) {
            console.error('Polling request failed:', pollResponse.status, pollResponse.statusText);
            return;
          }

          const pollData = await pollResponse.json();
          console.log('Poll Response:', JSON.stringify(pollData, null, 2));

          if (pollData.status === 'completed' && pollData.payment_status === 'completed' && pollData.result) {
            console.log('Job completed! Final result:', JSON.stringify(pollData.result, null, 2));
            setLiquidityResult(pollData.result);
            setLiquidityStatus('completed');
            if (liquidityPollingIntervalRef) {
              clearInterval(liquidityPollingIntervalRef);
              setLiquidityPollingIntervalRef(null);
            }
          } else {
            console.log('Job still processing. Status:', pollData.status, 'Payment Status:', pollData.payment_status);
          }
        } catch (error) {
          console.error('Error during polling:', error);
          setLiquidityError(error.message);
          setLiquidityStatus('error');
          if (liquidityPollingIntervalRef) {
            clearInterval(liquidityPollingIntervalRef);
            setLiquidityPollingIntervalRef(null);
          }
        }
      };

      await pollStatus();
      const intervalId = setInterval(pollStatus, 120000);
      setLiquidityPollingIntervalRef(intervalId);

    } catch (error) {
      console.error('Error in Liquidity Concentration Risk Assessment:', error);
      console.error('Error stack:', error.stack);
      setLiquidityError(error.message);
      setLiquidityStatus('error');
      if (liquidityPollingIntervalRef) {
        clearInterval(liquidityPollingIntervalRef);
        setLiquidityPollingIntervalRef(null);
      }
    }
  };

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

  const parseMarkdown = (text) => {
    if (!text) return '';

    let cleaned = text.replace(/^```markdown\n/, '').replace(/```$/, '');

    cleaned = cleaned.replace(/^### (.*$)/gim, '<h3 style="color: #1fc7d4; margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.1rem;">$1</h3>');
    cleaned = cleaned.replace(/^## (.*$)/gim, '<h2 style="color: #1fc7d4; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.3rem; border-bottom: 1px solid #1fc7d4; padding-bottom: 0.5rem;">$1</h2>');
    cleaned = cleaned.replace(/^# (.*$)/gim, '<h1 style="color: #1fc7d4; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem;">$1</h1>');

    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>');

    cleaned = cleaned.replace(/^---$/gim, '<hr style="border: none; border-top: 1px solid #1fc7d4; margin: 1.5rem 0; opacity: 0.3;">');

    cleaned = cleaned.replace(/^- (.*$)/gim, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>');
    cleaned = cleaned.replace(/^  - (.*$)/gim, '<li style="margin-left: 2.5rem; margin-bottom: 0.5rem; list-style-type: circle;">$1</li>');

    cleaned = cleaned.replace(/\n/g, '<br />');

    return cleaned;
  };

  const getRiskScoreColor = (riskScore) => {
    if (!riskScore) return '#fff';
    if (riskScore.includes('🔴')) return '#ff4444';
    if (riskScore.includes('🟠')) return '#ff8800';
    if (riskScore.includes('🟡')) return '#ffaa00';
    if (riskScore.includes('🟢')) return '#44ff44';
    return '#1fc7d4';
  };

  const containerStyle = {
    backgroundColor: '#0a0a1a',
    color: '#e0e0e0',
    minHeight: '100vh',
    paddingTop: '70px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px 80px 20px',
  };

  const getButtonStyles = (status) => {
    const baseStyle = {
      padding: '0.75rem 1.5rem',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      position: 'relative',
      zIndex: 20,
      pointerEvents: 'auto',
      width: '100%',
      marginTop: 'auto',
      boxShadow: '0 4px 15px rgba(31, 199, 212, 0.2)',
    };

    if (status === 'loading' || status === 'processing') {
      return {
        ...baseStyle,
        backgroundColor: '#333',
        color: '#aaa',
        cursor: 'not-allowed',
        boxShadow: 'none',
      };
    }
    if (status === 'completed') {
      return {
        ...baseStyle,
        backgroundColor: '#44ff44',
        color: '#0a0a1a',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(68, 255, 68, 0.3)',
      };
    }
    if (status === 'error') {
      return {
        ...baseStyle,
        backgroundColor: '#ff4444',
        cursor: 'pointer',
      };
    }
    return {
      ...baseStyle,
      backgroundColor: '#1fc7d4',
      cursor: 'pointer',
    };
  };

  return (
    <div style={containerStyle}>
      <ModernNavbar />
      <main style={mainContentStyle}>

        <section style={{
          textAlign: 'center',
          marginBottom: '60px',
          padding: '40px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            // fontWeight: '800',
            // color: '#ffffff',
            // textShadow: '0 0 10px rgba(31, 199, 212, 0.4)',
            // margin: '0 0 10px 0',
            padding: '20px',
          }}>
            Risk Management Agents
          </h1>
          {/* <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '400',
            color: '#1fc7d4',
            margin: '0 0 20px 0',
          }}>
            Real-time assessment for decentralized finance
          </h2> */}
          <p style={{
            maxWidth: '700px',
            margin: '0 auto 30px auto',
            fontSize: '1.05rem',
            color: '#888',
            lineHeight: '1.6',
          }}>
            Our suite of autonomous agents provides cutting-edge risk analysis across Trading, Lending, Protocol Security, and Liquidity Concentration.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 15px',
            backgroundColor: 'rgba(31, 199, 212, 0.1)',
            borderRadius: '50px',
            border: '1px solid #1fc7d4',
            fontSize: '0.9rem',
            color: '#1fc7d4',
            fontWeight: '600',
          }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>⚙️</span>
            <span>Decentralized Quant Engine</span>
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            padding: '20px 0',
          }}>
            {riskFeatures.map((feature, index) => {
              const status = index === 0 ? tradingStatus : index === 1 ? lendingStatus : index === 2 ? protocolStatus : liquidityStatus;
              const error = index === 0 ? tradingError : index === 1 ? lendingError : index === 2 ? protocolError : liquidityError;
              const handler = index === 0 ? handleTradingRiskAssessment : index === 1 ? handleLendingRiskAssessment : index === 2 ? handleProtocolSecurityRiskAssessment : handleLiquidityConcentrationRiskAssessment;

              return (
                <div
                  key={index}
                  className="risk-feature-box"
                  style={{
                    backgroundColor: '#1a1a2e',
                    padding: '30px',
                    borderRadius: '16px',
                    border: '1px solid #333',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '380px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(31, 199, 212, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                  }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#ffffff',
                      marginBottom: '10px',
                      fontWeight: '700',
                    }}>
                      {feature.title}
                    </h3>

                    <div style={{
                      backgroundColor: '#0f0f1e',
                      padding: '15px',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      borderLeft: '4px solid #1fc7d4',
                    }}>
                      <div style={{
                        color: '#1fc7d4',
                        fontWeight: '600',
                        marginBottom: '0.75rem',
                        fontSize: '0.95rem'
                      }}>
                        Sample Parameters:
                      </div>
                      {Object.entries(feature.inputData).map(([key, value]) => (
                        <div key={key} style={{
                          marginBottom: '0.5rem',
                          paddingLeft: '1rem',
                          color: '#e0e0e0',
                          fontSize: '0.9rem',
                          lineHeight: '1.6'
                        }}>
                          <span style={{ color: '#1fc7d4' }}>• </span>
                          <span style={{ color: '#888', textTransform: 'capitalize' }}>
                            {key.replace(/_/g, ' ')}:
                          </span>{' '}
                          <span style={{ color: '#fff' }}>
                            {value.length > 50 ? value.substring(0, 50) + '...' : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="assessment-button-container"
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      position: 'relative',
                      zIndex: 10,
                      pointerEvents: 'auto'
                    }}
                  >
                    <button
                      onClick={handler}
                      disabled={status === 'loading' || status === 'processing'}
                      style={getButtonStyles(status)}
                      onMouseEnter={(e) => {
                        if (status === 'idle' || status === 'error') {
                          e.target.style.backgroundColor = '#00b8c9';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (status === 'idle' || status === 'error') {
                          e.target.style.backgroundColor = '#1fc7d4';
                          e.target.style.transform = 'translateY(0)';
                        }
                        if (status === 'completed') {
                          e.target.style.backgroundColor = '#44ff44';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {status === 'idle' && 'Run Assessment'}
                      {status === 'loading' && 'Initializing...'}
                      {status === 'processing' && 'Processing... (Polling every 2 min)'}
                      {status === 'completed' && 'Assessment Complete'}
                      {status === 'error' && 'Retry Assessment'}
                    </button>
                    {status === 'processing' && (
                      <p style={{
                        color: '#1fc7d4',
                        fontSize: '0.9rem',
                        margin: 0,
                        textAlign: 'center'
                      }}>
                        ⏳ Waiting for payment and processing...
                      </p>
                    )}
                    {error && (
                      <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                      }}>
                        Error: {error}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {showModal && currentResult && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '2rem',
              overflow: 'auto'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div
              style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '16px',
                border: '2px solid #1fc7d4',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(31, 199, 212, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'transparent',
                  color: '#1fc7d4',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 10001,
                  border: 'none',
                  borderRadius: '50%',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1fc7d4';
                  e.target.style.color = '#1a1a2e';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#1fc7d4';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                ×
              </button>

              <div style={{ padding: '2.5rem' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <h2 style={{
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    {currentResult.type === 'trading' && 'Trading'}
                    {currentResult.type === 'lending' && 'Lending and Borrowing'}
                    {currentResult.type === 'protocol' && 'Protocol Security'}
                    {currentResult.type === 'liquidity' && 'Liquidity Concentration'}
                    {' '}Risk Report
                  </h2>
                  <p style={{
                    color: '#1fc7d4',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Assessment ID: {currentResult.data.identifier_from_purchaser || 'N/A'}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0f0f1e',
                    borderRadius: '8px',
                    border: '1px solid #1fc7d4',
                    fontSize: '0.9rem',
                    color: '#e0e0e0',
                    marginTop: '1rem',
                  }}>
                    {currentResult.type === 'trading' && (
                      <>Token: {currentResult.data.input_data?.token_symbol || 'N/A'} | Period: {currentResult.data.input_data?.time_period || 'N/A'}</>
                    )}
                    {currentResult.type === 'lending' && (
                      <>Asset: {currentResult.data.input_data?.borrowing_asset || 'N/A'}</>
                    )}
                    {currentResult.type === 'protocol' && (
                      <>Protocol: {currentResult.data.input_data?.protocol_name || 'N/A'}</>
                    )}
                    {currentResult.type === 'liquidity' && (
                      <>Token: {currentResult.data.input_data?.token_symbol || 'N/A'} | Wallets: {currentResult.data.input_data?.number_of_wallets || 'N/A'}</>
                    )}
                  </div>
                </div>

                <div style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#0f0f1e',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: getRiskScoreColor(currentResult.data.risk_score_level),
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#fff',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    Overall Risk Level
                  </h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: getRiskScoreColor(currentResult.data.risk_score_level),
                    margin: 0,
                    textShadow: `0 0 10px ${getRiskScoreColor(currentResult.data.risk_score_level)}`
                  }}>
                    {currentResult.data.risk_score_level || currentResult.data.risk_score_percentage || 'N/A'}
                  </p>
                  {currentResult.data.risk_score_raw !== undefined && (
                    <p style={{
                      color: '#888',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      marginBottom: 0
                    }}>
                      Raw Score: {currentResult.data.risk_score_raw}/100
                    </p>
                  )}
                </div>

                <div style={{
                  marginBottom: '2rem',
                  border: '1px solid rgba(31, 199, 212, 0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0f0f1e'
                }}>
                  <button
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#1fc7d4',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(31, 199, 212, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>Detailed Assessment Report</span>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        transition: 'transform 0.3s ease',
                        transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-block'
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isAccordionOpen ? '1000px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease-in-out',
                      backgroundColor: '#0a0a1a'
                    }}
                  >
                    <div
                      style={{
                        padding: isAccordionOpen ? '2rem' : '0',
                        color: '#e0e0e0',
                        lineHeight: '1.8',
                        fontSize: '0.95rem',
                        borderTop: isAccordionOpen ? '1px solid rgba(31, 199, 212, 0.2)' : 'none'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(currentResult.data.detailed_assessment || '')
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: '#1fc7d4',
                      color: '#1a1a2e',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(31, 199, 212, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#00b8c9';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#1fc7d4';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Close Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default RiskManagementWithHandlers;
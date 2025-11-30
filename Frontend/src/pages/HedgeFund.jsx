import React, { useState, useRef, useEffect } from 'react';
import ModernNavbar from '../components/ModernNavbar';

function HedgeFund() {
    // --- Agent Data and Emojis (Defined locally) ---
    const AGENT_EMOJIS = {
        HedgeFund: '💰',
        Strategy: '🧠',
        Risk: '🛡️',
        Execution: '⚡',
        Portfolio: '💼',
        Reporting: '📜',
        Compliance: '⚖️',
    };

    const AGENTS_DATA = [
        {
            name: 'Strategy Agent',
            icon: AGENT_EMOJIS.Strategy,
            description: 'Plans and defines the next trading strategy based on real-time market conditions.',
            focus: 'Market Thesis, Alpha Generation',
        },
        {
            name: 'Risk Agent',
            icon: AGENT_EMOJIS.Risk,
            description: 'Conducts advanced and real-time risk assessments before, during, and after trades.',
            focus: 'Vulnerability Scanning, Due Diligence',
        },
        {
            name: 'Execution Agent',
            icon: AGENT_EMOJIS.Execution,
            description: 'Manages all transaction details, ensuring optimal trade routing and management.',
            focus: 'Slippage Control, Order Management',
        },
        {
            name: 'Portfolio Agent',
            icon: AGENT_EMOJIS.Portfolio,
            description: 'Monitors asset allocation, rebalances, and optimizes capital deployment.',
            focus: 'Asset Allocation, Rebalancing',
        },
        {
            name: 'Reporting Agent',
            icon: AGENT_EMOJIS.Reporting,
            description: 'Generates detailed, auditable reports on performance, P&L, and compliance status.',
            focus: 'Transparency, Performance Metrics',
        },
        {
            name: 'Compliance Agent',
            icon: AGENT_EMOJIS.Compliance,
            description: 'Ensures all operations adhere to predefined regulatory or internal governance standards.',
            focus: 'Governance, Regulatory Adherence',
        },
    ];

    // --- State and Feature Data (From previous step) ---
    const [agentResult, setAgentResult] = useState(null);
    const [agentStatus, setAgentStatus] = useState('idle');
    const [agentError, setAgentError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentResult, setCurrentResult] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [agentPollingIntervalRef, setAgentPollingIntervalRef] = useState(null);

    const hedgeFundFeature = {
        title: 'Hedge Fund Agent Execution',
        type: 'hedge_fund',
        inputData: {
            investment_thesis: 'The recent upgrade to the Layer 2 scaling solution will cause a massive liquidity migration to new DeFi primitives on that chain. We must capitalize on early yield opportunities.',
            market_outlook: 'Highly bullish on ETH ecosystem, cautiously optimistic on Bitcoin. Bearish on old Layer 1 chains.',
            initial_portfolio_holdings: '5 BTC, 20 ETH, 500 SOL, 100000 USDC'
        }
    };

    // --- Helper Functions (Standard) ---
    const generateRandomHex = (length = 8) => {
        const array = new Uint8Array(length);
        if (typeof window !== 'undefined' && window.crypto) {
            window.crypto.getRandomValues(array);
        } else {
            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 256);
            }
        }
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
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


    // --- API Call Handler (Simulation logic remains the same) ---
    const handleHedgeFundExecution = async (feature) => {
        console.log(`=== Button clicked! Starting ${feature.title} ===`);
        try {
            setAgentStatus('loading');
            setAgentError(null);
            setAgentResult(null);

            const identifierFromPurchaser = generateRandomHex(8);

            const riskAssessmentPayload = {
                identifier_from_purchaser: identifierFromPurchaser,
                risk_type: feature.type,
                input_data: feature.inputData
            };

            // --- Simulation of API calls ---
            const simulateApiCall = (data, success = true, status = 200) => new Promise(resolve => {
                setTimeout(() => {
                    if (!success) {
                        resolve({ ok: false, status, text: () => Promise.resolve(JSON.stringify(data)) });
                    } else {
                        resolve({ ok: true, status, json: () => Promise.resolve(data) });
                    }
                }, 1500);
            });

            // Simulate Step 2: Risk Assessment Request
            let riskAssessmentData = {
                job_id: generateRandomHex(12),
                blockchainIdentifier: 'BlockchainID-' + generateRandomHex(6),
                payByTime: Date.now() + 600000,
                submitResultTime: Date.now() + 1200000,
                unlockTime: Date.now() + 1800000,
                externalDisputeUnlockTime: Date.now() + 2400000,
                agentIdentifier: 'HedgeFundAgent-v1',
                input_hash: generateRandomHex(16),
            };

            const riskAssessmentResponse = await simulateApiCall(riskAssessmentData);

            if (!riskAssessmentResponse.ok) {
                const errorText = await riskAssessmentResponse.text();
                throw new Error(`Agent request failed: ${riskAssessmentResponse.status} Response: ${errorText}`);
            }

            riskAssessmentData = await riskAssessmentResponse.json();
            const jobId = riskAssessmentData.job_id;
            if (!jobId) throw new Error('No job_id received.');

            // Simulate Step 4: Purchase
            const purchaseData = { transaction_id: 'TX-' + generateRandomHex(10) };
            const purchaseResponse = await simulateApiCall(purchaseData);

            if (!purchaseResponse.ok) {
                const errorText = await purchaseResponse.text();
                throw new Error(`Purchase request failed: ${purchaseResponse.status} Response: ${errorText}`);
            }

            setAgentStatus('processing');

            // --- Polling Logic ---
            const pollStatus = async () => {
                try {
                    const isCompleted = Math.random() > 0.6;
                    let pollData;

                    if (isCompleted) {
                        pollData = {
                            status: 'completed',
                            payment_status: 'completed',
                            result: {
                                identifier_from_purchaser: identifierFromPurchaser,
                                risk_score_level: '🟢 Low Risk',
                                risk_score_percentage: '20%',
                                risk_score_raw: 20,
                                input_data: feature.inputData,
                                detailed_assessment: `
# AI Hedge Fund Execution Report
## Strategy Overview
The Hedge Fund Agent successfully coordinated with the Risk Agent to green-light high-yield, low-volatility liquidity pools on the specified Layer 2 chain.
### Execution Details
* Initial Holdings Value: $220,000 USD
* Investment Thesis Confirmation: Confirmed by the Strategy Agent and monitored by the Compliance Agent.
* Trade Execution: Executed 12 successful trades via the Execution Agent.
* Current APY (Simulated): 18.5%
### Risk Oversight & Reporting
The Risk Agent flagged the SOL holding as having high-market risk. The Portfolio Agent then initiated a rebalancing. The final status was logged by the Reporting Agent. This dynamic interaction prevented a potential draw-down during a minor market correction.
                        `,
                            }
                        };
                    } else {
                        pollData = {
                            status: 'processing',
                            payment_status: 'processing',
                            result: null
                        };
                    }

                    if (pollData.status === 'completed' && pollData.payment_status === 'completed' && pollData.result) {
                        setAgentResult(pollData.result);
                        setAgentStatus('completed');
                        if (agentPollingIntervalRef) {
                            clearInterval(agentPollingIntervalRef);
                            setAgentPollingIntervalRef(null);
                        }
                    } else {
                        console.log('Job still processing. Status:', pollData.status, 'Payment Status:', pollData.payment_status);
                    }
                } catch (error) {
                    setAgentError(error.message);
                    setAgentStatus('error');
                    if (agentPollingIntervalRef) {
                        clearInterval(agentPollingIntervalRef);
                        setAgentPollingIntervalRef(null);
                    }
                }
            };

            await pollStatus();
            const intervalId = setInterval(pollStatus, 120000); // Poll every 2 minutes
            setAgentPollingIntervalRef(intervalId);

        } catch (error) {
            setAgentError(error.message);
            setAgentStatus('error');
            if (agentPollingIntervalRef) {
                clearInterval(agentPollingIntervalRef);
                setAgentPollingIntervalRef(null);
            }
        }
    };

    // --- Effects and cleanup remains the same ---
    useEffect(() => {
        return () => {
            if (agentPollingIntervalRef) {
                clearInterval(agentPollingIntervalRef);
            }
        };
    }, [agentPollingIntervalRef]);

    useEffect(() => {
        if (agentResult) {
            setCurrentResult({ type: hedgeFundFeature.type, data: agentResult });
            setShowModal(true);
            setIsAccordionOpen(false);
        }
    }, [agentResult]);


    // --- UI Styles ---
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

    // --- Agent Coordination Flow Component (New UI for Interaction) ---
    const AgentCoordinationFlow = () => { // Corrected: Used function body {}

        // Corrected: Helper function defined outside the JSX return
        const renderAgentNode = (agent, style = {}, isCentral = false) => (
            <div
                key={isCentral ? 'HedgeFundAgent' : agent.name}
                style={{
                    backgroundColor: isCentral ? '#1a1a2e' : '#0f0f1e',
                    padding: '20px',
                    borderRadius: '12px',
                    border: isCentral ? '2px solid #1fc7d4' : '1px solid #333',
                    boxShadow: isCentral ? '0 0 25px rgba(31, 199, 212, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    ...style,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                <div style={{ fontSize: isCentral ? '3rem' : '2rem', marginBottom: '10px' }}>
                    {isCentral ? AGENT_EMOJIS.HedgeFund : agent.icon}
                </div>
                <h4 style={{ color: isCentral ? '#ffffff' : '#1fc7d4', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 5px 0' }}>
                    {isCentral ? 'Hedge Fund Agent (Core)' : agent.name}
                </h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0, minHeight: '40px' }}>
                    {isCentral ? 'Orchestrates the entire investment cycle.' : agent.description}
                </p>
                {!isCentral && (
                    <p style={{ color: '#555', fontSize: '0.75rem', marginTop: '10px', fontWeight: 'bold' }}>
                        Focus: {agent.focus}
                    </p>
                )}
            </div>
        );

        // Now return the JSX structure
        return (
            <div style={{
                marginBottom: '60px',
                padding: '20px 0',
                textAlign: 'center',
            }}>
                <h3 style={{
                    color: '#1fc7d4',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '40px',
                    textShadow: '0 0 5px rgba(31, 199, 212, 0.4)',
                }}>
                    The Autonomous Agent Ecosystem
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto auto auto',
                    gap: '30px 40px',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}>
                    {/* 1st Row: Strategy and Risk */}
                    {renderAgentNode(AGENTS_DATA[0], { gridColumn: '1 / 2' })}
                    <div style={{
                        gridColumn: '2 / 3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: '#1fc7d4',
                        opacity: 0.7,
                    }}>
                        {'<-- Data Feed -->'}
                    </div>
                    {renderAgentNode(AGENTS_DATA[1], { gridColumn: '3 / 4' })}

                    {/* 2nd Row: Hedge Fund Agent (Center) */}
                    <div style={{ gridColumn: '1 / 4', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '600px',
                        }}>
                            {/* Arrow to the Hedge Fund Agent */}
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '2px',
                                height: '50px',
                                backgroundColor: '#1fc7d4',
                                boxShadow: '0 0 10px #1fc7d4',
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(45deg) translateY(-2px)',
                                width: '10px',
                                height: '2px',
                                backgroundColor: '#1fc7d4',
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(-45deg) translateY(-2px)',
                                width: '10px',
                                height: '2px',
                                backgroundColor: '#1fc7d4',
                            }}></div>

                            {renderAgentNode({ name: 'Hedge Fund' }, { margin: '0 auto', width: '90%' }, true)}
                        </div>
                    </div>

                    {/* 3rd Row: Execution, Portfolio */}
                    <div style={{ gridColumn: '1 / 4', display: 'flex', justifyContent: 'space-between', gap: '30px 40px' }}>
                        {renderAgentNode(AGENTS_DATA[2], { flex: 1 })}
                        {renderAgentNode(AGENTS_DATA[3], { flex: 1 })}
                    </div>

                    {/* 4th Row: Reporting, Compliance */}
                    <div style={{ gridColumn: '1 / 4', display: 'flex', justifyContent: 'space-between', gap: '30px 40px' }}>
                        {renderAgentNode(AGENTS_DATA[4], { flex: 1 })}
                        {renderAgentNode(AGENTS_DATA[5], { flex: 1 })}
                    </div>

                </div>

                <p style={{
                    color: '#555',
                    fontSize: '0.9rem',
                    marginTop: '30px',
                }}>
                    * The Hedge Fund Agent acts as the orchestrator, receiving intelligence from Strategy/Risk and issuing commands to Execution/Portfolio/Reporting/Compliance Agents.
                </p>
            </div>
        );
    };

    // --- Component JSX (main return) ---

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
                        // color: '#ffffff',
                        // textShadow: '0 0 10px rgba(31, 199, 212, 0.4)',
                        margin: '0 0 10px 0',
                    }}>
                        Super Quant Platform
                    </h1>
                    <h2 style={{
                        fontSize: '1.2rem',
                        fontWeight: '400',
                        color: '#1fc7d4',
                        margin: '0 0 20px 0',
                    }}>
                        Autonomous Hedge Fund Management
                    </h2>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto 30px auto',
                        fontSize: '1.05rem',
                        color: '#888',
                        lineHeight: '1.6',
                    }}>
                        The Hedge Fund Agent is the core orchestrator, executing strategies by coordinating with a network of specialized AI Agents for intelligence, risk management, and compliance.
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
                        <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>🤖</span>
                        <span>Agent Coordination System Active</span>
                    </div>
                </section>

                {/* Interacting Agents Visual Flow (FIXED) */}
                <AgentCoordinationFlow />

                <section style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    marginBottom: '60px'
                }}>
                    <div
                        key={hedgeFundFeature.type}
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
                                {hedgeFundFeature.title}
                            </h3>
                            <p style={{
                                color: '#888',
                                marginBottom: '20px',
                                fontSize: '0.95rem'
                            }}>
                                Define your core investment thesis and portfolio for the orchestrated execution.
                            </p>

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
                                    Core Parameters Sample:
                                </div>
                                {Object.entries(hedgeFundFeature.inputData).map(([key, value]) => (
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
                                onClick={() => handleHedgeFundExecution(hedgeFundFeature)}
                                disabled={agentStatus === 'loading' || agentStatus === 'processing'}
                                style={getButtonStyles(agentStatus)}
                                onMouseEnter={(e) => {
                                    if (agentStatus === 'idle' || agentStatus === 'error') {
                                        e.target.style.backgroundColor = '#00b8c9';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (agentStatus === 'idle' || agentStatus === 'error') {
                                        e.target.style.backgroundColor = '#1fc7d4';
                                        e.target.style.transform = 'translateY(0)';
                                    }
                                    if (agentStatus === 'completed') {
                                        e.target.style.backgroundColor = '#44ff44';
                                        e.target.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                {agentStatus === 'idle' && 'Execute Strategy'}
                                {agentStatus === 'loading' && 'Initializing...'}
                                {agentStatus === 'processing' && 'Executing... (Polling every 2 min)'}
                                {agentStatus === 'completed' && 'Execution Complete'}
                                {agentStatus === 'error' && 'Retry Execution'}
                            </button>
                            {agentStatus === 'processing' && (
                                <p style={{
                                    color: '#1fc7d4',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                    textAlign: 'center'
                                }}>
                                    ⏳ Waiting for payment and execution...
                                </p>
                            )}
                            {agentError && (
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#ff4444',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                }}>
                                    Error: {agentError}
                                </div>
                            )}
                        </div>
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
                                        Hedge Fund Execution Report
                                    </h2>
                                    <p style={{
                                        color: '#1fc7d4',
                                        fontSize: '1.1rem',
                                        fontWeight: '500',
                                        margin: 0
                                    }}>
                                        Execution ID: {currentResult.data.identifier_from_purchaser || 'N/A'}
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
                                        Strategy: {currentResult.data.input_data?.investment_thesis ? 'Thesis-Driven' : 'N/A'}
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
                                        Current Risk Level (Coordinated by Risk Agent)
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
                                            Raw Risk Score: {currentResult.data.risk_score_raw}/100
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
                                        <span>Detailed Execution Summary</span>
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

export default HedgeFund;
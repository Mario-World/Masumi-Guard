import React from 'react';
import ModernNavbar from '../components/ModernNavbar';

// Emojis for agent icons and feature bullets
const AGENT_EMOJIS = {
  Strategy: '🧠',
  Risk: '🛡️',
  Execution: '⚡',
  Portfolio: '📈',
  Reporting: '📜',
  RnD: '🧪',
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
    description: 'Manages all transaction details, ensuring optimal trade routing and management on Cardano.',
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
  // {
  //   name: 'R&D Agent',
  //   icon: AGENT_EMOJIS.RnD,
  //   description: 'Researches new protocols, DeFi primitives, and novel strategy techniques.',
  //   focus: 'Innovation, Backtesting',
  // },
  {
    name: 'Compliance Agent',
    icon: AGENT_EMOJIS.Compliance,
    description: 'Ensures all operations adhere to predefined regulatory or internal governance standards.',
    focus: 'Governance, Regulatory Adherence',
  },
];

const AgentCard = ({ agent }) => (
  <div
    style={{
      padding: '25px',
      border: '1px solid #333',
      borderRadius: '12px',
      textAlign: 'left',
      backgroundColor: '#1c1c1c',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.6)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
    }}
  >
    <div
      style={{
        fontSize: '36px',
        marginBottom: '15px',
        width: '50px',
        height: '50px',
        backgroundColor: '#00cc99', // Cardano-like green
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {agent.icon}
    </div>
    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#fff' }}>
      {agent.name}
    </h3>
    <p style={{ margin: '0 0 15px 0', color: '#ccc', flexGrow: 1 }}>
      {agent.description}
    </p>
    <p style={{ margin: '0', fontSize: '0.9rem', color: '#00cc99', fontWeight: 'bold' }}>
      Focus: {agent.focus}
    </p>
  </div>
);

const AgentsPage = () => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    lineHeight: '1.6',
  };

  const sectionStyle = {
    padding: '80px 5%',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const heroStyle = {
    ...sectionStyle,
    paddingTop: '120px',
    paddingBottom: '100px',
    background: 'radial-gradient(circle, rgba(0,204,153,0.1) 0%, rgba(10,10,10,1) 70%)',
  };

  // Removed buttonStyle since the CTA now only uses text

  const h2Style = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#fff',
  };

  const h3Style = {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#00cc99',
  };

  return (
    <div style={containerStyle}>
      <ModernNavbar />
      {/* --- HERO SECTION --- */}
      <div style={heroStyle}>
        <span style={{ color: '#00cc99', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Autonomous Agents
        </span>
        <h1 style={{ fontSize: '3.5rem', margin: '15px 0 20px 0', fontWeight: 'bold' }}>
          The <span style={{ color: '#00cc99' }}>AI Agent Workforce</span> for Super Quant
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 40px auto', color: '#ccc' }}>
          A team of specialized Masumi Agents handles the entire investment workflow.
        </p>
        <a
          href="#agents-list"
          style={{
            backgroundColor: '#00cc99',
            color: '#0a0a0a',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '30px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background-color 0.2s',
          }}
        >
          Explore The Agents
        </a>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '0 auto', width: '90%' }} />

      {/* --- AGENTS LIST SECTION --- */}
      <div id="agents-list" style={sectionStyle}>
        <h2 style={h2Style}>Meet the Agentic Team</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 50px auto', color: '#ccc' }}>
          Each agent is a specialized expert, built on the **Masumi Framework**, designed to deliver institutional-grade rigor and efficiency to decentralized finance.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {AGENTS_DATA.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '0 auto', width: '90%' }} />

      {/* --- COLLABORATION & ORCHESTRATION SECTION --- */}
      <div style={{ ...sectionStyle, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '50px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ ...h2Style, textAlign: 'left' }}>
            The Central Nervous System: <span style={{ color: '#00cc99' }}>Masumi Orchestration</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '20px' }}>
            The **Masumi AI Agent** acts as the central orchestrator, enabling the specialized agents to seamlessly discover, collaborate, and transact with one another to execute complex financial tasks.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#ccc' }}>
            <li style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
              <span style={{ color: '#00cc99', marginRight: '10px' }}>•</span>
              **Dynamic Task Routing**: The Orchestrator routes tasks (e.g., "Execute buy order") to the best-suited agent (Execution Agent).
            </li>
            <li style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
              <span style={{ color: '#00cc99', marginRight: '10px' }}>•</span>
              **Context Handover**: Agents share context (e.g., Strategy Agent passes the trade plan to the Risk Agent) for informed, sequential decision-making.
            </li>
            <li style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
              <span style={{ color: '#00cc99', marginRight: '10px' }}>•</span>
              **Verifiable Transactions**: All collaboration and task execution is payment-gated and verifiably logged via the Masumi Protocol.
            </li>
          </ul>
        </div>
        <div style={{ flex: 1, minHeight: '300px' }}>
          {/* Placeholder for the architecture diagram - You should insert the actual image here */}

        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '0 auto', width: '90%' }} />

      {/* --- KEY FEATURES SECTION --- */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Key Agentic Advantages</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 50px auto', color: '#ccc' }}>
          Super Quant's AI Agent approach delivers capabilities traditional hedge funds can't match.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            textAlign: 'left',
          }}
        >
          <div style={{ padding: '20px', backgroundColor: '#1c1c1c', borderRadius: '10px' }}>
            <h3 style={h3Style}>Real-Time Adaptation</h3>
            <p style={{ color: '#ccc' }}>
              The AI core rapidly processes vast market data and instantly adapts trading strategies to new trends and volatility, eliminating human latency.
            </p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#1c1c1c', borderRadius: '10px' }}>
            <h3 style={h3Style}>On-Chain Transparency</h3>
            <p style={{ color: '#ccc' }}>
              Built on Cardano Smart Contracts, all fund rules and agent decisions are immutably logged, providing verifiable and auditable transparency for every action.
            </p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#1c1c1c', borderRadius: '10px' }}>
            <h3 style={h3Style}>Bias Elimination</h3>
            <p style={{ color: '#ccc' }}>
              The autonomous nature of the Agents removes human emotion and bias from trading decisions, ensuring purely data-driven and objective strategy execution.
            </p>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '0 auto', width: '90%' }} />

      {/* --- CTA SECTION (UPDATED) --- */}
      <div style={{ ...sectionStyle, paddingTop: '50px', paddingBottom: '100px' }}>
        <h2 style={h2Style}>Ready to explore the future of DeFi?</h2>
        <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '700px', margin: '0 auto 40px auto' }}>
          A team of specialized Masumi Agents handles the entire investment workflow-from planning the Strategy to managing the Execution-autonomously and in parallel on the Cardano blockchain.
        </p>
        {/* Removed the button */}
      </div>
    </div>
  );
};

export default AgentsPage;
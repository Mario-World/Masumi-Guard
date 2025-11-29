import React from 'react';
import ModernNavbar from '../components/ModernNavbar';

function Agents() {
  const agents = [
    { name: 'Strategy Agent', number: 'I' },
    { name: 'Risk Agent', number: 'II' },
    { name: 'Execution Agent', number: 'III' },
    { name: 'Portfolio Agent', number: 'IV' },
    { name: 'Reporting Agent', number: 'V' },
    { name: 'R&D Agent', number: 'VI' },
    { name: 'Compliance Agent', number: 'VII' }
  ];

  return (
    <div className="app-container">
      <ModernNavbar />
      <main className="main-content">
        <section className="hero">
          <h1>Agent Ecosystem</h1>
          <p className="hero-subtitle">
            Autonomous agents executing specialized tasks across the hedge fund ecosystem
          </p>
        </section>

        <section className="agents-section">
          <div className="agents-grid">
            {agents.map((agent, index) => (
              <div key={index} className="agent-card">
                <div className="agent-card-number">{agent.number}</div>
                <h3>{agent.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Agents;


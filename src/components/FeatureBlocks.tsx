const items = [
  {
    title: 'Focused Sessions',
    copy: 'Structure your work blocks with intent and reduce context switching.',
  },
  {
    title: 'Intentional Time Tracking',
    copy: 'See where your real execution time goes with clean daily visibility.',
  },
  {
    title: 'Momentum System',
    copy: 'Build consistency with measurable progress, not scattered effort.',
  },
];

const FeatureBlocks = () => {
  return (
    <section className='features'>
      <header className='section-heading'>
        <p>Why Focura</p>
        <h2>Made to turn intention into output</h2>
      </header>

      <div className='feature-grid'>
        {items.map((item) => (
          <article key={item.title} className='feature-card'>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeatureBlocks;

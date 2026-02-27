const items = [
  {
    title: 'Focused Sessions',
    copy: 'Plan your sessions with intention and avoid scattered work loops.',
  },
  {
    title: 'Intentional Time Tracking',
    copy: 'Measure time spent on what actually matters, not just activity.',
  },
  {
    title: 'Execution Momentum',
    copy: 'Build consistency through small, repeated wins and clear progress.',
  },
];

const FeatureBlocks = () => {
  return (
    <section className='features'>
      {items.map((item) => (
        <article key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </section>
  );
};

export default FeatureBlocks;

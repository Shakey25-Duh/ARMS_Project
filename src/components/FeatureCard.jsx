function FeatureCard({ title, description, button, btnClass }) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card subject-card shadow p-4">
        <h4>{title}</h4>

        <p>{description}</p>

        <button className={btnClass}>{button}</button>
      </div>
    </div>
  );
}

export default FeatureCard;
